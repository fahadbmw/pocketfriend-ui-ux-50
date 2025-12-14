// Restaurant data - Single source of truth for all restaurant listings
// Only Dough Pizzeria & Pasta Ashwood is active

export interface Restaurant {
  id: string;
  name: string;
  tagline: string;
  description: string;
  fullDescription: string;
  cuisine: string[];
  cuisineDisplay: string;
  image: string;
  gallery: string[];
  discount: number;
  discountLabel: string;
  rating: number;
  reviews: number;
  location: string;
  suburb: string;
  state: string;
  postcode: string;
  address: string;
  phone: string;
  website?: string;
  hours: {
    today: string;
    full: string[];
  };
  features: string[];
  distance?: number;
  isActive: boolean;
}

export interface Deal {
  id: string;
  restaurantId: string;
  title: string;
  description: string;
  terms: string[];
  validUntil?: string;
}

// Default food images - using existing assets
import pizzaImg from "@/assets/pizza-restaurant.jpg";

export const restaurants: Restaurant[] = [
  {
    id: "dough-pizzeria-ashwood",
    name: "Dough Pizzeria & Pasta Ashwood",
    tagline: "Savory Deals Await!",
    description: "Pizza • Pasta • Italian Cuisine",
    fullDescription: "Savor every slice and twirl with Dough Pizzeria — where Ashwood's best pizza and pasta meet unbeatable 30% discounts only on PocketFriend. Authentic pizza & pasta classics with a juicy 30% OFF across the entire menu. Melbourne's favorite Ashwood spot!",
    cuisine: ["Pizza", "Pasta", "Italian"],
    cuisineDisplay: "Pizza • Pasta • Italian Cuisine",
    image: pizzaImg,
    gallery: [pizzaImg, pizzaImg, pizzaImg],
    discount: 30,
    discountLabel: "30% OFF — Entire Menu",
    rating: 4.5,
    reviews: 127,
    location: "Ashwood, VIC 3147",
    suburb: "Ashwood",
    state: "VIC",
    postcode: "3147",
    address: "211 High St Rd, Ashwood VIC 3147, Australia",
    phone: "+61 3 9888 1234",
    website: "https://doughpizzeria.com.au",
    hours: {
      today: "11:00 AM – 10:30 PM",
      full: [
        "Monday: 11:00 AM – 10:30 PM",
        "Tuesday: 11:00 AM – 10:30 PM",
        "Wednesday: 11:00 AM – 10:30 PM",
        "Thursday: 11:00 AM – 10:30 PM",
        "Friday: 11:00 AM – 11:00 PM",
        "Saturday: 11:00 AM – 11:00 PM",
        "Sunday: 11:00 AM – 10:00 PM",
      ],
    },
    features: ["Dine-in", "Takeaway", "Delivery", "BYO Wine"],
    distance: 2.3,
    isActive: true,
  },
];

export const deals: Deal[] = [
  {
    id: "dough-30-off-menu",
    restaurantId: "dough-pizzeria-ashwood",
    title: "30% OFF — Entire Menu",
    description: "Enjoy 30% off all menu items — from classic wood-fired pizzas to signature pastas and irresistible sides. Redeem in store by scanning the QR code at checkout.",
    terms: [
      "Valid for dine-in, takeaway & delivery",
      "Cannot be combined with other offers",
      "One redemption per visit",
      "Show QR code to staff before ordering",
    ],
    validUntil: "31 Dec 2025",
  },
];

// Helper functions
export const getActiveRestaurants = (): Restaurant[] => {
  return restaurants.filter((r) => r.isActive);
};

export const getRestaurantById = (id: string): Restaurant | undefined => {
  return restaurants.find((r) => r.id === id);
};

export const getDealsByRestaurantId = (restaurantId: string): Deal[] => {
  return deals.filter((d) => d.restaurantId === restaurantId);
};

export const getRestaurantDeal = (restaurantId: string): Deal | undefined => {
  return deals.find((d) => d.restaurantId === restaurantId);
};
