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
};

export const catalogueProducts: CatalogueProduct[] = [
  {
    id: "wga254irin",
    name: "Series 6 washing machine, front loader 10 kg",
    model: "WGA254IRIN",
    category: "Washing machines",
    categoryLabel: "Laundry",
    series: "Series 6",
    summary: "Front-loading washing machine in cast iron grey, with a 10 kg capacity and 1400 rpm maximum spin speed.",
    image: "https://media3.bsh-group.com/Product_Shots/5120x/27207068_WGA254IRIN_STP_def.webp",
    imageAlt: "Bosch Series 6 WGA254IRIN front-loading washing machine",
    officialUrl: "https://www.bosch-home.in/en/product/washer-dryer/washing-machines/front-loading-washing-machines/WGA254IRIN",
    highlights: ["10 kg loading capacity", "1400 rpm maximum spin speed", "Reload function", "SilentPowerDrive"],
    specs: [
      { label: "Capacity", value: "10 kg" },
      { label: "Maximum spin speed", value: "1400 rpm" },
      { label: "Dimensions (H × W × D)", value: "848 × 598 × 590 mm" },
      { label: "Colour", value: "Cast iron grey" }
    ],
    source: "Bosch Home Appliances India product page"
  },
  {
    id: "sms6hmi01i",
    name: "Series 6 free-standing dishwasher 60 cm",
    model: "SMS6HMI01I",
    category: "Dishwashers",
    categoryLabel: "Kitchen",
    series: "Series 6",
    summary: "Freestanding dishwasher in brushed steel anti-fingerprint finish, with space for up to 15 place settings.",
    image: "https://media3.bsh-group.com/Product_Shots/5120x/23349765_SMS6HMI01I_STP_def.webp",
    imageAlt: "Bosch Series 6 SMS6HMI01I freestanding dishwasher",
    officialUrl: "https://www.bosch-home.in/en/product/dishwashers/free-standing-dishwashers/free-standing-dishwashers-with-60cm-width/SMS6HMI01I",
    highlights: ["15 place settings", "6 programmes", "Home Connect", "9 litre water consumption"],
    specs: [
      { label: "Type", value: "Freestanding" },
      { label: "Place settings", value: "15" },
      { label: "Programmes", value: "6" },
      { label: "Dimensions (H × W × D)", value: "845 × 600 × 600 mm" },
      { label: "Finish", value: "Brushed steel anti-fingerprint" }
    ],
    source: "Bosch Home Appliances India product page"
  },
  {
    id: "kgn56lb42i",
    name: "Series 6 fridge-freezer with bottom freezer",
    model: "KGN56LB42I",
    category: "Refrigerators",
    categoryLabel: "Cooling",
    series: "Series 6",
    summary: "A 508 litre fridge-freezer with glass door, Total No Frost and VitaFresh freshness technology.",
    image: "https://media3.bsh-group.com/Product_Shots/5120x/20834985_KGN56LB42I_STP_def.webp",
    imageAlt: "Bosch Series 6 KGN56LB42I glass-door fridge-freezer",
    officialUrl: "https://www.bosch-home.in/en/product/fridges-freezers/fridgefreezers/free-standing-bottom-freezer/KGN56LB42I",
    highlights: ["508 litre net capacity", "Total No Frost", "VitaFresh", "Home Connect"],
    specs: [
      { label: "Total net capacity", value: "508 litres" },
      { label: "Dimensions (H × W × D)", value: "1930 × 700 × 800 mm" },
      { label: "Energy stars (India)", value: "2" },
      { label: "Freshness system", value: "VitaFresh" },
      { label: "Connectivity", value: "Home Connect" }
    ],
    source: "Bosch Home Appliances India product page"
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
