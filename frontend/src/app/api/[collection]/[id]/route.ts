import { NextResponse } from "next/server";
import { db } from "@/lib/firebase-admin";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ collection: string; id: string }> }
) {
  try {
    const { collection, id } = await params;
    const doc = await db.collection(collection).doc(id).get();
    
    if (!doc.exists) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    
    return NextResponse.json({ id: doc.id, ...doc.data() });
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
    await db.collection(collection).doc(id).delete();
    
    return NextResponse.json({ success: true, message: "Deleted successfully" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
