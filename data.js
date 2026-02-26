// Dummy Data Generator for Manjung Food Map
const FOOD_CATEGORIES = ["Seafood", "Cafe", "Melayu", "Western", "Dessert"];
const REVIEWERS = ["Ahmad", "Siti", "Chong", "Muthu", "Sara", "Faizal", "Lina"];
const COMMENTS_GOOD = ["Sedap gila! Wajib cuba.", "Servis pantas, makanan panas-panas.", "Portion besar dan berbaloi dengan harga.", "View cantik, sesuai untuk ootd.", "Terbaik di Manjung!"];
const COMMENTS_OK = ["Boleh tahan, tapi agak ramai orang.", "Harga premium sikit tapi rasa sedap.", "Standard rasa, okay lah buat isi perut."];

// Bounding box for Manjung / Sitiawan / Lumut approx
const LAT_MIN = 4.1500;
const LAT_MAX = 4.2500;
const LNG_MIN = 100.6000;
const LNG_MAX = 100.7000;

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

function getRandomItem(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function generateDummyReviews() {
    const numReviews = Math.floor(Math.random() * 3) + 1; // 1 to 3 reviews
    let reviews = [];
    for (let i = 0; i < numReviews; i++) {
        reviews.push({
            user: getRandomItem(REVIEWERS),
            rating: Math.floor(Math.random() * 2) + 4, // 4 or 5 stars
            comment: Math.random() > 0.3 ? getRandomItem(COMMENTS_GOOD) : getRandomItem(COMMENTS_OK)
        });
    }
    return reviews;
}

// Fixed 15 explicit locations in Manjung for realism
const baseData = [
    {
        id: 1,
        name: "Mee Rebus Ramli",
        lat: 4.2127,
        lng: 100.6631,
        isHalal: true,
        isViral: true,
        category: "Melayu",
        rating: 4.8,
        image_url: "https://images.unsplash.com/photo-1626804475297-41609ea004eb?w=600&q=80",
        description: "Mee rebus paling lejen di Sitiawan. Kuah kacang pekat manis dan portion memuaskan.",
        reviews: generateDummyReviews()
    },
    {
        id: 2,
        name: "James Cendol Sitiawan",
        lat: 4.2155,
        lng: 100.6975,
        isHalal: true,
        isViral: true,
        category: "Dessert",
        rating: 4.7,
        image_url: "https://images.unsplash.com/photo-1555507036-ab1e4006aa07?w=600&q=80",
        description: "Cendol India klasik yang sangat popular di Manjung. Santan segar dan gula apong asli.",
        reviews: generateDummyReviews()
    },
    {
        id: 3,
        name: "Restoran D'Pundak",
        lat: 4.1950,
        lng: 100.6800,
        isHalal: true,
        isViral: false,
        category: "Melayu",
        rating: 4.2,
        image_url: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=600&q=80",
        description: "Nasi campur berlauk pelbagai jenis masakan kampung Perak. Ayam kampung goreng padu!",
        reviews: generateDummyReviews()
    },
    {
        id: 4,
        name: "Villa Seafood Lumut",
        lat: 4.2340,
        lng: 100.6300,
        isHalal: true,
        isViral: true,
        category: "Seafood",
        rating: 4.5,
        image_url: "https://images.unsplash.com/photo-1615141982883-c7ad0e69fd62?w=600&q=80",
        description: "Nikmati makanan laut segar sambil ditiup angin laut. Ketam cili dan sotong goreng tepung wajib cuba.",
        reviews: generateDummyReviews()
    },
    {
        id: 5,
        name: "The ruma. Cafe",
        lat: 4.2000,
        lng: 100.6600,
        isHalal: true,
        isViral: true,
        category: "Cafe",
        rating: 4.6,
        image_url: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=600&q=80",
        description: "Kafe estetik untuk lepak santai. Kopi premium dan pastri artisan buatan sendiri.",
        reviews: generateDummyReviews()
    },
    {
        id: 6,
        name: "Nasi Vanggey Manjung",
        lat: 4.1920,
        lng: 100.6650,
        isHalal: true,
        isViral: true,
        category: "Melayu",
        rating: 4.4,
        image_url: "https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?w=600&q=80",
        description: "Nasi kandar gaya Ipoh kini di Manjung. Kuah campur banjir ayam merah memang kick.",
        reviews: generateDummyReviews()
    },
    {
        id: 7,
        name: "Gong Xi Fa Cai Restaurant",
        lat: 4.2180,
        lng: 100.6900,
        isHalal: false,
        isViral: false,
        category: "Seafood",
        rating: 4.3,
        image_url: "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=600&q=80",
        description: "Restoran keluarga Cina yang menyajikan pelbagai hidangan laut tempatan yang asli.",
        reviews: generateDummyReviews()
    },
    {
        id: 8,
        name: "Sitiawan Settlement Hock Chew So Mien",
        lat: 4.2100,
        lng: 100.6990,
        isHalal: false,
        isViral: true,
        category: "Melayu", // Technically Chinese but for simple categories we map it
        rating: 4.9,
        image_url: "https://images.unsplash.com/photo-1569718214596-af22d81518fb?w=600&q=80",
        description: "Mee tarik tradisi Foochow Sitiawan. Asli dan sangat legend!",
        reviews: generateDummyReviews()
    },
    {
        id: 9,
        name: "Kopi Mesin Manjung",
        lat: 4.1950,
        lng: 100.6550,
        isHalal: true,
        isViral: true,
        category: "Cafe",
        rating: 4.5,
        image_url: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600&q=80",
        description: "Tempat hipster untuk mengopi waktu malam. Suasana meriah.",
        reviews: generateDummyReviews()
    },
    {
        id: 10,
        name: "Steakhouse 83",
        lat: 4.1850,
        lng: 100.6700,
        isHalal: true,
        isViral: false,
        category: "Western",
        rating: 4.2,
        image_url: "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=600&q=80",
        description: "Steak wagyu dan ribeye dengan harga berpatutan di Manjung.",
        reviews: generateDummyReviews()
    },
    {
        id: 11,
        name: "Medan Selera Lumut",
        lat: 4.2380,
        lng: 100.6280,
        isHalal: true,
        isViral: false,
        category: "Melayu",
        rating: 4.0,
        image_url: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&q=80",
        description: "Medan selera awam dengan pelbagai pilihan makanan tempatan.",
        reviews: generateDummyReviews()
    },
    {
        id: 12,
        name: "Oppa Korean BBQ & Cafe",
        lat: 4.1980,
        lng: 100.6690,
        isHalal: true,
        isViral: true,
        category: "Western",
        rating: 4.6,
        image_url: "https://images.unsplash.com/photo-1544025162-d76694265947?w=600&q=80",
        description: "BBQ Korea Halal pertama di Manjung dengan unlimited refill cheese.",
        reviews: generateDummyReviews()
    },
    {
        id: 13,
        name: "Ikan Bakar Marina",
        lat: 4.2150,
        lng: 100.6050,
        isHalal: true,
        isViral: true,
        category: "Seafood",
        rating: 4.7,
        image_url: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&q=80",
        description: "Ikan bakar petai segar di Marina Island. Nikmati bersama pemandangan matahari terbenam.",
        reviews: generateDummyReviews()
    },
    {
        id: 14,
        name: "Ais Kacang Lumut",
        lat: 4.2360,
        lng: 100.6310,
        isHalal: true,
        isViral: false,
        category: "Dessert",
        rating: 4.3,
        image_url: "https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?w=600&q=80",
        description: "ABC dan ais campur pelbagai sirap yang menyegarkan tekak di hari panas.",
        reviews: generateDummyReviews()
    },
    {
        id: 15,
        name: "Puncak Cafe",
        lat: 4.2200,
        lng: 100.6500,
        isHalal: true,
        isViral: true,
        category: "Cafe",
        rating: 4.8,
        image_url: "https://images.unsplash.com/photo-1600093463592-8e36ae95ef56?w=600&q=80",
        description: "Kafe dalam kehijauan hutan lipur. Sesuai untuk healing sambil ngopi.",
        reviews: generateDummyReviews()
    }
];

// Procedurally generate 35 more dummy shops to mach total 50 requirement
const additionalPlaces = [];
const adjectives = ["Sedap", "Best", "Padu", "Viral", "Klasik", "Moden", "Hipster", "Mewah", "Sempurna"];
const nouns = ["Bistro", "Cafe", "Restoran", "Warung", "Kiosk", "Diner", "Kopitiam", "Lounge"];

for (let i = 16; i <= 50; i++) {
    const isHalalReq = Math.random() > 0.2; // 80% halal for variation
    const isViralReq = Math.random() > 0.6; // 40% viral
    const cat = getRandomItem(FOOD_CATEGORIES);
    const placeName = `${getRandomItem(nouns)} ${getRandomItem(adjectives)} Manjung ${i}`;
    
    additionalPlaces.push({
        id: i,
        name: placeName,
        lat: getRandomArbitrary(LAT_MIN, LAT_MAX),
        lng: getRandomArbitrary(LNG_MIN, LNG_MAX),
        isHalal: isHalalReq,
        isViral: isViralReq,
        category: cat,
        rating: (Math.random() * (5 - 3.5) + 3.5).toFixed(1), // Random rating between 3.5 to 5.0
        image_url: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&q=80", // Generic food placeholder
        description: `Ini adalah maklumat kedai mockup untuk ${placeName}. Kedai ini menawarkan hidangan berfokuskan kepada ${cat} dengan rasa tersendiri.`,
        reviews: generateDummyReviews()
    });
}

// Combine all 50 items
const foodData = [...baseData, ...additionalPlaces];

// Global accessible
window.foodPlaces = foodData;
