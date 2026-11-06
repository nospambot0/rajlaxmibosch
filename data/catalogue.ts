export type CatalogueProduct = {
  id: string;
  name: string;
  model: string;
  category: string;
  categoryLabel: string;
  series: string;
  summary: string;
  image: string;
  imageAlt: string;
  officialUrl: string;
  highlights: string[];
  specs: { label: string; value: string }[];
  source: string;
  sourceChecked: string;\n  documentsUrl: string;\n  retailer: { mrp: number | null; offerPrice: number | null; availability: "enquiry" | "in-stock" | "out-of-stock" };
};

export const catalogueProducts: CatalogueProduct[] = [
  {
    id: "wga254irin",
    name: "Series 6 front-loading washing machine 10 kg",
    model: "WGA254IRIN",
    category: "Washing machines",
    categoryLabel: "Laundry",
    series: "Series 6",
    summary: "10 kg front-loading washing machine with a 1400 rpm maximum spin speed and Reload function.",
    image: "https://media3.bsh-group.com/Product_Shots/5120x/27207068_WGA254IRIN_STP_def.webp",
    imageAlt: "Bosch Series 6 WGA254IRIN front-loading washing machine in cast iron grey",
    officialUrl: "https://www.bosch-home.in/en/product/washer-dryer/washing-machines/front-loading-washing-machines/WGA254IRIN",
    highlights: ["10 kg capacity", "1400 rpm spin speed", "Reload function", "Made in India"],
    specs: [
      { label: "Capacity", value: "10 kg" },
      { label: "Maximum spin speed", value: "1400 rpm" },
      { label: "Dimensions (H × W × D)", value: "848 × 598 × 590 mm" },
      { label: "Drum volume", value: "60 litres" },
      { label: "Home Connect", value: "No" },
      { label: "Finish", value: "Cast iron grey" }
    ],
    source: "Bosch Home Appliances India product page",
    sourceChecked: "2026-11-06",\n    documentsUrl: "https://www.bosch-home.in/service/get-support/manual-search",\n    retailer: { mrp: null, offerPrice: null, availability: "enquiry" }
  },
  {
    id: "sms6iki01i",
    name: "Series 6 freestanding dishwasher 60 cm",
    model: "SMS6IKI01I",
    category: "Dishwashers",
    categoryLabel: "Kitchen",
    series: "Series 6",
    summary: "60 cm freestanding dishwasher with 14 place settings, six programmes and Home Connect.",
    image: "https://media3.bsh-group.com/Product_Shots/5120x/23283772_SMS6IKI01I_STP_def.webp",
    imageAlt: "Bosch Series 6 SMS6IKI01I freestanding dishwasher in brushed steel anti-fingerprint finish",
    officialUrl: "https://www.bosch-home.in/en/product/dishwashers/free-standing-dishwashers/free-standing-dishwashers-with-60cm-width/SMS6IKI01I",
    highlights: ["14 place settings", "6 programmes", "9.5 litre water use", "Home Connect"],
    specs: [
      { label: "Installation", value: "Freestanding, built-under possibility" },
      { label: "Place settings", value: "14" },
      { label: "Programmes", value: "6" },
      { label: "Water consumption", value: "9.5 litres" },
      { label: "Dimensions (H × W × D)", value: "845 × 600 × 600 mm" },
      { label: "Home Connect", value: "Yes" },
      { label: "Finish", value: "Brushed steel anti-fingerprint" }
    ],
    source: "Bosch Home Appliances India product page",
    sourceChecked: "2026-11-06",\n    documentsUrl: "https://www.bosch-home.in/service/get-support/manual-search",\n    retailer: { mrp: null, offerPrice: null, availability: "enquiry" }
  },
  {
    id: "ctc39l01pi",
    name: "Series 4 top-freezer fridge-freezer",
    model: "CTC39L01PI",
    category: "Refrigerators",
    categoryLabel: "Cooling",
    series: "Series 4",
    summary: "Freestanding top-freezer fridge-freezer with Total No Frost, VitaFresh and VarioInverter compressor.",
    image: "https://media3.bsh-group.com/Product_Shots/5120x/28043077_CTC39L01PI_STP_def.webp",
    imageAlt: "Bosch Series 4 CTC39L01PI top-freezer fridge-freezer",
    officialUrl: "https://www.bosch-home.in/en/product/fridges-freezers/fridgefreezers/free-standing-top-freezers/CTC39L01PI",
    highlights: ["Total No Frost", "VitaFresh freshness system", "VarioInverter compressor", "Made in India"],
    specs: [
      { label: "Type", value: "Freestanding top-freezer fridge-freezer" },
      { label: "Dimensions (H × W)", value: "187 × 67 cm" },
      { label: "Freshness system", value: "VitaFresh" },
      { label: "Cooling highlights", value: "Total No Frost, Multi Airflow" },
      { label: "Compressor", value: "VarioInverter" },
      { label: "Finish", value: "Dark grey metallic" }
    ],
    source: "Bosch Home Appliances India product page",
    sourceChecked: "2026-11-06",\n    documentsUrl: "https://www.bosch-home.in/service/get-support/manual-search",\n    retailer: { mrp: null, offerPrice: null, availability: "enquiry" }
  },

  {
    id: "wga254zpin",
    name: "Series 6 washing machine, front loader 10 kg",
    model: "WGA254ZPIN",
    category: "Washing machines",
    categoryLabel: "Laundry",
    series: "Series 6",
    summary: "10 kg front-loading washing machine with a 1400 rpm maximum spin speed, Anti Stain and Iron Steam Assist.",
    image: "https://media3.bsh-group.com/Product_Shots/5120x/25796548_WGA254ZPIN_STP_def.webp",
    imageAlt: "Bosch Series 6 WGA254ZPIN front-loading washing machine",
    officialUrl: "https://www.bosch-home.in/en/product/washer-dryer/washing-machines/front-loading-washing-machines/WGA254ZPIN",
    highlights: ["10 kg capacity", "1400 rpm spin speed", "Anti Stain", "Iron Steam Assist"],
    specs: [
      { label: "Capacity", value: "10 kg" },
      { label: "Maximum spin speed", value: "1400 rpm" },
      { label: "Dimensions (H × W × D)", value: "848 × 598 × 590 mm" },
      { label: "Home Connect", value: "No" },
      { label: "Colour", value: "Dark lake" }
    ],
    source: "Bosch Home Appliances India product page",
    sourceChecked: "2026-11-06",\n    documentsUrl: "https://www.bosch-home.in/service/get-support/manual-search",\n    retailer: { mrp: null, offerPrice: null, availability: "enquiry" }
  },
  {
    id: "sms46ki03i",
    name: "Series 4 free-standing dishwasher 60 cm",
    model: "SMS46KI03I",
    category: "Dishwashers",
    categoryLabel: "Kitchen",
    series: "Series 4",
    summary: "Freestanding 60 cm dishwasher in brushed steel anti-fingerprint finish, with 15 place settings and six programmes.",
    image: "https://media3.bsh-group.com/Product_Shots/5120x/MCSA02916482_J1044_2247725_SMS46KI03I_CMYK_def.webp",
    imageAlt: "Bosch Series 4 SMS46KI03I freestanding dishwasher",
    officialUrl: "https://www.bosch-home.in/en/product/dishwashers/free-standing-dishwashers/free-standing-dishwashers-with-60cm-width/SMS46KI03I",
    highlights: ["15 place settings", "6 programmes", "9.5 litre water use", "VarioFlex baskets"],
    specs: [
      { label: "Type", value: "Freestanding" },
      { label: "Place settings", value: "15" },
      { label: "Programmes", value: "6" },
      { label: "Water consumption", value: "9.5 litres" },
      { label: "Dimensions (H × W × D)", value: "845 × 600 × 600 mm" },
      { label: "Finish", value: "Brushed steel anti-fingerprint" }
    ],
    source: "Bosch Home Appliances India product page",
    sourceChecked: "2026-11-06",\n    documentsUrl: "https://www.bosch-home.in/service/get-support/manual-search",\n    retailer: { mrp: null, offerPrice: null, availability: "enquiry" }
  },
  {
    id: "ctc39k22ai",
    name: "Series 4 fridge-freezer with top freezer",
    model: "CTC39K22AI",
    category: "Refrigerators",
    categoryLabel: "Cooling",
    series: "Series 4",
    summary: "Freestanding top-freezer fridge-freezer in dark grey metallic finish, with Total No Frost.",
    image: "https://media3.bsh-group.com/Product_Shots/5120x/28779808_CTC39K22AI_STP_def.webp",
    imageAlt: "Bosch Series 4 CTC39K22AI dark grey fridge-freezer",
    officialUrl: "https://www.bosch-home.in/en/product/fridges-freezers/fridgefreezers/free-standing-top-freezers/CTC39K22AI",
    highlights: ["Total No Frost", "Top freezer design", "Dark grey metallic", "Made in India"],
    specs: [
      { label: "Type", value: "Freestanding top-freezer fridge-freezer" },
      { label: "Dimensions (H × W)", value: "187 × 67 cm" },
      { label: "Cooling", value: "Total No Frost" },
      { label: "Finish", value: "Dark grey metallic" },
      { label: "Origin", value: "Made in India" }
    ],
    source: "Bosch Home Appliances India product page",
    sourceChecked: "2026-11-06",\n    documentsUrl: "https://www.bosch-home.in/service/get-support/manual-search",\n    retailer: { mrp: null, offerPrice: null, availability: "enquiry" }
  },
  {
    id: "hjg852ygoi",
    name: "Series 6 built-in oven 60 × 60 cm",
    model: "HJG852YG0I",
    category: "Ovens & cooking",
    categoryLabel: "Cooking",
    series: "Series 6",
    summary: "Built-in oven with AirFry function, 3D Hotair, eight heating modes and a 76 litre cavity.",
    image: "https://media3.bsh-group.com/Product_Shots/5120x/25497376_HJG852YG0I_STP_def.webp",
    imageAlt: "Bosch Series 6 HJG852YG0I built-in oven",
    officialUrl: "https://www.bosch-home.in/en/product/cooking-baking/built-in-ovens/built-in-oven/HJG852YG0I",
    highlights: ["76 litre cavity", "8 heating modes", "AirFry function", "3D Hotair"],
    specs: [
      { label: "Cavity volume", value: "76 litres" },
      { label: "Heating modes", value: "8" },
      { label: "Temperature range", value: "30–275 °C" },
      { label: "Dimensions (H × W × D)", value: "595 × 594 × 548 mm" },
      { label: "Connection rating", value: "3600 W" }
    ],
    source: "Bosch Home Appliances India product page",
    sourceChecked: "2026-11-06",\n    documentsUrl: "https://www.bosch-home.in/service/get-support/manual-search",\n    retailer: { mrp: null, offerPrice: null, availability: "enquiry" }
  },
  {
    id: "bcs71petin",
    name: "Unlimited 7 ProAnimal cordless vacuum cleaner",
    model: "BCS71PETIN",
    category: "Vacuum cleaners",
    categoryLabel: "Floor care",
    series: "Unlimited 7",
    summary: "Cordless ProAnimal vacuum cleaner with a bendable Flex Tube, Quick Stand and exchangeable battery.",
    image: "https://media3.bsh-group.com/Product_Shots/5120x/22966880__BCS71PETIN_def.webp",
    imageAlt: "Bosch Unlimited 7 ProAnimal BCS71PETIN cordless vacuum cleaner",
    officialUrl: "https://www.bosch-home.in/en/product/vacuumcleaners/rechargeablefloorvacuumcleaners/unlimited/unlimited-7/BCS71PETIN",
    highlights: ["ProAnimal model", "Bendable Flex Tube", "Quick Stand", "Exchangeable 3.0 Ah battery"],
    specs: [
      { label: "Product type", value: "Cordless vacuum cleaner" },
      { label: "Range", value: "Unlimited 7" },
      { label: "Special feature", value: "ProAnimal" },
      { label: "Battery", value: "Exchangeable 3.0 Ah" }
    ],
    source: "Bosch Home Appliances India product page",
    sourceChecked: "2026-11-06",\n    documentsUrl: "https://www.bosch-home.in/service/get-support/manual-search",\n    retailer: { mrp: null, offerPrice: null, availability: "enquiry" }
  }
];

export const catalogueCategories = [
  "All products",
  "Washing machines",
  "Washer dryers",
  "Refrigerators",
  "Dishwashers",
  "Ovens & cooking",
  "Hobs & chimneys",
  "Mixer grinders",
  "Food processors",
  "Coffee machines",
  "Vacuum cleaners"
];

export const officialCategorySources = [
  { name: "Washing machines", count: 157, url: "https://www.bosch-home.in/en/category/washer-dryer/washing-machines" },
  { name: "Dishwashers", count: 30, url: "https://www.bosch-home.in/en/category/dishwashers" },
  { name: "Refrigerators", count: 139, url: "https://www.bosch-home.in/en/category/fridges-freezers" },
  { name: "Cooking & baking", count: 141, url: "https://www.bosch-home.in/en/category/cooking-baking" },
  { name: "Mixer grinders", count: 47, url: "https://www.bosch-home.in/en/category/mixer-grinders" },
  { name: "Coffee machines", count: 3, url: "https://www.bosch-home.in/en/category/filter-coffee-makers" },
  { name: "Vacuum cleaners", count: 2, url: "https://www.bosch-home.in/en/category/vacuumcleaners" }
];
