import deckStairsImg from '../assets/images/deck_stairs_build_1787018876072.jpg';

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

export const galleryImages = [
  { id: 'g0', category: 'Millwork', src: deckStairsImg, title: 'Tiered Hardwood Deck & Steps' },
  { id: 'g1', category: 'Kitchens', src: 'https://res.cloudinary.com/drzh5dzha/image/upload/v1782491590/woodwork_template/669a74c38cff10f8c353982f_pexels-heyho-7061393.webp', title: 'Island Prep Area' },
  { id: 'g2', category: 'Seating', src: 'https://res.cloudinary.com/drzh5dzha/image/upload/v1782491496/woodwork_template/66968f657e4684f9de38ac8d_pexels-heyho-6284228.webp', title: 'Handcrafted Chair' },
  { id: 'g3', category: 'Bathrooms', src: 'https://res.cloudinary.com/drzh5dzha/image/upload/v1782491505/woodwork_template/66968f6e839285643db2bf7a_pexels-heyho-6958128.webp', title: 'Oak Vanity' },
  { id: 'g4', category: 'Millwork', src: 'https://res.cloudinary.com/drzh5dzha/image/upload/v1782491510/woodwork_template/66968f71771fde0ba8427dd6_pexels-heyho-6758529.webp', title: 'Chevron Pattern' },
  { id: 'g5', category: 'Millwork', src: 'https://res.cloudinary.com/drzh5dzha/image/upload/v1782491669/woodwork_template/669a79db44ad6d52e71481ef_pexels-heyho-7046007%20%281%29.webp', title: 'Ash Divider' },
  { id: 'g6', category: 'Kitchens', src: 'https://res.cloudinary.com/drzh5dzha/image/upload/v1782491630/woodwork_template/669a78ffbc9370c4a80979fe_pexels-heyho-6933859%20%281%29.webp', title: 'Pine Shelving' },
  { id: 'g7', category: 'Cabinetry', src: 'https://res.cloudinary.com/drzh5dzha/image/upload/v1782491520/woodwork_template/669690855f190c374318efff_pexels-heyho-6587850.webp', title: 'Custom Joinery' },
  { id: 'g8', category: 'Bathrooms', src: 'https://res.cloudinary.com/drzh5dzha/image/upload/v1782491653/woodwork_template/669a79d6d0e840c8baa2cc1f_pexels-heyho-7045994%20%281%29.webp', title: 'Minimalist Sink' },
  { id: 'g9', category: 'Kitchens', src: 'https://res.cloudinary.com/drzh5dzha/image/upload/v1782491708/woodwork_template/669a7afddf6c8dd4e656d953_pexels-heyho-6908555%20%281%29.webp', title: 'Dark Oak Island' },
  { id: 'g10', category: 'Seating', src: 'https://images.unsplash.com/photo-1592078615290-033ee584e267?auto=format&fit=crop&q=80', title: 'Lounge Chair' },
  { id: 'g11', category: 'Tables', src: 'https://images.unsplash.com/photo-1577140917170-285929fb55b7?auto=format&fit=crop&q=80', title: 'Dining Table' },
];
