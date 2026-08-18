import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product, products as staticProducts } from '../data/products';
import { Project, projects as staticProjects, galleryImages as staticGalleries } from '../data/portfolio';
import { CURRENT_TENANT_ID } from '../config/tenant';

export interface GalleryItem {
  id: string;
  category: string;
  title: string;
  src: string;
}

export interface Newsletter {
  id: string;
  email: string;
  date: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone?: string;
  message: string;
  date: string;
}

export interface QuoteRequest {
  id: string;
  name: string;
  email: string;
  phone: string;
  type: string;
  budget: string;
  timeline: string;
  details: string;
  image?: string;
  date: string;
}

interface AdminContextType {
  products: Product[];
  projects: Project[];
  galleries: GalleryItem[];
  newsletters: Newsletter[];
  contactMessages: ContactMessage[];
  quotes: QuoteRequest[];
  
  addProduct: (product: Product) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (id: string) => void;

  addProject: (project: Project) => void;
  updateProject: (project: Project) => void;
  deleteProject: (id: string) => void;

  addGalleryItem: (item: GalleryItem) => void;
  updateGalleryItem: (item: GalleryItem) => void;
  deleteGalleryItem: (id: string) => void;

  addNewsletter: (email: string) => void;
  addContactMessage: (msg: Omit<ContactMessage, 'id' | 'date'>) => void;
  addQuoteRequest: (quote: Omit<QuoteRequest, 'id' | 'date'>) => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export function AdminProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>(staticProducts);
  const [projects, setProjects] = useState<Project[]>(staticProjects);
  const [galleries, setGalleries] = useState<GalleryItem[]>(staticGalleries);
  const [newsletters, setNewsletters] = useState<Newsletter[]>([]);
  const [contactMessages, setContactMessages] = useState<ContactMessage[]>([]);
  const [quotes, setQuotes] = useState<QuoteRequest[]>([]);

  useEffect(() => {
    const savedProducts = localStorage.getItem('woodwork_products');
    if (savedProducts) setProducts(JSON.parse(savedProducts));
    
    const savedProjects = localStorage.getItem('woodwork_projects');
    if (savedProjects) setProjects(JSON.parse(savedProjects));
    
    const savedGalleries = localStorage.getItem('woodwork_galleries');
    if (savedGalleries) setGalleries(JSON.parse(savedGalleries));
    
    const savedNewsletters = localStorage.getItem('woodwork_newsletters');
    if (savedNewsletters) setNewsletters(JSON.parse(savedNewsletters));
    
    const savedContactMessages = localStorage.getItem('woodwork_contactMessages');
    if (savedContactMessages) setContactMessages(JSON.parse(savedContactMessages));
    
    const savedQuotes = localStorage.getItem('woodwork_quotes');
    if (savedQuotes) setQuotes(JSON.parse(savedQuotes));
  }, []);

  useEffect(() => { localStorage.setItem('woodwork_products', JSON.stringify(products)); }, [products]);
  useEffect(() => { localStorage.setItem('woodwork_projects', JSON.stringify(projects)); }, [projects]);
  useEffect(() => { localStorage.setItem('woodwork_galleries', JSON.stringify(galleries)); }, [galleries]);
  useEffect(() => { localStorage.setItem('woodwork_newsletters', JSON.stringify(newsletters)); }, [newsletters]);
  useEffect(() => { localStorage.setItem('woodwork_contactMessages', JSON.stringify(contactMessages)); }, [contactMessages]);
  useEffect(() => { localStorage.setItem('woodwork_quotes', JSON.stringify(quotes)); }, [quotes]);

  const addProduct = async (product: Product) => setProducts(prev => [...prev, product]);
  const updateProduct = async (product: Product) => setProducts(prev => prev.map(p => p.id === product.id ? product : p));
  const deleteProduct = async (id: string) => setProducts(prev => prev.filter(p => p.id !== id));

  const addProject = async (project: Project) => setProjects(prev => [...prev, project]);
  const updateProject = async (project: Project) => setProjects(prev => prev.map(p => p.id === project.id ? project : p));
  const deleteProject = async (id: string) => setProjects(prev => prev.filter(p => p.id !== id));

  const addGalleryItem = async (item: GalleryItem) => setGalleries(prev => [...prev, item]);
  const updateGalleryItem = async (item: GalleryItem) => setGalleries(prev => prev.map(g => g.id === item.id ? item : g));
  const deleteGalleryItem = async (id: string) => setGalleries(prev => prev.filter(g => g.id !== id));

  const addNewsletter = async (email: string) => {
    const newEntry = {
      id: Math.random().toString(36).substring(2, 9),
      email,
      date: new Date().toISOString(),
      tenantId: CURRENT_TENANT_ID
    };
    setNewsletters(prev => [...prev, newEntry]);
  };

  const addContactMessage = async (msg: Omit<ContactMessage, 'id' | 'date'>) => {
    const newEntry = {
      ...msg,
      id: Math.random().toString(36).substring(2, 9),
      date: new Date().toISOString(),
      tenantId: CURRENT_TENANT_ID
    };
    setContactMessages(prev => [...prev, newEntry as ContactMessage]);
  };

  const addQuoteRequest = async (quote: Omit<QuoteRequest, 'id' | 'date'>) => {
    const newEntry = {
      ...quote,
      id: Math.random().toString(36).substring(2, 9),
      date: new Date().toISOString(),
      tenantId: CURRENT_TENANT_ID
    };
    setQuotes(prev => [...prev, newEntry as QuoteRequest]);
  };

  return (
    <AdminContext.Provider value={{
      products, projects, galleries, newsletters, contactMessages, quotes,
      addProduct, updateProduct, deleteProduct,
      addProject, updateProject, deleteProject,
      addGalleryItem, updateGalleryItem, deleteGalleryItem,
      addNewsletter, addContactMessage, addQuoteRequest
    }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
}
