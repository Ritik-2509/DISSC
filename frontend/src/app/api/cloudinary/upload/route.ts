import { NextRequest, NextResponse } from "next/server";
import { uploadImageBuffer, uploadImageUrl, isCloudinaryConfigured } from "@/lib/cloudinary";

export async function POST(req: NextRequest) {
  try {
    if (!isCloudinaryConfigured()) {
      return NextResponse.json(
        {
          success: false,
          error: "Cloudinary not configured",
          message: "Please configure CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET in .env.local.",
        },
        { status: 503 }
      );
    }

    const contentType = req.headers.get("content-type") || "";

    if (contentType.includes("multipart/form-data")) {
      const formData = await req.formData();
      const file = formData.get("file") as File | null;
      const folder = (formData.get("folder") as string) || "discc";

      if (!file) {
        return NextResponse.json({ success: false, error: "No file provided" }, { status: 400 });
      }

      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const cleanFileName = file.name.replace(/\.[^/.]+$/, "").replace(/[^a-zA-Z0-9_-]/g, "_");

      const result = await uploadImageBuffer(buffer, folder, cleanFileName + "_" + Date.now());

      return NextResponse.json({
        success: true,
        url: result.secure_url,
        public_id: result.public_id,
      });
    }

    // JSON payload
    const body = await req.json();
    if (body.url) {
      const folder = body.folder || "discc";
      const result = await uploadImageUrl(body.url, folder);
      return NextResponse.json({
        success: true,
        url: result.secure_url,
        public_id: result.public_id,
      });
    }

    return NextResponse.json(
      { success: false, error: "Invalid payload. Provide a file or image URL." },
      { status: 400 }
    );
  } catch (error: any) {
    console.error("Cloudinary upload failed:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Upload failed",
      },
      { status: 500 }
    );
  }
}
