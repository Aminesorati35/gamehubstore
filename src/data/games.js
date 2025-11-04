import { faCar, faGlobe, faShield } from "@fortawesome/free-solid-svg-icons";

export const games = [
  {
    id: "gta-v",
    title: "Grand Theft Auto V",
    shortName: "GTA V",
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
    id: "pubg-mobile",
    title: "PUBG Mobile",
    shortName: "PUBG Mobile",
    developer: "Activision",
    rating: 4.7,
    downloads: "5.2M",
    size: "1.8 GB",
    version: "2.1.0",
    age: "17+",
    downloadUrl:"https://redirectapps.org/cl/i/6ndjjm",
    lockerId:"d2vjkk",
    category: "First Person Shooter",
    heroImage: "https://cdn-www.bluestacks.com/bs-images/featured_com.tencent.ig.jpg",
    images: [
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=600&h=400&fit=crop"
    ],
    description: "Experience the thrill of tactical combat in fast-paced multiplayer battles.",
    downloadButtonAction: "show fake modal then call og_load()",
    features: [
      { icon: "🎯", title: "Multiplayer", desc: "Competitive modes" },
      { icon: "🏆", title: "Ranked", desc: "Climb the ladder" },
      { icon: "🔫", title: "Weapons", desc: "100+ arsenal" },
      { icon: "🗺️", title: "Maps", desc: "20+ battlegrounds" }
    ],
    reviews: [
      { name: "Mike Johnson", initials: "MJ", rating: 5, text: "Best FPS on mobile. Great optimization and gameplay.", gradient: "from-red-500 to-orange-500" },
      { name: "Sarah Lee", initials: "SL", rating: 4, text: "Fun game but needs better matchmaking.", gradient: "from-pink-500 to-purple-500" }
    ]
  },
  {
    id: "minecraft",
    title: "Minecraft",
    shortName: "Minecraft",
    developer: "Mojang Studios",
    rating: 4.9,
    downloads: "10M",
    size: "500 MB",
    version: "1.20.5",
    age: "7+",
    category: "Sandbox Adventure",
    heroImage: "https://app-enfant.fr/wp-content/uploads/minecraft-pocket-edition-android.jpg",
    images: [
      "https://images.unsplash.com/photo-1606167668584-78701c57f13d?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?w=600&h=400&fit=crop",
    ],
    description: "Build, explore and survive in this creative sandbox world with endless possibilities.",
    downloadButtonAction: "show fake modal then call og_load()",
    features: [
      { icon: "🏗️", title: "Creative", desc: "Build anything" },
      { icon: "⚔️", title: "Survival", desc: "Test your skills" },
      { icon: "🌍", title: "Infinite", desc: "Endless worlds" },
      { icon: "🔌", title: "Mods", desc: "Customize gameplay" }
    ],
    reviews: [
      { name: "Tom Builder", initials: "TB", rating: 5, text: "Perfect port! Works great on mobile with touch controls.", gradient: "from-green-600 to-emerald-600" },
      { name: "Emma Stone", initials: "ES", rating: 5, text: "My kids love it! Great for creativity.", gradient: "from-blue-400 to-cyan-400" }
    ]
  },
];