const fs = require('fs');
const path = require('path');
const cloudinary = require(path.join(__dirname, '..', 'frontend', 'node_modules', 'cloudinary')).v2;

cloudinary.config({
  cloud_name: 'djbiwbdo',
  api_key: '558599488927594',
  api_secret: '23gKcHEJafO4Ih9Qa-5uJrybcvk',
  secure: true
});

const cacheFile = path.join(__dirname, '..', 'frontend', 'src', 'lib', 'cloudinary_events_cache.json');
let cache = {};
if (fs.existsSync(cacheFile)) {
  try {
    cache = JSON.parse(fs.readFileSync(cacheFile, 'utf8'));
  } catch (e) {}
}

const EVENTS_CONFIG = [
  {
    id: "gangotri-annapurna",
    title: "Gangotri Centre & Annapurna Rural Sanctuary",
    category: "Sanctuary & Shelter",
    year: "1994 - Present",
    location: "Varanasi Rural Campus & Kamachha",
    badge: "Rural Sanctuary",
    description: "Safe shelter, residential cottages, nutrition support, and life-skills rehabilitation for individuals with intellectual disabilities.",
    folders: [
      "frontend/public/drive_assets/Annapurna_Main",
      "frontend/public/drive_assets/A_Ch_Annapurna",
      "frontend/public/drive_assets/A.Ch Anapaurna",
      "frontend/public/drive_assets/Activities of Annapurana",
      "frontend/public/drive_assets/Activities_Annapurna",
      "frontend/public/drive_assets/annanpurna",
      "frontend/public/drive_assets/Annapurana For WE B",
      "frontend/public/drive_assets/Annapurna_Prog",
      "frontend/public/drive_assets/annapurna_web",
      "frontend/public/drive_assets/Annapurna_Hut",
      "frontend/public/drive_assets/Annapurna_Workshop"
    ],
    staticImages: [
      { local: "frontend/public/images/programs/annapurna-cover.jpg", title: "Annapurna Sanctuary Front View", caption: "Residential cottages providing safe shelter and life-skills routines." },
      { local: "frontend/public/images/programs/annapurna-1.jpg", title: "Vocational Activity Hall", caption: "Students participating in adaptive motor tasks." },
      { local: "frontend/public/images/programs/annapurna-2.jpg", title: "Community Lunch & Nutrition", caption: "Daily hot balanced meals served to all shelter residents." },
      { local: "frontend/public/images/programs/rural-shelter-1.jpg", title: "Rural Cottage Ground Inspection", caption: "Shelter infrastructure inspection in rural Varanasi." },
      { local: "frontend/public/images/discc/hero-children.png", title: "Girl Child Protection Sanctuary", caption: "Vocational empowerment and daily rehabilitation for young girls." }
    ]
  },
  {
    id: "vocational-beautician",
    title: "Women & Youth Vocational Self-Reliance Program",
    category: "Vocational Training",
    year: "2000 - Present",
    location: "Annapurna Center & Deva Gram",
    badge: "Vocational Skills",
    description: "Hands-on professional training in beautician skills, textile stitching, detergent fabrication, and handicraft production.",
    folders: [
      "frontend/public/drive_assets/anna.beautician classes & suman prog",
      "frontend/public/drive_assets/Beautician_Suman",
      "frontend/public/drive_assets/Washing_Powder"
    ],
    staticImages: []
  },
  {
    id: "clinic-rehab",
    title: "Navjeevan Clinic & Pediatric Sensory Rehabilitation",
    category: "Clinical Care",
    year: "1991 - Present",
    location: "Kamachha Chungi, Varanasi",
    badge: "Pediatric Diagnostics",
    description: "Pediatric neurodevelopmental diagnostics, sensory integration gym therapy, and specialized parent counseling.",
    folders: [
      "frontend/public/images/programs/clinic_drive",
      "frontend/public/drive_assets/Clinic_Shed"
    ],
    staticImages: [
      { local: "frontend/public/images/discc/dr-tulsi-clinic.png", title: "Dr. Tulsi Conducting Clinical Diagnostic", caption: "Comprehensive psychological intelligence and Vineland profiling." },
      { local: "frontend/public/images/discc/children-therapy.jpg", title: "Sensory Gym & Gait Coordination", caption: "Individualized sensory gym and physical motor therapy." },
      { local: "frontend/public/images/discc/deva-building.jpg", title: "Navjeevan Clinic Headquarters", caption: "Historic Kamachha facility providing zero-fee clinical assessments." }
    ]
  },
  {
    id: "cultural-festivals",
    title: "Inclusive Cultural Festivals, Theatrical Dramas & Picnics",
    category: "Community Inclusion",
    year: "Annual Tradition",
    location: "Ganga Ghats & Deva Center Campus",
    badge: "Cultural Festivals",
    description: "Annual inclusive celebrations uniting over 500 neurodivergent children for theater dramas, music, magic shows, and riverfront picnics.",
    folders: [
      "frontend/public/drive_assets/Picnic",
      "frontend/public/drive_assets/Annapurna_Picnic",
      "frontend/public/drive_assets/Singer_Program",
      "frontend/public/drive_assets/Teru_Dusail"
    ],
    staticImages: [
      { local: "frontend/public/images/discc/gallery/magic-show.jpg", title: "Annual Magic & Illusion Show", caption: "Pure joy and laughter at the annual carnival." },
      { local: "frontend/public/images/discc/gallery/ramayan-play.jpg", title: "Inclusive Ramayan Theatrical Play", caption: "Students performing onstage in traditional costume." },
      { local: "frontend/public/images/discc/gallery/purple-fair-2026.jpg", title: "Purple Fair Annual Gathering", caption: "Over 500 children united for adaptive games and artwork." },
      { local: "frontend/public/images/discc/gallery/basant-panchami.jpg", title: "Basant Panchami Celebration", caption: "Saraswati Vandana and cultural art competitions." },
      { local: "frontend/public/images/discc/gallery/republic-day.jpg", title: "Republic Day Flag Hoisting", caption: "National anthem and pride celebrated across campus." },
      { local: "frontend/public/images/discc/gallery/yoga-day.jpg", title: "International Yoga Day", caption: "Adaptive gentle asanas improving body posture and calm." }
    ]
  },
  {
    id: "state-honors",
    title: "State Leadership Honors & CM Award Felicitation",
    category: "State Honors",
    year: "2019 - 2023",
    location: "Lucknow & Varanasi State Forums",
    badge: "State Leadership",
    description: "Official government felicitation recognizing 35 years of clinical devotion to children with intellectual disabilities.",
    folders: [],
    staticImages: [
      { local: "frontend/public/images/discc/award-ceremony.png", title: "Best Professional Psychologist State Award", caption: "Conferred by Hon'ble UP Chief Minister Yogi Adityanath to Dr. C. Tulsi Das." },
      { local: "frontend/public/images/discc/role-model-award.png", title: "State Role Model Organization Award", caption: "Felicitation for DISCC's grassroots leadership across 21 RPwD conditions." },
      { local: "frontend/public/images/discc/press-coverage.png", title: "State Press & Media Coverage", caption: "Statewide media documenting DISCC's impact in Eastern Uttar Pradesh." }
    ]
  },
  {
    id: "international-solidarity",
    title: "Indo-European Medical Solidarity & International Friends",
    category: "Global Solidarity",
    year: "1991 - Present",
    location: "France, Switzerland & Varanasi",
    badge: "International Friends",
    description: "Over 30 years of medical collaboration with Deva Europe, French art historian Jean-Max Tassel, and European medical volunteers.",
    folders: [
      "frontend/public/drive_assets/Foreign_Friends",
      "frontend/public/drive_assets/visit_friends"
    ],
    staticImages: [
      { local: "frontend/public/images/discc/founders-meet.jpg", title: "Founders Meeting with International Patrons", caption: "Jean-Max Tassel and Dr. Tulsi Das formalizing Deva Europe partnership." }
    ]
  },
  {
    id: "historical-genesis",
    title: "The 1991 Genesis & Rural Groundwork Archives",
    category: "Heritage Archives",
    year: "1991 - 2004",
    location: "Rural Varanasi District",
    badge: "Archival Genesis",
    description: "Historical photographs from 1991 capturing early village surveys, hand-pipe construction, and the genesis of DEVA Center.",
    folders: [
      "frontend/public/drive_assets/Earlier_Time",
      "frontend/public/drive_assets/earlier_time",
      "frontend/public/drive_assets/Village_Scenes"
    ],
    staticImages: [
      { local: "frontend/public/images/discc/dr-tulsi-portrait.jpg", title: "Dr. C. Tulsi Das in the Field", caption: "Founding president Dr. Tulsi Das during early community fieldwork." }
    ]
  }
];

async function uploadFile(filePath, publicId, folder) {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      filePath,
      {
        folder,
        public_id: publicId,
        overwrite: false,
        resource_type: 'image',
        quality_analysis: true
      },
      (err, res) => {
        if (err) reject(err);
        else resolve(res);
      }
    );
  });
}

async function run() {
  console.log("=== DISCC India: Events Gallery Cloudinary Sync ===");
  const baseDir = path.join(__dirname, '..');
  const compiledEvents = [];
  const allPhotosFlat = [];

  for (const ev of EVENTS_CONFIG) {
    console.log(`\nProcessing Event: [${ev.title}]`);
    const eventPhotos = [];
    const seenPaths = new Set();

    // 1. Process local static images
    for (const st of ev.staticImages) {
      const fullPath = path.join(baseDir, st.local);
      if (fs.existsSync(fullPath)) {
        seenPaths.add(fullPath);
        const relWeb = '/' + path.relative(path.join(baseDir, 'frontend', 'public'), fullPath).replace(/\\/g, '/');
        const cacheKey = `${ev.id}_${path.basename(fullPath)}`;
        let cUrl = cache[cacheKey];

        if (!cUrl) {
          try {
            console.log(`  Uploading static image: ${path.basename(fullPath)}...`);
            const res = await uploadFile(fullPath, `${ev.id}_${path.parse(fullPath).name}`, `discc/events/${ev.id}`);
            cUrl = res.secure_url;
            cache[cacheKey] = cUrl;
          } catch (e) {
            console.warn(`  Warning: upload failed, using local: ${e.message}`);
            cUrl = relWeb;
          }
        }

        const photoObj = {
          id: `${ev.id}_${path.parse(fullPath).name}`,
          url: cUrl,
          localUrl: relWeb,
          title: st.title,
          caption: st.caption,
          eventId: ev.id,
          eventTitle: ev.title,
          category: ev.category,
          year: ev.year
        };
        eventPhotos.push(photoObj);
        allPhotosFlat.push(photoObj);
      }
    }

    // 2. Process folders
    for (const fRel of ev.folders) {
      const fPath = path.join(baseDir, fRel);
      if (fs.existsSync(fPath)) {
        const files = fs.readdirSync(fPath);
        for (const file of files) {
          if (!/\.(jpe?g|png|webp)$/i.test(file)) continue;
          if (/thumbs\.db/i.test(file)) continue;

          const fullFilePath = path.join(fPath, file);
          if (seenPaths.has(fullFilePath)) continue;
          seenPaths.add(fullFilePath);

          const relWeb = '/' + path.relative(path.join(baseDir, 'frontend', 'public'), fullFilePath).replace(/\\/g, '/');
          const cleanName = path.parse(file).name.replace(/[^a-zA-Z0-9_-]/g, '_');
          const cacheKey = `${ev.id}_${file}`;
          let cUrl = cache[cacheKey];

          if (!cUrl) {
            try {
              console.log(`  Uploading Drive image: ${file}...`);
              const res = await uploadFile(fullFilePath, `${ev.id}_${cleanName}`, `discc/events/${ev.id}`);
              cUrl = res.secure_url;
              cache[cacheKey] = cUrl;
            } catch (e) {
              console.warn(`  Upload note for ${file}: ${e.message}`);
              cUrl = relWeb;
            }
          }

          const photoObj = {
            id: `${ev.id}_${cleanName}`,
            url: cUrl,
            localUrl: relWeb,
            title: `${ev.title} - ${file.replace(/[_-]/g, ' ').replace(/\.[^.]+$/, '')}`,
            caption: `${ev.badge} archive photograph from ${ev.location}.`,
            eventId: ev.id,
            eventTitle: ev.title,
            category: ev.category,
            year: ev.year
          };
          eventPhotos.push(photoObj);
          allPhotosFlat.push(photoObj);
        }
      }
    }

    console.log(`  Total photos compiled for [${ev.id}]: ${eventPhotos.length}`);
    compiledEvents.push({
      ...ev,
      photosCount: eventPhotos.length,
      coverImage: eventPhotos[0]?.url || "/images/discc/hero-children.png",
      photos: eventPhotos
    });
  }

  // Save cache
  fs.writeFileSync(cacheFile, JSON.stringify(cache, null, 2));

  // Write TypeScript file
  const tsContent = `// Auto-generated by sync_events_to_cloudinary.js
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
}

export const EVENTS_CATALOG: EventCollection[] = ${JSON.stringify(compiledEvents, null, 2)};

export const ALL_EVENT_PHOTOS: EventPhoto[] = ${JSON.stringify(allPhotosFlat, null, 2)};

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

  const tsPath = path.join(__dirname, '..', 'frontend', 'src', 'lib', 'eventsData.ts');
  fs.writeFileSync(tsPath, tsContent, 'utf8');
  console.log(`\nSuccessfully generated ${tsPath} with ${compiledEvents.length} events and ${allPhotosFlat.length} photos!`);
}

run().catch(console.error);
