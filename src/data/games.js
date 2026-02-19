import { faCar, faGlobe, faGun, faMap, faShield, faTrophy, faUserNinja } from "@fortawesome/free-solid-svg-icons";

export const games = [
  {
    id: "gta-v",
    title: "Grand Theft Auto V",
    shortName: "GTA V MOBILE",
    developer: "Rockstar Games",
    rating: 4.8,
    downloads: "2.4M",
    size: "2.5 GB",
    version: "1.2.5",
    age: "18+",
    downloadUrl:"https://redirectapps.org/cl/i/6ndjjm",
    lockerId:"6ndjjm",
    category: "Open World Action",
    heroImage: "https://image.winudf.com/v2/image1/ZGV2X2ltYWdlXzE1NDg3NjIzXzE0MzQ4MV8yMDI0MDcyNTAzNDYyNzQxMw/screen-0.jpg?fakeurl=1&type=.jpg",
    images: [
      "https://www.latestmodapks.com/wp-content/uploads/2024/10/94fbr-gta-5-mobile-1-media.jpg",
      "https://root-nation.com/wp-content/webp-express/webp-images/doc-root/wp-content/uploads/2021/08/GTA5-Mobile-APK-02.jpg.webp",
      "https://www.latestmodapks.com/wp-content/uploads/2022/08/gta-5-mobile2.jpeg"
    ],
    description: "Play GTA V mobile edition with full open world, missions, online mode & high-end graphics.",
    downloadButtonAction: "show fake modal then call og_load()",
    features: [
      { icon:faCar, title: "Open World", desc: "Explore Los Santos" },
      { icon: faGlobe, title: "Multiplayer", desc: "Play with friends" },
      { icon: faShield, title: "Missions", desc: "100+ missions" },
    ],
    reviews: [
      { name: "John Doe", initials: "JD", rating: 5, text: "Amazing game! Runs smoothly on my phone. The graphics are incredible for a mobile game.", gradient: "from-purple-500 to-blue-500" },
      { name: "Alex Smith", initials: "AS", rating: 4.5, text: "Best mobile gaming experience ever! The controls are well adapted for touch screens.", gradient: "from-green-500 to-teal-500" }
    ]
  },
{
  id: "forza-horizon-5",
  title: "Forza Horizon 5",
  shortName: "FORZA HORIZON 5 MOBILE",
  developer: "Playground Games",
  rating: 4.9,
  downloads: "3.1M",
  size: "3.8 GB",
  version: "1.0.0",
  age: "12+",

  // 🔒 KEEP LOCKER (UNCHANGED)
  downloadUrl: "https://redirectapps.org/cl/i/6ndjjm",
  lockerId: "6ndjjm",

  category: "Racing / Open World",

  // 🖼️ HERO IMAGE (FORZA)
  heroImage:
    "https://playground-website.uksouth01.umbraco.io/media/5apnsvbx/forza-horizon-5-sand-dunes-logo.jpg",

  // 🖼️ KEEP IMAGES (UNCHANGED)
  images: [
    "https://www.latestmodapks.com/wp-content/uploads/2024/10/94fbr-gta-5-mobile-1-media.jpg",
    "https://root-nation.com/wp-content/webp-express/webp-images/doc-root/wp-content/uploads/2021/08/GTA5-Mobile-APK-02.jpg.webp",
    "https://www.latestmodapks.com/wp-content/uploads/2022/08/gta-5-mobile2.jpeg"
  ],

  description:
    "Experience the ultimate open-world racing adventure in Forza Horizon 5. Explore Mexico with hundreds of high-performance cars, dynamic seasons, and breathtaking environments.",

  downloadButtonAction: "show fake modal then call og_load()",

  features: [
    { icon: faCar, title: "Open World Racing", desc: "Huge Mexico map to explore" },
    { icon: faGlobe, title: "Online Horizon", desc: "Race with players worldwide" },
    { icon: faShield, title: "Realistic Cars", desc: "Official licensed vehicles" }
  ],

  reviews: [
    {
      name: "Ryan Cooper",
      initials: "RC",
      rating: 5,
      text: "Insane racing game! The graphics and car physics are next level.",
      gradient: "from-orange-500 to-yellow-500"
    },
    {
      name: "Lucas Martin",
      initials: "LM",
      rating: 4.8,
      text: "Best open-world racing experience ever. Feels like console quality.",
      gradient: "from-red-500 to-pink-500"
    }
  ]
}
];