const menuData = [

  // =========================
  // MAIN COURSE
  // =========================

  {
    id: 1,
    name: "Dal Baati Churma",
    category: "Main Course",
    price: 250,
    rating: 4.8,
    img: "/daal-bati.jpg",
  },

  {
    id: 2,
    name: "Laal Maas",
    category: "Main Course",
    price: 400,
    rating: 4.9,
    img: "/Rajasthani-Laal-Maas.jpg",
  },

  {
    id: 3,
    name: "Paneer Butter Masala",
    category: "Main Course",
    price: 280,
    rating: 4.7,
    img: "/paneer-butter-masala.jpg",
  },

  {
    id: 4,
    name: "Gatte Ki Sabzi",
    category: "Main Course",
    price: 240,
    rating: 4.8,
    img: "/gatte-ki-sabzi.jpg",
  },

  {
    id: 5,
    name: "Rajma Chawal",
    category: "Main Course",
    price: 230,
    rating: 4.7,
    img: "/rajma.webp",
  },

  {
    id: 6,
    name: "Chole Bhature",
    category: "Main Course",
    price: 260,
    rating: 4.9,
    img: "/chole.webp",
  },

  {
    id: 7,
    name: "Royal Rajasthani Thali",
    category: "Main Course",
    price: 599,
    rating: 5.0,
    img: "/thali.jpg",
  },

  {
    id: 8,
    name: "Special Veg Thali",
    category: "Main Course",
    price: 399,
    rating: 4.8,
    img: "/simple thali.webp",
  },

  {
    id: 9,
    name: "Deluxe Indian Thali",
    category: "Main Course",
    price: 499,
    rating: 4.9,
    img: "/delux thali.webp",
  },

  {
    id: 10,
    name: "Mini Thali",
    category: "Main Course",
    price: 249,
    rating: 4.6,
    img: "/mini thali.webp",
  },

  // =========================
  // STARTERS
  // =========================

  {
    id: 11,
    name: "Paneer Tikka",
    category: "Starters",
    price: 220,
    rating: 4.8,
    img: "/paneer-tikka.webp",
  },

  {
    id: 12,
    name: "Veg Spring Roll",
    category: "Starters",
    price: 190,
    rating: 4.7,
    img: "/spring-rolls.jpg",
  },

  {
    id: 13,
    name: "Cheese Balls",
    category: "Starters",
    price: 220,
    rating: 4.8,
    img: "/cheese balls.jpg",
  },

  {
    id: 14,
    name: "Crispy Corn",
    category: "Starters",
    price: 210,
    rating: 4.7,
    img: "/corn.jpg",
  },

  {
    id: 15,
    name: "Veg Momos",
    category: "Starters",
    price: 180,
    rating: 4.8,
    img: "/momo.jpg",
  },

  // =========================
  // FAST FOOD
  // =========================

  {
    id: 16,
    name: "Cheese Pizza",
    category: "Fast Food",
    price: 320,
    rating: 4.9,
    img: "/pizza.jpg",
  },

  {
    id: 17,
    name: "Veg Burger",
    category: "Fast Food",
    price: 150,
    rating: 4.6,
    img: "/burger.webp",
  },

  {
    id: 18,
    name: "Cheese Sandwich",
    category: "Fast Food",
    price: 170,
    rating: 4.6,
    img: "/cheese sandwich.jpg",
  },

  {
    id: 19,
    name: "French Fries",
    category: "Fast Food",
    price: 140,
    rating: 4.7,
    img: "/frise.webp",
  },

  {
    id: 20,
    name: "White Sauce Pasta",
    category: "Fast Food",
    price: 260,
    rating: 4.8,
    img: "/white-sauce-pasta.webp",
  },

  // =========================
  // DRINKS
  // =========================

  {
    id: 21,
    name: "Cold Coffee",
    category: "Drinks",
    price: 140,
    rating: 4.7,
    img: "/ice-coffee.webp",
  },

  {
    id: 22,
    name: "Mint Mojito",
    category: "Drinks",
    price: 180,
    rating: 4.9,
    img: "/Mint Mojito.webp",
  },

  {
    id: 23,
    name: "Orange Juice",
    category: "Drinks",
    price: 130,
    rating: 4.7,
    img: "/orange juice.webp",
  },

  {
    id: 24,
    name: "Watermelon Juice",
    category: "Drinks",
    price: 140,
    rating: 4.8,
    img: "/watermealon juice.webp",
  },

  // =========================
  // SHAKES
  // =========================

  {
    id: 25,
    name: "Oreo Shake",
    category: "Shakes",
    price: 180,
    rating: 4.9,
    img: "/Oreo Shake.webp",
  },

  {
    id: 26,
    name: "KitKat Shake",
    category: "Shakes",
    price: 220,
    rating: 4.8,
    img: "/Kitkat_Shake-1.jpg",
  },

  {
    id: 27,
    name: "Banana Shake",
    category: "Shakes",
    price: 170,
    rating: 4.6,
    img: "/banana shake.webp",
  },

  {
    id: 28,
    name: "Mango Shake",
    category: "Shakes",
    price: 190,
    rating: 4.8,
    img: "/mango shake.webp",
  },

  // =========================
  // ICE CREAM
  // =========================

  {
    id: 29,
    name: "Vanilla Ice Cream",
    category: "Ice Cream",
    price: 120,
    rating: 4.7,
    img: "/vanilla-ice-cream.jpg",
  },

  {
    id: 30,
    name: "Black Currant Ice Cream",
    category: "Ice Cream",
    price: 170,
    rating: 4.8,
    img: "/ice cream.webp",
  },

  {
    id: 31,
    name: "Chocolate Ice Cream",
    category: "Ice Cream",
    price: 150,
    rating: 4.8,
    img: "/Chocolate-Ice-Cream.jpg",
  },

  {
    id: 32,
    name: "Kesar Pista Ice Cream",
    category: "Ice Cream",
    price: 180,
    rating: 4.9,
    img: "/kesar-pista-ice.jpg",
  },

  // =========================
  // COLD SWEETS
  // =========================

  {
    id: 33,
    name: "Kulfi Faluda",
    category: "Cold Sweet",
    price: 180,
    rating: 4.8,
    img: "/kulfi.png",
  },

  {
    id: 34,
    name: "Matka Kulfi",
    category: "Cold Sweet",
    price: 160,
    rating: 4.8,
    img: "/MatkaKulfi.webp",
  },

  {
    id: 35,
    name: "Ice Cream Faluda",
    category: "Cold Sweet",
    price: 230,
    rating: 4.9,
    img: "/ice faluda.webp",
  },

  // =========================
  // SWEETS
  // =========================

  {
    id: 36,
    name: "Ghewar",
    category: "Sweets",
    price: 150,
    rating: 4.8,
    img: "/Ghevar.jpg",
  },

  {
    id: 37,
    name: "Jalebi",
    category: "Sweets",
    price: 120,
    rating: 4.9,
    img: "/Jalebi.jpg",
  },

  {
    id: 38,
    name: "Kaju Katli",
    category: "Sweets",
    price: 260,
    rating: 4.8,
    img: "/kaaju katli.jpg",
  },

  {
    id: 39,
    name: "Besan Laddu",
    category: "Sweets",
    price: 140,
    rating: 4.7,
    img: "/laddu.webp",
  },

  {
    id: 40,
    name: "Rasgulla",
    category: "Sweets",
    price: 160,
    rating: 4.8,
    img: "/rasgulla.webp",
  },

];

export default menuData;