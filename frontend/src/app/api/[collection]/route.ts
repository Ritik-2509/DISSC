import { NextResponse } from "next/server";
import { db } from "@/lib/firebase-admin";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ collection: string }> }
) {
  try {
    const { collection } = await params;
    
    // Some collections need special ordering, e.g., blogs by publishedAt
    let snapshot;
    if (collection === "blogs") {
      snapshot = await db.collection(collection).orderBy("publishedAt", "desc").get();
    } else if (collection === "contact") {
      snapshot = await db.collection(collection).orderBy("createdAt", "desc").get();
    } else {
      snapshot = await db.collection(collection).get();
    }

    const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
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
    
    const newDoc = {
      ...body,
      createdAt: new Date(),
    };
    
    const docRef = await db.collection(collection).add(newDoc);
    return NextResponse.json({ id: docRef.id, ...newDoc }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
