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
  id: "valorant-mobile",
  title: "Valorant Mobile",
  shortName: "VALORANT MOBILE",
  developer: "Riot Games",
  rating: 4.9,
  downloads: "3.1M",
  size: "1.9 GB",
  version: "1.0.7",
  age: "16+",
  downloadUrl:"https://redirectapps.org/cl/i/d2vjkk",
  lockerId:"d2vjkk",
  category: "Tactical Shooter",
  heroImage: "https://fr.egamersworld.com/uploads/blog/1/17/1745326815830_1745326815830.webp",
  images: [
    "https://imag.malavida.com/mvimgbig/download-fs/valorant-mobile-40506-14.jpg",
    "https://img.utdstc.com/screen/f9a/289/f9a289d57443d9a6a85e03034f376d67fd76ece584421895f5aa5a3be04e57b4:600",
    "https://imag.malavida.com/mvimgbig/download-fs/valorant-mobile-40506-9.jpg"
  ],
  description: "Experience Valorant on mobile with precise gunplay, unique agents, tactical abilities, and high-end competitive gameplay.",
  downloadButtonAction: "show fake modal then call og_load()",
  features: [
    { icon: faGun, title: "Tactical Shooting", desc: "Precise competitive gameplay" },
    { icon: faUserNinja, title: "Agents", desc: "Play with 20+ unique agents" },
    { icon: faGlobe, title: "Multiplayer", desc: "5v5 online matches" },
  ],
  reviews: [
    { name: "Ethan Cruz", initials: "EC", rating: 5, text: "Valorant finally on mobile! Smooth graphics & amazing controls. Best tactical shooter mobile!!", gradient: "from-red-500 to-orange-500" },
    { name: "Maya Lee", initials: "ML", rating: 4.7, text: "Ability system and shooting feel great. Ranked mode is fire.", gradient: "from-pink-500 to-purple-500" }
  ]
}

];