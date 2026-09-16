import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

function getCollectionFilePath(collectionName: string) {
  // Normalize collection name
  const nameMap: Record<string, string> = {
    contact: "contacts",
    contacts: "contacts",
    gallery: "galleries",
    galleries: "galleries",
    page: "pages",
    pages: "pages",
    blog: "blogs",
    blogs: "blogs",
    team: "teams",
    teams: "teams",
    faq: "faqs",
    faqs: "faqs",
    testimonial: "testimonials",
    testimonials: "testimonials",
    setting: "settings",
    settings: "settings",
    media: "media",
  };

  const filename = `${nameMap[collectionName] || collectionName}.json`;
  
  const possiblePaths = [
    path.join(process.cwd(), "public", "firestore_export", filename),
    path.join(process.cwd(), "firestore_export", filename),
  ];

  for (const p of possiblePaths) {
    if (fs.existsSync(p)) return p;
  }

  return possiblePaths[0];
}

function readCollection(collectionName: string): any[] {
  const filePath = getCollectionFilePath(collectionName);
  try {
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, "utf-8");
      return JSON.parse(content);
    }
  } catch (err) {
    console.error(`Error reading collection ${collectionName}:`, err);
  }
  return [];
}

function writeCollection(collectionName: string, data: any[]) {
  const primaryPath = path.join(process.cwd(), "public", "firestore_export", `${collectionName}.json`);
  const backupPath = path.join(process.cwd(), "firestore_export", `${collectionName}.json`);

  const jsonStr = JSON.stringify(data, null, 2);

  try {
    fs.mkdirSync(path.dirname(primaryPath), { recursive: true });
    fs.writeFileSync(primaryPath, jsonStr, "utf-8");
  } catch (e) {
    console.warn("Could not write primary collection file:", e);
  }

  try {
    fs.mkdirSync(path.dirname(backupPath), { recursive: true });
    fs.writeFileSync(backupPath, jsonStr, "utf-8");
  } catch (e) {
    console.warn("Could not write backup collection file:", e);
  }

  // Non-blocking firestore sync
  syncToFirestoreRest(collectionName, data).catch(() => {});
}

async function syncToFirestoreRest(collectionName: string, data: any[]) {
  // Optional background push to Firestore REST API for dissc-60e94
  try {
    if (!data.length) return;
    const latest = data[0];
    const docId = latest.id ? String(latest.id) : `doc_${Date.now()}`;
    const projectId = "dissc-60e94";
    const url = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/${collectionName}/${docId}`;

    const fields: Record<string, any> = {};
    for (const [k, v] of Object.entries(latest)) {
      if (typeof v === "string") fields[k] = { stringValue: v };
      else if (typeof v === "number") fields[k] = { integerValue: String(v) };
      else if (typeof v === "boolean") fields[k] = { booleanValue: v };
    }

    await fetch(url, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fields }),
    });
  } catch {
    // Ignore background network sync errors
  }
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ collection: string }> }
) {
  try {
    const { collection } = await params;
    const data = readCollection(collection);
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ collection: string }> }
) {
  try {
    const { collection } = await params;
    const body = await request.json();

    const existing = readCollection(collection);
    const newDoc = {
      ...body,
      id: body.id || Date.now(),
      created_at: body.created_at || new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    const updated = [newDoc, ...existing];
    writeCollection(collection, updated);

    return NextResponse.json(newDoc, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ collection: string }> }
) {
  try {
    const { collection } = await params;
    const body = await request.json();

    if (!body.id) {
      return NextResponse.json({ error: "Missing document id" }, { status: 400 });
    }

    const existing = readCollection(collection);
    let found = false;
    const updated = existing.map((item) => {
      if (String(item.id) === String(body.id)) {
        found = true;
        return {
          ...item,
          ...body,
          updated_at: new Date().toISOString(),
        };
      }
      return item;
    });

    if (!found) {
      updated.unshift({
        ...body,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      });
    }

    writeCollection(collection, updated);
    return NextResponse.json({ success: true, item: body });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ collection: string }> }
) {
  try {
    const { collection } = await params;
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Missing document id parameter" }, { status: 400 });
    }

    const existing = readCollection(collection);
    const filtered = existing.filter((item) => String(item.id) !== String(id));

    writeCollection(collection, filtered);
    return NextResponse.json({ success: true, deletedId: id });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
