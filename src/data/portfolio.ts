export interface Project {
  id: string;
  slug: string;
  category: string;
  title: string;
  shortDescription: string;
  descriptions: string[];
  coverImage: string;
  images: string[];
}

export const projects: Project[] = [
  {
    id: '1',
    slug: 'light-pine-kitchen',
    category: 'Kitchens',
    title: 'Light Pine Kitchen',
    shortDescription: 'A kitchen styled with light and airy pine to create a fresh and open feeling.',
    descriptions: [
      'We transform raw timber into refined architectural elements that stand the test of time.',
      'Our custom kitchens combine practical storage solutions with stunning visual appeal.'
    ],
    coverImage: 'https://res.cloudinary.com/drzh5dzha/image/upload/v1782491623/woodwork_template/669a78fdd29c1ac1e669b14c_pexels-heyho-6933861%20%281%29.webp',
    images: [
      'https://res.cloudinary.com/drzh5dzha/image/upload/v1782491623/woodwork_template/669a78fdd29c1ac1e669b14c_pexels-heyho-6933861%20%281%29.webp',
      'https://res.cloudinary.com/drzh5dzha/image/upload/v1782491630/woodwork_template/669a78ffbc9370c4a80979fe_pexels-heyho-6933859%20%281%29.webp',
      'https://res.cloudinary.com/drzh5dzha/image/upload/v1782491635/woodwork_template/669a7901fb10c5774c664444_pexels-heyho-6933853%20%281%29.webp',
      'https://res.cloudinary.com/drzh5dzha/image/upload/v1782491639/woodwork_template/669a790468fdc286c106c8b3_pexels-heyho-6933776%20%281%29.webp'
    ]
  },
  {
    id: '2',
    slug: 'airy-apartment',
    category: 'Commercial',
    title: 'Airy Apartment',
    shortDescription: 'A light and fresh apartment with wood accenting in the bedroom and bathroom, alongside an ash divider between the sleeping and living area.',
    descriptions: [
      'Structural integrity meets architectural beauty in our custom outdoor woodworking projects.',
      'Elevate your home with bespoke carpentry that seamlessly blends functionality with enduring aesthetics.'
    ],
    coverImage: 'https://res.cloudinary.com/drzh5dzha/image/upload/v1782491650/woodwork_template/669a79d304e92faa0fc6560f_pexels-heyho-7045993%20%281%29.webp',
    images: [
      'https://res.cloudinary.com/drzh5dzha/image/upload/v1782491650/woodwork_template/669a79d304e92faa0fc6560f_pexels-heyho-7045993%20%281%29.webp',
      'https://res.cloudinary.com/drzh5dzha/image/upload/v1782491653/woodwork_template/669a79d6d0e840c8baa2cc1f_pexels-heyho-7045994%20%281%29.webp',
      'https://res.cloudinary.com/drzh5dzha/image/upload/v1782491663/woodwork_template/669a79d89c005e915c86f7ce_pexels-heyho-7046005%20%281%29.webp',
      'https://res.cloudinary.com/drzh5dzha/image/upload/v1782491669/woodwork_template/669a79db44ad6d52e71481ef_pexels-heyho-7046007%20%281%29.webp'
    ]
  },
  {
    id: '3',
    slug: 'modern-kitchen',
    category: 'Kitchens',
    title: 'Modern Kitchen',
    shortDescription: 'A great example of matching wood colors and textures to blend perfectly with the rest of the home.',
    descriptions: [
      'Experience culinary inspiration surrounded by handcrafted cabinetry and flawless countertops.',
      'We design and build kitchen spaces that serve as the warm, inviting heart of your home.'
    ],
    coverImage: 'https://res.cloudinary.com/drzh5dzha/image/upload/v1782491590/woodwork_template/669a74c38cff10f8c353982f_pexels-heyho-7061393.webp',
    images: [
      'https://res.cloudinary.com/drzh5dzha/image/upload/v1782491590/woodwork_template/669a74c38cff10f8c353982f_pexels-heyho-7061393.webp',
      'https://res.cloudinary.com/drzh5dzha/image/upload/v1782491596/woodwork_template/669a74c53733ff7672abac62_pexels-heyho-7061397.webp',
      'https://res.cloudinary.com/drzh5dzha/image/upload/v1782491605/woodwork_template/669a74c922765732f9a96424_pexels-heyho-7061400.webp',
      'https://res.cloudinary.com/drzh5dzha/image/upload/v1782491611/woodwork_template/669a74cb5182009a6624676d_pexels-heyho-7061421.webp'
    ]
  },
  {
    id: '4',
    slug: 'hamptons-manor-house',
    category: 'Commercial',
    title: 'Hamptons Manor House',
    shortDescription: 'Our help renovating an old manor house in the hamptons, complete with wooden flooring, doors and bespoke features.',
    descriptions: [
      'From elegant cabinetry to structural enhancements, we bring an artisan\'s touch to modern living.',
      'Sustainable sourcing meets masterful execution in every project we take on.'
    ],
    coverImage: 'https://res.cloudinary.com/drzh5dzha/image/upload/v1782491681/woodwork_template/669a7a679b12a50aa126791c_pexels-heyho-8134763%20%281%29.webp',
    images: [
      'https://res.cloudinary.com/drzh5dzha/image/upload/v1782491681/woodwork_template/669a7a679b12a50aa126791c_pexels-heyho-8134763%20%281%29.webp',
      'https://res.cloudinary.com/drzh5dzha/image/upload/v1782491690/woodwork_template/669a7a6915896f240c3cc90d_pexels-heyho-8134773%20%281%29.webp',
      'https://res.cloudinary.com/drzh5dzha/image/upload/v1782491695/woodwork_template/669a7a6ca3e55076d5213852_pexels-heyho-8134760%20%281%29.webp',
      'https://res.cloudinary.com/drzh5dzha/image/upload/v1782491699/woodwork_template/669a7a6fcbd7c11cea0e9b3e_pexels-heyho-8134755%20%281%29.webp'
    ]
  }
];

export const galleryImages = [
  { id: 'g1', category: 'Kitchens', src: 'https://res.cloudinary.com/drzh5dzha/image/upload/v1782491590/woodwork_template/669a74c38cff10f8c353982f_pexels-heyho-7061393.webp', title: 'Island Prep Area' },
  { id: 'g2', category: 'Seating', src: 'https://res.cloudinary.com/drzh5dzha/image/upload/v1782491496/woodwork_template/66968f657e4684f9de38ac8d_pexels-heyho-6284228.webp', title: 'Handcrafted Chair' },
  { id: 'g3', category: 'Bathrooms', src: 'https://res.cloudinary.com/drzh5dzha/image/upload/v1782491505/woodwork_template/66968f6e839285643db2bf7a_pexels-heyho-6958128.webp', title: 'Oak Vanity' },
  { id: 'g4', category: 'Millwork', src: 'https://res.cloudinary.com/drzh5dzha/image/upload/v1782491510/woodwork_template/66968f71771fde0ba8427dd6_pexels-heyho-6758529.webp', title: 'Chevron Pattern' },
  { id: 'g5', category: 'Commercial', src: 'https://res.cloudinary.com/drzh5dzha/image/upload/v1782491669/woodwork_template/669a79db44ad6d52e71481ef_pexels-heyho-7046007%20%281%29.webp', title: 'Ash Divider' },
  { id: 'g6', category: 'Kitchens', src: 'https://res.cloudinary.com/drzh5dzha/image/upload/v1782491630/woodwork_template/669a78ffbc9370c4a80979fe_pexels-heyho-6933859%20%281%29.webp', title: 'Pine Shelving' },
  { id: 'g7', category: 'Cabinetry', src: 'https://res.cloudinary.com/drzh5dzha/image/upload/v1782491520/woodwork_template/669690855f190c374318efff_pexels-heyho-6587850.webp', title: 'Custom Joinery' },
  { id: 'g8', category: 'Bathrooms', src: 'https://res.cloudinary.com/drzh5dzha/image/upload/v1782491653/woodwork_template/669a79d6d0e840c8baa2cc1f_pexels-heyho-7045994%20%281%29.webp', title: 'Minimalist Sink' },
  { id: 'g9', category: 'Kitchens', src: 'https://res.cloudinary.com/drzh5dzha/image/upload/v1782491708/woodwork_template/669a7afddf6c8dd4e656d953_pexels-heyho-6908555%20%281%29.webp', title: 'Dark Oak Island' },
  { id: 'g10', category: 'Seating', src: 'https://images.unsplash.com/photo-1592078615290-033ee584e267?auto=format&fit=crop&q=80', title: 'Lounge Chair' },
  { id: 'g11', category: 'Tables', src: 'https://images.unsplash.com/photo-1577140917170-285929fb55b7?auto=format&fit=crop&q=80', title: 'Dining Table' },
];

export const categories = ['All', 'Kitchens', 'Bathrooms', 'Cabinetry', 'Tables', 'Seating', 'Closets', 'Doors', 'Millwork', 'CNC', 'Commercial'];
