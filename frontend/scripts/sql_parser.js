const fs = require('fs');
const path = require('path');

const sqlPath = path.join(__dirname, '..', 'wpadmin.sql');
const outputDir = path.join(__dirname, '..', 'frontend', 'firestore_export');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

console.log('Reading wpadmin.sql...');
const sqlContent = fs.readFileSync(sqlPath, 'utf8');
console.log('File size:', (sqlContent.length / (1024 * 1024)).toFixed(2), 'MB');

function extractTableColumns(tableName) {
  const createRegex = new RegExp('CREATE TABLE `' + tableName + '` \\(([\\s\\S]*?)\\) ENGINE', 'i');
  const match = sqlContent.match(createRegex);
  if (!match) return [];
  const body = match[1];
  const lines = body.split('\n');
  const columns = [];
  for (let line of lines) {
    line = line.trim();
    if (line.startsWith('`')) {
      const colMatch = line.match(/^`([^`]+)`/);
      if (colMatch) {
        columns.push(colMatch[1]);
      }
    }
  }
  return columns;
}

// Parses a single row tuple: (val1, val2, 'str\'ing', NULL, 123)
function parseSqlRow(rowStr) {
  const values = [];
  let current = '';
  let inString = false;
  let quoteChar = '';
  let isEscaped = false;

  const trimmed = rowStr.trim().replace(/^\(/, '').replace(/\)$/, '');

  for (let i = 0; i < trimmed.length; i++) {
    const char = trimmed[i];

    if (isEscaped) {
      current += char;
      isEscaped = false;
      continue;
    }

    if (char === '\\') {
      isEscaped = true;
      current += char;
      continue;
    }

    if (!inString && (char === "'" || char === '"')) {
      inString = true;
      quoteChar = char;
      continue;
    }

    if (inString && char === quoteChar) {
      // Check for doubled quote ('' in SQL)
      if (i + 1 < trimmed.length && trimmed[i + 1] === quoteChar) {
        current += quoteChar;
        i++;
        continue;
      }
      inString = false;
      continue;
    }

    if (!inString && char === ',') {
      let val = current.trim();
      if (val === 'NULL' || val === 'null') {
        values.push(null);
      } else if (!isNaN(val) && val !== '') {
        values.push(Number(val));
      } else {
        // unescape common escapes
        val = val.replace(/\\'/g, "'").replace(/\\"/g, '"').replace(/\\n/g, "\n").replace(/\\r/g, "\r").replace(/\\\\/g, "\\");
        values.push(val);
      }
      current = '';
      continue;
    }

    current += char;
  }

  let finalVal = current.trim();
  if (finalVal === 'NULL' || finalVal === 'null') {
    values.push(null);
  } else if (!isNaN(finalVal) && finalVal !== '') {
    values.push(Number(finalVal));
  } else {
    finalVal = finalVal.replace(/\\'/g, "'").replace(/\\"/g, '"').replace(/\\n/g, "\n").replace(/\\r/g, "\r").replace(/\\\\/g, "\\");
    values.push(finalVal);
  }

  return values;
}

function parseTableRows(tableName) {
  const columns = extractTableColumns(tableName);
  if (!columns.length) {
    console.warn(`No columns found for ${tableName}`);
    return [];
  }

  const marker = 'INSERT INTO `' + tableName + '`';
  let pos = 0;
  const rows = [];

  while (true) {
    const startIdx = sqlContent.indexOf(marker, pos);
    if (startIdx === -1) break;

    const valuesIdx = sqlContent.indexOf('VALUES', startIdx);
    if (valuesIdx === -1) break;

    const endIdx = sqlContent.indexOf(';\n', valuesIdx);
    if (endIdx === -1) break;

    const insertBlock = sqlContent.substring(valuesIdx + 6, endIdx).trim();

    // Split insertBlock into individual row tuples
    let inString = false;
    let quoteChar = '';
    let isEscaped = false;
    let rowStart = -1;

    for (let i = 0; i < insertBlock.length; i++) {
      const char = insertBlock[i];

      if (isEscaped) {
        isEscaped = false;
        continue;
      }
      if (char === '\\') {
        isEscaped = true;
        continue;
      }
      if (!inString && (char === "'" || char === '"')) {
        inString = true;
        quoteChar = char;
        continue;
      }
      if (inString && char === quoteChar) {
        if (i + 1 < insertBlock.length && insertBlock[i + 1] === quoteChar) {
          i++;
          continue;
        }
        inString = false;
        continue;
      }

      if (!inString && char === '(') {
        rowStart = i;
      } else if (!inString && char === ')') {
        if (rowStart !== -1) {
          const rowStr = insertBlock.substring(rowStart, i + 1);
          const parsedValues = parseSqlRow(rowStr);
          const rowObj = {};
          for (let c = 0; c < columns.length; c++) {
            rowObj[columns[c]] = parsedValues[c] !== undefined ? parsedValues[c] : null;
          }
          rows.push(rowObj);
          rowStart = -1;
        }
      }
    }

    pos = endIdx + 2;
  }

  return rows;
}

console.log('Extracting tables...');

const slugs = parseTableRows('slugs');
console.log(`✓ Parsed ${slugs.length} slugs`);

const slugMap = {};
for (const s of slugs) {
  const key = `${s.reference_type}_${s.reference_id}`;
  slugMap[key] = s.key;
}

// 1. Pages
const pages = parseTableRows('pages');
for (const p of pages) {
  p.slug = slugMap[`Botble\\Page\\Models\\Page_${p.id}`] || (p.name ? p.name.toLowerCase().replace(/[^a-z0-9]+/g, '-') : `page-${p.id}`);
  if (p.image && !p.image.startsWith('http') && !p.image.startsWith('/')) {
    p.imageUrl = `https://disccindia.org/storage/${p.image}`;
  } else {
    p.imageUrl = p.image;
  }
}
fs.writeFileSync(path.join(outputDir, 'pages.json'), JSON.stringify(pages, null, 2));
console.log(`✓ Exported ${pages.length} pages to pages.json`);

// 2. Posts (Blogs)
const posts = parseTableRows('posts');
for (const p of posts) {
  p.slug = slugMap[`Botble\\Blog\\Models\\Post_${p.id}`] || (p.name ? p.name.toLowerCase().replace(/[^a-z0-9]+/g, '-') : `post-${p.id}`);
  if (p.image && !p.image.startsWith('http') && !p.image.startsWith('/')) {
    p.imageUrl = `https://disccindia.org/storage/${p.image}`;
  } else {
    p.imageUrl = p.image;
  }
}
fs.writeFileSync(path.join(outputDir, 'blogs.json'), JSON.stringify(posts, null, 2));
console.log(`✓ Exported ${posts.length} blogs to blogs.json`);

// 3. Galleries & Gallery Meta
const galleries = parseTableRows('galleries');
const galleryMeta = parseTableRows('gallery_meta');
const galleryImagesMap = {};

for (const gm of galleryMeta) {
  if (gm.images) {
    try {
      const decoded = JSON.parse(gm.images);
      galleryImagesMap[gm.reference_id] = decoded;
    } catch (e) {
      galleryImagesMap[gm.reference_id] = gm.images;
    }
  }
}

for (const g of galleries) {
  g.slug = slugMap[`Botble\\Gallery\\Models\\Gallery_${g.id}`] || (g.name ? g.name.toLowerCase().replace(/[^a-z0-9]+/g, '-') : `gallery-${g.id}`);
  g.images = galleryImagesMap[g.id] || [];
  if (g.image && !g.image.startsWith('http') && !g.image.startsWith('/')) {
    g.imageUrl = `https://disccindia.org/storage/${g.image}`;
  } else {
    g.imageUrl = g.image;
  }
}
fs.writeFileSync(path.join(outputDir, 'galleries.json'), JSON.stringify(galleries, null, 2));
console.log(`✓ Exported ${galleries.length} galleries to galleries.json`);

// 4. Media Files
const mediaFiles = parseTableRows('media_files');
for (const mf of mediaFiles) {
  if (mf.url && !mf.url.startsWith('http') && !mf.url.startsWith('/')) {
    mf.fullUrl = `https://disccindia.org/storage/${mf.url}`;
  } else {
    mf.fullUrl = mf.url;
  }
}
fs.writeFileSync(path.join(outputDir, 'media.json'), JSON.stringify(mediaFiles, null, 2));
console.log(`✓ Exported ${mediaFiles.length} media files to media.json`);

// 5. Contacts (Inquiries)
const contacts = parseTableRows('contacts');
fs.writeFileSync(path.join(outputDir, 'contacts.json'), JSON.stringify(contacts, null, 2));
console.log(`✓ Exported ${contacts.length} contacts to contacts.json`);

// 6. Teams
const teams = parseTableRows('teams');
for (const t of teams) {
  if (t.photo && !t.photo.startsWith('http') && !t.photo.startsWith('/')) {
    t.photoUrl = `https://disccindia.org/storage/${t.photo}`;
  } else {
    t.photoUrl = t.photo;
  }
}
fs.writeFileSync(path.join(outputDir, 'teams.json'), JSON.stringify(teams, null, 2));
console.log(`✓ Exported ${teams.length} teams to teams.json`);

// 7. Testimonials
const testimonials = parseTableRows('testimonials');
for (const tm of testimonials) {
  if (tm.image && !tm.image.startsWith('http') && !tm.image.startsWith('/')) {
    tm.imageUrl = `https://disccindia.org/storage/${tm.image}`;
  } else {
    tm.imageUrl = tm.image;
  }
}
fs.writeFileSync(path.join(outputDir, 'testimonials.json'), JSON.stringify(testimonials, null, 2));
console.log(`✓ Exported ${testimonials.length} testimonials to testimonials.json`);

// 8. FAQs
const faqs = parseTableRows('faqs');
fs.writeFileSync(path.join(outputDir, 'faqs.json'), JSON.stringify(faqs, null, 2));
console.log(`✓ Exported ${faqs.length} FAQs to faqs.json`);

// 9. Settings
const settings = parseTableRows('settings');
const settingsObject = {};
for (const s of settings) {
  settingsObject[s.key] = s.value;
}
fs.writeFileSync(path.join(outputDir, 'settings.json'), JSON.stringify({ list: settings, dict: settingsObject }, null, 2));
console.log(`✓ Exported ${settings.length} settings to settings.json`);

// 10. Categories and Tags
const categories = parseTableRows('categories');
fs.writeFileSync(path.join(outputDir, 'categories.json'), JSON.stringify(categories, null, 2));
console.log(`✓ Exported ${categories.length} categories to categories.json`);

const tags = parseTableRows('tags');
fs.writeFileSync(path.join(outputDir, 'tags.json'), JSON.stringify(tags, null, 2));
console.log(`✓ Exported ${tags.length} tags to tags.json`);

console.log('\n=== SQL TO FIRESTORE CONVERSION COMPLETE ===');
console.log(`Export directory: ${outputDir}`);
