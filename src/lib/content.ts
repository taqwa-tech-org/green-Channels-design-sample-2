/* All copy and data. Nothing here is a claim Green Channels has not confirmed.
   Text marked "indicative" is illustrative wording to be confirmed by Green Channels. */

export const site = {
  name: "Green Channels Ltd",
  url: "https://www.greenchannels.com",
  email: "alain@greenchannels.com",
  whatsapp: "+88 01713 031 742",
  phone: "+88 09642 602 444",
  address: ["Road 102, House 4, Apart H3", "Gulshan 2, Dhaka 1212", "Bangladesh"],
};

export const nav = [
  { href: "/company", label: "Company" },
  { href: "/products", label: "Products" },
  { href: "/services", label: "Services" },
  { href: "/quality", label: "Quality" },
  { href: "/sustainability", label: "Sustainability" },
  { href: "/contact", label: "Contact" },
];

export const heroSlides = [
  {
    image: "/images/hero-floor.jpg",
    title: ["Workwear,", "Corporate Wear", "& Uniforms"],
    tagline: "Professional clothing programmes, developed and sourced in Bangladesh.",
    position: "center 40%",
  },
  {
    image: "/images/hero-inspect.jpg",
    title: ["Your Team", "On the Ground", "In Bangladesh"],
    tagline: "We manage the process on the buyer's behalf, from product development to shipment.",
    position: "center 30%",
  },
  {
    image: "/images/hero-yarn.jpg",
    title: ["35+ Years", "Of Experience"],
    tagline: "A long-established network of partner factories, selected for each programme.",
    position: "center 45%",
  },
  {
    image: "/images/hero-port.jpg",
    title: ["From Concept", "To Shipment"],
    tagline: "Product development, sourcing, sampling, production follow-up and quality control.",
    position: "center 55%",
  },
];

export type ProductGroup = {
  slug: string;
  name: string;
  image: string;
  position?: string;
  garments: string[];
  summary: string; // indicative
  points: string[]; // indicative
};

export const productGroups: ProductGroup[] = [
  {
    slug: "work-jackets-vests",
    name: "Work Jackets & Vests",
    image: "/images/p-jackets.jpg",
    position: "center 40%",
    garments: ["Work jackets", "Work vests"],
    summary:
      "Outer layers built for daily wear across a multi-year programme, specified down to the closure, the pocket and the cuff.",
    points: ["Front closure and storm-flap options", "Bartacked pocket mouths and stress points", "Fabric and lining specified per programme", "Contrast trims and piping"],
  },
  {
    slug: "work-trousers-shorts",
    name: "Work Trousers & Shorts",
    image: "/images/p-trousers.jpg",
    position: "center 55%",
    garments: ["Work trousers", "Shorts"],
    summary:
      "The workhorse of a clothing programme: pocket layouts, knee construction and seams engineered for repeat orders.",
    points: ["Reinforced knee panels", "Triple-needle seams at stress points", "Cargo and utility pocket layouts", "Shared fabrics so trousers and shorts stay matched"],
  },
  {
    slug: "bib-brace-coveralls",
    name: "Bib & Brace · Coveralls",
    image: "/images/p-overalls.jpg",
    position: "center 35%",
    garments: ["Bib & brace", "Coveralls"],
    summary:
      "Full-cover garments where construction matters most: the fastenings, the gusset, the waist and the cuff all have to work together.",
    points: ["Adjustable braces and fastenings", "Full-length front zip on coveralls", "Reinforced gusset construction", "Size grids agreed at development"],
  },
  {
    slug: "polo-shirts",
    name: "Polo Shirts",
    image: "/images/p-polo.jpg",
    position: "center 38%",
    garments: ["Polo shirts"],
    summary:
      "The uniform staple for corporate wear: knit quality, collar shape and branding panels agreed before bulk.",
    points: ["Piqué and jersey knit options", "Rib collar and placket", "Embroidery-ready panels", "Shade-matched trims"],
  },
  {
    slug: "t-shirts-sweatshirts",
    name: "T-Shirts & Sweatshirts",
    image: "/images/p-tees.jpg",
    position: "center 50%",
    garments: ["T-shirts", "Sweatshirts"],
    summary:
      "Everyday knitwear for programmes at scale, with weight, neck finish and print areas specified once and repeated.",
    points: ["Jersey weights and blends", "Fleece and brushed-back options", "Rib cuffs, hem and neck finishes", "Print- and logo-ready panels"],
  },
];

export const services = [
  {
    n: "01",
    title: "Product Development",
    image: "/images/s-development.jpg",
    position: "center 30%",
    text: "From a concept, a reference garment or a tech pack to a specification a factory can price and build.",
  },
  {
    n: "02",
    title: "Fabric & Trim Sourcing",
    image: "/images/s-trims.jpg",
    position: "center 40%",
    text: "Fabrics, threads, zips and trims sourced and approved against the specification.",
  },
  {
    n: "03",
    title: "Sampling",
    image: "/images/s-sampling.jpg",
    position: "center 50%",
    text: "Prototype, fit and pre-production samples reviewed with you before bulk is committed.",
  },
  {
    n: "04",
    title: "Factory Selection",
    image: "/images/network.jpg",
    position: "center 50%",
    text: "The right partner factory chosen for the garment and the programme, from a long-established network.",
  },
  {
    n: "05",
    title: "Merchandising",
    image: "/images/cta.jpg",
    position: "center 50%",
    text: "Materials, timelines and approvals coordinated so the programme keeps to its schedule.",
  },
  {
    n: "06",
    title: "Production Follow-Up",
    image: "/images/s-followup.jpg",
    position: "center 35%",
    text: "Our team follows production on the ground and reports against the plan.",
  },
  {
    n: "07",
    title: "Quality Control",
    image: "/images/quality.jpg",
    position: "center 45%",
    text: "Inspection at defined stages, from fabric to final random inspection.",
  },
  {
    n: "08",
    title: "Shipment",
    image: "/images/hero-port.jpg",
    position: "center 55%",
    text: "Packing, documents and dispatch coordinated through to delivery.",
  },
];

export const qcStages = [
  { n: "01", title: "Pre-Production Review", text: "Before a single metre is cut, the specification, approved sample and bill of materials are reviewed together with the factory." },
  { n: "02", title: "Fabric Inspection", text: "Incoming fabric is checked for shade, weight and surface quality against the approved swatch." },
  { n: "03", title: "Initial Production Inspection", text: "The first garments off the line are inspected against the sample so problems surface early, not at the end." },
  { n: "04", title: "Inline Inspection", text: "During production, garments are inspected on the line for stitching, seams and workmanship." },
  { n: "05", title: "Measurement Control", text: "Finished garments are measured against the specification sheet across the agreed points of measure." },
  { n: "06", title: "Final Random Inspection", text: "A random sample is drawn from packed cartons and inspected before the goods leave the factory." },
  { n: "07", title: "Shipment Approval", text: "Inspection results are reviewed and shipment is approved, or held, before dispatch." },
];

/* Certifications Alain confirmed exist within the partner-factory network. */
export const certifications = ["amfori BSCI", "OEKO-TEX", "GOTS", "OCS", "GRS", "Fair Trade", "RCS"];

export const secondary = [
  {
    id: "fashion",
    title: "Fashion & Casualwear",
    image: "/images/fashion.jpg",
    position: "center 40%",
    text: "Alongside our workwear programmes, Green Channels sources fashion and casualwear for international buyers, using the same development, sourcing and quality process.",
  },
  {
    id: "home-textiles",
    title: "Home Textiles",
    image: "/images/home.jpg",
    position: "center 50%",
    text: "To a smaller extent, Green Channels also supports sourcing for home textiles, drawing on the same partner network and controls.",
  },
];

export const toValue = (n: string) => n.toLowerCase().replace(/[^a-z]+/g, "-").replace(/^-|-$/g, "");

export const rfqCategories = [
  ...productGroups.flatMap((g) => g.garments.map((n) => ({ value: toValue(n), label: n }))),
  { value: "fashion-casualwear", label: "Fashion & casualwear" },
  { value: "home-textiles", label: "Home textiles" },
  { value: "other", label: "Other" },
];
