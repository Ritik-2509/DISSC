import gdown
import os
import time

drive_url = "https://drive.google.com/drive/folders/1TOM8sbBK_zeyrQP01yt7BwX42JJ4bJo7"
output_dir = os.path.abspath("frontend/public/drive_assets")
os.makedirs(output_dir, exist_ok=True)

print(f"Downloading from {drive_url} to {output_dir}")
for attempt in range(5):
    try:
        gdown.download_folder(drive_url, output=output_dir, quiet=False, use_cookies=False)
        print("Download completed successfully!")
        break
    except Exception as e:
        print(f"Attempt {attempt + 1} failed: {e}. Retrying in 3 seconds...")
        time.sleep(3)
