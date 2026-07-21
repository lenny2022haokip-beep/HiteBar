export const STORE_WHATSAPP = "919673483659";
export const MIN_ORDER_VALUE = 1200;
export const DELIVERY_FEE = 0;
export const FREE_DELIVERY_RADIUS = "10km from Kausar Baug, Kondhwa, Pune";

export const menuData = [
  // ---------------- BIRYANI & PULAO (BULK) ----------------
  { id: "bir1", name: "Hyderabadi Beef Dum Biryani (1.5kg Handi)", description: "Slow-cooked aromatic basmati rice layered with tender beef cuts, saffron, fried onions, mint & spiced gravy. Serves 6-8 people.", price: 1650, category: "Biryani & Pulao (Bulk)", unit: "1.5kg Handi (Serves 6-8)", image: "/menu/biryani-beef-handi.jpg" },
  { id: "bir2", name: "Chicken Dum Biryani (1kg Handi)", description: "Tender chicken pieces marinated in yogurt & secret spices, dum-cooked with long-grain basmati rice. Serves 4-5 people.", price: 1350, category: "Biryani & Pulao (Bulk)", unit: "1kg Handi (Serves 4-5)", image: "/menu/biryani-chicken-handi.jpg" },
  { id: "bir3", name: "Royal Mutton Dum Biryani (1kg Handi)", description: "Prime mutton cuts cooked in rich royal spices & fragrant basmati rice in a sealed clay handi. Serves 4-5 people.", price: 1950, category: "Biryani & Pulao (Bulk)", unit: "1kg Handi (Serves 4-5)", image: "/menu/biryani-mutton-handi.jpg" },
  { id: "bir4", name: "Egg Biryani Feast Pack (1kg Handi)", description: "Masala hard-boiled eggs layered in caramelized onion gravy and spiced basmati rice. Serves 4-5 people.", price: 1250, category: "Biryani & Pulao (Bulk)", unit: "1kg Handi (Serves 4-5)", image: "/menu/biryani-egg-handi.jpg" },
  { id: "grv2", name: "Royal Chicken Pulao (1.5kg Handi)", description: "Fragrant basmati rice dum-cooked with succulent spiced chicken cuts, fried onions, mint & whole spices. Serves 6-8 people.", price: 1350, category: "Biryani & Pulao (Bulk)", unit: "1.5kg Handi (Serves 6-8)", image: "/menu/chicken-pulao.jpg" },
  { id: "bir5", name: "Grand Beef Biryani Family Handi (3kg)", description: "Mega party portion of rich beef dum biryani with double meat portion, salan & raita bowls. Serves 12-15 people.", price: 3200, category: "Biryani & Pulao (Bulk)", unit: "3kg Handi (Serves 12-15)", image: "/menu/biryani-beef-mega.jpg" },

  // ---------------- GRAVY & RICE (BULK) ----------------
  { id: "grv1", name: "Chicken Masala Special Gravy (1.5kg Handi)", description: "Rich, aromatic, spiced tomato-onion chicken masala gravy cooked with tender chicken cuts. Serves 6-8 people.", price: 1450, category: "Gravy & Rice (Bulk)", unit: "1.5kg Handi (Serves 6-8)", image: "/menu/chicken-masala.jpg" },
  { id: "grv3", name: "Fragrant Basmati Zeera Rice (1.5kg Pot)", description: "Fluffy long-grain basmati rice tempered with roasted cumin seeds, ghee & fresh coriander. Serves 6-8 people.", price: 750, category: "Gravy & Rice (Bulk)", unit: "1.5kg Pot (Serves 6-8)", image: "/menu/zeera-rice.jpg" },

  // ---------------- BURGERS & SNACKS (BULK) ----------------
  { id: "bgb1", name: "Flame-Grilled Beef Burger Slider Box (Pack of 8)", description: "8 mini flame-grilled beef sliders with melted cheddar, pickles, house sauce & caramelized onions in soft brioche buns.", price: 1650, category: "Burgers & Snacks (Bulk)", unit: "Box of 8 Sliders", image: "/menu/burger-beef-sliders.jpg" },
  { id: "bgb2", name: "Crispy Chicken Burger Feast (Pack of 6)", description: "6 crispy golden-fried chicken breast burgers loaded with shredded lettuce & garlic mayo.", price: 1550, category: "Burgers & Snacks (Bulk)", unit: "Box of 6 Burgers", image: "/menu/burger-chicken-feast.jpg" },
  { id: "bgb3", name: "Paneer Tikka Burger Party Box (Pack of 6)", description: "6 thick grilled paneer steak burgers seasoned with smoky tandoori tikka masala & mint spread.", price: 1450, category: "Burgers & Snacks (Bulk)", unit: "Box of 6 Burgers", image: "/menu/burger-paneer-box.jpg" },
  { id: "bgb4", name: "Classic Veg Burger Party Bundle (Pack of 6)", description: "6 crisp vegetable patty burgers topped with lettuce, tomato & creamy burger sauce.", price: 1200, category: "Burgers & Snacks (Bulk)", unit: "Box of 6 Burgers", image: "/menu/burger-veg-bundle.jpg" },
  { id: "snk1", name: "Crispy Chicken Popcorn Party Bucket (1kg Bucket)", description: "Golden-fried crunchy bite-sized chicken popcorn nuggets served with garlic mayo dip. Serves 6-8 people.", price: 850, category: "Burgers & Snacks (Bulk)", unit: "1kg Bucket (Serves 6-8)", image: "/menu/chicken-popcorn.jpg" },
  { id: "bgb5", name: "Hite House Combo Box (4 Burgers + Large Fries + 2L Drink)", description: "2 Chicken Burgers + 2 Beef Burgers + Large Peri-Peri Fries Box + 2L Soft Drink.", price: 1500, category: "Burgers & Snacks (Bulk)", unit: "Catering Box", image: "/menu/burger-combo-box.jpg" },

  // ---------------- SHAWARMA & SIDES (BULK) ----------------
  { id: "shw1", name: "Chicken Shawarma Party Roll Box (Pack of 6)", description: "6 slow-roasted chicken shawarma rolls packed with garlic toum, pickles, fries & grilled chicken wrapped in soft khabus bread.", price: 1250, category: "Shawarma & Sides (Bulk)", unit: "Box of 6 Rolls", image: "/menu/shawarma-party-box.jpg" },
  { id: "shw2", name: "Chicken Shawarma Salad Catering Bowl (1.5kg)", description: "Fresh Mediterranean salad bowl filled with juicy roasted shawarma chicken, diced tomatoes, cucumbers, pickles, parsley & tahini garlic dressing. Serves 6-8 people.", price: 1150, category: "Shawarma & Sides (Bulk)", unit: "1.5kg Bowl (Serves 6-8)", image: "/menu/shawarma-salad-bowl.jpg" },
  { id: "sde1", name: "French Fries Catering Party Platter (1.2kg)", description: "Golden crispy French Fries platter served with Peri-Peri spice shaker and house garlic mayo dip box. Serves 6-8 people.", price: 650, category: "Shawarma & Sides (Bulk)", unit: "1.2kg Platter (Serves 6-8)", image: "/menu/french-fries-platter.jpg" },

  // ---------------- BULK JUICES & DRINKS ----------------
  { id: "drk0", name: "Lahori Zeera Refreshing Soda Crate (6 x 750ml)", description: "6 chilled 750ml bottles of authentic tangy Cumin Lahori Zeera sparkling soda.", price: 450, category: "Bulk Juices & Drinks", unit: "Crate of 6 Bottles", image: "/menu/lahori-zeera.jpg" },
  { id: "drk1", name: "Fresh Alphonso Mango Juice Carafe (2.5 Litres)", description: "Rich, chilled, 100% natural Alphonso mango pulp juice carafe. Serves 8-10 glasses.", price: 650, category: "Bulk Juices & Drinks", unit: "2.5L Carafe (8-10 Servings)", image: "/menu/mango-juice-carafe.jpg" },
  { id: "drk2", name: "Fresh Mint Lime Mojito Pitcher (3 Litres)", description: "Refreshing non-alcoholic mint & lime mojito pitcher with crushed ice. Serves 10-12 glasses.", price: 700, category: "Bulk Juices & Drinks", unit: "3L Pitcher (10-12 Servings)", image: "/menu/mint-mojito-pitcher.jpg" },
  { id: "drk3", name: "Cool Blue Mocktail Party Pitcher (3 Litres)", description: "Fruity blue curacao style mocktail pitcher, ice-cold & effervescent. Serves 10-12 glasses.", price: 750, category: "Bulk Juices & Drinks", unit: "3L Pitcher (10-12 Servings)", image: "/menu/cool-blue-pitcher.jpg" },
  { id: "drk4", name: "Chilled Frothy Cold Coffee Carafe (2 Litres)", description: "Creamy, chilled espresso cold coffee carafe. Serves 6-8 glasses.", price: 650, category: "Bulk Juices & Drinks", unit: "2L Carafe (6-8 Servings)", image: "/menu/cold-coffee-carafe.jpg" }
];

export const categories = ["Biryani & Pulao (Bulk)", "Gravy & Rice (Bulk)", "Burgers & Snacks (Bulk)", "Shawarma & Sides (Bulk)", "Bulk Juices & Drinks"];

export function formatINR(n) {
  return n.toLocaleString("en-IN");
}
