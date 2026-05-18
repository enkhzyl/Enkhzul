import { MenuItem } from "@/types";

// ─── Шууд захиалагддаг алдартай хоолнууд ────────────────────────────────────
export const popularReadyItems: MenuItem[] = [
  {
    id: "ready-burger-classic",
    name: "Классик Бургер",
    category: "burger",
    description: "Үхрийн мах, чеддер бяслаг, кетчуп, майонез, гөрөөсний навч, улаан лоол",
    basePrice: 12500,
    baseCalories: 620,
    imageUrl: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&q=85",
    isPopular: true,
  },
  {
    id: "ready-burger-bbq",
    name: "BBQ Бургер",
    category: "burger",
    description: "Давхар үхрийн мах, BBQ соус, давхар чеддер, халуун бриош талх",
    basePrice: 14500,
    baseCalories: 780,
    imageUrl: "https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=600&q=85",
    isPopular: true,
  },
  {
    id: "ready-burger-smash",
    name: "Смэш Бургер",
    category: "burger",
    description: "Хавтгайлж шарсан мах, карамелт сонгино, онцгой соус, хрустэй",
    basePrice: 13500,
    baseCalories: 700,
    imageUrl: "https://images.unsplash.com/photo-1600891964092-4316c288032e?w=600&q=85",
    isNew: true,
  },
  {
    id: "ready-burger-bacon",
    name: "Бэйкон Бургер",
    category: "burger",
    description: "Хрустэй бэйкон, чеддер, авокадо, дижон горчица, тахианы өндөг",
    basePrice: 15000,
    baseCalories: 820,
    imageUrl: "https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=600&q=85",
    isPopular: true,
  },
  {
    id: "ready-pizza-pepperoni",
    name: "Пепперони Пицца",
    category: "pizza",
    description: "Моцарелла бяслаг, пепперони, улаан буурцагны соус, зузаан хавтгай",
    basePrice: 14500,
    baseCalories: 760,
    imageUrl: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=600&q=85",
    isPopular: true,
  },
  {
    id: "ready-pizza-margherita",
    name: "Маргарита Пицца",
    category: "pizza",
    description: "Нимгэн хавтгай, шинэ моцарелла, улаан буурцагны соус, базилик",
    basePrice: 12000,
    baseCalories: 580,
    imageUrl: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&q=85",
    isPopular: true,
  },
  {
    id: "ready-pizza-bbq",
    name: "BBQ Тахианы Пицца",
    category: "pizza",
    description: "BBQ соус, шарсан тахиа, улаан сонгино, моцарелла, кориандр",
    basePrice: 15000,
    baseCalories: 720,
    imageUrl: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=600&q=85",
    isNew: true,
  },
  {
    id: "ready-wrap-chicken",
    name: "Тахианы Рап",
    category: "wrap",
    description: "Шарсан тахиа, часны соус, гөрөөсний навч, улаан лоол, өргөст хэмх",
    basePrice: 10000,
    baseCalories: 480,
    imageUrl: "https://images.unsplash.com/photo-1540713434306-58505cf1b6fc?w=600&q=85",
    isPopular: true,
  },
  {
    id: "ready-wrap-beef",
    name: "Үхрийн Махтай Рап",
    category: "wrap",
    description: "Шарсан үхрийн мах, BBQ соус, карамелт сонгино, авокадо, чеддер",
    basePrice: 12000,
    baseCalories: 580,
    imageUrl: "https://images.unsplash.com/photo-1540713434306-58505cf1b6fc?w=600&q=85",
    isPopular: true,
  },
  {
    id: "ready-burrito-chicken",
    name: "Тахианы Бурритто",
    category: "burrito",
    description: "Шарсан тахиа, цагаан будаа, хар буурцаг, гуакамоле, бяслаг",
    basePrice: 11500,
    baseCalories: 620,
    imageUrl: "https://images.unsplash.com/photo-1618897996318-5a901fa6ca71?w=600&q=85",
    isPopular: true,
  },
  {
    id: "ready-burrito-beef",
    name: "Үхрийн Махтай Бурритто",
    category: "burrito",
    description: "Шарсан үхрийн мах, хар буурцаг, сальса, бяслаг, цөцгийн тос",
    basePrice: 13000,
    baseCalories: 720,
    imageUrl: "https://images.unsplash.com/photo-1599974579688-8dbdd335c77f?w=600&q=85",
    isNew: true,
  },
  {
    id: "ready-burger-spicy",
    name: "Халуун Тахианы Бургер",
    category: "burger",
    description: "Халуун шарсан тахиа, халапеньо, шрача соус, хаш навч, дилл",
    basePrice: 13000,
    baseCalories: 650,
    imageUrl: "https://images.unsplash.com/photo-1561758033-d89a9ad46330?w=600&q=85",
    isNew: true,
  },
];

// ─── Орцоо өөрөө бүрдүүлэх хоолнууд ────────────────────────────────────────
export const menuItems: MenuItem[] = [
  // ══════════════════════════════════════════════
  // БУРГЕР
  // ══════════════════════════════════════════════
  {
    id: "burger-classic",
    name: "Классик Бургер",
    category: "burger",
    description: "Шинэхэн найруулсан бургер, өөрийн дуртай орцоор бүрдүүл",
    basePrice: 8500,
    baseCalories: 450,
    imageUrl: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&q=85",
    isPopular: true,
    ingredientGroups: [
      {
        id: "bread", name: "Талхны төрөл", type: "single", required: true,
        options: [
          { id: "white",  name: "Цагаан талх",          price: 0,   calories: 280, isDefault: true },
          { id: "wheat",  name: "Бүрэн үрийн гурилтай", price: 500, calories: 260 },
          { id: "black",  name: "Хар талх",              price: 500, calories: 270 },
          { id: "sesame", name: "Ноос үрийн талх",       price: 300, calories: 290 },
          { id: "brioche",name: "Бриош талх",            price: 600, calories: 310 },
        ],
      },
      {
        id: "meat", name: "Мах", type: "single", required: true,
        options: [
          { id: "beef",    name: "Үхрийн мах 150г",      price: 3000, calories: 350, isDefault: true },
          { id: "chicken", name: "Тахианы мах",           price: 2500, calories: 200 },
          { id: "pork",    name: "Гахайн мах",            price: 2500, calories: 280 },
          { id: "mixed",   name: "Үхэр+Гахай хосолсон",  price: 3500, calories: 320 },
          { id: "double",  name: "Давхар үхрийн мах",     price: 5000, calories: 600 },
        ],
      },
      {
        id: "sauce", name: "Соус", type: "multiple", required: false,
        options: [
          { id: "ketchup",  name: "Кетчуп",     price: 0,   calories: 20,  isDefault: true },
          { id: "mayo",     name: "Майонез",     price: 0,   calories: 80 },
          { id: "bbq",      name: "BBQ соус",    price: 200, calories: 40 },
          { id: "mustard",  name: "Горчица",     price: 0,   calories: 15 },
          { id: "special",  name: "Онцгой соус", price: 300, calories: 60 },
          { id: "sriracha", name: "Шрача",       price: 200, calories: 30 },
          { id: "garlic",   name: "Часны соус",  price: 200, calories: 50 },
        ],
      },
      {
        id: "cheese", name: "Бяслаг", type: "single", required: false,
        options: [
          { id: "none",       name: "Бяслаггүй",     price: 0,    calories: 0,   isDefault: true },
          { id: "cheddar",    name: "Чеддер",        price: 500,  calories: 100 },
          { id: "mozzarella", name: "Моцарелла",     price: 500,  calories: 80 },
          { id: "double",     name: "Давхар бяслаг", price: 900,  calories: 180 },
          { id: "swiss",      name: "Швейцарь",      price: 600,  calories: 110 },
        ],
      },
      {
        id: "veggie", name: "Ногоо", type: "multiple", required: false,
        options: [
          { id: "lettuce", name: "Гөрөөсний навч", price: 0,   calories: 5,  isDefault: true },
          { id: "tomato",  name: "Улаан лоол",      price: 0,   calories: 10, isDefault: true },
          { id: "onion",   name: "Сонгино",         price: 0,   calories: 10 },
          { id: "pickle",  name: "Өрөвслийн ногоо", price: 0,   calories: 5 },
          { id: "jal",     name: "Халапеньо",       price: 200, calories: 8 },
          { id: "avocado", name: "Авокадо",         price: 500, calories: 80 },
          { id: "mushroom",name: "Мөөг",            price: 400, calories: 20 },
        ],
      },
    ],
  },
  {
    id: "burger-bbq",
    name: "BBQ Бургер",
    category: "burger",
    description: "Гүн хайрсан BBQ маханы бургер, хүссэн орцоор",
    basePrice: 10500,
    baseCalories: 580,
    imageUrl: "https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=600&q=85",
    isNew: true,
    ingredientGroups: [
      {
        id: "bread", name: "Талхны төрөл", type: "single", required: true,
        options: [
          { id: "brioche", name: "Бриош талх",   price: 0,   calories: 300, isDefault: true },
          { id: "wheat",   name: "Хөхийн гурил", price: 300, calories: 260 },
          { id: "sesame",  name: "Ноос үрийн",   price: 300, calories: 290 },
        ],
      },
      {
        id: "meat", name: "Мах", type: "single", required: true,
        options: [
          { id: "beef-dbl", name: "Давхар үхрийн мах", price: 4500, calories: 520, isDefault: true },
          { id: "beef",     name: "Үхрийн мах",         price: 3000, calories: 350 },
          { id: "chicken",  name: "Тахианы мах",         price: 2500, calories: 200 },
        ],
      },
      {
        id: "sauce", name: "Соус", type: "multiple", required: false,
        options: [
          { id: "bbq",     name: "BBQ соус",    price: 0,   calories: 40, isDefault: true },
          { id: "special", name: "Онцгой соус", price: 300, calories: 60 },
          { id: "mayo",    name: "Майонез",     price: 0,   calories: 80 },
          { id: "sriracha",name: "Шрача",       price: 200, calories: 30 },
        ],
      },
      {
        id: "cheese", name: "Бяслаг", type: "single", required: false,
        options: [
          { id: "cheddar", name: "Чеддер",        price: 500, calories: 100, isDefault: true },
          { id: "double",  name: "Давхар бяслаг", price: 900, calories: 180 },
          { id: "none",    name: "Бяслаггүй",     price: 0,   calories: 0 },
        ],
      },
      {
        id: "extras", name: "Нэмэлт", type: "multiple", required: false,
        options: [
          { id: "bacon",  name: "Бэйкон",        price: 800, calories: 120 },
          { id: "egg",    name: "Өндөг",         price: 500, calories: 80 },
          { id: "onion",  name: "Карамелт сонгино", price: 300, calories: 40 },
          { id: "pickle", name: "Өрөвслийн ногоо",  price: 0,   calories: 5 },
        ],
      },
    ],
  },
  {
    id: "burger-smash",
    name: "Смэш Бургер",
    category: "burger",
    description: "Хавтгайлж шарсан нимгэн мах, давхаршуулсан, онцгой соустай",
    basePrice: 11000,
    baseCalories: 620,
    imageUrl: "https://images.unsplash.com/photo-1600891964092-4316c288032e?w=600&q=85",
    isNew: true,
    ingredientGroups: [
      {
        id: "bread", name: "Талхны төрөл", type: "single", required: true,
        options: [
          { id: "brioche", name: "Бриош талх",   price: 0,   calories: 300, isDefault: true },
          { id: "potato",  name: "Төмсний талх", price: 400, calories: 320 },
        ],
      },
      {
        id: "patty", name: "Котлет", type: "single", required: true,
        options: [
          { id: "double", name: "Давхар смэш (2x80г)", price: 4000, calories: 480, isDefault: true },
          { id: "single", name: "Нэг смэш (80г)",      price: 2500, calories: 240 },
          { id: "triple", name: "Гурван смэш (3x80г)", price: 5500, calories: 720 },
        ],
      },
      {
        id: "sauce", name: "Онцгой соус", type: "single", required: true,
        options: [
          { id: "smash",   name: "Смэш онцгой соус", price: 0,   calories: 70, isDefault: true },
          { id: "truffle", name: "Трюфелийн майо",   price: 500, calories: 90 },
          { id: "spicy",   name: "Халуун соус",      price: 200, calories: 60 },
        ],
      },
      {
        id: "cheese", name: "Бяслаг", type: "single", required: false,
        options: [
          { id: "american", name: "Америкийн бяслаг", price: 500, calories: 90, isDefault: true },
          { id: "cheddar",  name: "Чеддер",           price: 500, calories: 100 },
          { id: "none",     name: "Бяслаггүй",        price: 0,   calories: 0 },
        ],
      },
    ],
  },
  {
    id: "burger-mushroom",
    name: "Мөөгтэй Бургер",
    category: "burger",
    description: "Шарсан шампиньон мөөг, швейцарь бяслаг, өлгий соустай тансаг бургер",
    basePrice: 12000,
    baseCalories: 590,
    imageUrl: "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=600&q=85",
    ingredientGroups: [
      {
        id: "bread", name: "Талхны төрөл", type: "single", required: true,
        options: [
          { id: "brioche", name: "Бриош талх",   price: 0,   calories: 300, isDefault: true },
          { id: "wheat",   name: "Хөхийн гурил", price: 300, calories: 260 },
        ],
      },
      {
        id: "meat", name: "Мах", type: "single", required: true,
        options: [
          { id: "beef",    name: "Үхрийн мах",   price: 3000, calories: 350, isDefault: true },
          { id: "chicken", name: "Тахианы мах",  price: 2500, calories: 200 },
          { id: "veggie",  name: "Ногооны котлет",price: 2000, calories: 180 },
        ],
      },
      {
        id: "mushroom", name: "Мөөгний сонголт", type: "single", required: true,
        options: [
          { id: "champignon", name: "Шампиньон мөөг",    price: 800, calories: 30, isDefault: true },
          { id: "portobello", name: "Портобелло мөөг",   price: 1200, calories: 40 },
          { id: "mixed",      name: "Холимог мөөг",      price: 1000, calories: 35 },
        ],
      },
      {
        id: "cheese", name: "Бяслаг", type: "single", required: false,
        options: [
          { id: "swiss",  name: "Швейцарь бяслаг", price: 600, calories: 110, isDefault: true },
          { id: "gouda",  name: "Гауда",           price: 600, calories: 105 },
          { id: "none",   name: "Бяслаггүй",       price: 0,   calories: 0 },
        ],
      },
    ],
  },
  {
    id: "burger-spicy-chicken",
    name: "Халуун Тахианы Бургер",
    category: "burger",
    description: "Халуун шарсан тахиа, шрача соус, халапеньо, хаш навч",
    basePrice: 11000,
    baseCalories: 560,
    imageUrl: "https://images.unsplash.com/photo-1561758033-d89a9ad46330?w=600&q=85",
    isNew: true,
    ingredientGroups: [
      {
        id: "bread", name: "Талхны төрөл", type: "single", required: true,
        options: [
          { id: "white",   name: "Цагаан талх",   price: 0,   calories: 280, isDefault: true },
          { id: "brioche", name: "Бриош талх",    price: 600, calories: 310 },
        ],
      },
      {
        id: "heat", name: "Халуун хэмжээ", type: "single", required: true,
        options: [
          { id: "medium", name: "Дунд зэрэг 🌶",    price: 0,   calories: 0, isDefault: true },
          { id: "hot",    name: "Халуун 🌶🌶",       price: 0,   calories: 0 },
          { id: "xhot",   name: "Маш халуун 🌶🌶🌶", price: 0,   calories: 0 },
        ],
      },
      {
        id: "sauce", name: "Соус", type: "multiple", required: false,
        options: [
          { id: "sriracha", name: "Шрача",       price: 0,   calories: 30, isDefault: true },
          { id: "buffalo",  name: "Буффало соус", price: 200, calories: 50 },
          { id: "ranch",    name: "Ранч",        price: 0,   calories: 70 },
        ],
      },
      {
        id: "veggie", name: "Ногоо", type: "multiple", required: false,
        options: [
          { id: "lettuce", name: "Хаш навч",   price: 0,   calories: 5, isDefault: true },
          { id: "jal",     name: "Халапеньо",   price: 200, calories: 8, isDefault: true },
          { id: "pickle",  name: "Өрөвслийн",  price: 0,   calories: 5 },
          { id: "onion",   name: "Сонгино",    price: 0,   calories: 10 },
        ],
      },
    ],
  },
  {
    id: "burger-veggie",
    name: "Ногооны Бургер",
    category: "burger",
    description: "Ургамлын уургаар хийсэн котлет, авокадо, шинэ ногоо, песто",
    basePrice: 10000,
    baseCalories: 420,
    imageUrl: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=600&q=85",
    ingredientGroups: [
      {
        id: "bread", name: "Талхны төрөл", type: "single", required: true,
        options: [
          { id: "wheat",   name: "Бүрэн үрийн",  price: 0,   calories: 260, isDefault: true },
          { id: "spinach", name: "Хаш ногооны",  price: 300, calories: 250 },
          { id: "white",   name: "Цагаан талх",  price: 0,   calories: 280 },
        ],
      },
      {
        id: "patty", name: "Котлет", type: "single", required: true,
        options: [
          { id: "veggie",  name: "Ногооны котлет",     price: 2000, calories: 180, isDefault: true },
          { id: "bean",    name: "Буурцагны котлет",   price: 1800, calories: 160 },
          { id: "falafel", name: "Фалафель",           price: 2000, calories: 200 },
        ],
      },
      {
        id: "sauce", name: "Соус", type: "multiple", required: false,
        options: [
          { id: "pesto",   name: "Песто",        price: 300, calories: 80, isDefault: true },
          { id: "hummus",  name: "Хумус",        price: 200, calories: 60 },
          { id: "garlic",  name: "Часны соус",   price: 200, calories: 50 },
        ],
      },
      {
        id: "veggie", name: "Ногоо", type: "multiple", required: false,
        options: [
          { id: "lettuce", name: "Гөрөөсний навч", price: 0,   calories: 5,  isDefault: true },
          { id: "tomato",  name: "Улаан лоол",     price: 0,   calories: 10, isDefault: true },
          { id: "avocado", name: "Авокадо",        price: 500, calories: 80, isDefault: true },
          { id: "cucumber","name": "Өргөст хэмх",  price: 0,   calories: 8 },
          { id: "beet",    name: "Чихрийн манжин", price: 200, calories: 20 },
        ],
      },
    ],
  },
  {
    id: "burger-bacon",
    name: "Бэйкон Бургер",
    category: "burger",
    description: "Хрустэй бэйкон, давхар чеддер, карамелт сонгино, онцгой соус",
    basePrice: 13500,
    baseCalories: 750,
    imageUrl: "https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=600&q=85",
    isPopular: true,
    ingredientGroups: [
      {
        id: "bread", name: "Талхны төрөл", type: "single", required: true,
        options: [
          { id: "brioche", name: "Бриош талх",   price: 0,   calories: 300, isDefault: true },
          { id: "white",   name: "Цагаан талх",  price: 0,   calories: 280 },
        ],
      },
      {
        id: "meat", name: "Мах", type: "single", required: true,
        options: [
          { id: "beef",    name: "Үхрийн мах",       price: 3000, calories: 350, isDefault: true },
          { id: "beef-dbl",name: "Давхар үхрийн мах", price: 5000, calories: 600 },
        ],
      },
      {
        id: "bacon", name: "Бэйкон", type: "single", required: true,
        options: [
          { id: "crispy",  name: "Хрустэй бэйкон 2ш", price: 800, calories: 120, isDefault: true },
          { id: "extra",   name: "Экстра бэйкон 4ш",  price: 1500, calories: 240 },
        ],
      },
      {
        id: "cheese", name: "Бяслаг", type: "single", required: false,
        options: [
          { id: "double",  name: "Давхар чеддер", price: 900,  calories: 180, isDefault: true },
          { id: "cheddar", name: "Нэг чеддер",    price: 500,  calories: 100 },
          { id: "none",    name: "Бяслаггүй",     price: 0,    calories: 0 },
        ],
      },
      {
        id: "sauce", name: "Соус", type: "multiple", required: false,
        options: [
          { id: "special", name: "Онцгой соус", price: 0,   calories: 60, isDefault: true },
          { id: "bbq",     name: "BBQ соус",    price: 200, calories: 40 },
          { id: "mayo",    name: "Майонез",     price: 0,   calories: 80 },
        ],
      },
    ],
  },
  {
    id: "burger-fish",
    name: "Загасны Бургер",
    category: "burger",
    description: "Далайн загасны котлет, тартар соус, гөрөөсний навч, лимон",
    basePrice: 11000,
    baseCalories: 500,
    imageUrl: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&q=85",
    ingredientGroups: [
      {
        id: "bread", name: "Талхны төрөл", type: "single", required: true,
        options: [
          { id: "white",   name: "Цагаан талх",  price: 0,   calories: 280, isDefault: true },
          { id: "brioche", name: "Бриош талх",   price: 600, calories: 310 },
        ],
      },
      {
        id: "fish", name: "Загас", type: "single", required: true,
        options: [
          { id: "cod",    name: "Болд загас (Cod)",     price: 3500, calories: 280, isDefault: true },
          { id: "salmon", name: "Цурхай загас (Salmon)", price: 4500, calories: 320 },
          { id: "shrimp", name: "Загас хорхой",          price: 4000, calories: 200 },
        ],
      },
      {
        id: "sauce", name: "Соус", type: "multiple", required: false,
        options: [
          { id: "tartar",  name: "Тартар соус", price: 0,   calories: 80, isDefault: true },
          { id: "garlic",  name: "Часны соус",  price: 200, calories: 50 },
          { id: "sriracha",name: "Шрача",       price: 200, calories: 30 },
        ],
      },
      {
        id: "veggie", name: "Ногоо", type: "multiple", required: false,
        options: [
          { id: "lettuce", name: "Гөрөөсний навч", price: 0,   calories: 5, isDefault: true },
          { id: "tomato",  name: "Улаан лоол",     price: 0,   calories: 10 },
          { id: "pickle",  name: "Өрөвслийн",      price: 0,   calories: 5 },
          { id: "onion",   name: "Улаан сонгино",  price: 0,   calories: 10 },
        ],
      },
    ],
  },

  // ══════════════════════════════════════════════
  // ПИЦЦА
  // ══════════════════════════════════════════════
  {
    id: "pizza-classic",
    name: "Маргарита Пицца",
    category: "pizza",
    description: "Сонгодог маргарита, шинэ моцарелла, базилик, орцоор бүрдүүл",
    basePrice: 12000,
    baseCalories: 600,
    imageUrl: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&q=85",
    isPopular: true,
    ingredientGroups: [
      {
        id: "crust", name: "Гурилан хавтгай", type: "single", required: true,
        options: [
          { id: "thin",    name: "Нимгэн хавтгай",    price: 0,    calories: 200, isDefault: true },
          { id: "thick",   name: "Зузаан хавтгай",    price: 500,  calories: 280 },
          { id: "stuffed", name: "Бяслагтай хавтгай", price: 1000, calories: 350 },
          { id: "cauliflower", name: "Өвсний загас хавтгай", price: 800, calories: 150 },
        ],
      },
      {
        id: "sauce", name: "Соус", type: "single", required: true,
        options: [
          { id: "tomato", name: "Улаан буурцагны соус", price: 0,   calories: 30, isDefault: true },
          { id: "white",  name: "Цагаан соус",          price: 200, calories: 60 },
          { id: "bbq",    name: "BBQ соус",             price: 200, calories: 40 },
          { id: "pesto",  name: "Песто",                price: 300, calories: 80 },
        ],
      },
      {
        id: "toppings", name: "Дээр нэмэх", type: "multiple", required: false,
        options: [
          { id: "mushroom",  name: "Мөөг",           price: 500,  calories: 25, isDefault: true },
          { id: "bell",      name: "Соломон чинжүү", price: 300,  calories: 20 },
          { id: "olive",     name: "Чидун жимс",     price: 400,  calories: 35 },
          { id: "chicken",   name: "Тахиа",          price: 1500, calories: 150 },
          { id: "pepperoni", name: "Пепперони",      price: 1500, calories: 200 },
          { id: "ham",       name: "Хиам",           price: 1200, calories: 180 },
          { id: "corn",      name: "Эрдэнэ шиш",    price: 200,  calories: 30 },
          { id: "jal",       name: "Халапеньо",      price: 300,  calories: 10 },
          { id: "onion",     name: "Улаан сонгино",  price: 200,  calories: 15 },
          { id: "spinach",   name: "Хаш ногоо",      price: 300,  calories: 10 },
        ],
      },
      {
        id: "cheese", name: "Бяслаг", type: "single", required: false,
        options: [
          { id: "standard", name: "Энгийн моцарелла", price: 0,    calories: 80,  isDefault: true },
          { id: "extra",    name: "Экстра бяслаг",    price: 500,  calories: 160 },
          { id: "four",     name: "Дөрвөн бяслаг",   price: 1000, calories: 240 },
        ],
      },
    ],
  },
  {
    id: "pizza-pepperoni",
    name: "Пепперони Пицца",
    category: "pizza",
    description: "Сонгодог пепперони, хайлсан моцарелла бяслагтай",
    basePrice: 14000,
    baseCalories: 720,
    imageUrl: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=600&q=85",
    isPopular: true,
    ingredientGroups: [
      {
        id: "crust", name: "Гурилан хавтгай", type: "single", required: true,
        options: [
          { id: "thin",    name: "Нимгэн хавтгай",    price: 0,    calories: 200, isDefault: true },
          { id: "thick",   name: "Зузаан хавтгай",    price: 500,  calories: 280 },
          { id: "stuffed", name: "Бяслагтай хавтгай", price: 1000, calories: 350 },
        ],
      },
      {
        id: "extra", name: "Нэмэлт", type: "multiple", required: false,
        options: [
          { id: "extra-pep", name: "Экстра пепперони", price: 1000, calories: 120, isDefault: true },
          { id: "jalapeno",  name: "Халапеньо",        price: 300,  calories: 10 },
          { id: "olive",     name: "Чидун жимс",       price: 400,  calories: 35 },
          { id: "mushroom",  name: "Мөөг",             price: 500,  calories: 25 },
        ],
      },
    ],
  },
  {
    id: "pizza-bbq-chicken",
    name: "BBQ Тахианы Пицца",
    category: "pizza",
    description: "BBQ соус, шарсан тахиа, улаан сонгино, моцарелла, кориандр",
    basePrice: 15000,
    baseCalories: 710,
    imageUrl: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=600&q=85",
    isNew: true,
    ingredientGroups: [
      {
        id: "crust", name: "Гурилан хавтгай", type: "single", required: true,
        options: [
          { id: "thin",  name: "Нимгэн хавтгай",    price: 0,    calories: 200, isDefault: true },
          { id: "thick", name: "Зузаан хавтгай",    price: 500,  calories: 280 },
        ],
      },
      {
        id: "sauce", name: "BBQ соус", type: "single", required: true,
        options: [
          { id: "bbq",     name: "Сонгодог BBQ",    price: 0,   calories: 40, isDefault: true },
          { id: "smoky",   name: "Утаанч BBQ",      price: 200, calories: 50 },
          { id: "honey",   name: "Зөгийн балтай BBQ",price: 300, calories: 60 },
        ],
      },
      {
        id: "chicken", name: "Тахиа", type: "single", required: true,
        options: [
          { id: "grilled",  name: "Шарсан тахиа",  price: 1500, calories: 150, isDefault: true },
          { id: "crispy",   name: "Хрустэй тахиа", price: 1800, calories: 200 },
        ],
      },
      {
        id: "extra", name: "Нэмэлт", type: "multiple", required: false,
        options: [
          { id: "onion",   name: "Улаан сонгино",  price: 200, calories: 15 },
          { id: "corn",    name: "Эрдэнэ шиш",    price: 200, calories: 30 },
          { id: "pepper",  name: "Соломон чинжүү", price: 300, calories: 20 },
          { id: "jal",     name: "Халапеньо",      price: 300, calories: 10 },
        ],
      },
    ],
  },
  {
    id: "pizza-four-cheese",
    name: "Дөрвөн Бяслаг Пицца",
    category: "pizza",
    description: "Моцарелла, чеддер, гауда, горгонзола — дөрвөн бяслагийн тансаг хослол",
    basePrice: 16000,
    baseCalories: 800,
    imageUrl: "https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?w=600&q=85",
    isPopular: true,
    ingredientGroups: [
      {
        id: "crust", name: "Гурилан хавтгай", type: "single", required: true,
        options: [
          { id: "thin",    name: "Нимгэн хавтгай",    price: 0,    calories: 200, isDefault: true },
          { id: "thick",   name: "Зузаан хавтгай",    price: 500,  calories: 280 },
          { id: "stuffed", name: "Бяслагтай хавтгай", price: 1000, calories: 350 },
        ],
      },
      {
        id: "sauce", name: "Соус", type: "single", required: true,
        options: [
          { id: "white",  name: "Цагаан бяслагны соус", price: 0,   calories: 60, isDefault: true },
          { id: "tomato", name: "Улаан буурцагны соус",  price: 0,   calories: 30 },
        ],
      },
      {
        id: "extra", name: "Нэмэлт", type: "multiple", required: false,
        options: [
          { id: "truffle", name: "Трюфелийн тос",   price: 1500, calories: 50 },
          { id: "honey",   name: "Зөгийн бал",      price: 300,  calories: 40 },
          { id: "walnut",  name: "Грецкийн самар",  price: 500,  calories: 90 },
        ],
      },
    ],
  },
  {
    id: "pizza-veggie",
    name: "Ногооны Пицца",
    category: "pizza",
    description: "Олон төрлийн шинэ ногоо, моцарелла, песто соус",
    basePrice: 13000,
    baseCalories: 560,
    imageUrl: "https://images.unsplash.com/photo-1590947132387-155cc02f3212?w=600&q=85",
    ingredientGroups: [
      {
        id: "crust", name: "Гурилан хавтгай", type: "single", required: true,
        options: [
          { id: "thin",   name: "Нимгэн хавтгай",      price: 0,   calories: 200, isDefault: true },
          { id: "wheat",  name: "Бүрэн үрийн хавтгай", price: 500, calories: 240 },
        ],
      },
      {
        id: "sauce", name: "Соус", type: "single", required: true,
        options: [
          { id: "pesto",  name: "Песто соус",           price: 0,   calories: 80, isDefault: true },
          { id: "tomato", name: "Улаан буурцагны соус", price: 0,   calories: 30 },
          { id: "white",  name: "Цагаан соус",          price: 200, calories: 60 },
        ],
      },
      {
        id: "toppings", name: "Ногоо", type: "multiple", required: false,
        options: [
          { id: "mushroom", name: "Мөөг",           price: 500, calories: 25, isDefault: true },
          { id: "bell",     name: "Соломон чинжүү", price: 300, calories: 20, isDefault: true },
          { id: "spinach",  name: "Хаш ногоо",      price: 300, calories: 10, isDefault: true },
          { id: "zucchini", name: "Гулираа хулуу",  price: 300, calories: 15 },
          { id: "tomato",   name: "Черри лоол",     price: 200, calories: 10 },
          { id: "corn",     name: "Эрдэнэ шиш",    price: 200, calories: 30 },
          { id: "broccoli", name: "Брокколи",       price: 400, calories: 20 },
          { id: "artichoke",name: "Артишок",        price: 600, calories: 25 },
        ],
      },
    ],
  },
  {
    id: "pizza-seafood",
    name: "Далайн Хоолны Пицца",
    category: "pizza",
    description: "Хясаа, чинжүү загас, сармал загас, моцарелла, ногоо",
    basePrice: 18000,
    baseCalories: 680,
    imageUrl: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&q=85",
    isNew: true,
    ingredientGroups: [
      {
        id: "crust", name: "Гурилан хавтгай", type: "single", required: true,
        options: [
          { id: "thin",  name: "Нимгэн хавтгай", price: 0,    calories: 200, isDefault: true },
          { id: "thick", name: "Зузаан хавтгай", price: 500,  calories: 280 },
        ],
      },
      {
        id: "seafood", name: "Далайн хоол", type: "multiple", required: true,
        options: [
          { id: "shrimp",  name: "Загас хорхой", price: 2000, calories: 100, isDefault: true },
          { id: "squid",   name: "Наймалж",      price: 2000, calories: 120, isDefault: true },
          { id: "mussel",  name: "Хясаа",        price: 1500, calories: 80 },
          { id: "salmon",  name: "Цурхай загас", price: 2500, calories: 150 },
        ],
      },
      {
        id: "sauce", name: "Соус", type: "single", required: true,
        options: [
          { id: "white",  name: "Цагаан соус",          price: 0,   calories: 60, isDefault: true },
          { id: "tomato", name: "Улаан буурцагны соус", price: 0,   calories: 30 },
        ],
      },
    ],
  },

  // ══════════════════════════════════════════════
  // РАП
  // ══════════════════════════════════════════════
  {
    id: "wrap-classic",
    name: "Тахианы Рап",
    category: "wrap",
    description: "Шинэхэн рап, хүссэнээрээ бүрдүүлж иде",
    basePrice: 7500,
    baseCalories: 380,
    imageUrl: "https://images.unsplash.com/photo-1540713434306-58505cf1b6fc?w=600&q=85",
    isNew: true,
    ingredientGroups: [
      {
        id: "tortilla", name: "Тортилла", type: "single", required: true,
        options: [
          { id: "plain",   name: "Энгийн цагаан", price: 0,   calories: 200, isDefault: true },
          { id: "wheat",   name: "Бүрэн үрийн",   price: 300, calories: 180 },
          { id: "spinach", name: "Хаш ногооны",   price: 300, calories: 190 },
          { id: "chili",   name: "Чили тортилла", price: 300, calories: 210 },
        ],
      },
      {
        id: "protein", name: "Уургийн эх үүсвэр", type: "single", required: true,
        options: [
          { id: "grilled", name: "Шарсан тахиа",   price: 2500, calories: 180, isDefault: true },
          { id: "crispy",  name: "Хрустэй тахиа",  price: 2800, calories: 220 },
          { id: "beef",    name: "Үхрийн мах",      price: 3000, calories: 280 },
          { id: "falafel", name: "Фалафель",        price: 2000, calories: 200 },
          { id: "shrimp",  name: "Загас хорхой",   price: 3500, calories: 120 },
        ],
      },
      {
        id: "sauce", name: "Соус", type: "multiple", required: false,
        options: [
          { id: "garlic",   name: "Часны соус", price: 0,   calories: 50, isDefault: true },
          { id: "ranch",    name: "Ранч",       price: 0,   calories: 70 },
          { id: "sriracha", name: "Шрача",      price: 200, calories: 30 },
          { id: "tzatziki", name: "Цацики",     price: 200, calories: 40 },
          { id: "pesto",    name: "Песто",      price: 300, calories: 80 },
        ],
      },
      {
        id: "veggies", name: "Ногоо", type: "multiple", required: false,
        options: [
          { id: "lettuce",  name: "Гөрөөсний навч", price: 0,   calories: 5,  isDefault: true },
          { id: "tomato",   name: "Улаан лоол",      price: 0,   calories: 10, isDefault: true },
          { id: "cucumber", name: "Өргөст хэмх",    price: 0,   calories: 8 },
          { id: "onion",    name: "Улаан сонгино",  price: 0,   calories: 10 },
          { id: "avocado",  name: "Авокадо",        price: 500, calories: 80 },
          { id: "jal",      name: "Халапеньо",      price: 200, calories: 8 },
        ],
      },
    ],
  },
  {
    id: "wrap-beef",
    name: "Үхрийн Махтай Рап",
    category: "wrap",
    description: "Шарсан үхрийн мах, BBQ соус, карамелт сонгино, авокадо, чеддер",
    basePrice: 10000,
    baseCalories: 520,
    imageUrl: "https://images.unsplash.com/photo-1551782450-17144efb9c50?w=600&q=85",
    isPopular: true,
    ingredientGroups: [
      {
        id: "tortilla", name: "Тортилла", type: "single", required: true,
        options: [
          { id: "plain", name: "Энгийн цагаан", price: 0,   calories: 200, isDefault: true },
          { id: "wheat", name: "Бүрэн үрийн",   price: 300, calories: 180 },
        ],
      },
      {
        id: "beef", name: "Үхрийн мах", type: "single", required: true,
        options: [
          { id: "sliced",  name: "Зүсэгдсэн үхрийн мах",  price: 3000, calories: 280, isDefault: true },
          { id: "ground",  name: "Бутаргасан үхрийн мах", price: 2500, calories: 260 },
          { id: "steak",   name: "Стейкийн мах",          price: 4000, calories: 320 },
        ],
      },
      {
        id: "sauce", name: "Соус", type: "multiple", required: false,
        options: [
          { id: "bbq",    name: "BBQ соус",    price: 0,   calories: 40, isDefault: true },
          { id: "garlic", name: "Часны соус",  price: 200, calories: 50 },
          { id: "ranch",  name: "Ранч",        price: 0,   calories: 70 },
        ],
      },
      {
        id: "extras", name: "Нэмэлт", type: "multiple", required: false,
        options: [
          { id: "cheddar",  name: "Чеддер бяслаг",    price: 500, calories: 100, isDefault: true },
          { id: "avocado",  name: "Авокадо",          price: 500, calories: 80,  isDefault: true },
          { id: "onion",    name: "Карамелт сонгино", price: 300, calories: 40 },
          { id: "lettuce",  name: "Гөрөөсний навч",   price: 0,   calories: 5 },
        ],
      },
    ],
  },
  {
    id: "wrap-caesar",
    name: "Цезарийн Рап",
    category: "wrap",
    description: "Цезарийн соус, шарсан тахиа, гөрөөсний навч, пармезан, крутон",
    basePrice: 9000,
    baseCalories: 450,
    imageUrl: "https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?w=600&q=85",
    ingredientGroups: [
      {
        id: "tortilla", name: "Тортилла", type: "single", required: true,
        options: [
          { id: "plain", name: "Энгийн цагаан", price: 0,   calories: 200, isDefault: true },
          { id: "wheat", name: "Бүрэн үрийн",   price: 300, calories: 180 },
        ],
      },
      {
        id: "protein", name: "Мах", type: "single", required: true,
        options: [
          { id: "grilled",  name: "Шарсан тахиа",   price: 2500, calories: 180, isDefault: true },
          { id: "salmon",   name: "Цурхай загас",   price: 4000, calories: 200 },
        ],
      },
      {
        id: "extras", name: "Нэмэлт", type: "multiple", required: false,
        options: [
          { id: "parmesan", name: "Пармезан бяслаг", price: 600, calories: 80, isDefault: true },
          { id: "crouton",  name: "Крутон",          price: 200, calories: 60 },
          { id: "egg",      name: "Халбагдсан өндөг", price: 500, calories: 80 },
          { id: "avocado",  name: "Авокадо",          price: 500, calories: 80 },
        ],
      },
    ],
  },
  {
    id: "wrap-falafel",
    name: "Фалафелийн Рап",
    category: "wrap",
    description: "Хрустэй фалафель, хумус, цацики, шинэ ногоо, жигнэсэн тортилла",
    basePrice: 8500,
    baseCalories: 420,
    imageUrl: "https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=600&q=85",
    ingredientGroups: [
      {
        id: "tortilla", name: "Тортилла", type: "single", required: true,
        options: [
          { id: "wheat",   name: "Бүрэн үрийн",  price: 0,   calories: 180, isDefault: true },
          { id: "spinach", name: "Хаш ногооны",  price: 300, calories: 190 },
          { id: "plain",   name: "Цагаан",       price: 0,   calories: 200 },
        ],
      },
      {
        id: "sauce", name: "Соус", type: "multiple", required: false,
        options: [
          { id: "hummus",   name: "Хумус",       price: 0,   calories: 60, isDefault: true },
          { id: "tzatziki", name: "Цацики",      price: 0,   calories: 40, isDefault: true },
          { id: "tahini",   name: "Тахини",      price: 200, calories: 70 },
          { id: "sriracha", name: "Шрача",       price: 200, calories: 30 },
        ],
      },
      {
        id: "veggies", name: "Ногоо", type: "multiple", required: false,
        options: [
          { id: "lettuce",  name: "Гөрөөсний навч", price: 0,   calories: 5,  isDefault: true },
          { id: "tomato",   name: "Улаан лоол",     price: 0,   calories: 10, isDefault: true },
          { id: "cucumber", name: "Өргөст хэмх",   price: 0,   calories: 8,  isDefault: true },
          { id: "onion",    name: "Улаан сонгино",  price: 0,   calories: 10 },
          { id: "pickle",   name: "Өрөвслийн",     price: 0,   calories: 5 },
        ],
      },
    ],
  },
  {
    id: "wrap-shrimp",
    name: "Загас Хорхойн Рап",
    category: "wrap",
    description: "Часны тосонд шарсан загас хорхой, авокадо, манго сальса, чили соус",
    basePrice: 12000,
    baseCalories: 480,
    imageUrl: "https://images.unsplash.com/photo-1551782450-17144efb9c50?w=600&q=85",
    isNew: true,
    ingredientGroups: [
      {
        id: "tortilla", name: "Тортилла", type: "single", required: true,
        options: [
          { id: "plain",  name: "Энгийн цагаан", price: 0,   calories: 200, isDefault: true },
          { id: "chili",  name: "Чили тортилла", price: 300, calories: 210 },
        ],
      },
      {
        id: "sauce", name: "Соус", type: "multiple", required: false,
        options: [
          { id: "mango",    name: "Манго сальса",  price: 300, calories: 50, isDefault: true },
          { id: "garlic",   name: "Часны соус",    price: 0,   calories: 50 },
          { id: "sriracha", name: "Шрача",         price: 200, calories: 30 },
          { id: "ranch",    name: "Ранч",          price: 0,   calories: 70 },
        ],
      },
      {
        id: "extras", name: "Нэмэлт", type: "multiple", required: false,
        options: [
          { id: "avocado",  name: "Авокадо",        price: 500, calories: 80, isDefault: true },
          { id: "lettuce",  name: "Гөрөөсний навч", price: 0,   calories: 5 },
          { id: "cabbage",  name: "Байцаа",         price: 0,   calories: 10 },
          { id: "jal",      name: "Халапеньо",      price: 200, calories: 8 },
        ],
      },
    ],
  },

  // ══════════════════════════════════════════════
  // БУРРИТТО
  // ══════════════════════════════════════════════
  {
    id: "burrito-classic",
    name: "Тахианы Бурритто",
    category: "burrito",
    description: "Дүүрэн бурритто, хүссэн бүх орцоор",
    basePrice: 9000,
    baseCalories: 520,
    imageUrl: "https://images.unsplash.com/photo-1618897996318-5a901fa6ca71?w=600&q=85",
    isPopular: true,
    ingredientGroups: [
      {
        id: "rice", name: "Будаа", type: "single", required: false,
        options: [
          { id: "white",   name: "Цагаан будаа",    price: 0,   calories: 200, isDefault: true },
          { id: "brown",   name: "Хүрэн будаа",     price: 200, calories: 190 },
          { id: "cilantro",name: "Кориандрын будаа",price: 300, calories: 210 },
          { id: "none",    name: "Будаагүй",        price: 0,   calories: 0 },
        ],
      },
      {
        id: "beans", name: "Буурцаг", type: "single", required: false,
        options: [
          { id: "black", name: "Хар буурцаг",   price: 300, calories: 120, isDefault: true },
          { id: "pinto", name: "Пинто буурцаг", price: 300, calories: 110 },
          { id: "refried",name: "Шарсан буурцаг",price: 400, calories: 150 },
          { id: "none",  name: "Буурцаггүй",    price: 0,   calories: 0 },
        ],
      },
      {
        id: "protein", name: "Мах", type: "single", required: true,
        options: [
          { id: "chicken", name: "Тахиа",         price: 2500, calories: 180, isDefault: true },
          { id: "beef",    name: "Үхрийн мах",    price: 3000, calories: 280 },
          { id: "pork",    name: "Гахайн мах",    price: 2500, calories: 250 },
          { id: "veggie",  name: "Ногооны хольц", price: 2000, calories: 120 },
        ],
      },
      {
        id: "extras", name: "Нэмэлт", type: "multiple", required: false,
        options: [
          { id: "cheese", name: "Бяслаг",       price: 500, calories: 100 },
          { id: "sour",   name: "Цөцгийн тос",  price: 400, calories: 90 },
          { id: "guac",   name: "Гуакамоле",    price: 600, calories: 80 },
          { id: "corn",   name: "Эрдэнэ шиш",  price: 200, calories: 30 },
          { id: "salsa",  name: "Сальса",       price: 300, calories: 25 },
          { id: "jal",    name: "Халапеньо",    price: 200, calories: 8 },
        ],
      },
    ],
  },
  {
    id: "burrito-beef",
    name: "Үхрийн Махтай Бурритто",
    category: "burrito",
    description: "Шарсан үхрийн мах, хар буурцаг, сальса, бяслаг, цөцгийн тос",
    basePrice: 11500,
    baseCalories: 680,
    imageUrl: "https://images.unsplash.com/photo-1599974579688-8dbdd335c77f?w=600&q=85",
    isNew: true,
    ingredientGroups: [
      {
        id: "rice", name: "Будаа", type: "single", required: false,
        options: [
          { id: "white",    name: "Цагаан будаа",    price: 0,   calories: 200, isDefault: true },
          { id: "cilantro", name: "Кориандрын будаа",price: 300, calories: 210 },
          { id: "none",     name: "Будаагүй",        price: 0,   calories: 0 },
        ],
      },
      {
        id: "beef", name: "Үхрийн мах", type: "single", required: true,
        options: [
          { id: "carne",   name: "Карне Асада",        price: 3500, calories: 300, isDefault: true },
          { id: "ground",  name: "Бутаргасан үхрийн", price: 3000, calories: 280 },
          { id: "steak",   name: "Стейкийн мах",      price: 4500, calories: 350 },
        ],
      },
      {
        id: "extras", name: "Нэмэлт", type: "multiple", required: false,
        options: [
          { id: "cheese",   name: "Монтерей бяслаг", price: 500, calories: 100, isDefault: true },
          { id: "sour",     name: "Цөцгийн тос",    price: 400, calories: 90,  isDefault: true },
          { id: "guac",     name: "Гуакамоле",      price: 600, calories: 80 },
          { id: "salsa",    name: "Шинэ сальса",    price: 300, calories: 25 },
          { id: "pico",     name: "Пико де Гало",   price: 300, calories: 20 },
          { id: "corn",     name: "Эрдэнэ шиш",    price: 200, calories: 30 },
        ],
      },
    ],
  },
  {
    id: "burrito-veggie",
    name: "Ногооны Бурритто",
    category: "burrito",
    description: "Грилд шарсан ногоо, хар буурцаг, гуакамоле, цагаан будаа",
    basePrice: 9500,
    baseCalories: 480,
    imageUrl: "https://images.unsplash.com/photo-1552332386-f8dd00dc2f85?w=600&q=85",
    ingredientGroups: [
      {
        id: "rice", name: "Будаа", type: "single", required: false,
        options: [
          { id: "brown",    name: "Хүрэн будаа",    price: 0,   calories: 190, isDefault: true },
          { id: "white",    name: "Цагаан будаа",   price: 0,   calories: 200 },
          { id: "none",     name: "Будаагүй",       price: 0,   calories: 0 },
        ],
      },
      {
        id: "protein", name: "Ургамлын уураг", type: "single", required: true,
        options: [
          { id: "veggie",   name: "Ногооны хольц", price: 2000, calories: 120, isDefault: true },
          { id: "falafel",  name: "Фалафель",      price: 2200, calories: 200 },
          { id: "tofu",     name: "Тофу",          price: 1800, calories: 100 },
        ],
      },
      {
        id: "veggies", name: "Шарсан ногоо", type: "multiple", required: false,
        options: [
          { id: "pepper",   name: "Соломон чинжүү", price: 300, calories: 20, isDefault: true },
          { id: "zucchini", name: "Гулираа хулуу",  price: 300, calories: 15, isDefault: true },
          { id: "corn",     name: "Эрдэнэ шиш",    price: 200, calories: 30, isDefault: true },
          { id: "mushroom", name: "Мөөг",           price: 400, calories: 20 },
          { id: "onion",    name: "Улаан сонгино",  price: 200, calories: 15 },
        ],
      },
      {
        id: "extras", name: "Нэмэлт", type: "multiple", required: false,
        options: [
          { id: "guac",  name: "Гуакамоле",   price: 600, calories: 80, isDefault: true },
          { id: "cheese",name: "Бяслаг",      price: 500, calories: 100 },
          { id: "sour",  name: "Цөцгийн тос", price: 400, calories: 90 },
          { id: "salsa", name: "Сальса",      price: 300, calories: 25 },
        ],
      },
    ],
  },
  {
    id: "burrito-shrimp",
    name: "Загас Хорхойн Бурритто",
    category: "burrito",
    description: "Тосонд шарсан загас хорхой, манго сальса, авокадо, кориандрын будаа",
    basePrice: 13000,
    baseCalories: 560,
    imageUrl: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=600&q=85",
    isNew: true,
    ingredientGroups: [
      {
        id: "rice", name: "Будаа", type: "single", required: false,
        options: [
          { id: "cilantro", name: "Кориандрын будаа", price: 0,   calories: 210, isDefault: true },
          { id: "white",    name: "Цагаан будаа",     price: 0,   calories: 200 },
          { id: "none",     name: "Будаагүй",         price: 0,   calories: 0 },
        ],
      },
      {
        id: "sauce", name: "Соус", type: "multiple", required: false,
        options: [
          { id: "mango",    name: "Манго сальса",   price: 300, calories: 50, isDefault: true },
          { id: "garlic",   name: "Часны тос",     price: 200, calories: 80 },
          { id: "chipotle", name: "Чипотле соус",  price: 300, calories: 60 },
          { id: "sriracha", name: "Шрача",         price: 200, calories: 30 },
        ],
      },
      {
        id: "extras", name: "Нэмэлт", type: "multiple", required: false,
        options: [
          { id: "avocado",  name: "Авокадо",       price: 500, calories: 80, isDefault: true },
          { id: "cheese",   name: "Бяслаг",        price: 500, calories: 100 },
          { id: "corn",     name: "Эрдэнэ шиш",   price: 200, calories: 30 },
          { id: "jal",      name: "Халапеньо",     price: 200, calories: 8 },
        ],
      },
    ],
  },
  {
    id: "burrito-breakfast",
    name: "Өглөөний Бурритто",
    category: "burrito",
    description: "Өндөг, бэйкон, бяслаг, картошка, сальса — өглөөний хүч",
    basePrice: 9500,
    baseCalories: 580,
    imageUrl: "https://images.unsplash.com/photo-1618897996318-5a901fa6ca71?w=600&q=85",
    ingredientGroups: [
      {
        id: "egg", name: "Өндөг", type: "single", required: true,
        options: [
          { id: "scrambled", name: "Эмтэрсэн өндөг",    price: 0,   calories: 150, isDefault: true },
          { id: "fried",     name: "Хайрсан өндөг",     price: 0,   calories: 180 },
          { id: "extra",     name: "Давхар өндөг",      price: 500, calories: 300 },
        ],
      },
      {
        id: "protein", name: "Мах", type: "single", required: false,
        options: [
          { id: "bacon",    name: "Бэйкон",         price: 800, calories: 120, isDefault: true },
          { id: "sausage",  name: "Жижиг хиам",    price: 700, calories: 150 },
          { id: "chicken",  name: "Тахиа",          price: 1000,calories: 180 },
          { id: "none",     name: "Махгүй",         price: 0,   calories: 0 },
        ],
      },
      {
        id: "extras", name: "Нэмэлт", type: "multiple", required: false,
        options: [
          { id: "cheese",  name: "Бяслаг",      price: 500, calories: 100, isDefault: true },
          { id: "potato",  name: "Шарсан төмс", price: 500, calories: 150, isDefault: true },
          { id: "salsa",   name: "Сальса",      price: 300, calories: 25 },
          { id: "sour",    name: "Цөцгийн тос", price: 400, calories: 90 },
          { id: "avocado", name: "Авокадо",     price: 500, calories: 80 },
        ],
      },
    ],
  },
];

// ─── Сэтүүд (бэлэн) ─────────────────────────────────────────────────────────
export const comboItems: MenuItem[] = [
  {
    id: "combo-classic",
    name: "Классик Сэт",
    category: "combo",
    description: "Классик Бургер + Шарсан Төмс (L) + Кока Кола 0.5л",
    basePrice: 15500,
    baseCalories: 955,
    imageUrl: "https://images.unsplash.com/photo-1561758033-d89a9ad46330?w=600&q=85",
    isPopular: true,
  },
  {
    id: "combo-bbq",
    name: "BBQ Сэт",
    category: "combo",
    description: "BBQ Бургер + Сонгиноны Бөгж + BBQ Дипс + Спрайт 0.5л",
    basePrice: 18000,
    baseCalories: 1100,
    imageUrl: "https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=600&q=85",
    isNew: true,
  },
  {
    id: "combo-chicken",
    name: "Тахианы Сэт",
    category: "combo",
    description: "Тахианы Рап + Наггет 6ш + Цацики соус + Спрайт 0.5л",
    basePrice: 13500,
    baseCalories: 780,
    imageUrl: "https://images.unsplash.com/photo-1562802378-063ec186a863?w=600&q=85",
  },
  {
    id: "combo-pizza",
    name: "Пиццаны Сэт",
    category: "combo",
    description: "2 зүсэм Пепперони Пицца + Сонгиноны Бөгж + Ундны Ус 0.5л",
    basePrice: 14000,
    baseCalories: 880,
    imageUrl: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&q=85",
  },
  {
    id: "combo-burrito",
    name: "Бурриттогийн Сэт",
    category: "combo",
    description: "Тахианы Бурритто + Наггет 4ш + Гуакамоле дипс + Хөргөсөн ундаа",
    basePrice: 16000,
    baseCalories: 1050,
    imageUrl: "https://images.unsplash.com/photo-1618897996318-5a901fa6ca71?w=600&q=85",
    isNew: true,
  },
  {
    id: "combo-family",
    name: "Гэр Бүлийн Сэт",
    category: "combo",
    description: "2 Бургер + 1 Пицца + 2 Шарсан Төмс (L) + 4 Ундаа",
    basePrice: 42000,
    baseCalories: 2800,
    imageUrl: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&q=85",
    isPopular: true,
  },
  {
    id: "combo-date",
    name: "Хосын Сэт",
    category: "combo",
    description: "2 Смэш Бургер + 2 Шарсан Төмс + 2 Шоколадны Зайрмаг + 2 Ундаа",
    basePrice: 36000,
    baseCalories: 2200,
    imageUrl: "https://images.unsplash.com/photo-1600891964092-4316c288032e?w=600&q=85",
    isNew: true,
  },
  {
    id: "combo-kids",
    name: "Хүүхдийн Сэт",
    category: "combo",
    description: "Жижиг Классик Бургер + Наггет 4ш + Жижиг Шарсан Төмс + Жүрж Жүүс",
    basePrice: 11000,
    baseCalories: 680,
    imageUrl: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=600&q=85",
  },
];

// ─── Дагалдах хоол ───────────────────────────────────────────────────────────
export const addonItems: MenuItem[] = [
  {
    id: "addon-fries-s",
    name: "Шарсан Төмс (S)",
    category: "addon",
    description: "Алтан шар, хрустэй шарсан төмс — жижиг хэмжээ",
    basePrice: 1000,
    baseCalories: 230,
    imageUrl: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=600&q=85",
  },
  {
    id: "addon-fries",
    name: "Шарсан Төмс (L)",
    category: "addon",
    description: "Алтан шар, хрустэй шарсан төмс — том хэмжээ",
    basePrice: 1500,
    baseCalories: 365,
    imageUrl: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=600&q=85",
    isPopular: true,
  },
  {
    id: "addon-sweet-fries",
    name: "Солодын Төмсний Шарсан",
    category: "addon",
    description: "Чихрийн манжин (sweet potato) шарсан — хрустэй, эрүүл",
    basePrice: 2000,
    baseCalories: 310,
    imageUrl: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=600&q=85",
    isNew: true,
  },
  {
    id: "addon-nuggets",
    name: "Тахианы Наггет 6ш",
    category: "addon",
    description: "6 ширхэг алтан шар хрустэй тахианы наггет",
    basePrice: 2500,
    baseCalories: 280,
    imageUrl: "https://images.unsplash.com/photo-1562802378-063ec186a863?w=600&q=85",
    isPopular: true,
  },
  {
    id: "addon-nuggets-12",
    name: "Тахианы Наггет 12ш",
    category: "addon",
    description: "12 ширхэг алтан шар хрустэй тахианы наггет",
    basePrice: 4500,
    baseCalories: 560,
    imageUrl: "https://images.unsplash.com/photo-1562802378-063ec186a863?w=600&q=85",
    isNew: true,
  },
  {
    id: "addon-onion",
    name: "Сонгиноны Бөгж",
    category: "addon",
    description: "Хурууны бөгж хэлбэрт, хрустэй шарсан сонгино",
    basePrice: 2000,
    baseCalories: 410,
    imageUrl: "https://images.unsplash.com/photo-1639024471283-03518883512d?w=600&q=85",
  },
  {
    id: "addon-mozz",
    name: "Моцарелла Зурвас",
    category: "addon",
    description: "Бяслагаар дүүрсэн хайрсан зурвас, маринара соустай",
    basePrice: 2500,
    baseCalories: 340,
    imageUrl: "https://images.unsplash.com/photo-1531749668029-2db88e4276c7?w=600&q=85",
  },
  {
    id: "addon-coleslaw",
    name: "Байцааны Салат",
    category: "addon",
    description: "Шинэ байцаа, лооль, гахайн чих, майонезтай коулслоу",
    basePrice: 1500,
    baseCalories: 180,
    imageUrl: "https://images.unsplash.com/photo-1604909052743-94e838986d24?w=600&q=85",
  },
  {
    id: "addon-salad",
    name: "Ногооны Салат",
    category: "addon",
    description: "Цезарийн соустай шинэ ногооны хольц салат",
    basePrice: 2000,
    baseCalories: 150,
    imageUrl: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&q=85",
    isNew: true,
  },
  {
    id: "addon-soup",
    name: "Тахианы Шөл",
    category: "addon",
    description: "Халуун тахианы шөл, ногоотой, лапштай",
    basePrice: 2500,
    baseCalories: 200,
    imageUrl: "https://images.unsplash.com/photo-1547592180-85f173990554?w=600&q=85",
  },
];

// ─── Ундаа ───────────────────────────────────────────────────────────────────
export const drinkItems: MenuItem[] = [
  {
    id: "drink-cola",
    name: "Кока Кола",
    category: "drink",
    description: "Хөргөсөн, хөөсөрхөг Кока Кола 0.5л",
    basePrice: 1000,
    baseCalories: 140,
    imageUrl: "https://images.unsplash.com/photo-1554866585-cd94860890b7?w=600&q=85",
    isPopular: true,
  },
  {
    id: "drink-cola-zero",
    name: "Кока Кола Зиро",
    category: "drink",
    description: "Чихрийн нэмэлтгүй, хөөсөрхөг Кока Кола 0.5л",
    basePrice: 1000,
    baseCalories: 0,
    imageUrl: "https://images.unsplash.com/photo-1554866585-cd94860890b7?w=600&q=85",
  },
  {
    id: "drink-sprite",
    name: "Спрайт",
    category: "drink",
    description: "Нимбэг-хулуу амтатай, хөөсөрхөг ундаа 0.5л",
    basePrice: 1000,
    baseCalories: 100,
    imageUrl: "https://images.unsplash.com/photo-1625772299848-391b6a87d7b3?w=600&q=85",
  },
  {
    id: "drink-fanta",
    name: "Фанта Жүрж",
    category: "drink",
    description: "Жүрж амтатай, хөөсөрхөг ундаа 0.5л",
    basePrice: 1000,
    baseCalories: 120,
    imageUrl: "https://images.unsplash.com/photo-1554866585-cd94860890b7?w=600&q=85",
    isNew: true,
  },
  {
    id: "drink-juice-apple",
    name: "Алим Жүүс",
    category: "drink",
    description: "100% байгалийн алимны жүүс 0.33л",
    basePrice: 1500,
    baseCalories: 120,
    imageUrl: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=600&q=85",
  },
  {
    id: "drink-juice-orange",
    name: "Жүрж Жүүс",
    category: "drink",
    description: "Шинэ дарж гаргасан жүрж жүүс 0.33л",
    basePrice: 1500,
    baseCalories: 110,
    imageUrl: "https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=600&q=85",
  },
  {
    id: "drink-mango-juice",
    name: "Манго Жүүс",
    category: "drink",
    description: "Тропикийн манго жүүс, цэвэр байгалийн 0.33л",
    basePrice: 1800,
    baseCalories: 130,
    imageUrl: "https://images.unsplash.com/photo-1546173159-315724a31696?w=600&q=85",
    isNew: true,
  },
  {
    id: "drink-lemonade",
    name: "Гэрийн Лимонад",
    category: "drink",
    description: "Шинэ нимбэгний лимонад, зөгийн балтай 0.5л",
    basePrice: 2000,
    baseCalories: 90,
    imageUrl: "https://images.unsplash.com/photo-1523677011781-c91d1bbe2f9e?w=600&q=85",
    isPopular: true,
  },
  {
    id: "drink-milkshake-vanilla",
    name: "Ванилийн Милкшейк",
    category: "drink",
    description: "Тансаг зөөлхөн ванилийн милкшейк 0.4л",
    basePrice: 3000,
    baseCalories: 350,
    imageUrl: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&q=85",
    isPopular: true,
  },
  {
    id: "drink-milkshake-choco",
    name: "Шоколадны Милкшейк",
    category: "drink",
    description: "Баян шоколадны милкшейк, ширхэглэн хайлсан 0.4л",
    basePrice: 3000,
    baseCalories: 380,
    imageUrl: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=600&q=85",
    isNew: true,
  },
  {
    id: "drink-water",
    name: "Ундны Ус",
    category: "drink",
    description: "Цэвэр эх булгийн ус 0.5л",
    basePrice: 500,
    baseCalories: 0,
    imageUrl: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=600&q=85",
  },
  {
    id: "drink-mineral",
    name: "Рашааны Ус",
    category: "drink",
    description: "Хөөсөрхөг минерал ус 0.5л",
    basePrice: 600,
    baseCalories: 0,
    imageUrl: "https://images.unsplash.com/photo-1523362628745-0c100150b504?w=600&q=85",
  },
  {
    id: "drink-iced-coffee",
    name: "Мөстэй Кофе",
    category: "drink",
    description: "Хөргөсөн эспрессо, сүүтэй мөстэй кофе 0.4л",
    basePrice: 2500,
    baseCalories: 120,
    imageUrl: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=600&q=85",
    isNew: true,
  },
];

// ─── Амттан ──────────────────────────────────────────────────────────────────
export const dessertItems: MenuItem[] = [
  {
    id: "dessert-brownie",
    name: "Шоколадны Брауни",
    category: "dessert",
    description: "Халуун, наалдамхай шоколадны брауни, ванилийн зайрмагтай",
    basePrice: 2500,
    baseCalories: 480,
    imageUrl: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=600&q=85",
    isPopular: true,
  },
  {
    id: "dessert-vanilla-ice",
    name: "Ванилийн Зайрмаг",
    category: "dessert",
    description: "Тансаг зөөлхөн ванилийн зайрмаг, 2 бөмбөлөг",
    basePrice: 1500,
    baseCalories: 200,
    imageUrl: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=600&q=85",
  },
  {
    id: "dessert-choco-ice",
    name: "Шоколадны Зайрмаг",
    category: "dessert",
    description: "Баян шоколадны амтатай зайрмаг, 2 бөмбөлөг",
    basePrice: 1500,
    baseCalories: 220,
    imageUrl: "https://images.unsplash.com/photo-1560008581-09826d1de69e?w=600&q=85",
  },
  {
    id: "dessert-cheesecake",
    name: "Бяслаг Бялуу",
    category: "dessert",
    description: "Нью-Йоркийн хэв маягийн бяслаг бялуу, жимсний соустай",
    basePrice: 3000,
    baseCalories: 320,
    imageUrl: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=600&q=85",
    isNew: true,
  },
  {
    id: "dessert-donut",
    name: "Шоколадны Донат",
    category: "dessert",
    description: "Зөөлхөн донат, шоколад глазурьтай, дэндүү амттай",
    basePrice: 1200,
    baseCalories: 280,
    imageUrl: "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=600&q=85",
    isPopular: true,
  },
  {
    id: "dessert-churros",
    name: "Чуррос",
    category: "dessert",
    description: "Испанийн сонгодог чуррос, нэмэлт шоколад дипстэй",
    basePrice: 2000,
    baseCalories: 360,
    imageUrl: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=600&q=85",
    isNew: true,
  },
  {
    id: "dessert-cookie",
    name: "Шоколадны Чипстэй Бялуу",
    category: "dessert",
    description: "Зөөлхөн, халуун бялуу, шоколадны чипстэй, дөнгөж шарсан",
    basePrice: 1500,
    baseCalories: 300,
    imageUrl: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=600&q=85",
  },
  {
    id: "dessert-tiramisu",
    name: "Тирамису",
    category: "dessert",
    description: "Итали дэлхийд алдарт тирамису, кофе-маскарпоне давхаргатай",
    basePrice: 3500,
    baseCalories: 380,
    imageUrl: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=600&q=85",
    isNew: true,
  },
];
