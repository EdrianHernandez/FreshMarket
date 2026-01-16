// The import for Category and Product types is removed as they are not needed in JavaScript.

export const CATEGORIES = [
  { id: 'all', name: 'All Groceries', icon: '🏪' },
  { id: 'fruits', name: 'Fresh Fruits', icon: '🍎' },
  { id: 'vegetables', name: 'Vegetables', icon: '🥦' },
  { id: 'dairy', name: 'Dairy & Eggs', icon: '🧀' },
  { id: 'bakery', name: 'Bakery', icon: '🥖' },
];

export const PRODUCTS = [
  // Fruits
  {
    id: 'f1',
    name: 'Gala Apples',
    category: 'fruits',
    price: 2.99,
    image: 'https://picsum.photos/seed/apples/300/300',
    weightOptions: ['1 lb', '3 lbs bag', 'Each'],
    isOrganic: true,
  },
  {
    id: 'f2',
    name: 'Cavendish Bananas',
    category: 'fruits',
    price: 0.69,
    image: 'https://picsum.photos/seed/bananas/300/300',
    weightOptions: ['1 lb', 'Bunch', 'Each'],
    discount: 10,
  },
  {
    id: 'f3',
    name: 'Strawberries',
    category: 'fruits',
    price: 4.99,
    image: 'https://picsum.photos/seed/strawberries/300/300',
    weightOptions: ['1 lb shell', '2 lb shell'],
  },
  // Vegetables
  {
    id: 'v1',
    name: 'Organic Spinach',
    category: 'vegetables',
    price: 3.49,
    image: 'https://picsum.photos/seed/spinach/300/300',
    weightOptions: ['5 oz bag', '10 oz bag'],
    isOrganic: true,
  },
  {
    id: 'v2',
    name: 'Carrots',
    category: 'vegetables',
    price: 1.29,
    image: 'https://picsum.photos/seed/carrots/300/300',
    weightOptions: ['1 lb bag', 'Bunch'],
  },
  {
    id: 'v3',
    name: 'Red Bell Pepper',
    category: 'vegetables',
    price: 1.50,
    image: 'https://picsum.photos/seed/pepper/300/300',
    weightOptions: ['Each'],
  },
  // Dairy
  {
    id: 'd1',
    name: 'Whole Milk',
    category: 'dairy',
    price: 3.99,
    image: 'https://picsum.photos/seed/milk/300/300',
    weightOptions: ['1 Gallon', 'Half Gallon'],
  },
  {
    id: 'd2',
    name: 'Greek Yogurt',
    category: 'dairy',
    price: 1.19,
    image: 'https://picsum.photos/seed/yogurt/300/300',
    weightOptions: ['5.3 oz', '32 oz tub'],
    discount: 15,
  },
  {
    id: 'd3',
    name: 'Cheddar Cheese',
    category: 'dairy',
    price: 5.49,
    image: 'https://picsum.photos/seed/cheese/300/300',
    weightOptions: ['8 oz block', '16 oz block'],
  },
  // Bakery
  {
    id: 'b1',
    name: 'Sourdough Bread',
    category: 'bakery',
    price: 4.49,
    image: 'https://picsum.photos/seed/bread/300/300',
    weightOptions: ['Loaf'],
    isOrganic: true,
  },
  {
    id: 'b2',
    name: 'Croissants',
    category: 'bakery',
    price: 5.99,
    image: 'https://picsum.photos/seed/croissants/300/300',
    weightOptions: ['4 ct', '6 ct'],
  },
];
