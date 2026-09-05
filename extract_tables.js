const fs = require('fs');
const data = fs.readFileSync('wpadmin.sql', 'utf8');
const matches = data.match(/CREATE TABLE `(.*?)`/g);
if (matches) {
    const tables = matches.map(m => m.replace(/CREATE TABLE `/,'').replace(/`/,''));
    console.log(tables.join('\n'));
} else {
    console.log('No tables found');
}
