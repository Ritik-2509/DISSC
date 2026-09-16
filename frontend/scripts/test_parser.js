const fs = require('fs');
const path = require('path');

const sqlPath = path.join(__dirname, '..', 'wpadmin.sql');
const content = fs.readFileSync(sqlPath, 'utf8');

function extractTableColumns(tableName) {
  const createRegex = new RegExp('CREATE TABLE `' + tableName + '` \\(([\\s\\S]*?)\\) ENGINE', 'i');
  const match = content.match(createRegex);
  if (!match) return [];
  const body = match[1];
  const lines = body.split('\n');
  const columns = [];
  for (let line of lines) {
    line = line.trim();
    if (line.startsWith('`')) {
      const colName = line.match(/^`([^`]+)`/)[1];
      columns.push(colName);
    }
  }
  return columns;
}

console.log('Pages Columns:', extractTableColumns('pages'));
console.log('Teams Columns:', extractTableColumns('teams'));
console.log('Settings Columns:', extractTableColumns('settings'));
console.log('Media Files Columns:', extractTableColumns('media_files'));
console.log('Galleries Columns:', extractTableColumns('galleries'));
