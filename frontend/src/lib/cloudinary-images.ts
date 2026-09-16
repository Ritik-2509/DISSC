import platformImagesMap from './cloudinary_platform_images.json';

type PlatformImageMapType = Record<
  string,
  {
    secure_url: string;
    public_id: string;
    width: number;
    height: number;
    format: string;
    bytes: number;
    highQualityUrl: string;
  }
>;

const imagesData: PlatformImageMapType = platformImagesMap as PlatformImageMapType;

/**
 * Returns the highest quality Cloudinary CDN URL for a given local platform image path.
 * If not uploaded yet or not found, falls back gracefully to the original local path.
 */
export function getCloudinaryUrl(
  localPath: string,
  options?: {
    quality?: 'best' | 'good' | 'auto' | number;
    width?: number;
    height?: number;
    crop?: 'fill' | 'fit' | 'limit';
  }
): string {
  const entry = imagesData[localPath];
  if (!entry) {
    return localPath;
  }

  // Base highest quality master image
  let url = entry.secure_url;

  if (options) {
    const transforms: string[] = ['f_auto'];
    if (options.quality === 'best') {
      transforms.push('q_auto:best');
    } else if (typeof options.quality === 'number') {
      transforms.push(`q_${options.quality}`);
    } else {
      transforms.push('q_auto:best');
    }

    if (options.width) transforms.push(`w_${options.width}`);
    if (options.height) transforms.push(`h_${options.height}`);
    if (options.crop) transforms.push(`c_${options.crop}`);

    const transformStr = transforms.join(',');
    url = url.replace('/upload/', `/upload/${transformStr}/`);
  }

  return url;
}

// Master Highest Quality Platform Image URLs hosted on Cloudinary
export const CLOUDINARY_IMAGES = {
  logo: getCloudinaryUrl('/images/discc/logo.png'),
  heroChildren: getCloudinaryUrl('/images/discc/hero-children.png'),
  roleModelAward: getCloudinaryUrl('/images/discc/role-model-award.png'),
  awardCeremony: getCloudinaryUrl('/images/discc/award-ceremony.png'),
  drTulsiPortrait: getCloudinaryUrl('/images/discc/dr-tulsi-portrait.jpg'),
  drTulsiClinic: getCloudinaryUrl('/images/discc/dr-tulsi-clinic.png'),
  foundersMeet: getCloudinaryUrl('/images/discc/founders-meet.jpg'),
  devaBuilding: getCloudinaryUrl('/images/discc/deva-building.jpg'),
  communityProgram: getCloudinaryUrl('/images/discc/community-program.png'),
  childrenTherapy: getCloudinaryUrl('/images/discc/children-therapy.jpg'),
  childrenActivity: getCloudinaryUrl('/images/discc/children-activity.png'),
  pressCoverage: getCloudinaryUrl('/images/discc/press-coverage.png'),
  education: getCloudinaryUrl('/images/education.jpg'),
  varanasiGhats: getCloudinaryUrl('/images/varanasi_ghats.jpg'),

  // Galleries (Selected highlights)
  purpleFair: getCloudinaryUrl('/images/discc/gallery/purple-fair-2026.jpg'),
  ramayanPlay: getCloudinaryUrl('/images/discc/gallery/ramayan-play.jpg'),
  magicShow: getCloudinaryUrl('/images/discc/gallery/magic-show.jpg'),
  republicDay: getCloudinaryUrl('/images/discc/gallery/republic-day.jpg'),
  yogaDay: getCloudinaryUrl('/images/discc/gallery/yoga-day.jpg'),
  basantPanchami: getCloudinaryUrl('/images/discc/gallery/basant-panchami.jpg'),
  disabilityDay: getCloudinaryUrl('/images/discc/gallery/disability-day.jpg'),

  // Partners
  partners: {
    nationalTrust: getCloudinaryUrl('/images/discc/partners/national-trust.jpg'),
    oshkoshUniversity: getCloudinaryUrl('/images/discc/partners/oshkosh-university.jpg'),
    devaEurope: getCloudinaryUrl('/images/discc/partners/deva-europe.jpg'),
    accgp: getCloudinaryUrl('/images/discc/partners/accgp.jpg'),
    changemakers: getCloudinaryUrl('/images/discc/partners/changemakers.jpg'),
    kotakBank: getCloudinaryUrl('/images/discc/partners/kotak-bank.jpg'),
    annapurnaCenter: getCloudinaryUrl('/images/discc/partners/annapurna-center.jpg'),
    nhps: getCloudinaryUrl('/images/discc/partners/nhps.jpg'),
  }
};
