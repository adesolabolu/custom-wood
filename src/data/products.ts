






export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  popularity: number;
  category: string;
}

export const products: Product[] = [
  {
    id: 'p1',
    name: 'Walnut Edge Grain Cutting Board',
    price: 125,
    description: 'A beautiful edge grain cutting board crafted from premium walnut. Finished with food-safe mineral oil and beeswax.',
    image: "https://res.cloudinary.com/drzh5dzha/image/upload/v1782934473/woodwork-temp-db/walnut_cutting_board_1782779919055.jpg",
    popularity: 95,
    category: 'Kitchenware'
  },
  {
    id: 'p2',
    name: 'Oak Coaster Set (4)',
    price: 45,
    description: 'Set of four solid oak coasters with a minimalist square design. Coated in a water-resistant finish to protect your furniture.',
    image: "https://res.cloudinary.com/drzh5dzha/image/upload/v1782934464/woodwork-temp-db/oak_coasters_1782779929950.jpg",
    popularity: 88,
    category: 'Home Decor'
  },
  {
    id: 'p3',
    name: 'Cherry Wood Serving Tray',
    price: 85,
    description: 'Elegant serving tray made from solid cherry wood, featuring integrated handles and a raised edge.',
    image: "https://res.cloudinary.com/drzh5dzha/image/upload/v1782934442/woodwork-temp-db/cherry_serving_tray_1782779940581.jpg",
    popularity: 70,
    category: 'Kitchenware'
  },
  {
    id: 'p4',
    name: 'Ash Wood Desk Organizer',
    price: 65,
    description: 'Keep your workspace tidy with this multi-compartment desk organizer crafted from light ash wood.',
    image: "https://res.cloudinary.com/drzh5dzha/image/upload/v1782934433/woodwork-temp-db/ash_desk_organizer_1782779953178.jpg",
    popularity: 82,
    category: 'Office'
  },
  {
    id: 'p5',
    name: 'Maple Floating Shelf',
    price: 110,
    description: 'Minimalist floating shelf made of hard maple. Includes concealed mounting bracket for a clean look.',
    image: "https://res.cloudinary.com/drzh5dzha/image/upload/v1782934462/woodwork-temp-db/maple_floating_shelf_1782779963768.jpg",
    popularity: 91,
    category: 'Furniture'
  },
  {
    id: 'p6',
    name: 'Teak Bath Mat',
    price: 150,
    description: 'Spa-quality bath mat constructed from slatted teak wood. Naturally water-resistant and durable.',
    image: "https://res.cloudinary.com/drzh5dzha/image/upload/v1782934471/woodwork-temp-db/teak_bath_mat_1782779977344.jpg",
    popularity: 78,
    category: 'Bath'
  }
];
