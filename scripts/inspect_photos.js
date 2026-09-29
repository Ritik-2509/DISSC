const fs = require('fs');
const path = require('path');
const content = fs.readFileSync(path.join(__dirname, '..', 'frontend', 'src', 'lib', 'eventsData.ts'), 'utf8');
const catalogMatch = content.match(/export const EVENTS_CATALOG: EventCollection\[\] = (\[[\s\S]*?\]);\s*export const ALL_EVENT_PHOTOS/);
const catalog = JSON.parse(catalogMatch[1]);

console.log('=== AVAILABLE EVENT PHOTO COLLECTIONS ===');
catalog.forEach(ev => {
  console.log(`\nEvent [${ev.id}]: ${ev.title} (${ev.photos.length} photos)`);
  ev.photos.slice(0, 5).forEach(p => {
    console.log(`  - [${p.id}] ${p.title}\n    url: ${p.url}\n    local: ${p.localUrl}`);
  });
});
