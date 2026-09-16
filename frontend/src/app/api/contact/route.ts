import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, subject, content, message } = body;

    if (!name || (!email && !phone)) {
      return NextResponse.json(
        { error: "Name and at least one contact method (email or phone) are required." },
        { status: 400 }
      );
    }

    const inquiryData = {
      name: String(name).trim(),
      email: String(email || "").trim(),
      phone: String(phone || "").trim(),
      subject: String(subject || "Appointment & Information Request").trim(),
      content: String(content || message || subject || "Request for consultation and assistance").trim(),
      status: "unread",
      type: "appointment_inquiry",
      created_at: new Date().toISOString(),
      createdAt: new Date().toISOString(),
    };

    // 1. Immediately append to local JSON files so /admin/contact reflects instantly
    const newEntry = {
      id: Date.now(),
      ...inquiryData,
    };

    try {
      const exportPaths = [
        path.join(process.cwd(), "firestore_export", "contacts.json"),
        path.join(process.cwd(), "public", "firestore_export", "contacts.json"),
      ];

      for (const p of exportPaths) {
        if (fs.existsSync(p)) {
          const list = JSON.parse(fs.readFileSync(p, "utf8"));
          list.push(newEntry);
          fs.writeFileSync(p, JSON.stringify(list, null, 2));
        }
      }
    } catch (fileErr) {
      console.warn("Local file sync notice:", fileErr);
    }

    // 2. Background Firestore REST API write (zero Node SDK hanging)
    fetch("https://firestore.googleapis.com/v1/projects/dissc-60e94/databases/(default)/documents/contacts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fields: {
          name: { stringValue: inquiryData.name },
          email: { stringValue: inquiryData.email },
          phone: { stringValue: inquiryData.phone },
          subject: { stringValue: inquiryData.subject },
          content: { stringValue: inquiryData.content },
          status: { stringValue: "unread" },
          type: { stringValue: "appointment_inquiry" },
          created_at: { stringValue: inquiryData.created_at },
        },
      }),
    }).catch(() => {});

    return NextResponse.json({
      success: true,
      message: "Request has been sent successfully!",
      id: newEntry.id,
    });
  } catch (error: any) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to process appointment request" },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ status: "ok", endpoint: "/api/contact" });
}
