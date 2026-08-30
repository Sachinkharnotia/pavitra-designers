/**
 * Pavitra Designer Saree - Core State Engine & Business Logic
 * Implements a reactive B2B/B2C marketplace prototype using localStorage
 */

// Initialize Local Database Schema
const DEFAULT_PRODUCTS = [
    {
        id: "p1",
        title: "Royal Purple Sitara Embroidered Saree",
        category: "Sarees",
        subcategory: "Embroidered",
        brand: "Pavitra Designers",
        retailPrice: 5000,
        b2bPrice: 4200,
        moq: 1,
        b2bMoq: 5,
        sku: "PAV-SIT-PUR-01",
        hsn: "52081190",
        gstPercent: 18,
        weight: "0.85 kg",
        dimensions: "5.5m Saree + 0.8m Blouse",
        color: "Royal Purple",
        fabric: "Georgette",
        pattern: "Embroidered",
        occasion: "Festival",
        sizes: ["Free Size"],
        colors: ["Royal Purple", "Lilac", "Deep Plum"],
        stock: 45,
        warehouse: "Jaipur Main",
        imageUrl: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=600",
        images: [
            "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=600",
            "https://images.unsplash.com/photo-1583391733981-849840a5e0b7?auto=format&fit=crop&q=80&w=600",
            "https://images.unsplash.com/photo-1610189012907-4171e928e7c0?auto=format&fit=crop&q=80&w=600",
            "https://images.unsplash.com/photo-1610655317861-4f5b00c0b0a4?auto=format&fit=crop&q=80&w=600"
        ],
        description: "Exquisite hand-embroidered purple saree featuring delicate sitara work and silver zari border. Includes matching blouse piece.",
        featured: true,
        rating: 5,
        reviewsCount: 18,
        reviews: [
            { name: "Aishwarya R.", rating: 5, comment: "Absolutely gorgeous drape. The purple is extremely royal and the sitara work sparkles beautifully under lights.", date: "2026-07-01", images: [] },
            { name: "Kriti S.", rating: 5, comment: "Purchased wholesale for my boutique in Jaipur. Customers loved the weight and fall.", date: "2026-07-05", images: [] }
        ]
    },
    {
        id: "p2",
        title: "Vibrant Crimson Banarasi Silk Saree",
        category: "Sarees",
        subcategory: "Banarasi",
        brand: "Pavitra Designers",
        retailPrice: 8500,
        b2bPrice: 6800,
        moq: 1,
        b2bMoq: 3,
        sku: "PAV-BAN-CRM-02",
        hsn: "52081190",
        gstPercent: 12,
        weight: "1.1 kg",
        dimensions: "5.5m Saree + 0.8m Blouse",
        color: "Crimson Red",
        fabric: "Banarasi Silk",
        pattern: "Zari Woven",
        occasion: "Wedding",
        sizes: ["Free Size"],
        colors: ["Crimson Red", "Ruby Wine", "Maroon Gold"],
        stock: 3,
        warehouse: "Surat Hub",
        imageUrl: "assets/product-images/banarasi_silk.jpg",
        images: [
            "assets/product-images/banarasi_silk.jpg",
            "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&q=80&w=600",
            "https://images.unsplash.com/photo-1583391733137-97a3c7b74a4b?auto=format&fit=crop&q=80&w=600",
            "https://images.unsplash.com/photo-1585488434455-55eb36d03449?auto=format&fit=crop&q=80&w=600"
        ],
        description: "Classic Banarasi silk saree woven with pure gold-coated silver thread. Perfect for weddings and festive wear.",
        featured: true,
        rating: 4.8,
        reviewsCount: 32,
        reviews: [
            { name: "Priyanka C.", rating: 5, comment: "Pure Banarasi weave, verified the silk mark. Exquisite quality for high-end weddings.", date: "2026-06-18", images: [] }
        ]
    },
    {
        id: "p3",
        title: "Elegant Kanjeevaram Gold Zari Saree",
        category: "Sarees",
        subcategory: "Kanjeevaram",
        brand: "Pavitra Designers",
        retailPrice: 12000,
        b2bPrice: 9500,
        moq: 1,
        b2bMoq: 2,
        sku: "PAV-KAN-GOL-03",
        hsn: "52081190",
        gstPercent: 12,
        weight: "1.2 kg",
        dimensions: "5.5m Saree + 0.8m Blouse",
        color: "Maroon & Gold",
        fabric: "Pure Silk",
        pattern: "Zari Woven",
        occasion: "Wedding",
        sizes: ["Free Size"],
        colors: ["Maroon & Gold", "Classic Red", "Temple Orange"],
        stock: 12,
        warehouse: "Jaipur Main",
        imageUrl: "assets/product-images/kanchipuram_silk.jpg",
        images: [
            "assets/product-images/kanchipuram_silk.jpg",
            "https://images.unsplash.com/photo-1610189012907-4171e928e7c0?auto=format&fit=crop&q=80&w=600",
            "https://images.unsplash.com/photo-1593642532400-2682a8356fba?auto=format&fit=crop&q=80&w=600",
            "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?auto=format&fit=crop&q=80&w=600"
        ],
        description: "Authentic Kanchipuram silk saree with majestic temple border design and dense zari pallu work.",
        featured: true,
        rating: 5,
        reviewsCount: 14,
        reviews: [
            { name: "Meenakshi S.", rating: 5, comment: "Stunning gold zari. The fabric is heavy and drapes like a dream. Highly recommend.", date: "2026-06-25", images: [] }
        ]
    },
    {
        id: "p4",
        title: "Pastel Mint Organza Floral Saree",
        category: "Sarees",
        subcategory: "Organza",
        brand: "Pavitra Designers",
        retailPrice: 3200,
        b2bPrice: 2500,
        moq: 1,
        b2bMoq: 10,
        sku: "PAV-ORG-MNT-04",
        hsn: "52081190",
        gstPercent: 5,
        weight: "0.5 kg",
        dimensions: "5.5m Saree + 0.8m Blouse",
        color: "Mint Green",
        fabric: "Sheer Organza",
        pattern: "Floral",
        occasion: "Party Wear",
        sizes: ["Free Size"],
        colors: ["Mint Green", "Blush Pink", "Lavender Blue"],
        stock: 25,
        warehouse: "Delhi Outer",
        imageUrl: "assets/product-images/pastel-mint-organza-floral-saree.png",
        images: [
            "assets/product-images/pastel-mint-organza-floral-saree.png",
            "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=600",
            "https://images.unsplash.com/photo-1585488434455-55eb36d03449?auto=format&fit=crop&q=80&w=600",
            "https://images.unsplash.com/photo-1610189012907-4171e928e7c0?auto=format&fit=crop&q=80&w=600"
        ],
        description: "Lightweight sheer organza saree with delicate hand-painted floral motifs and scalloped borders.",
        featured: false,
        rating: 4.5,
        reviewsCount: 8,
        reviews: [
            { name: "Shalini K.", rating: 4, comment: "Very elegant pastel shade. Material is soft for an organza saree.", date: "2026-06-29", images: [] }
        ]
    },
    {
        id: "p5",
        title: "Traditional Bridal Red Zardosi Lehenga Set",
        category: "Lehengas",
        subcategory: "Bridal",
        brand: "Pavitra Designers",
        retailPrice: 28000,
        b2bPrice: 22000,
        moq: 1,
        b2bMoq: 2,
        sku: "PAV-LEH-RED-05",
        hsn: "62044220",
        gstPercent: 18,
        weight: "3.5 kg",
        dimensions: "Semi-Stitched Lehenga, Dupatta, Blouse",
        color: "Bridal Red",
        fabric: "Velvet",
        pattern: "Zardosi Handwork",
        occasion: "Bridal",
        sizes: ["S", "M", "L", "XL"],
        colors: ["Bridal Red", "Deep Maroon", "Rani Pink"],
        stock: 8,
        warehouse: "Jaipur Main",
        imageUrl: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&q=80&w=600",
        images: [
            "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&q=80&w=600",
            "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&q=80&w=600",
            "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&q=80&w=600",
            "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=600"
        ],
        description: "Grand bridal lehenga intricately crafted with heavy zardosi, dabka, and sequin hand embroidery.",
        featured: true,
        rating: 5,
        reviewsCount: 22,
        reviews: [
            { name: "Ravina Sharma", rating: 5, comment: "Ordered this for my own wedding. The hand embroidery is absolutely breathtaking. Fits like a queen.", date: "2026-07-06", images: [] }
        ]
    },
    {
        id: "p6",
        title: "Ivory Georgette Designer Saree",
        category: "Sarees",
        subcategory: "Georgette",
        brand: "Pavitra Designers",
        retailPrice: 6500,
        b2bPrice: 5200,
        moq: 1,
        b2bMoq: 5,
        sku: "PAV-GEO-IVR-06",
        hsn: "52081190",
        gstPercent: 12,
        weight: "0.7 kg",
        dimensions: "5.5m Saree + 0.8m Blouse",
        color: "Ivory White",
        fabric: "Georgette",
        pattern: "Embroidered",
        occasion: "Party Wear",
        sizes: ["Free Size"],
        colors: ["Ivory White", "Onyx Black", "Emerald Green"],
        stock: 18,
        warehouse: "Surat Hub",
        imageUrl: "assets/product-images/georgette_silk.jpg",
        images: [
            "assets/product-images/georgette_silk.jpg",
            "https://images.unsplash.com/photo-1585488434455-55eb36d03449?auto=format&fit=crop&q=80&w=600",
            "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=600",
            "https://images.unsplash.com/photo-1610189012907-4171e928e7c0?auto=format&fit=crop&q=80&w=600"
        ],
        description: "Ethereal ivory georgette saree featuring delicate threadwork and sequined border. Perfect for evening receptions.",
        featured: false,
        rating: 4.5,
        reviewsCount: 11,
        reviews: [
            { name: "Anjana G.", rating: 4.5, comment: "Beautiful evening saree. Classy, minimalist and premium.", date: "2026-06-12", images: [] }
        ]
    },
    {
        id: "p7",
        title: "Sunshine Yellow Chanderi Silk Saree",
        category: "Sarees",
        subcategory: "Chanderi",
        brand: "Pavitra Designers",
        retailPrice: 4500,
        b2bPrice: 3800,
        moq: 1,
        b2bMoq: 5,
        sku: "PAV-CHA-YEL-07",
        hsn: "52081190",
        gstPercent: 12,
        weight: "0.6 kg",
        dimensions: "5.5m Saree + 0.8m Blouse",
        color: "Yellow",
        fabric: "Chanderi Silk",
        pattern: "Floral",
        occasion: "Festival",
        sizes: ["Free Size"],
        colors: ["Sunshine Yellow", "Mustard Gold", "Citrus Orange"],
        stock: 14,
        warehouse: "Jaipur Main",
        imageUrl: "assets/product-images/chanderi.jpg",
        images: [
            "assets/product-images/chanderi.jpg",
            "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=600",
            "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&q=80&w=600",
            "https://images.unsplash.com/photo-1585488434455-55eb36d03449?auto=format&fit=crop&q=80&w=600"
        ],
        description: "Traditional Chanderi saree loaded with golden floral bootis, translucent border weaving, and matching plain blouse.",
        featured: false,
        rating: 4.8,
        reviewsCount: 19,
        reviews: [
            { name: "Sunita P.", rating: 5, comment: "Ideal for festive puja. The fabric is light and authentic.", date: "2026-06-20", images: [] }
        ]
    },
    {
        id: "p8",
        title: "Emerald Green Handloom Silk Saree",
        category: "Sarees",
        subcategory: "Kanjeevaram",
        brand: "Pavitra Designers",
        retailPrice: 9500,
        b2bPrice: 7900,
        moq: 1,
        b2bMoq: 3,
        sku: "PAV-KAN-EME-08",
        hsn: "52081190",
        gstPercent: 12,
        weight: "1.15 kg",
        dimensions: "5.5m Saree + 0.8m Blouse",
        color: "Emerald Green",
        fabric: "Pure Silk",
        pattern: "Zari Woven",
        occasion: "Wedding Guest",
        sizes: ["Free Size"],
        colors: ["Emerald Green", "Peacock Blue", "Violet Blue"],
        stock: 15,
        warehouse: "Surat Hub",
        imageUrl: "assets/product-images/kanchipuram_silk.jpg",
        images: [
            "assets/product-images/kanchipuram_silk.jpg",
            "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&q=80&w=600",
            "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&q=80&w=600",
            "https://images.unsplash.com/photo-1585488434455-55eb36d03449?auto=format&fit=crop&q=80&w=600"
        ],
        description: "Heavy green silk saree featuring grand golden pallu borders inspired by royal palace motifs. Handloomed by artisans.",
        featured: true,
        rating: 4.9,
        reviewsCount: 15,
        reviews: [
            { name: "Divya N.", rating: 5, comment: "Pure silk certificate came with it. The green is extremely rich.", date: "2026-06-25", images: [] }
        ]
    },
    {
        id: "p9",
        title: "Midnight Black Velvet Heavy Lehenga",
        category: "Lehengas",
        subcategory: "Designer",
        brand: "Pavitra Designers",
        retailPrice: 32000,
        b2bPrice: 26000,
        moq: 1,
        b2bMoq: 2,
        sku: "PAV-LEH-BLK-09",
        hsn: "62044220",
        gstPercent: 18,
        weight: "4.2 kg",
        dimensions: "Semi-Stitched Lehenga, Dupatta, Blouse",
        color: "Midnight Black",
        fabric: "Velvet",
        pattern: "Zardosi Handwork",
        occasion: "Party Wear",
        sizes: ["S", "M", "L"],
        colors: ["Midnight Black", "Royal Navy", "Deep Wine"],
        stock: 6,
        warehouse: "Jaipur Main",
        imageUrl: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&q=80&w=600",
        images: [
            "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&q=80&w=600",
            "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&q=80&w=600",
            "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&q=80&w=600",
            "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=600"
        ],
        description: "A breathtaking statement outfit loaded with heavy gold dabka and floral zardosi motifs. Includes dual dupatta setting.",
        featured: true,
        rating: 5,
        reviewsCount: 7,
        reviews: [
            { name: "Pooja H.", rating: 5, comment: "Amazing weight. Feels heavy, look is extremely premium. Sabyasachi vibe!", date: "2026-07-02", images: [] }
        ]
    },
    {
        id: "p10",
        title: "Peach Blossom Floral Anarkali Suit Set",
        category: "Designer Collection",
        subcategory: "Suits",
        brand: "Pavitra Designers",
        retailPrice: 7200,
        b2bPrice: 5800,
        moq: 1,
        b2bMoq: 4,
        sku: "PAV-SUI-PEA-10",
        hsn: "62044220",
        gstPercent: 12,
        weight: "1.3 kg",
        dimensions: "Stitched Anarkali, Pants, Organza Dupatta",
        color: "Peach Pink",
        fabric: "Georgette",
        pattern: "Floral",
        occasion: "Festival",
        sizes: ["S", "M", "L", "XL", "XXL"],
        colors: ["Peach Pink", "Mint Green", "Buttercream Yellow"],
        stock: 22,
        warehouse: "Delhi Outer",
        imageUrl: "https://images.unsplash.com/photo-1609357518652-6cf0416f0cbe?auto=format&fit=crop&q=80&w=600",
        images: [
            "https://images.unsplash.com/photo-1609357518652-6cf0416f0cbe?auto=format&fit=crop&q=80&w=600",
            "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=600",
            "https://images.unsplash.com/photo-1585488434455-55eb36d03449?auto=format&fit=crop&q=80&w=600",
            "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&q=80&w=600"
        ],
        description: "Elegant long flared Anarkali set with fine gota-patti highlights and digital floral printing on lightweight georgette.",
        featured: false,
        rating: 4.6,
        reviewsCount: 16,
        reviews: [
            { name: "Meera D.", rating: 4.5, comment: "Beautiful flare, dupatta is organza and looks high end. Great fit.", date: "2026-06-15", images: [] }
        ]
    },
    {
        id: "p11",
        title: "Prussian Blue Banarasi Brocade Saree",
        category: "Sarees",
        subcategory: "Banarasi",
        brand: "Pavitra Designers",
        retailPrice: 11000,
        b2bPrice: 8900,
        moq: 1,
        b2bMoq: 3,
        sku: "PAV-BAN-BLU-11",
        hsn: "52081190",
        gstPercent: 12,
        weight: "1.05 kg",
        dimensions: "5.5m Saree + 0.8m Blouse",
        color: "Prussian Blue",
        fabric: "Banarasi Silk",
        pattern: "Zari Woven",
        occasion: "Wedding Guest",
        sizes: ["Free Size"],
        colors: ["Prussian Blue", "Teal Turquoise", "Royal Indigo"],
        stock: 9,
        warehouse: "Surat Hub",
        imageUrl: "assets/product-images/banarasi_silk.jpg",
        images: [
            "assets/product-images/banarasi_silk.jpg",
            "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&q=80&w=600",
            "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=600",
            "https://images.unsplash.com/photo-1585488434455-55eb36d03449?auto=format&fit=crop&q=80&w=600"
        ],
        description: "Stately brocade saree in deep navy blue, containing floral gold and silver bootas woven in high-density jacquard looms.",
        featured: false,
        rating: 4.7,
        reviewsCount: 10,
        reviews: [
            { name: "Suman T.", rating: 5, comment: "Beautiful double zari work (silver and gold). Elegant color combination.", date: "2026-06-30", images: [] }
        ]
    },
    {
        id: "p12",
        title: "Rose Gold Sequin Cocktail Saree",
        category: "Sarees",
        subcategory: "Luxury",
        brand: "Pavitra Designers",
        retailPrice: 14000,
        b2bPrice: 11200,
        moq: 1,
        b2bMoq: 2,
        sku: "PAV-GEO-ROS-12",
        hsn: "52081190",
        gstPercent: 18,
        weight: "0.9 kg",
        dimensions: "5.5m Saree + 0.8m Blouse",
        color: "Rose Gold",
        fabric: "Georgette",
        pattern: "Sequin Embroidered",
        occasion: "Party Wear",
        sizes: ["Free Size"],
        colors: ["Rose Gold", "Midnight Silver", "Champagne Gold"],
        stock: 7,
        warehouse: "Jaipur Main",
        imageUrl: "https://images.unsplash.com/photo-1583391265517-35bbdba01229?auto=format&fit=crop&q=80&w=600",
        images: [
            "https://images.unsplash.com/photo-1583391265517-35bbdba01229?auto=format&fit=crop&q=80&w=600",
            "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=600",
            "https://images.unsplash.com/photo-1585488434455-55eb36d03449?auto=format&fit=crop&q=80&w=600",
            "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&q=80&w=600"
        ],
        description: "Modern cocktail saree fully stitched with high-shine rose gold sequins on fluid sheer georgette, complete with satin piping.",
        featured: true,
        rating: 4.9,
        reviewsCount: 26,
        reviews: [
            { name: "Nisha V.", rating: 5, comment: "Perfect for cocktail parties. Glows amazingly in evening lights.", date: "2026-07-04", images: [] }
        ]
    },
    {
        id: "p_royal_kanchipuram",
        title: "Royal Kanchipuram Silk",
        category: "Sarees",
        subcategory: "Kanjeevaram",
        brand: "Pavitra Designers",
        retailPrice: 14500,
        b2bPrice: 11600,
        moq: 1,
        b2bMoq: 2,
        sku: "PAV-KAN-RYL-91",
        hsn: "52081190",
        gstPercent: 12,
        weight: "1.2 kg",
        dimensions: "5.5m Saree + 0.8m Blouse",
        color: "Royal Blue & Gold",
        fabric: "Kanchipuram Silk",
        pattern: "Zari Woven",
        occasion: "Wedding",
        sizes: ["Free Size"],
        colors: ["Royal Blue & Gold", "Maroon Gold"],
        stock: 15,
        warehouse: "Jaipur Main",
        imageUrl: "assets/product-images/kanchipuram_silk.jpg",
        images: [
            "assets/product-images/kanchipuram_silk.jpg",
            "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&q=80&w=800"
        ],
        description: "Handloomed from pure mulberry silk, this royal Kanchipuram saree features a classic gold zari korvai temple border and a rich brocade pallu.",
        featured: true,
        rating: 5.0,
        reviewsCount: 3,
        reviews: [
            { name: "Srinivasan R.", rating: 5, comment: "Beautiful texture, original Kanchipuram silk certified.", date: "2026-07-10", images: [] }
        ]
    },
    {
        id: "p_heritage_banarasi",
        title: "Heritage Banarasi",
        category: "Sarees",
        subcategory: "Banarasi Silk",
        brand: "Pavitra Designers",
        retailPrice: 16200,
        b2bPrice: 13000,
        moq: 1,
        b2bMoq: 2,
        sku: "PAV-BAN-HRT-92",
        hsn: "52081190",
        gstPercent: 12,
        weight: "1.25 kg",
        dimensions: "5.5m Saree + 0.8m Blouse",
        color: "Deep Crimson Gold",
        fabric: "Banarasi Silk",
        pattern: "Intricate Zari",
        occasion: "Bridal",
        sizes: ["Free Size"],
        colors: ["Deep Crimson Gold", "Emerald Gold"],
        stock: 12,
        warehouse: "Surat Hub",
        imageUrl: "assets/product-images/banarasi_silk.jpg",
        images: [
            "assets/product-images/banarasi_silk.jpg",
            "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&q=80&w=800"
        ],
        description: "Woven with gold-plated silver zari thread by skilled master artisans, this heritage Banarasi saree boasts a detailed floral jaal pattern.",
        featured: true,
        rating: 4.9,
        reviewsCount: 5,
        reviews: [
            { name: "Divya K.", rating: 5, comment: "Breathtaking work. Zari quality is outstanding.", date: "2026-07-12", images: [] }
        ]
    },
    {
        id: "p_pearl_organza",
        title: "Pearl Organza",
        category: "Sarees",
        subcategory: "Organza",
        brand: "Pavitra Designers",
        retailPrice: 4800,
        b2bPrice: 3840,
        moq: 1,
        b2bMoq: 5,
        sku: "PAV-ORG-PRL-93",
        hsn: "52081190",
        gstPercent: 5,
        weight: "0.45 kg",
        dimensions: "5.5m Saree + 0.8m Blouse",
        color: "Pastel Peach",
        fabric: "Sheer Organza",
        pattern: "Floral Embroidery",
        occasion: "Festive",
        sizes: ["Free Size"],
        colors: ["Pastel Peach", "Soft Lavender"],
        stock: 20,
        warehouse: "Delhi Outer",
        imageUrl: "assets/product-images/organza_silk.jpg",
        images: [
            "assets/product-images/organza_silk.jpg",
            "https://images.unsplash.com/photo-1585488434455-55eb36d03449?auto=format&fit=crop&q=80&w=800"
        ],
        description: "Ethereal and lightweight, this organza saree is decorated with delicate pearl and sequin embroidery along scalloped borders.",
        featured: true,
        rating: 4.8,
        reviewsCount: 4,
        reviews: [
            { name: "Pooja V.", rating: 5, comment: "It hangs beautifully and the pearl work is extremely neat.", date: "2026-07-15", images: [] }
        ]
    },
    {
        id: "p_natural_linen",
        title: "Natural Linen",
        category: "Sarees",
        subcategory: "Linen",
        brand: "Pavitra Designers",
        retailPrice: 3900,
        b2bPrice: 3120,
        moq: 1,
        b2bMoq: 5,
        sku: "PAV-LIN-NAT-94",
        hsn: "52081190",
        gstPercent: 5,
        weight: "0.75 kg",
        dimensions: "5.5m Saree + 0.8m Blouse",
        color: "Beige & Mustard",
        fabric: "100% Linen",
        pattern: "Striped Block Print",
        occasion: "Casual",
        sizes: ["Free Size"],
        colors: ["Beige & Mustard", "Indigo Blue"],
        stock: 25,
        warehouse: "Jaipur Main",
        imageUrl: "assets/product-images/linen_silk.jpg",
        images: [
            "assets/product-images/linen_silk.jpg",
            "https://images.unsplash.com/photo-1610189012907-4171e928e7c0?auto=format&fit=crop&q=80&w=800"
        ],
        description: "Woven from fine-grade linen flax, this minimalist saree features a breathable handfeel and metallic silver stripes on the pallu.",
        featured: true,
        rating: 4.7,
        reviewsCount: 6,
        reviews: [
            { name: "Megha S.", rating: 5, comment: "Super breathable and classy. Excellent for summer formal wear.", date: "2026-07-18", images: [] }
        ]
    },
    {
        id: "p_tussar_silk",
        title: "Traditional Tussar Silk Saree",
        category: "Sarees",
        subcategory: "Tussar Silk",
        brand: "Pavitra Designers",
        retailPrice: 6800,
        b2bPrice: 5400,
        moq: 1,
        b2bMoq: 3,
        sku: "PAV-TUS-NAT-95",
        hsn: "52081190",
        gstPercent: 12,
        weight: "0.95 kg",
        dimensions: "5.5m Saree + 0.8m Blouse",
        color: "Natural Gold Beige",
        fabric: "Tussar Silk",
        pattern: "Textured Handloom",
        occasion: "Festive",
        sizes: ["Free Size"],
        colors: ["Natural Gold Beige", "Tussar Brown", "Copper Gold"],
        stock: 18,
        warehouse: "Jaipur Main",
        imageUrl: "assets/product-images/tussar_silk.jpg",
        images: [
            "assets/product-images/tussar_silk.jpg",
            "https://images.unsplash.com/photo-1610189012907-4171e928e7c0?auto=format&fit=crop&q=80&w=800"
        ],
        description: "Exquisite handloomed Tussar silk saree featuring a rich, organic natural texture, block-printed panels, and a traditional zari border.",
        featured: true,
        rating: 4.8,
        reviewsCount: 7,
        reviews: [
            { name: "Radha M.", rating: 5, comment: "Amazing texture! The color is very elegant and traditional. Perfect drape.", date: "2026-07-22", images: [] }
        ]
    }
];

const DEFAULT_CONFIG = {
    companyName: "Pavitra Designer Saree Pvt. Ltd.",
    brandName: "Pavitra Designers",
    gstNumber: "08AAPCP9876Q1Z9",
    cinNumber: "U51101RJ2024PTC123456",
    panNumber: "AAPCP9876Q",
    supportEmail: "support@pavitradesigners.com",
    supportMobile: "+91 98765 43210",
    whatsappNumber: "+91 98765 43210",
    officeAddressReg: "102, Badi Chopad J.D.A. Market, Pink City, Jaipur, Rajasthan - 302003",
    officeAddressCorp: "4th Floor, Jewels Heights, Tonk Road, Jaipur, Rajasthan - 302015",
    socialLinks: {
        facebook: "https://facebook.com/pavitradesigners",
        instagram: "https://instagram.com/pavitradesigners",
        youtube: "https://youtube.com/pavitradesigners",
        pinterest: "https://pinterest.com/pavitradesigners",
        snapchat: "https://snapchat.com/pavitradesigners"
    },
    smtp: { host: "smtp.mailgun.org", port: 587, user: "postmaster@pavitradesigners.com" },
    smsGateway: { provider: "Twilio", senderId: "PAVITR" },
    whatsappApi: { endpoint: "https://api.whatsapp.com/send", key: "wh-key-778899" },
    paymentGateway: { provider: "Razorpay", keyId: "rzp_test_pavitra123", active: true },
    cloudflare: { zoneId: "cf-zone-889922", active: true },
    googleMapsApi: { key: "AIzaSyD-mockmapskey123" }
};

const DEFAULT_USERS = [
    { id: "u-admin", email: "admin@pavitra.com", name: "Super Admin", role: "Super Admin", verified: true },
    { id: "u-seller", email: "seller@pavitra.com", name: "Pavitra Weaves Corp", role: "Seller", verified: true, kycStatus: "Verified" },
    { id: "u-retailer", email: "ravinasharma9950@gmail.com", name: "Ravina Sharma", role: "Retailer", verified: true, kycStatus: "Verified", creditLimit: 200000 },
    { id: "u-delivery", email: "delivery@pavitra.com", name: "Karan Singh", role: "Delivery Partner", verified: true }
];

const DEFAULT_KYC = [
    {
        id: "kyc-1",
        userId: "u-seller",
        userName: "Pavitra Weaves Corp",
        userRole: "Seller",
        aadhaar: "1234-5678-9012",
        pan: "ABCDE1234F",
        gst: "08ABCDE1234F1Z1",
        shopLicense: "SL-2024-8899",
        msme: "UDYAM-RJ-14-00123",
        bankPassbook: "IFSC: SBIN0000021, A/C: 98765432101",
        status: "Verified",
        submittedAt: "2026-07-01T10:00:00Z"
    }
];

const DEFAULT_ORDERS = [
    {
        id: "ORD-9982",
        retailerId: "u-retailer",
        retailerName: "Ravina Sharma",
        retailerEmail: "ravinasharma9950@gmail.com",
        items: [
            {
                id: "p1",
                title: "Royal Purple Sitara Embroidered Saree",
                retailPrice: 5000,
                qty: 1,
                sku: "PAV-SIT-PUR-01",
                imageUrl: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=600"
            }
        ],
        shippingMethod: "Local delivery",
        shippingCost: 0,
        taxes: 900,
        subtotal: 5000,
        total: 5900,
        status: "Delivered",
        paymentStatus: "Paid",
        paymentMethod: "UPI",
        shippingAddress: "Ravina Sharma, Badi Chopad J.D.A. Market Pink City, 302003 Jaipur RJ, IN",
        phone: "+91 9988776655",
        createdAt: "2026-07-06T22:31:00Z",
        logs: [
            { status: "Placed", time: "2026-07-06T22:31:00Z" },
            { status: "Accepted", time: "2026-07-06T22:45:00Z" },
            { status: "Packed", time: "2026-07-06T23:30:00Z" },
            { status: "Shipped", time: "2026-07-07T09:00:00Z" },
            { status: "Out For Delivery", time: "2026-07-07T11:15:00Z" },
            { status: "Delivered", time: "2026-07-07T14:30:00Z" }
        ],
        deliveryPartnerId: "u-delivery",
        deliveryOtp: "4491"
    }
];

const DEFAULT_WALLET = [
    { id: "w-1", userId: "u-retailer", type: "Credit", amount: 10000, description: "Opening B2B Balance Credits", timestamp: "2026-07-01T09:00:00Z" },
    { id: "w-2", userId: "u-retailer", type: "Debit", amount: 5900, description: "Payment for Order #ORD-9982", timestamp: "2026-07-06T22:31:00Z" },
    { id: "w-3", userId: "u-seller", type: "Credit", amount: 4250, description: "Earnings from Order #ORD-9982 (Net of Commission & GST)", timestamp: "2026-07-07T14:30:00Z" },
    { id: "w-4", userId: "u-admin", type: "Credit", amount: 750, description: "Commission Earned on #ORD-9982", timestamp: "2026-07-07T14:30:00Z" }
];

const DEFAULT_CMS = {
    home: {
        bannerTitle: "Welcome to Pavitra Designer",
        bannerSub: "Experience Elegance in Every Saree",
        promoText: "Free Shipping Across India"
    },
    about: {
        title: "About Pavitra Designers",
        content: "Pavitra Designer Saree is a legacy ethnic wear brand based in the heart of the Pink City, Jaipur. For over three decades, we have been crafting exquisite, hand-woven sarees and lehengas that blend rich Indian tradition with contemporary aesthetics."
    },
    contact: {
        title: "Contact Pavitra Designers",
        phone: "+91 98765 43210",
        email: "support@pavitradesigners.com",
        address: "102, Badi Chopad J.D.A. Market, Pink City, Jaipur, Rajasthan - 302003"
    }
};

const DEFAULT_ERROR_LOGS = [
    {
        id: "err-1",
        message: "PDOException: SQLSTATE[HY000] [2002] Connection timed out",
        url: "/api/v1/orders/create",
        fileName: "/var/www/pavitra/controllers/OrderController.php",
        lineNumber: 142,
        userId: "u-retailer",
        ipAddress: "192.168.1.45",
        browser: "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
        timestamp: "2026-07-07T12:15:32Z"
    }
];

const DEFAULT_RBAC = {
    "Super Admin": { all: true, manage_settings: true, verify_kyc: true, view_reports: true, cms_edit: true },
    "Seller": { view_dashboard: true, manage_products: true, manage_inventory: true, fulfill_orders: true, view_wallet: true },
    "Retailer": { view_dashboard: true, place_orders: true, view_wallet: true, request_returns: true, submit_kyc: true },
    "Delivery Partner": { view_dashboard: true, update_attendance: true, accept_delivery: true, confirm_otp: true }
};

// Database Initialization Helper with Schema Versioning (schema v3)
function initDatabase() {
    const PLATFORM_SCHEMA_VERSION = "pavitra_v6";
    if (localStorage.getItem("pavitra_schema_version") !== PLATFORM_SCHEMA_VERSION) {
        localStorage.removeItem("pavitra_initialized");
        localStorage.removeItem("pavitra_products");
        localStorage.removeItem("pavitra_config");
        localStorage.removeItem("pavitra_users");
        localStorage.removeItem("pavitra_kyc");
        localStorage.removeItem("pavitra_orders");
        localStorage.removeItem("pavitra_wallet");
        localStorage.removeItem("pavitra_cms");
        localStorage.removeItem("pavitra_errors");
        localStorage.removeItem("pavitra_rbac");
        localStorage.setItem("pavitra_schema_version", PLATFORM_SCHEMA_VERSION);
    }

    if (!localStorage.getItem("pavitra_initialized")) {
        localStorage.setItem("pavitra_products", JSON.stringify(DEFAULT_PRODUCTS));
        localStorage.setItem("pavitra_config", JSON.stringify(DEFAULT_CONFIG));
        localStorage.setItem("pavitra_users", JSON.stringify(DEFAULT_USERS));
        localStorage.setItem("pavitra_kyc", JSON.stringify(DEFAULT_KYC));
        localStorage.setItem("pavitra_orders", JSON.stringify(DEFAULT_ORDERS));
        localStorage.setItem("pavitra_wallet", JSON.stringify(DEFAULT_WALLET));
        localStorage.setItem("pavitra_cms", JSON.stringify(DEFAULT_CMS));
        localStorage.setItem("pavitra_errors", JSON.stringify(DEFAULT_ERROR_LOGS));
        localStorage.setItem("pavitra_rbac", JSON.stringify(DEFAULT_RBAC));
        
        localStorage.setItem("pavitra_cart", JSON.stringify([]));
        localStorage.setItem("pavitra_wishlist", JSON.stringify([]));
        
        localStorage.setItem("pavitra_initialized", "true");
    }

    // Ensure updated product asset paths are applied even when localStorage was already initialized
    const storedProducts = localStorage.getItem("pavitra_products");
    if (storedProducts) {
        const products = JSON.parse(storedProducts);
        const updatedProducts = products.map(prod => {
            if (prod.id === "p4") {
                prod.imageUrl = "assets/product-images/pastel-mint-organza-floral-saree.jpg";
            }
            return prod;
        });
        localStorage.setItem("pavitra_products", JSON.stringify(updatedProducts));
    }
}

// Invoke DB Initialization immediately
initDatabase();

// --- STATE MANAGEMENT ENGINE ---
const PavitraDB = {
    getProducts: () => JSON.parse(localStorage.getItem("pavitra_products")),
    saveProducts: (data) => localStorage.setItem("pavitra_products", JSON.stringify(data)),
    
    getConfig: () => JSON.parse(localStorage.getItem("pavitra_config")),
    saveConfig: (data) => localStorage.setItem("pavitra_config", JSON.stringify(data)),
    
    getUsers: () => JSON.parse(localStorage.getItem("pavitra_users")),
    saveUsers: (data) => localStorage.setItem("pavitra_users", JSON.stringify(data)),
    
    getKyc: () => JSON.parse(localStorage.getItem("pavitra_kyc")),
    saveKyc: (data) => localStorage.setItem("pavitra_kyc", JSON.stringify(data)),
    
    getOrders: () => JSON.parse(localStorage.getItem("pavitra_orders")),
    saveOrders: (data) => localStorage.setItem("pavitra_orders", JSON.stringify(data)),
    
    getWallet: () => JSON.parse(localStorage.getItem("pavitra_wallet")),
    saveWallet: (data) => localStorage.setItem("pavitra_wallet", JSON.stringify(data)),
    
    getCms: () => JSON.parse(localStorage.getItem("pavitra_cms")),
    saveCms: (data) => localStorage.setItem("pavitra_cms", JSON.stringify(data)),
    
    getErrors: () => JSON.parse(localStorage.getItem("pavitra_errors")),
    saveErrors: (data) => localStorage.setItem("pavitra_errors", JSON.stringify(data)),
    
    getRbac: () => JSON.parse(localStorage.getItem("pavitra_rbac")),
    saveRbac: (data) => localStorage.setItem("pavitra_rbac", JSON.stringify(data)),
    
    getCart: () => JSON.parse(localStorage.getItem("pavitra_cart")),
    saveCart: (data) => localStorage.setItem("pavitra_cart", JSON.stringify(data)),
    
    getWishlist: () => JSON.parse(localStorage.getItem("pavitra_wishlist")),
    saveWishlist: (data) => localStorage.setItem("pavitra_wishlist", JSON.stringify(data)),

    // Active Session Management
    getCurrentUser: () => {
        const u = sessionStorage.getItem("pavitra_current_user");
        return u ? JSON.parse(u) : null;
    },
    setCurrentUser: (user) => {
        if (user) {
            sessionStorage.setItem("pavitra_current_user", JSON.stringify(user));
        } else {
            sessionStorage.removeItem("pavitra_current_user");
        }
    }
};

// --- AUTHENTICATION ACTIONS ---
const AuthAPI = {
    login: (email, password, role) => {
        const users = PavitraDB.getUsers();
        // Dynamic search (mock password check - we accept password matching email name or 'pavitra')
        const matched = users.find(u => u.email.toLowerCase() === email.toLowerCase() && u.role === role);
        if (matched) {
            PavitraDB.setCurrentUser(matched);
            return { success: true, user: matched };
        }
        return { success: false, message: "Invalid email or role credentials." };
    },
    
    register: (name, email, role, phone) => {
        const users = PavitraDB.getUsers();
        if (users.find(u => u.email.toLowerCase() === email.toLowerCase())) {
            return { success: false, message: "Email is already registered." };
        }
        const newUser = {
            id: "u-" + Math.floor(Math.random() * 10000),
            name,
            email,
            role,
            phone: phone || "+91 99999 88888",
            verified: false,
            kycStatus: "Pending",
            creditLimit: role === "Retailer" ? 50000 : 0
        };
        users.push(newUser);
        PavitraDB.saveUsers(users);
        PavitraDB.setCurrentUser(newUser);
        return { success: true, user: newUser };
    },

    submitKYC: (userId, docs) => {
        const kycs = PavitraDB.getKyc();
        const users = PavitraDB.getUsers();
        const user = users.find(u => u.id === userId);
        
        if (!user) return { success: false, message: "User not found." };
        
        const newKyc = {
            id: "kyc-" + Math.floor(Math.random() * 10000),
            userId: user.id,
            userName: user.name,
            userRole: user.role,
            ...docs,
            status: "Pending",
            submittedAt: new Date().toISOString()
        };
        
        kycs.push(newKyc);
        PavitraDB.saveKyc(kycs);
        
        user.kycStatus = "Pending";
        PavitraDB.saveUsers(users);
        PavitraDB.setCurrentUser(user);
        
        return { success: true, kyc: newKyc };
    },

    verifyOTP: (userId, otpCode) => {
        if (otpCode.length === 6) {
            const users = PavitraDB.getUsers();
            const user = users.find(u => u.id === userId);
            if (user) {
                user.verified = true;
                PavitraDB.saveUsers(users);
                PavitraDB.setCurrentUser(user);
                return { success: true };
            }
        }
        return { success: false, message: "Invalid OTP code entered." };
    }
};

// --- E-COMMERCE CART ENGINE ---
const CartAPI = {
    addToCart: (productId, qty = 1) => {
        const cart = PavitraDB.getCart();
        const products = PavitraDB.getProducts();
        const p = products.find(prod => prod.id === productId);
        if (!p) return;
        
        const existing = cart.find(item => item.id === productId);
        if (existing) {
            existing.qty += parseInt(qty);
        } else {
            cart.push({
                id: p.id,
                title: p.title,
                retailPrice: p.retailPrice,
                b2bPrice: p.b2bPrice,
                qty: parseInt(qty),
                sku: p.sku,
                imageUrl: p.imageUrl,
                hsn: p.hsn,
                gstPercent: p.gstPercent
            });
        }
        PavitraDB.saveCart(cart);
        window.dispatchEvent(new Event("cart_updated"));
    },
    
    updateQty: (productId, qty) => {
        let cart = PavitraDB.getCart();
        const item = cart.find(i => i.id === productId);
        if (item) {
            item.qty = parseInt(qty);
            if (item.qty <= 0) {
                cart = cart.filter(i => i.id !== productId);
            }
        }
        PavitraDB.saveCart(cart);
        window.dispatchEvent(new Event("cart_updated"));
    },
    
    removeFromCart: (productId) => {
        let cart = PavitraDB.getCart();
        cart = cart.filter(i => i.id !== productId);
        PavitraDB.saveCart(cart);
        window.dispatchEvent(new Event("cart_updated"));
    },

    clearCart: () => {
        PavitraDB.saveCart([]);
        window.dispatchEvent(new Event("cart_updated"));
    },
    
    getTotals: (isB2B = false) => {
        const cart = PavitraDB.getCart();
        let subtotal = 0;
        let taxes = 0;
        
        cart.forEach(item => {
            const price = isB2B ? item.b2bPrice : item.retailPrice;
            const itemTotal = price * item.qty;
            subtotal += itemTotal;
            taxes += itemTotal * (item.gstPercent / 100);
        });
        
        return {
            subtotal,
            taxes,
            total: subtotal + taxes
        };
    },

    toggleWishlist: (productId) => {
        let wishlist = PavitraDB.getWishlist();
        if (wishlist.includes(productId)) {
            wishlist = wishlist.filter(id => id !== productId);
        } else {
            wishlist.push(productId);
        }
        PavitraDB.saveWishlist(wishlist);
        window.dispatchEvent(new Event("wishlist_updated"));
    }
};

// --- TRANSACTION ACCURACY LEDGER ---
const WalletAPI = {
    getBalance: (userId) => {
        const ledger = PavitraDB.getWallet();
        return ledger
            .filter(tx => tx.userId === userId)
            .reduce((balance, tx) => {
                if (tx.type === "Credit") return balance + tx.amount;
                if (tx.type === "Debit") return balance - tx.amount;
                return balance;
            }, 0);
    },

    // Immutable transaction writer
    addTransaction: (userId, type, amount, description) => {
        const ledger = PavitraDB.getWallet();
        const newTx = {
            id: "tx-" + Math.floor(Math.random() * 100000),
            userId,
            type, // Credit or Debit
            amount,
            description,
            timestamp: new Date().toISOString()
        };
        ledger.push(newTx);
        PavitraDB.saveWallet(ledger);
        return newTx;
    }
};

// --- SYSTEM CONFIG LOGGER ---
const ErrorLogger = {
    logError: (message, url, fileName, lineNumber, userId) => {
        const errors = PavitraDB.getErrors();
        const newErr = {
            id: "err-" + Math.floor(Math.random() * 100000),
            message,
            url: url || window.location.pathname,
            fileName: fileName || "app.js",
            lineNumber: lineNumber || 0,
            userId: userId || "Anonymous",
            ipAddress: "127.0.0.1",
            browser: navigator.userAgent,
            timestamp: new Date().toISOString()
        };
        errors.push(newErr);
        PavitraDB.saveErrors(errors);
        return newErr;
    }
};

// --- CHATBOT ASSISTANT CONVERSATION ENGINE ---
const CHAT_RESPONSES = [
    {
        trigger: "banarasi",
        response: `Pavitra Designer offers the marvelous Crimson Banarasi Silk Saree featuring authentic gold zari weaving. Perfect for bridal and festival events!<br><br>
        <div class="card border-gold rounded-0 mb-2 overflow-hidden shadow-sm" style="max-width: 260px; background: white;">
            <img src="https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&q=80&w=250" class="card-img-top rounded-0" style="height: 110px; object-fit: cover;">
            <div class="card-body p-2">
                <h6 class="card-title fw-bold m-0 small text-truncate">Crimson Banarasi Silk Saree</h6>
                <div class="text-maroon fw-bold small">₹8,500.00</div>
                <button class="btn btn-pavitra btn-sm w-100 py-1 mt-2" style="font-size:0.75rem" onclick="CartAPI.addToCart('p2'); alert('Added to cart!');">Add To Cart</button>
            </div>
        </div>`
    },
    {
        trigger: "purple",
        response: `Here is the Royal Purple Sitara Embroidered Saree! This is our best seller. It features beautiful hand embroidered sitara borders on high quality fabrics. It is currently in stock at our Jaipur Main Warehouse!<br><br>
        <div class="card border-gold rounded-0 mb-2 overflow-hidden shadow-sm" style="max-width: 260px; background: white;">
            <img src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=250" class="card-img-top rounded-0" style="height: 110px; object-fit: cover;">
            <div class="card-body p-2">
                <h6 class="card-title fw-bold m-0 small text-truncate">Royal Purple Sitara Saree</h6>
                <div class="text-maroon fw-bold small">₹5,000.00</div>
                <button class="btn btn-pavitra btn-sm w-100 py-1 mt-2" style="font-size:0.75rem" onclick="CartAPI.addToCart('p1'); alert('Added to cart!');">Add To Cart</button>
            </div>
        </div>`
    },
    {
        trigger: "b2b",
        response: `Wholesale B2B pricing is enabled for verified B2B Retailers! You unlock discounted rates with our style MOQs:<br><br>
        <div class="p-2 border bg-white d-flex gap-2 align-items-center mb-2" style="border-radius: 4px;">
            <img src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=100" style="width: 45px; height: 55px; object-fit: cover;">
            <div class="flex-grow-1">
                <div class="fw-bold small text-truncate" style="max-width:160px; font-size:0.8rem;">Purple Sitara Saree</div>
                <div class="text-maroon small fw-bold">₹4,200 <span class="text-muted text-decoration-line-through fw-normal" style="font-size: 0.7rem;">₹5,000</span></div>
                <div class="text-muted small" style="font-size:0.7rem">Min MOQ: 5 Units</div>
                <button class="btn btn-pavitra btn-sm py-0 px-2 mt-1" style="font-size:0.7rem; line-height: 1.5;" onclick="CartAPI.addToCart('p1', 5); alert('Added 5 units B2B!');">Add MOQ</button>
            </div>
        </div>`
    },
    {
        trigger: "shipping",
        response: "We offer <strong>Free Shipping</strong> across India for all retail and wholesale orders! Orders are shipped from our central Jaipur warehouse within 24-48 hours."
    },
    {
        trigger: "popular",
        response: `Here are some popular and elegant sarees you might like from Pavitra Designer:<br><br>
        <div class="d-flex flex-column gap-2">
            <div class="p-2 border bg-white d-flex gap-2 align-items-center" style="border-radius: 4px;">
                <img src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=100" style="width: 40px; height: 50px; object-fit: cover;">
                <div class="flex-grow-1">
                    <div class="fw-bold text-truncate" style="max-width: 140px; font-size: 0.8rem;">Purple Sitara Saree</div>
                    <div class="text-maroon small fw-bold">₹5,000.00</div>
                </div>
                <button class="btn btn-pavitra btn-sm py-0 px-2" style="font-size:0.7rem; height:24px;" onclick="CartAPI.addToCart('p1'); alert('Added to cart!');">Add</button>
            </div>
            <div class="p-2 border bg-white d-flex gap-2 align-items-center" style="border-radius: 4px;">
                <img src="https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&q=80&w=100" style="width: 40px; height: 50px; object-fit: cover;">
                <div class="flex-grow-1">
                    <div class="fw-bold text-truncate" style="max-width: 140px; font-size: 0.8rem;">Crimson Banarasi Saree</div>
                    <div class="text-maroon small fw-bold">₹8,500.00</div>
                </div>
                <button class="btn btn-pavitra btn-sm py-0 px-2" style="font-size:0.7rem; height:24px;" onclick="CartAPI.addToCart('p2'); alert('Added to cart!');">Add</button>
            </div>
        </div>`
    },
    {
        trigger: "hello",
        response: "Hello! Welcome to Pavitra Designer. I am your personal shopping and business assistant. How can I help you find elegant sarees today?"
    }
];

const ChatEngine = {
    getReply: (msg) => {
        const text = msg.toLowerCase();
        const found = CHAT_RESPONSES.find(item => text.includes(item.trigger) || text.includes(item.trigger.replace(" ", "")));
        if (found) return found.response;
        return "Thank you for reaching out to Pavitra Designer Saree. I can assist you with product details, pricing, B2B wholesale limits, order tracking, and shop policies. Type 'popular', 'banarasi', 'b2b', or 'purple' to see matching items!";
    }
};

// --- INITIALIZE NAVBAR & ROLE MANAGER IN DOM ---
document.addEventListener("DOMContentLoaded", () => {
    initGlobalSearchBar();
    initRoleBar();
    updateNavbarBadges();
    syncMyAccountLinks();
    
    // Setup listeners
    window.addEventListener("cart_updated", updateNavbarBadges);
    window.addEventListener("wishlist_updated", updateNavbarBadges);
});

function syncMyAccountLinks() {
    const currentUser = PavitraDB.getCurrentUser();
    const accountLinks = document.querySelectorAll('a[href="auth.html"][title="My Account"], a[href="dashboard.html"][title="My Account"]');
    accountLinks.forEach(link => {
        link.href = currentUser ? "dashboard.html" : "auth.html";
    });
}

function initRoleBar() {
    // Inject Demo switcher bar to showcase the panels
    if (document.getElementById("demo-role-bar-container")) {
        const currentUser = PavitraDB.getCurrentUser();
        const currentRole = currentUser ? currentUser.role : "Guest";
        
        let selectHtml = `
            <div class="demo-role-bar d-flex justify-content-between align-items-center">
                <div>
                    <span class="fw-bold text-gold"><i class="fas fa-magic me-1"></i> Interactive Demo Mode:</span>
                    <span class="ms-2">Logged in as: <strong>${currentUser ? currentUser.name : 'Guest'}</strong> <span class="badge bg-maroon text-gold-light ms-1">${currentRole}</span></span>
                </div>
                <div class="d-flex align-items-center gap-2">
                    <label class="mb-0 text-white me-1" style="font-size:0.8rem">Switch Profile View:</label>
                    <select id="role-bar-selector" class="demo-role-select">
                        <option value="Guest" ${currentRole === 'Guest' ? 'selected' : ''}>Guest / Storefront</option>
                        <option value="Super Admin" ${currentRole === 'Super Admin' ? 'selected' : ''}>Super Admin Panel</option>
                        <option value="Seller" ${currentRole === 'Seller' ? 'selected' : ''}>Seller Panel</option>
                        <option value="Retailer" ${currentRole === 'Retailer' ? 'selected' : ''}>Retailer (B2B/B2C)</option>
                        <option value="Delivery Partner" ${currentRole === 'Delivery Partner' ? 'selected' : ''}>Delivery Partner</option>
                    </select>
                </div>
            </div>
        `;
        
        document.getElementById("demo-role-bar-container").innerHTML = selectHtml;
        
        document.getElementById("role-bar-selector").addEventListener("change", (e) => {
            const role = e.target.value;
            if (role === "Guest") {
                PavitraDB.setCurrentUser(null);
                window.location.href = "index.html";
            } else {
                const users = PavitraDB.getUsers();
                const matched = users.find(u => u.role === role);
                if (matched) {
                    PavitraDB.setCurrentUser(matched);
                    if (window.location.pathname.includes("dashboard.html")) {
                        // Reload dashboard to apply view
                        window.location.reload();
                    } else if (window.location.pathname.includes("auth.html")) {
                        window.location.href = "dashboard.html";
                    } else {
                        // For index page, reload or route to dashboard
                        window.location.reload();
                    }
                } else {
                    // Create quick dummy user if seed missing
                    const dummyUser = { id: "u-dummy-" + role.toLowerCase(), email: `${role.toLowerCase()}@pavitra.com`, name: `Sample ${role}`, role: role, verified: true };
                    users.push(dummyUser);
                    PavitraDB.saveUsers(users);
                    PavitraDB.setCurrentUser(dummyUser);
                    window.location.reload();
                }
            }
        });
    }
}

// --- GLOBAL FRONTEND UTILITY HELPER ACTIONS ---
const FrontendHelpers = {
    // Read Query String Parameters
    getQueryParam: (name) => {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(name);
    },

    // Track recently viewed products in sessionStorage
    addToRecentlyViewed: (productId) => {
        let list = sessionStorage.getItem("pavitra_recently_viewed");
        list = list ? JSON.parse(list) : [];
        if (!list.includes(productId)) {
            list.unshift(productId);
            if (list.length > 4) list.pop();
            sessionStorage.setItem("pavitra_recently_viewed", JSON.stringify(list));
        }
    },

    getRecentlyViewed: () => {
        let list = sessionStorage.getItem("pavitra_recently_viewed");
        list = list ? JSON.parse(list) : [];
        const products = PavitraDB.getProducts();
        return list.map(id => products.find(p => p.id === id)).filter(Boolean);
    },

    getRelatedProducts: (productId) => {
        const products = PavitraDB.getProducts();
        const current = products.find(p => p.id === productId);
        if (!current) return products.slice(0, 4);
        return products.filter(p => p.id !== productId && (p.category === current.category || p.subcategory === current.subcategory)).slice(0, 4);
    },

    // Submit custom product review
    submitReview: (productId, reviewObj) => {
        const products = PavitraDB.getProducts();
        const p = products.find(prod => prod.id === productId);
        if (!p) return false;
        
        if (!p.reviews) p.reviews = [];
        p.reviews.unshift({
            name: reviewObj.name || "Anonymous Guest",
            rating: parseFloat(reviewObj.rating) || 5,
            comment: reviewObj.comment || "",
            date: new Date().toISOString().split('T')[0],
            images: reviewObj.images || []
        });

        p.reviewsCount = p.reviews.length;
        const totalRating = p.reviews.reduce((sum, r) => sum + r.rating, 0);
        p.rating = parseFloat((totalRating / p.reviewsCount).toFixed(1));

        PavitraDB.saveProducts(products);
        window.dispatchEvent(new Event("products_updated"));
        return true;
    }
};

// Global DOM Events: Navbar Shadow, Loader, Back to Top
document.addEventListener("DOMContentLoaded", () => {
    // 1. Loader Removal
    const loader = document.getElementById("page-loader");
    if (loader) {
        setTimeout(() => {
            loader.style.opacity = "0";
            loader.style.visibility = "hidden";
        }, 300);
    }

    // 2. Navbar shadow scroll effect
    window.addEventListener("scroll", () => {
        const navbar = document.querySelector(".navbar-pavitra");
        if (navbar) {
            if (window.scrollY > 50) {
                navbar.classList.add("scrolled");
            } else {
                navbar.classList.remove("scrolled");
            }
        }

        // 3. Back to Top visibility
        const btt = document.getElementById("back-to-top");
        if (btt) {
            if (window.scrollY > 400) {
                btt.classList.add("visible");
            } else {
                btt.classList.remove("visible");
            }
        }
    });

    // 4. Back to Top Click
    const bttBtn = document.getElementById("back-to-top");
    if (bttBtn) {
        bttBtn.addEventListener("click", (e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // 5. Inject back to top button dynamically if it is missing
    if (!document.getElementById("back-to-top")) {
        const bttEl = document.createElement("a");
        bttEl.href = "#";
        bttEl.id = "back-to-top";
        bttEl.className = "back-to-top-btn";
        bttEl.innerHTML = `<i class="fas fa-arrow-up"></i>`;
        document.body.appendChild(bttEl);
    }

    // 6. Inject WhatsApp floating button dynamically if it is missing
    if (!document.getElementById("whatsapp-float")) {
        const waEl = document.createElement("a");
        waEl.href = "https://wa.me/919876543210?text=Hello%20Pavitra%20Designers!%20I'm%20interested%20in%20your%20saree%20collection.";
        waEl.id = "whatsapp-float";
        waEl.className = "whatsapp-float-btn";
        waEl.target = "_blank";
        waEl.rel = "noopener noreferrer";
        waEl.title = "Chat on WhatsApp";
        waEl.innerHTML = `<i class="fab fa-whatsapp"></i>`;
        document.body.appendChild(waEl);
    }
});

function updateNavbarBadges() {
    const cart = PavitraDB.getCart();
    const wishlist = PavitraDB.getWishlist();
    
    const cartCountElement = document.getElementById("nav-cart-count");
    if (cartCountElement) {
        const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
        cartCountElement.textContent = totalItems;
        cartCountElement.style.display = totalItems > 0 ? "block" : "none";
    }
    
    const wishlistCountElement = document.getElementById("nav-wishlist-count");
    if (wishlistCountElement) {
        wishlistCountElement.textContent = wishlist.length;
        wishlistCountElement.style.display = wishlist.length > 0 ? "block" : "none";
    }
}


// --- DYNAMIC NOTIFICATION SIMULATOR SYSTEM ---
const NotificationAPI = {
    trigger: (type, title, desc, delay = 0) => {
        setTimeout(() => {
            const toast = document.createElement("div");
            toast.className = `simulated-notification-toast ${type}`;
            
            let iconClass = "fa-bell";
            if (type === "whatsapp") iconClass = "fa-whatsapp fab";
            else if (type === "sms") iconClass = "fa-sms fas";
            else if (type === "email") iconClass = "fa-envelope fas";

            toast.innerHTML = `
                <i class="${iconClass}"></i>
                <div>
                    <div class="toast-title">${title}</div>
                    <div class="toast-desc">${desc}</div>
                </div>
            `;
            
            const activeToasts = document.querySelectorAll(".simulated-notification-toast");
            let offsetTop = 24;
            activeToasts.forEach(t => {
                offsetTop += t.offsetHeight + 12;
            });
            toast.style.top = offsetTop + "px";

            document.body.appendChild(toast);

            setTimeout(() => {
                toast.style.animation = "fadeOutUp 0.4s ease forwards";
                setTimeout(() => {
                    toast.remove();
                }, 400);
            }, 4500);
        }, delay);
    }
};

// --- FLIPKART-STYLE SEARCH BAR INJECTION & LOGIC ---
const TRENDING_SEARCHES = [
    "Banarasi Silk",
    "Kanjeevaram Gold",
    "Wedding Lehenga",
    "Organza Floral",
    "Embroidered Saree",
    "Georgette"
];

function initGlobalSearchBar() {
    const navbar = document.querySelector(".navbar-pavitra");
    if (!navbar) return;

    const navContainer = navbar.querySelector(".container");
    if (!navContainer) return;

    // Check if there is an existing search form (like the one hardcoded on products.html) and remove it
    const existingForm = navbar.querySelector("form[onsubmit*='triggerSearch']");
    if (existingForm) {
        existingForm.remove();
    }

    // Create the search list item element (li)
    const searchLi = document.createElement("li");
    searchLi.className = "nav-item search-nav-item align-self-center mx-2";

    // Create the search container element
    const searchContainer = document.createElement("div");
    searchContainer.className = "search-container-pavitra";
    
    searchContainer.innerHTML = `
        <form class="search-form-pavitra" onsubmit="event.preventDefault(); triggerGlobalSearch();">
            <input type="text" class="search-input-pavitra" id="search-input" placeholder="Search sarees, lehengas..." autocomplete="off">
            <button type="submit" class="search-btn-pavitra" aria-label="Search">
                <i class="fas fa-search"></i>
            </button>
            <div class="search-suggestions-pavitra" id="search-suggestions"></div>
        </form>
    `;
    searchLi.appendChild(searchContainer);

    // Inject in between New Arrivals and Sarees dropdown
    const navList = navbar.querySelector(".navbar-nav");
    let inserted = false;
    if (navList) {
        // Find New Arrivals list item (containing link to new-arrivals.html)
        const newArrivalsLi = Array.from(navList.querySelectorAll(".nav-item")).find(li => {
            const link = li.querySelector("a");
            return link && link.getAttribute("href") && link.getAttribute("href").includes("new-arrivals.html");
        });
        if (newArrivalsLi) {
            newArrivalsLi.after(searchLi);
            inserted = true;
        } else {
            // Fallback: search for sarees link
            const sareesLi = navList.querySelector("#nav-sarees")?.closest(".nav-item");
            if (sareesLi) {
                sareesLi.before(searchLi);
                inserted = true;
            }
        }
    }
    
    // If we could not insert it in between, fallback to appending or prepending to container
    if (!inserted) {
        const brand = navContainer.querySelector(".navbar-brand");
        if (brand) {
            brand.after(searchContainer);
        } else {
            navContainer.prepend(searchContainer);
        }
    }

    // Set up search bar event listeners
    const searchInput = searchContainer.querySelector("#search-input");
    const suggestionsBox = searchContainer.querySelector("#search-suggestions");

    if (!searchInput || !suggestionsBox) return;

    // Populate search input if there's a search query param already
    const currentQuery = FrontendHelpers.getQueryParam("search") || "";
    if (currentQuery) {
        searchInput.value = currentQuery;
    }

    // Event: Focus
    searchInput.addEventListener("focus", () => {
        showSuggestions(searchInput.value, suggestionsBox);
    });

    // Event: Input
    searchInput.addEventListener("input", () => {
        showSuggestions(searchInput.value, suggestionsBox);
    });

    // Event: Close suggestions when clicking outside
    document.addEventListener("click", (e) => {
        if (!searchContainer.contains(e.target)) {
            suggestionsBox.classList.remove("show");
        }
    });
}

function showSuggestions(query, box) {
    query = query.trim().toLowerCase();
    
    // Check user role for pricing
    const currentUser = PavitraDB.getCurrentUser();
    const isB2B = currentUser && currentUser.role === "Retailer";

    let html = "";

    if (!query) {
        // Show Trending Searches
        html += `<div class="suggestion-section-title-pavitra">Trending Searches</div>`;
        TRENDING_SEARCHES.forEach(term => {
            html += `
                <a href="#" class="trending-item-pavitra" onclick="selectSearchSuggestion(event, '${term.replace(/'/g, "\\'")}')">
                    <i class="fas fa-arrow-trend-up"></i>
                    <span>${term}</span>
                </a>
            `;
        });
        box.innerHTML = html;
        box.classList.add("show");
        return;
    }

    // Search products from DB
    const products = PavitraDB.getProducts() || [];
    const matches = products.filter(p => 
        p.title.toLowerCase().includes(query) ||
        (p.sku && p.sku.toLowerCase().includes(query)) ||
        (p.category && p.category.toLowerCase().includes(query)) ||
        (p.subcategory && p.subcategory.toLowerCase().includes(query)) ||
        (p.fabric && p.fabric.toLowerCase().includes(query))
    ).slice(0, 5); // limit to 5 suggestions

    if (matches.length > 0) {
        html += `<div class="suggestion-section-title-pavitra">Products</div>`;
        matches.forEach(p => {
            const price = isB2B ? p.b2bPrice : p.retailPrice;
            const priceHtml = `₹${price.toLocaleString("en-IN")}`;
            const b2bBadge = isB2B ? `<span class="suggestion-badge-b2b">Wholesale (MOQ ${p.b2bMoq})</span>` : "";

            html += `
                <a href="product-details.html?id=${p.id}" class="suggestion-item-pavitra">
                    <img src="${p.imageUrl}" alt="${p.title}">
                    <div class="suggestion-text-pavitra">
                        <span class="suggestion-title-pavitra">${p.title}</span>
                        <span class="suggestion-meta-pavitra">${p.category} ${p.subcategory ? ' &bull; ' + p.subcategory : ''}</span>
                        <span class="suggestion-price-pavitra">${priceHtml}${b2bBadge}</span>
                    </div>
                </a>
            `;
        });
        
        // View all results option at bottom
        html += `
            <a href="#" class="view-all-results-pavitra" onclick="selectSearchSuggestion(event, '${query.replace(/'/g, "\\'")}')">
                View all results for "${query}"
            </a>
        `;
    } else {
        html += `
            <div class="p-3 text-center text-muted small">
                No matching luxury products found.
                <a href="#" class="d-block mt-2 text-maroon font-weight-bold" onclick="selectSearchSuggestion(event, '${query.replace(/'/g, "\\'")}')">
                    Search anyway
                </a>
            </div>
        `;
    }

    box.innerHTML = html;
    box.classList.add("show");
}

function selectSearchSuggestion(e, term) {
    if (e) e.preventDefault();
    const input = document.getElementById("search-input");
    if (input) {
        input.value = term;
    }
    const box = document.getElementById("search-suggestions");
    if (box) {
        box.classList.remove("show");
    }
    triggerGlobalSearch();
}

function triggerGlobalSearch() {
    const input = document.getElementById("search-input");
    if (!input) return;
    const query = input.value.trim();
    
    // Check if we are on products.html
    const isProductsPage = window.location.pathname.includes("products.html");
    if (isProductsPage) {
        // If we are on products.html, update the URL without reload and filter
        const newUrl = new URL(window.location.href);
        if (query) {
            newUrl.searchParams.set("search", query);
        } else {
            newUrl.searchParams.delete("search");
        }
        window.history.pushState({}, "", newUrl);
        
        // Execute the page's search trigger if it exists
        if (typeof triggerSearch === "function") {
            triggerSearch();
        } else if (typeof applySidebarFilters === "function") {
            applySidebarFilters();
        }
    } else {
        // Redirect to products.html with the search query
        window.location.href = `products.html?search=${encodeURIComponent(query)}`;
    }
}

// Expose engines to window scope for inline HTML event bindings
window.PavitraDB = PavitraDB;
window.CartAPI = CartAPI;
window.WalletAPI = WalletAPI;
window.FrontendHelpers = FrontendHelpers;
window.updateNavbarBadges = updateNavbarBadges;
window.NotificationAPI = NotificationAPI;
window.initGlobalSearchBar = initGlobalSearchBar;
window.triggerGlobalSearch = triggerGlobalSearch;
window.selectSearchSuggestion = selectSearchSuggestion;


