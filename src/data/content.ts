import type { ImageMetadata } from "astro";
import artTherapySourcebook from "../assets/images/art-therapy-sourcebook.png";
import community from "../assets/images/community.png";
import corridorArtOne from "../assets/images/corridor-art-one.png";
import corridorArtTwo from "../assets/images/corridor-art-two.png";
import corridorSafePlace from "../assets/images/corridor-safe-place.png";
import drawingCollage from "../assets/images/drawing-collage.png";
import emotionalColor from "../assets/images/emotional-color.png";
import fridaKahlo from "../assets/images/frida-kahlo.png";
import movementDrama from "../assets/images/movement-drama.png";
import musicSound from "../assets/images/music-sound.png";
import wileyHandbook from "../assets/images/wiley-handbook.jpg";
import yayoiKusama from "../assets/images/yayoi-kusama.png";

export type ActivityCategory =
  | "drawing-collage"
  | "music-sound"
  | "writing-poetry"
  | "movement-drama";

export interface Activity {
  slug: string;
  category: ActivityCategory;
  categoryLabel: string;
  title: string;
  summary: string;
  image: ImageMetadata;
  materials?: string;
  steps?: string[];
  detailSlug?: string;
  relatedSlugs?: string[];
}

export interface Resource {
  kind: "organization" | "artist" | "book";
  title: string;
  subtitle?: string;
  image: ImageMetadata;
  href?: string;
}

export interface CorridorEntry {
  kind: "image" | "quote";
  image?: ImageMetadata;
  quote?: string;
  attribution: string;
}

export const activities: Activity[] = [
  {
    slug: "draw-the-music",
    category: "drawing-collage",
    categoryLabel: "Drawing & Collage",
    title: "Draw the Music",
    summary:
      "Materials: a piece of paper, a box of pens, any instrumental music (instrumental music playlist)…",
    image: drawingCollage,
    materials:
      "Materials: a piece of paper, a box of pens, any instrumental music (instrumental music playlist)",
    steps: [
      "Listen to the music once to feel it.",
      "Listen to it a second time, drawing lines, shapes, etc., in sync with the rhythm.",
      "Based on your existing drawing, add elements to complete the picture, incorporating the feelings and scenes you imagine. Pair up and share your drawings with each other.",
    ],
    detailSlug: "/toolbox/draw-the-music",
    relatedSlugs: ["emotional-color-palette", "music-and-sound", "no-yes-but-yes-and"],
  },
  {
    slug: "music-and-sound",
    category: "music-sound",
    categoryLabel: "Music & Sound",
    title: "Draw the Music",
    summary:
      "Materials: a piece of paper, a box of pens, any instrumental music (instrumental music playlist)…",
    image: musicSound,
  },
  {
    slug: "emotional-color-palette",
    category: "writing-poetry",
    categoryLabel: "Writing & Poetry",
    title: "Emotional Color Palette",
    summary:
      "Play white noise, and focus on your current emotions. Imagine what color, shape, and texture this …",
    image: emotionalColor,
  },
  {
    slug: "no-yes-but-yes-and",
    category: "movement-drama",
    categoryLabel: "Movement & Drama",
    title: "No/Yes But/Yes And",
    summary:
      "Divide into three groups: A, B, and C. Each group will respond to the same question with No…",
    image: movementDrama,
  },
];

export const resources: Resource[] = [
  {
    kind: "organization",
    title: "The American Art Therapy Association (AATA) website",
    subtitle: "for facts and research\nhttps://arttherapy.org",
    image: community,
    href: "https://arttherapy.org",
  },
  {
    kind: "artist",
    title: "Oil paintings by Frida Kahlo",
    subtitle: "Artist known for her deeply personal paintings.",
    image: fridaKahlo,
  },
  {
    kind: "artist",
    title: "Oil paintings by Yayoi Kusama",
    subtitle: "Artist known for her immersive installations and dots.",
    image: yayoiKusama,
  },
  {
    kind: "book",
    title: "The Art Therapy Sourcebook",
    subtitle: "CATHY MALCHIODI",
    image: artTherapySourcebook,
  },
  {
    kind: "book",
    title: "The Wiley Handbook of Art Therapy",
    subtitle: "DAVID GUSSAK & MARCIA ROSAL",
    image: wileyHandbook,
  },
];

export const corridorEntries: CorridorEntry[] = [
  {
    kind: "quote",
    quote: '"Safety is the smell of rain on warm pavement."',
    attribution: "— ANONYMOUS",
  },
  { kind: "image", image: corridorArtOne, attribution: "— ANONYMOUS" },
  {
    kind: "quote",
    quote: '"A quiet room with a single candle."',
    attribution: "— ANONYMOUS",
  },
  { kind: "image", image: corridorArtTwo, attribution: "— ANONYMOUS" },
  { kind: "image", image: corridorSafePlace, attribution: "— ANONYMOUS" },
];
