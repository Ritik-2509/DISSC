export interface ProgramPillar {
  number: string;
  title: string;
  description: string;
}

export interface ProgramStatSummary {
  val: string;
  label: string;
}

export interface ProgramItemData {
  slug: string;
  title: string;
  shortDescription: string;
  cardTheme: "cream" | "dark";
  statMetric: string;
  coverImage: string;
  categoryEyebrow: string;
  editorialHeadline: string;
  editorialSubhead: string;
  editorialParagraphs: string[];
  featuredImage: string;
  pullQuote: string;
  pullQuoteSub: string;
  pillars: ProgramPillar[];
  centerImage: string;
  gallery: Array<{ src: string; caption: string }>;
  statsSummary: ProgramStatSummary[];
  tags: string[];
}

export const ALL_PROGRAMS_DATA: ProgramItemData[] = [
  {
    slug: "gangotri-centre",
    title: "Gangotri Centre",
    shortDescription:
      "Holistic residential sanctuary providing aquatic hydrotherapy, sensory gardens, and vocational life-skills for individuals with severe intellectual disabilities.",
    cardTheme: "cream",
    statMetric: "4,500+ BENEFICIARIES REHABILITATED",
    coverImage: "/images/programs/annapurna-cover.jpg",
    categoryEyebrow: "SENSORY & VOCATIONAL SANCTUARY",
    editorialHeadline: "Sanctuary when it matters most",
    editorialSubhead:
      "Providing specialized sensory rehabilitation, life-skills training, and safe shelter for vulnerable special-needs youth.",
    editorialParagraphs: [
      "Established to provide compassionate care and clinical guidance, Gangotri Centre serves as a premier therapeutic sanctuary for individuals with profound developmental and intellectual disabilities across Varanasi and adjoining districts.",
      "From structured sensory stimulation gardens and aquatic hydrotherapy to daily vocational craft-making, our multidisciplinary team empowers every resident with self-reliance, emotional security, and lifelong dignity."
    ],
    featuredImage: "/images/programs/annapurna-cover.jpg",
    pullQuote:
      "Carrying a footprint across 14 rural blocks, Gangotri Centre is a critical priority for communities facing displacement and disability distress.",
    pullQuoteSub:
      "Our responsiveness in adapting to unique family needs is unmatched. Emergency temporary housing, respite lodging, and barrier-free shelter modifications are core services we execute with tireless devotion.",
    pillars: [
      {
        number: "1",
        title: "Multi-Sensory Stimulation & Hydrotherapy",
        description:
          "Heated aquatic hydrotherapy pool and tactile gardens providing low-gravity neuromuscular relaxation and behavioral calming."
      },
      {
        number: "2",
        title: "Vocational Artisan & Life-Skills Training",
        description:
          "Handicraft fabrication, textile stitching, and independent living routines fostering long-term self-sufficiency."
      },
      {
        number: "3",
        title: "Residential Caregiver Respite & Shelter",
        description:
          "Safe overnight residential cottages giving exhausted mothers and primary caregivers essential rest and counseling."
      }
    ],
    centerImage: "/images/programs/rural-shelter-1.jpg",
    gallery: [
      {
        src: "/images/programs/annapurna-cover.jpg",
        caption: "Safe shelter and daily vocational training at Gangotri Centre."
      },
      {
        src: "/images/programs/rural-shelter-1.jpg",
        caption: "Community outreach and family shelter inspection in rural Varanasi."
      },
      {
        src: "/images/programs/rural-shelter-2.jpg",
        caption: "Protective environment supporting rural children through seasonal hardship."
      },
      {
        src: "/images/discc/hero-children.png",
        caption: "Joyful smiles restored inside our community care sanctuary."
      }
    ],
    statsSummary: [
      { val: "100%", label: "Free Lodging" },
      { val: "4,500+", label: "Youth Supported" },
      { val: "All 21", label: "RPwD Categories" }
    ],
    tags: ["Aquatic Pool", "Handicraft Sewing", "Overnight Respite"]
  },
  {
    slug: "ambedkar-school",
    title: "Ambedkar School",
    shortDescription:
      "Bridging the educational divide through individualized education plans (IEPs), adaptive assistive toolkits, and transition support into mainstream classrooms.",
    cardTheme: "dark",
    statMetric: "3,200+ STUDENTS EMPOWERED",
    coverImage: "/images/education.jpg",
    categoryEyebrow: "INCLUSIVE EDUCATION & TRANSITION",
    editorialHeadline: "Learning when it matters most",
    editorialSubhead:
      "Preparing neurodivergent children for formal school integration through adaptive learning toolkits and empathetic educator guidance.",
    editorialParagraphs: [
      "Ambedkar School was established with a singular mission: ensuring no child is excluded from the joy of education due to cognitive challenges, mobility limitations, or socio-economic distress.",
      "Through one-on-one special educator instruction, digital assistive tablets, and tactile communication aids, we prepare every child for successful inclusion into formal educational systems and confident social participation."
    ],
    featuredImage: "/images/education.jpg",
    pullQuote:
      "Achieving an 84% successful transition rate into regular formal schools for children receiving our early IEP support.",
    pullQuoteSub:
      "Education is the ultimate equalizer. We ensure that lack of fees, transport, or assistive gear never prevents a determined child from sitting in a classroom.",
    pillars: [
      {
        number: "1",
        title: "Individualized Education Plans (IEPs)",
        description:
          "Bespoke curriculum pacing designed around each child's cognitive strengths and developmental milestones."
      },
      {
        number: "2",
        title: "Assistive Toolkits & Digital Tech",
        description:
          "Distribution of tactile learning boards, large-print books, hearing aids, and educational tablets."
      },
      {
        number: "3",
        title: "Mainstream School Transition & Advocacy",
        description:
          "Sensitizing school boards, eliminating admission barriers, and ongoing educator mentorship."
      }
    ],
    centerImage: "/images/programs/education-1.jpg",
    gallery: [
      {
        src: "/images/education.jpg",
        caption: "Engaged students participating in interactive classroom learning."
      },
      {
        src: "/images/programs/education-1.jpg",
        caption: "One-on-one special educator instruction tailored to cognitive speed."
      },
      {
        src: "/images/programs/education-2.jpg",
        caption: "Hands-on creative art and cognitive skill development."
      },
      {
        src: "/images/discc/children-activity.png",
        caption: "Celebrating educational milestones with fellow classmates."
      }
    ],
    statsSummary: [
      { val: "84%", label: "Transition Rate" },
      { val: "3,200+", label: "Scholarships" },
      { val: "1:1", label: "Special Mentorship" }
    ],
    tags: ["Adaptive IEPs", "Digital Tablets", "Braille Toolkits"]
  },
  {
    slug: "nakuti-raghunath-school",
    title: "Nakuti Raghunath School",
    shortDescription:
      "Delivering foundational special education, doorstep transport vans, speech correction, and hot nutrition to rural children in underserved hamlets.",
    cardTheme: "dark",
    statMetric: "2,800+ RURAL SCHOLARSHIPS",
    coverImage: "/images/discc/children-activity.png",
    categoryEyebrow: "RURAL SPECIAL EDUCATION",
    editorialHeadline: "Opportunity when it matters most",
    editorialSubhead:
      "Delivering inclusive classrooms, daily nutrition, and foundational cognitive therapies to remote rural communities.",
    editorialParagraphs: [
      "Situated to serve remote rural hamlets, Nakuti Raghunath School eliminates the geographic barriers that prevent differently-abled children from receiving formal schooling and clinical rehabilitation.",
      "We provide free daily school bus transport, balanced hot nutritious meals, tailored speech-language therapy, and peer play sessions that nurture creativity and social confidence."
    ],
    featuredImage: "/images/discc/children-activity.png",
    pullQuote:
      "Eliminating the urban-rural divide by bringing accredited special educators directly to village doorsteps.",
    pullQuoteSub:
      "From daily balanced nutrition combating adolescent anemia to specialized speech correction, Nakuti Raghunath School is a beacon of hope for rural families.",
    pillars: [
      {
        number: "1",
        title: "Rural Classroom Inclusivity & Transport",
        description:
          "Safe doorstep transport vans bringing children from remote hamlets into barrier-free learning environments."
      },
      {
        number: "2",
        title: "Oral-Motor & Speech Therapy Integration",
        description:
          "Targeted oral-motor stimulation, augmentative communication systems, and functional vocabulary building."
      },
      {
        number: "3",
        title: "Hot Nutritional Meals & Regular Health Checkups",
        description:
          "Free daily nutritious lunches and regular pediatric medical camps ensuring continuous physical wellness."
      }
    ],
    centerImage: "/images/programs/education-2.jpg",
    gallery: [
      {
        src: "/images/discc/children-activity.png",
        caption: "Children joyfully participating in creative programs and classroom activities."
      },
      {
        src: "/images/programs/education-2.jpg",
        caption: "Hands-on creative art and cognitive skill development."
      },
      {
        src: "/images/discc/gallery/ramayan-play.jpg",
        caption: "Annual cultural dramas and theatrical performances by students."
      },
      {
        src: "/images/discc/gallery/magic-show.jpg",
        caption: "Recreational events bringing joy and social confidence to every child."
      }
    ],
    statsSummary: [
      { val: "14", label: "Villages Connected" },
      { val: "2,800+", label: "Rural Children" },
      { val: "Daily", label: "Hot Meals" }
    ],
    tags: ["Doorstep Vans", "Speech Therapy", "Nutrition Support"]
  },
  {
    slug: "navjeevan-clinic",
    title: "Navjeevan Clinic",
    shortDescription:
      "Pioneering pediatric neurodevelopmental diagnostics, sensory integration gym, and early clinical therapy for intellectual disabilities across Eastern UP.",
    cardTheme: "cream",
    statMetric: "12,000+ CLINICAL SESSIONS",
    coverImage: "/images/discc/deva-building.jpg",
    categoryEyebrow: "PEDIATRIC PSYCHOLOGY & DIAGNOSTICS",
    editorialHeadline: "Healing when it matters most",
    editorialSubhead:
      "Pioneering psychological diagnostics, pediatric rehabilitation, and sensory therapy for intellectual disabilities since 1991.",
    editorialParagraphs: [
      "Navjeevan Clinic is Eastern UP's clinical benchmark for early pediatric neurodevelopmental intervention, spearheaded by renowned clinical psychologist Dr. C. Tulsi Das.",
      "Combining standardized behavioral diagnostics with state-of-the-art sensory gym equipment, vestibular swings, and parent counseling, the clinic delivers evidence-based clinical therapy to over 150 children daily."
    ],
    featuredImage: "/images/discc/deva-building.jpg",
    pullQuote:
      "Eastern UP's pioneer institute delivering over 150 daily clinical therapy sessions with zero financial barrier for low-income parents.",
    pullQuoteSub:
      "Combining high clinical rigor with deep maternal empathy, our specialized clinical psychologists and occupational therapists craft individualized roadmaps for every single child.",
    pillars: [
      {
        number: "1",
        title: "Standardized Psychological Profiling",
        description:
          "Comprehensive cognitive assessment, Vineland social quotient profiling, and developmental behavioral diagnostics."
      },
      {
        number: "2",
        title: "Sensory Integration Gym",
        description:
          "Specialized suspended vestibular swings, tactile texture boards, and deep pressure calming equipment."
      },
      {
        number: "3",
        title: "Oral-Motor & Speech Therapy",
        description:
          "Targeted oral-motor stimulation, augmentative communication systems, and vocabulary building."
      }
    ],
    centerImage: "/images/discc/children-therapy.jpg",
    gallery: [
      {
        src: "/images/discc/deva-building.jpg",
        caption: "Navjeevan Clinic & DEVA Center headquarters facility in Kamachha, Varanasi."
      },
      {
        src: "/images/discc/children-therapy.jpg",
        caption: "Pediatric sensory motor therapy and vestibular stimulation."
      },
      {
        src: "/images/discc/dr-tulsi-clinic.png",
        caption: "Dr. C. Tulsi Das conducting one-on-one psychological evaluations."
      },
      {
        src: "/images/discc/award-ceremony.png",
        caption: "State recognition for clinical excellence in disability rehabilitation."
      }
    ],
    statsSummary: [
      { val: "150+", label: "Daily Clinical Sessions" },
      { val: "12,000+", label: "Diagnosed" },
      { val: "35+", label: "Years Experience" }
    ],
    tags: ["Vineland Profiling", "Sensory Gym", "Vestibular Swings"]
  }
];

export function getProgramBySlug(slug: string): ProgramItemData | undefined {
  return ALL_PROGRAMS_DATA.find((p) => p.slug === slug);
}
