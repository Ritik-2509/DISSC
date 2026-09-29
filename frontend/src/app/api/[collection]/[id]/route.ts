import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

function getCollectionFilePath(collectionName: string) {
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
  const primaryPath = getCollectionFilePath(collectionName);
  const backupFilename = path.basename(primaryPath);
  const backupPath = path.join(process.cwd(), "firestore_export", backupFilename);

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
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ collection: string; id: string }> }
) {
  try {
    const { collection, id } = await params;
    const items = readCollection(collection);
    const found = items.find((item) => String(item.id) === String(id));

    if (found) {
      return NextResponse.json(found);
    }

    // Fallback: Check Firestore if environment allows, with a short 2s timeout
    try {
      const { db } = await import("@/lib/firebase-admin");
      const firestorePromise = db.collection(collection).doc(id).get();
      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error("Firestore timeout")), 2000)
      );
      const doc = (await Promise.race([firestorePromise, timeoutPromise])) as any;
      if (doc?.exists) {
        return NextResponse.json({ id: doc.id, ...doc.data() });
      }
    } catch {
      // Ignore fallback timeout/credentials error
    }

    return NextResponse.json({ error: "Document not found" }, { status: 404 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ collection: string; id: string }> }
) {
  try {
    const { collection, id } = await params;
    const body = await request.json();
    const items = readCollection(collection);
    
    let found = false;
    const updated = items.map((item) => {
      if (String(item.id) === String(id)) {
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
      return NextResponse.json({ error: "Document not found" }, { status: 404 });
    }

    writeCollection(collection, updated);
    return NextResponse.json({ success: true, id });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ collection: string; id: string }> }
) {
  try {
    const { collection, id } = await params;
    const items = readCollection(collection);
    const initialLen = items.length;
    const filtered = items.filter((item) => String(item.id) !== String(id));

    if (filtered.length === initialLen) {
      // Check if found in firestore
      try {
        const { db } = await import("@/lib/firebase-admin");
        await db.collection(collection).doc(id).delete();
        return NextResponse.json({ success: true, message: "Deleted from Firestore" });
      } catch {
        return NextResponse.json({ error: "Document not found" }, { status: 404 });
      }
    }

    writeCollection(collection, filtered);
    return NextResponse.json({ success: true, message: "Deleted successfully" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
