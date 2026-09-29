const fs = require('fs');
const path = require('path');

const tsPath = path.join(__dirname, '..', 'frontend', 'src', 'lib', 'eventsData.ts');
if (!fs.existsSync(tsPath)) {
  console.error("eventsData.ts not found at", tsPath);
  process.exit(1);
}

const content = fs.readFileSync(tsPath, 'utf8');

// Parse EVENTS_CATALOG
const catalogMatch = content.match(/export const EVENTS_CATALOG: EventCollection\[\] = (\[[\s\S]*?\]);\s*export const ALL_EVENT_PHOTOS/);
if (!catalogMatch) {
  console.error("Could not match EVENTS_CATALOG");
  process.exit(1);
}

let catalog = JSON.parse(catalogMatch[1]);
console.log(`Original catalog events: ${catalog.length}`);

let totalBefore = 0;
let totalAfter = 0;
const allUniquePhotos = [];
const globalSeenUrls = new Set();
const globalSeenIds = new Set();

const cleanedCatalog = catalog.map((ev) => {
  const seenEventUrls = new Set();
  const seenEventIds = new Set();
  const uniqueEventPhotos = [];

  for (let i = 0; i < (ev.photos || []).length; i++) {
    totalBefore++;
    const p = ev.photos[i];
    
    // Normalize url and id
    const urlKey = p.url.split('?')[0].toLowerCase();
    let idKey = p.id;

    if (seenEventUrls.has(urlKey) || seenEventIds.has(idKey)) {
      continue; // Duplicate image within event
    }

    seenEventUrls.add(urlKey);
    seenEventIds.add(idKey);
    
    // Ensure globally unique id for photo wall
    let finalId = idKey;
    let counter = 1;
    while (globalSeenIds.has(finalId)) {
      finalId = `${idKey}_${counter++}`;
    }
    globalSeenIds.add(finalId);

    const cleanPhoto = {
      ...p,
      id: finalId
    };

    uniqueEventPhotos.push(cleanPhoto);
    allUniquePhotos.push(cleanPhoto);
    totalAfter++;
  }

  return {
    ...ev,
    photosCount: uniqueEventPhotos.length,
    coverImage: uniqueEventPhotos[0]?.url || ev.coverImage,
    photos: uniqueEventPhotos
  };
});

console.log(`Photos before deduplication: ${totalBefore}`);
console.log(`Photos after deduplication: ${totalAfter} (Removed ${totalBefore - totalAfter} duplicates)`);

const newTsContent = `// Auto-generated & optimized for React key uniqueness
// Cloudinary synced photographic events & documentary archive

export interface EventPhoto {
  id: string;
  url: string;
  localUrl: string;
  title: string;
  caption: string;
  eventId: string;
  eventTitle: string;
  category: string;
  year: string;
}

export interface EventCollection {
  id: string;
  title: string;
  category: string;
  year: string;
  location: string;
  badge: string;
  description: string;
  coverImage: string;
  photosCount: number;
  photos: EventPhoto[];
  folders?: string[];
  staticImages?: any[];
}

export const EVENTS_CATALOG: EventCollection[] = ${JSON.stringify(cleanedCatalog, null, 2)};

export const ALL_EVENT_PHOTOS: EventPhoto[] = ${JSON.stringify(allUniquePhotos, null, 2)};

export const EVENT_CATEGORIES = [
  "All",
  "Sanctuary & Shelter",
  "Vocational Training",
  "Clinical Care",
  "Community Inclusion",
  "State Honors",
  "Global Solidarity",
  "Heritage Archives"
];
`;

fs.writeFileSync(tsPath, newTsContent, 'utf8');
console.log(`Updated ${tsPath} successfully!`);
