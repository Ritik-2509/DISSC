const fs = require('fs');
const path = require('path');

const sqlPath = path.join(__dirname, '..', 'wpadmin.sql');
const content = fs.readFileSync(sqlPath, 'utf8');

const keyTables = [
  'pages',
  'posts',
  'categories',
  'tags',
  'galleries',
  'gallery_meta',
  'media_files',
  'media_folders',
  'contacts',
  'teams',
  'testimonials',
  'faqs',
  'settings',
  'users',
  'announcements'
];

console.log('SQL File Size:', (content.length / (1024 * 1024)).toFixed(2), 'MB');

keyTables.forEach(t => {
  const marker = 'INSERT INTO `' + t + '`';
  let count = 0;
  let pos = content.indexOf(marker);
  while (pos !== -1) {
    count++;
    pos = content.indexOf(marker, pos + marker.length);
  }
  console.log(`${t.padEnd(16)}: ${count} INSERT statement(s)`);
});
