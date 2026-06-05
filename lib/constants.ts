// ─── Trust Information ───────────────────────────────────────────────
export const TRUST = {
  name: "Unconditional Help Bhavnagar",
  tagline: "Secret For Better Life",
  shortName: "UH Bhavnagar",
  founded: "5 September 2018",
  founder: "Vivek Parmar",
  phone: "7878767727",
  whatsapp: "917878767727",
  email: "unconditionalhelp.c.t.5@gmail.com",
  location: "Bhavnagar, Gujarat, India",
  description:
    "Unconditional Help Bhavnagar is a charitable trust dedicated to serving humanity through food distribution, educational support, environmental protection, and animal welfare since 2018.",
} as const

// ─── Navigation ──────────────────────────────────────────────────────
export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  {
    label: "Our Work",
    items: [
      { label: "Activities", href: "/activities" },
      { label: "Events", href: "/events" },
      { label: "Impact", href: "/impact" },
      { label: "Gallery", href: "/gallery" },
    ],
  },
  { label: "Donate", href: "/donate" },
  { label: "Volunteer", href: "/volunteer" },
  { label: "Contact", href: "/contact" },
] as const

// ─── Social Media ────────────────────────────────────────────────────
export const SOCIAL_LINKS = [
  { label: "Instagram", href: "#", icon: "instagram" },
  { label: "Facebook", href: "#", icon: "facebook" },
  { label: "YouTube", href: "#", icon: "youtube" },
  { label: "Twitter", href: "#", icon: "twitter" },
] as const

// ─── Services ────────────────────────────────────────────────────────
export const SERVICES = [
  {
    title: "Free Food Distribution",
    description:
      "Providing nutritious meals to those in need across Bhavnagar.",
    icon: "food",
  },
  {
    title: "Educational Support",
    description: "Helping students with resources, books, and tuition fees.",
    icon: "education",
  },
  {
    title: "Clothes Distribution",
    description: "Supporting underprivileged families with essential clothing.",
    icon: "clothes",
  },
  {
    title: "Environmental Protection",
    description:
      "Tree plantation drives and environmental awareness campaigns.",
    icon: "environment",
  },
  {
    title: "Animal Welfare",
    description: "Food, rescue, and medical support for animals and birds.",
    icon: "animal",
  },
  {
    title: "Emergency Help",
    description: "Immediate humanitarian assistance during emergencies.",
    icon: "emergency",
  },
  {
    title: "Community Welfare",
    description:
      "Social development initiatives building stronger communities.",
    icon: "community",
  },
] as const

// ─── Impact Statistics ───────────────────────────────────────────────
export const IMPACT_STATS = [
  { label: "Meals Served", value: 10000, suffix: "+", icon: "meals" },
  { label: "Trees Planted", value: 5000, suffix: "+", icon: "trees" },
  { label: "Students Supported", value: 500, suffix: "+", icon: "students" },
  { label: "Families Helped", value: 2000, suffix: "+", icon: "families" },
  { label: "Animals Fed", value: 3000, suffix: "+", icon: "animals" },
  { label: "Volunteers", value: 200, suffix: "+", icon: "volunteers" },
] as const

// ─── How We Work Steps ───────────────────────────────────────────────
export const HOW_WE_WORK = [
  {
    step: 1,
    title: "You Donate",
    icon: "charity",
    description: "Choose a cause and contribute",
  },
  {
    step: 2,
    title: "We Allocate",
    icon: "clipboard",
    description: "Funds go directly to the cause",
  },
  {
    step: 3,
    title: "Direct Impact",
    icon: "heartHandshake",
    description: "Lives are changed immediately",
  },
  {
    step: 4,
    title: "You Get Updates",
    icon: "analytics",
    description: "Transparent progress reports",
  },
] as const
