import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export const isCloudinaryConfigured = (): boolean => {
  return Boolean(
    (process.env.CLOUDINARY_CLOUD_NAME || process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME) &&
    process.env.CLOUDINARY_API_KEY &&
    process.env.CLOUDINARY_API_SECRET
  );
};

export async function uploadImageBuffer(
  buffer: Buffer,
  folder: string = "discc",
  publicId?: string
): Promise<{ url: string; public_id: string; secure_url: string }> {
  if (!isCloudinaryConfigured()) {
    throw new Error("Cloudinary credentials are not configured in environment variables.");
  }

  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
        public_id: publicId,
        resource_type: "auto",
      },
      (error, result) => {
        if (error || !result) {
          reject(error || new Error("Failed to upload to Cloudinary"));
        } else {
          resolve({
            url: result.url,
            public_id: result.public_id,
            secure_url: result.secure_url,
          });
        }
      }
    );
    uploadStream.end(buffer);
  });
}

export async function uploadImageUrl(
  imageUrl: string,
  folder: string = "discc"
): Promise<{ url: string; public_id: string; secure_url: string }> {
  if (!isCloudinaryConfigured()) {
    throw new Error("Cloudinary credentials are not configured in environment variables.");
  }

  const result = await cloudinary.uploader.upload(imageUrl, {
    folder,
    resource_type: "auto",
  });

  return {
    url: result.url,
    public_id: result.public_id,
    secure_url: result.secure_url,
  };
}

export default cloudinary;
