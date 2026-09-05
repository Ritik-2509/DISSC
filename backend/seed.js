const fs = require('fs');


const API_URL = "http://localhost:3001/api";

function extractInserts(sql, tableName) {
  const regex = new RegExp(`INSERT INTO \`${tableName}\` \\([^\\)]+\\) VALUES\\s*(.*?);`, 'gs');
  const matches = [...sql.matchAll(regex)];
  let valuesString = "";
  matches.forEach(m => {
    valuesString += m[1] + ",";
  });
  if (!valuesString) return [];
  
  // Clean up trailing comma
  valuesString = valuesString.replace(/,$/, '');
  
  // This is a naive regex to parse SQL values. It handles simple strings but might break on complex escaped strings.
  // For basic migration, it's often sufficient. 
  // Better approach: regex to match individual (...) tuples.
  const tupleRegex = /\(([^)(]+(?:\([^)(]+(?:\([^)(]+\)[^)(]*)*\)[^)(]*)*)\)/g;
  const tuples = [...valuesString.matchAll(tupleRegex)];
  
  return tuples.map(t => {
    const raw = t[1];
    // split by comma but ignore commas inside quotes.
    const fields = raw.match(/(".*?"|'.*?'|[^'",\s]+)(?=\s*,|\s*$)/g) || [];
    return fields.map(f => {
      let cleaned = f.trim();
      if (cleaned.startsWith("'") && cleaned.endsWith("'")) cleaned = cleaned.slice(1, -1);
      if (cleaned.startsWith('"') && cleaned.endsWith('"')) cleaned = cleaned.slice(1, -1);
      return cleaned.replace(/\\'/g, "'").replace(/\\n/g, "\n");
    });
  });
}

async function seed() {
  console.log("Starting Seeding Process...");
  const sql = fs.readFileSync('wpadmin.sql', 'utf8');

  // Seed Pages
  console.log("Extracting Pages...");
  const pages = extractInserts(sql, 'pages');
  for (const page of pages) {
    // Schema usually: id, title, content, status, etc. We'll grab string fields that look like title/content.
    const title = page.find(f => f.length > 3 && f.length < 100 && !f.includes('http'));
    const content = page.find(f => f.length > 100) || "Default content for " + title;
    if (title && content) {
      await fetch(`${API_URL}/pages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, content, image: "https://picsum.photos/seed/" + title.replace(/\s/g, '') + "/1000/800" })
      });
      console.log(`Seeded Page: ${title}`);
    }
  }

  // Seed Posts/Blogs
  console.log("Extracting Posts...");
  const posts = extractInserts(sql, 'posts');
  for (const post of posts) {
    const title = post.find(f => f.length > 3 && f.length < 100 && !f.includes('http'));
    const content = post.find(f => f.length > 100) || "Default blog content for " + title;
    if (title && content) {
      await fetch(`${API_URL}/blogs`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, content, image: "https://picsum.photos/seed/post/800/800" })
      });
      console.log(`Seeded Blog: ${title}`);
    }
  }

  // Seed Teams
  console.log("Extracting Teams...");
  const teams = extractInserts(sql, 'teams');
  for (const team of teams) {
    const name = team.find(f => f.length > 2 && f.length < 50 && !f.includes('http'));
    const role = team.find(f => f.length > 3 && f.length < 50 && f !== name) || "Member";
    const bio = team.find(f => f.length > 50) || "";
    if (name) {
      await fetch(`${API_URL}/teams`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, role, bio, image: "https://picsum.photos/seed/" + name.replace(/\s/g, '') + "/800/1000" })
      });
      console.log(`Seeded Team Member: ${name}`);
    }
  }

  // Seed Testimonials
  console.log("Extracting Testimonials...");
  const testimonials = extractInserts(sql, 'testimonials');
  for (const test of testimonials) {
    const name = test.find(f => f.length > 2 && f.length < 50 && !f.includes('http'));
    const quote = test.find(f => f.length > 20) || "Great experience.";
    const role = test.find(f => f.length > 3 && f.length < 50 && f !== name) || "Supporter";
    if (name) {
      await fetch(`${API_URL}/testimonials`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, role, quote })
      });
      console.log(`Seeded Testimonial: ${name}`);
    }
  }

  console.log("Seeding complete!");
}

seed().catch(console.error);
