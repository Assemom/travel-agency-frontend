// destinations img
import cairoImage from "../assets/images/tower.jpg";
import gizaImage from "../assets/images/nileriver.jpg";
import luxorImage from "../assets/images/aswan.jpg";
import alexandriaImage from "../assets/images/alexandria.jpg";
import aswanImage from "../assets/images/aswantemple.jpg";
import sharmImage from "../assets/images/sharm.jpg";
import hurghadaImage from "../assets/images/dahab.jpg";
import siwaImage from "../assets/images/siwaoasis.jpg";
import PyramidsImg from "../assets/images/greatpyramid.jpg";
import WadiElRayanImg from "../assets/images/wadielrayan.jpg";


export const destinationsData = [
  {
    id: 0,
    name: "Cairo",
    tours: "10 tours and activities",
    image: cairoImage,
    link: "cairo-tours",
    shortDes: "",
  },
  {
    id: 1,
    name: "Giza",
    tours: "8 tours and activities",
    image: gizaImage,
    link: "giza-tours",
  },
  {
    id: 2,
    name: "Luxor",
    tours: "7 tours and activities",
    image: luxorImage,
    link: "luxor-tours",
  },
  {
    id: 3,
    name: "Aswan",
    tours: "5 tours and activities",
    image: aswanImage,
    link: "aswan-tours",
  },
  {
    id: 4,
    name: "Alexandria",
    tours: "6 tours and activities",
    image: alexandriaImage,
    link: "alexandria-tours",
  },
  {
    id: 5,
    name: "Sharm El Sheikh",
    tours: "9 tours and activities",
    image: sharmImage,
    link: "sharm-tours",
  },
  {
    id: 6,
    name: "Hurghada",
    tours: "8 tours and activities",
    image: hurghadaImage,
    link: "hurghada-tours",
  },
  {
    id: 7,
    name: "Siwa Oasis",
    tours: "4 tours and activities",
    image: siwaImage,
    link: "siwa-tours",
  },
];


export const popularsData = [
  {
    id: 0,
    title: "Explore the Pyramids of Giza",
    image: PyramidsImg,
    location: "Giza, Egypt",
    category: ["Escorted Tour", "River Cruise"],
    days: "1 day",
    price: 100,
    afterDiscount: 92,
    rating: 5,
    reviews: 25,
  },
  {
    id: 1,
    title: "Nile Cruise Adventure",
    image: aswanImage,
    location: "Aswan, Egypt",
    category: ["River Cruise"],
    days: "7 days - 6 nights",
    price: 1200,
    afterDiscount: 1100,
    rating: 4,
    reviews: 18,
  },
  {
    id: 2,
    title: "Historical Luxor Tour",
    image: PyramidsImg,
    location: "Luxor, Egypt",
    category: ["River Cruise"],
    days: "3 days - 2 nights",
    price: 450,
    afterDiscount: 420,
    rating: 4,
    reviews: 15,
  },
  {
    id: 3,
    title: "Mediterranean Alexandria",
    image: aswanImage,
    location: "Alexandria, Egypt",
    category: ["River Cruise"],
    days: "2 days - 1 night",
    price: 200,
    afterDiscount: 180,
    rating: 4,
    reviews: 12,
  },
  {
    id: 4,
    title: "Red Sea Retreat",
    image: sharmImage,
    location: "Sharm El Sheikh, Egypt",
    category: ["River Cruise"],
    days: "5 days - 4 nights",
    price: 800,
    afterDiscount: 750,
    rating: 5,
    reviews: 20,
  },
  {
    id: 5,
    title: "Dahab Desert Experience",
    image: sharmImage,
    location: "Dahab, Egypt",
    category: ["River Cruise"],
    days: "3 days - 2 nights",
    price: 300,
    afterDiscount: 280,
    rating: 4,
    reviews: 14,
  },
  {
    id: 6,
    title: "Siwa Oasis Journey",
    image: siwaImage,
    location: "Siwa Oasis, Egypt",
    category: ["River Cruise"],
    days: "4 days - 3 nights",
    price: 350,
    afterDiscount: 320,
    rating: 4,
    reviews: 10,
  },
  {
    id: 7,
    title: "Wadi El Rayan Expedition",
    image: WadiElRayanImg,
    location: "Fayoum, Egypt",
    category: ["River Cruise"],
    days: "2 days - 1 night",
    price: 150,
    afterDiscount: 135,
    rating: 4,
    reviews: 8,
  },
];

export const tourDetails = {
  title: "Majestic Egypt Adventure",
  des: `Egypt, the cradle of civilization, offers timeless wonders from pyramid complexes to Nile treasures. Walk in the footsteps of pharaohs and discover Luxor's royal tombs, Aswan's Nubian culture, and Cairo's vibrant bazaars. Our expertly crafted journey blends ancient marvels with modern comfort, creating unforgettable memories along the world's longest river. We combine historical immersion with practical experiences, ensuring you explore both iconic landmarks and hidden gems.`,
  price: "450.00",
  rating: "4.8",
  reviews: "400 reviews",
  tourInfo: [
    '<strong className="font-bold">Places Covered</strong>: Cairo - Luxor - Aswan',
    '<strong className="font-bold">Duration:</strong> 6 Days, 5 Nights',
    '<strong className="font-bold">Start Point:</strong> Cairo International Airport',
    '<strong className="font-bold">End Point:</strong> Cairo International Airport',
  ],

  highlights: [
    "Marvel at the Great Pyramids of Giza and Sphinx at sunrise",
    "Sail the Nile River on a traditional felucca cruise",
    "Explore the Valley of the Kings and Karnak Temple Complex",
    "Discover Nubian culture in Aswan's colorful villages",
  ],

  itinerary: [
    {
      title: `<span class="me-1 fw-bold">Day 1:</span> Cairo Arrival`,
      des: `Welcome to Egypt! Our representative will meet you at Cairo Airport and transfer you to your hotel. Enjoy free time to explore downtown Cairo or relax before your adventure begins.`,
    },
    {
      title: `<span class="me-1 fw-bold">Day 2:</span> Pyramids & Museum`,
      des: `Full-day tour of Giza Plateau's pyramids and Sphinx. Afternoon visit to Egyptian Museum's Tutankhamun collection. Evening sound-and-light show at pyramids.`,
    },
    {
      title: `<span class="me-1 fw-bold">Day 3:</span> Luxor Discovery`,
      des: `Fly to Luxor. Explore Karnak Temple's giant columns and afternoon visit to Valley of the Kings. Overnight stay at Luxor Nile-view hotel.`,
    },
    {
      title: `<span class="me-1 fw-bold">Day 4:</span> Nile Cruise`,
      des: `Morning sail to Aswan. Visit Kom Ombo Temple en route. Afternoon High Dam tour and Philae Temple visit by boat. Overnight on cruise ship.`,
    },
    {
      title: `<span class="me-1 fw-bold">Day 5:</span> Abu Simbel Excursion`,
      des: `Early visit to Abu Simbel's colossal temples. Return to Aswan for free time in Nubian village. Traditional Egyptian dinner experience.`,
    },
    {
      title: `<span class="me-1 fw-bold">Day 6:</span> Cairo Return`,
      des: `Fly back to Cairo. Final shopping at Khan El Khalili bazaar. Farewell felucca ride on Nile before airport transfer.`,
    },
  ],

  included: [
    "5-night accommodation in 4-star hotels & Nile cruise",
    "All domestic flights (Cairo-Luxor/Aswan-Cairo)",
    "Professional Egyptologist guide",
    "Daily breakfast & 3 gourmet dinners",
    "All entrance fees to historical sites",
    "Air-conditioned private transportation",
    "Nile felucca sailing experience",
  ],
  exclusion: [
    "International airfare",
    "Visa fees ($25 USD)",
    "Personal expenses & gratuities",
    "Lunch and alcoholic beverages",
    "Camera tickets at archaeological sites",
    "Optional hot air balloon ride over Luxor",
  ],

  images: [
    { original: PyramidsImg, thumbnail: PyramidsImg }, // Pyramids
    { original: aswanImage, thumbnail: aswanImage }, // Karnak Temple
    { original: cairoImage, thumbnail: cairoImage }, // Nile Cruise
    { original: luxorImage, thumbnail: luxorImage }, // Abu Simbel
    { original: WadiElRayanImg, thumbnail: WadiElRayanImg }, // Valley of Kings
    { original: PyramidsImg, thumbnail: PyramidsImg }, // Egyptian Museum
    { original: alexandriaImage, thumbnail: alexandriaImage }, // Khan El Khalili
    { original: sharmImage, thumbnail: sharmImage }, // Felucca Sail
  ],
};

export const location = [
  "Cairo",
  "Giza",
  "Luxor",
  "Aswan",
  "Alexandria",
  "Sharm El Sheikh",
  "Hurghada",
  "Dahab"
];

export const Categories = [
  "History",
  "Calture",
  "Netural",
  "Urban Tour",
  "Relax",
];

export const Duration = ["1-3 Days", "3-5 Days", "5-7 Days", "7-10 Day"];
export const PriceRange = [
  "$ 0 - $ 50",
  "$ 50 - $ 100",
  "$ 100 - $ 200",
  "$ 200 - $ 400",
  "$ 400 - $ 800",
];

export const Ratings = ["⭐", "⭐⭐", "⭐⭐⭐", "⭐⭐⭐⭐", "⭐⭐⭐⭐⭐"];
