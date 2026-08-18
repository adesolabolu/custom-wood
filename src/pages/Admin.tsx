import React from "react";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAdmin } from "../context/AdminContext";
import { useStore } from "../context/StoreContext";
import { useToast } from "../context/ToastContext";
import { Product } from "../data/products";
import { Project } from "../data/portfolio";
import { ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { ActivityLog, logActivity, getActivityLogs } from "../lib/ActivityLogger";
import { ImageUploadInput } from "../components/ui/ImageUploadInput";
import { MigrationTool } from "../components/MigrationTool";
import {
  LayoutDashboard,
  Image as ImageIcon,
  ShoppingBag,
  ShoppingCart,
  Mail,
  MessageSquare,
  FileText,
  Plus,
  Edit,
  Trash2,
  Menu,
  X,
  Package,
} from "lucide-react";

type Tab =
  | "overview"
  | "portfolio"
  | "shop"
  | "orders"
  | "newsletter"
  | "contact"
  | "quotes";

const ImageInput = ({ name, defaultValue, label, className, placeholder }: { name: string, defaultValue: string, label?: string, className?: string, placeholder?: string }) => {
  const [url, setUrl] = useState(defaultValue);

  return (
    <div className={`flex flex-col gap-2 ${className || ''}`}>
      {label && <label className="text-xs font-bold text-gray-500 uppercase">{label}</label>}
      <input type="hidden" name={name} value={url} />
      <ImageUploadInput 
        defaultUrl={defaultValue} 
        onUpload={(newUrl) => setUrl(newUrl)} 
      />
    </div>
  );
};

export function Admin() {
  const [activeTab, setActiveTab] = useState<Tab>("overview");
  const [isAdminMenuOpen, setIsAdminMenuOpen] = useState(false);
  const {
    products,
    projects,
    galleries,
    newsletters,
    contactMessages,
    quotes,
    deleteProduct,
    addProduct,
    updateProduct,
    deleteProject,
    addProject,
    updateProject,
    deleteGalleryItem,
    addGalleryItem,
    updateGalleryItem,
  } = useAdmin();
  const { orders, updateOrderStatus, updateOrderNote, deleteOrder } = useStore();
  const { showToast } = useToast();

  const handleStatusChange = (orderId: string, status: any) => {
    updateOrderStatus(orderId, status);
    logActivity('Status Update', `Order ${orderId}`, `Status changed to ${status}`);
    showToast(`Order status updated to ${status}`, "success");
  };

  const [isProductModalOpen, setProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const [isProjectModalOpen, setProjectModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  const [isGalleryModalOpen, setGalleryModalOpen] = useState(false);
  const [editingGallery, setEditingGallery] = useState<any | null>(null);

  const [selectedContactId, setSelectedContactId] = useState<string | null>(
    null,
  );
  
  const [orderToDelete, setOrderToDelete] = useState<string | null>(null);
  const [galleryToDelete, setGalleryToDelete] = useState<any | null>(null);
  const [productToDelete, setProductToDelete] = useState<any | null>(null);
  const [selectedOrderIds, setSelectedOrderIds] = useState<string[]>([]);
  const [dashboardDateRange, setDashboardDateRange] = useState<{ start: string, end: string }>({ start: '', end: '' });
  const [activityFilter, setActivityFilter] = useState<string>('all');
  const [orderSearch, setOrderSearch] = useState('');
  const [orderStatusFilter, setOrderStatusFilter] = useState('all');
  const [orderDateRange, setOrderDateRange] = useState<{ start: string, end: string }>({ start: '', end: '' });
  const [orderMinAmount, setOrderMinAmount] = useState('');
  const [orderMaxAmount, setOrderMaxAmount] = useState('');
  const [ordersLimit, setOrdersLimit] = useState(5);

  const filteredOrders = useMemo(() => {
    return orders.filter(o => {
      if (orderSearch && !o.id.toLowerCase().includes(orderSearch.toLowerCase())) return false;
      if (orderStatusFilter !== 'all' && o.status !== orderStatusFilter) return false;
      if (orderMinAmount && o.total < Number(orderMinAmount)) return false;
      if (orderMaxAmount && o.total > Number(orderMaxAmount)) return false;
      if (orderDateRange.start && new Date(o.date).getTime() < new Date(orderDateRange.start).getTime()) return false;
      if (orderDateRange.end && new Date(o.date).getTime() > new Date(orderDateRange.end).getTime() + 86400000) return false;
      return true;
    }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [orders, orderSearch, orderStatusFilter, orderMinAmount, orderMaxAmount, orderDateRange]);

  const cycleStatus = (e: React.MouseEvent, orderId: string, currentStatus: string) => {
    e.stopPropagation();
    const statuses = ["Pending", "Processing", "In Production", "Shipped", "Delivered"];
    const nextStatus = statuses[(statuses.indexOf(currentStatus) + 1) % statuses.length];
    updateOrderStatus(orderId, nextStatus as any);
    showToast(`Order ${orderId} status updated to ${nextStatus}`, "success");
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'Pending': return 'bg-white text-[#D3A971] border-[#D3A971]';
      case 'Processing': return 'bg-[#D3A971]/10 text-[#D3A971] border-[#D3A971]/20';
      case 'In Production': return 'bg-[#D3A971]/20 text-[#D3A971] border-[#D3A971]/30';
      case 'Shipped': return 'bg-[#1A1A1A] text-white border-[#1A1A1A]';
      case 'Delivered': return 'bg-[#D3A971] text-white border-[#D3A971]';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const isDateInRange = (dateString: string) => {
    if (!dashboardDateRange.start && !dashboardDateRange.end) return true;
    const d = new Date(dateString).getTime();
    const start = dashboardDateRange.start ? new Date(dashboardDateRange.start).getTime() : 0;
    const end = dashboardDateRange.end ? new Date(dashboardDateRange.end).getTime() + 86400000 : Infinity; // add 1 day to include the end date fully
    return d >= start && d <= end;
  };

  const recentActivity = useMemo(() => {
    const activities: { id: string, type: string, title: string, date: string, desc: string }[] = [];
    orders.filter(o => isDateInRange(o.date)).forEach(o => activities.push({ id: o.id, type: 'New Order', title: `New Order: ${o.id}`, date: o.date, desc: `Total: $${o.total.toFixed(2)}` }));
    contactMessages.filter(c => isDateInRange(c.date)).forEach(c => activities.push({ id: `msg-${c.id}`, type: 'Support Request', title: `Support Request from ${c.name}`, date: c.date, desc: 'Contact message' }));
    quotes.filter(q => isDateInRange(q.date)).forEach(q => activities.push({ id: `quote-${q.id}`, type: 'Quote Request', title: `Quote Request: ${q.type}`, date: q.date, desc: q.name }));
    
    getActivityLogs().filter(log => isDateInRange(log.date)).forEach(log => activities.push(log));

    return activities.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 5);
  }, [orders, contactMessages, quotes, dashboardDateRange]);

  const monthlyData = useMemo(() => {
    const data: Record<string, { orders: number; inquiries: number }> = {
      Jan: { orders: 0, inquiries: 0 }, Feb: { orders: 0, inquiries: 0 }, Mar: { orders: 0, inquiries: 0 },
      Apr: { orders: 0, inquiries: 0 }, May: { orders: 0, inquiries: 0 }, Jun: { orders: 0, inquiries: 0 },
      Jul: { orders: 0, inquiries: 0 }, Aug: { orders: 0, inquiries: 0 }, Sep: { orders: 0, inquiries: 0 },
      Oct: { orders: 0, inquiries: 0 }, Nov: { orders: 0, inquiries: 0 }, Dec: { orders: 0, inquiries: 0 }
    };

    orders.filter(o => isDateInRange(o.date)).forEach(order => {
      const month = new Date(order.date).toLocaleString('en-US', { month: 'short' });
      if (data[month]) data[month].orders++;
    });

    quotes.filter(q => isDateInRange(q.date)).forEach(quote => {
      const month = new Date(quote.date).toLocaleString('en-US', { month: 'short' });
      if (data[month]) data[month].inquiries++;
    });

    contactMessages.filter(c => isDateInRange(c.date)).forEach(contact => {
      const month = new Date(contact.date).toLocaleString('en-US', { month: 'short' });
      if (data[month]) data[month].inquiries++;
    });

    return Object.keys(data).map(k => ({ name: k, orders: data[k].orders, inquiries: data[k].inquiries }));
  }, [orders, quotes, contactMessages, dashboardDateRange]);

  const tabs = [
    { id: "overview", label: "Overview", icon: LayoutDashboard },
    { id: "portfolio", label: "Gallery", icon: ImageIcon },
    { id: "shop", label: "Shop Items", icon: ShoppingBag },
    { id: "orders", label: "Orders", icon: ShoppingCart },
    { id: "newsletter", label: "Newsletter List", icon: Mail },
    { id: "contact", label: "Contact Messages", icon: MessageSquare },
    { id: "quotes", label: "Quote Requests", icon: FileText },
  ] as const;

  const getMaxId = (items: {id: string}[], prefix: string) => {
    const ids = items.map(i => parseInt(i.id.replace(prefix, ''))).filter(n => !isNaN(n));
    return ids.length > 0 ? Math.max(...ids) : 0;
  };

  const handleProductSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newProduct = {
      id: editingProduct
        ? editingProduct.id
        : `p${getMaxId(products, 'p') + 1}`,
      name: formData.get("name") as string,
      price: parseFloat(formData.get("price") as string),
      category: formData.get("category") as string,
      description: formData.get("description") as string,
      image:
        (formData.get("image") as string) || "https://via.placeholder.com/400",
      popularity: editingProduct ? editingProduct.popularity : 0,
    };
    if (editingProduct) {
      updateProduct(newProduct);
      logActivity('Content Edit', 'Shop Item Updated', newProduct.name);
      showToast("Product updated successfully", "success");
    } else {
      addProduct(newProduct);
      logActivity('Content Edit', 'Shop Item Added', newProduct.name);
      showToast("Product added successfully", "success");
    }
    setProductModalOpen(false);
  };

  const downloadCSV = (data: any[], filename: string) => {
    if (data.length === 0) return;
    const headers = Object.keys(data[0]);
    const csvContent = [
      headers.join(","),
      ...data.map((row) =>
        headers
          .map((fieldName) => JSON.stringify(row[fieldName] || ""))
          .join(","),
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", filename);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleProjectSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newProject: Project = {
      id: editingProject
        ? editingProject.id
        : `proj${getMaxId(projects, 'proj') + 1}`,
      slug: (formData.get("title") as string)
        .toLowerCase()
        .replace(/\s+/g, "-"),
      category: formData.get("category") as string,
      title: formData.get("title") as string,
      shortDescription: formData.get("shortDescription") as string,
      descriptions: (formData.get("descriptions") as string)
        .split("\n")
        .filter(Boolean),
      coverImage:
        (formData.get("coverImage") as string) ||
        "https://via.placeholder.com/400",
      images: [
        formData.get("image1") as string,
        formData.get("image2") as string,
        formData.get("image3") as string,
        formData.get("image4") as string
      ].filter(Boolean) || [
        (formData.get("coverImage") as string) ||
          "https://via.placeholder.com/400",
      ],
    };
    if (editingProject) updateProject(newProject);
    else addProject(newProject);
    setProjectModalOpen(false);
  };

  const handleGallerySubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newGalleryItem = {
      id: editingGallery
        ? editingGallery.id
        : `g${getMaxId(galleries, 'g') + 1}`,
      title: formData.get("title") as string,
      category: formData.get("category") as string,
      src: (formData.get("src") as string) || "https://via.placeholder.com/400",
    };
    if (editingGallery) {
      updateGalleryItem(newGalleryItem);
      logActivity('Content Edit', 'Gallery Item Updated', newGalleryItem.title);
      showToast("Gallery item updated successfully", "success");
    } else {
      addGalleryItem(newGalleryItem);
      logActivity('Content Edit', 'Gallery Item Added', newGalleryItem.title);
      showToast("Gallery item added successfully", "success");
    }
    setGalleryModalOpen(false);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "overview":
        return (
          <div>
            <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-xl">
              <h3 className="text-lg font-bold text-yellow-800 mb-2">System Admin</h3>
              <p className="text-sm text-yellow-700 mb-4">Use this tool to duplicate data from the template tenant to the current client tenant.</p>
              <div className="w-48"><MigrationTool /></div>
            </div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                Dashboard Overview
              </h2>
              <div className="hidden md:flex items-center gap-2">
                <input
                  type="date"
                  value={dashboardDateRange.start}
                  onChange={(e) => setDashboardDateRange(prev => ({ ...prev, start: e.target.value }))}
                  className="bg-white border border-gray-200 text-gray-700 px-3 py-1.5 rounded-lg text-sm font-semibold outline-none"
                  title="Start Date"
                />
                <span className="text-gray-400">-</span>
                <input
                  type="date"
                  value={dashboardDateRange.end}
                  onChange={(e) => setDashboardDateRange(prev => ({ ...prev, end: e.target.value }))}
                  className="bg-white border border-gray-200 text-gray-700 px-3 py-1.5 rounded-lg text-sm font-semibold outline-none"
                  title="End Date"
                />
                {(dashboardDateRange.start || dashboardDateRange.end) && (
                  <button
                    onClick={() => setDashboardDateRange({ start: '', end: '' })}
                    className="text-gray-500 hover:text-gray-900 px-2 py-1.5 text-sm"
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-6">
              <div className="bg-white p-4 md:p-8 rounded-xl shadow-sm border border-black/5 flex justify-between items-start gap-2 md:gap-4">
                <div className="flex flex-col overflow-hidden">
                  <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2 truncate">
                    Total Orders
                  </h3>
                  <p className="text-xl md:text-4xl font-bold text-gray-900 truncate">
                    {orders.length}
                  </p>
                </div>
                <div className="w-8 h-8 md:w-12 md:h-12 rounded-xl bg-teal-50 text-teal-500 flex items-center justify-center shrink-0">
                  <ShoppingBag size={18} className="md:w-6 md:h-6" />
                </div>
              </div>
              <div className="bg-white p-4 md:p-8 rounded-xl shadow-sm border border-black/5 flex justify-between items-start gap-2 md:gap-4">
                <div className="flex flex-col overflow-hidden">
                  <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2 truncate">
                    Total Sales
                  </h3>
                  <p className="text-xl md:text-4xl font-bold text-gray-900" title={`$${orders.reduce((sum, o) => sum + o.total, 0).toFixed(2)}`}>
                    ${orders.reduce((sum, o) => sum + o.total, 0).toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                  </p>
                </div>
                <div className="w-8 h-8 md:w-12 md:h-12 rounded-xl bg-green-50 text-green-500 flex items-center justify-center shrink-0">
                  <ShoppingCart size={18} className="md:w-6 md:h-6" />
                </div>
              </div>
              <div className="bg-white p-4 md:p-8 rounded-xl shadow-sm border border-black/5 flex justify-between items-start gap-2 md:gap-4">
                <div className="flex flex-col overflow-hidden">
                  <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2 truncate">
                    Contacts
                  </h3>
                  <p className="text-xl md:text-4xl font-bold text-gray-900 truncate">
                    {contactMessages.length}
                  </p>
                </div>
                <div className="w-8 h-8 md:w-12 md:h-12 rounded-xl bg-blue-50 text-blue-500 flex items-center justify-center shrink-0">
                  <MessageSquare size={18} className="md:w-6 md:h-6" />
                </div>
              </div>
              <div className="bg-white p-4 md:p-8 rounded-xl shadow-sm border border-black/5 flex justify-between items-start gap-2 md:gap-4">
                <div className="flex flex-col overflow-hidden">
                  <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2 truncate">
                    Quotes
                  </h3>
                  <p className="text-xl md:text-4xl font-bold text-gray-900 truncate">
                    {quotes.length}
                  </p>
                </div>
                <div className="w-8 h-8 md:w-12 md:h-12 rounded-xl bg-orange-50 text-orange-500 flex items-center justify-center shrink-0">
                  <FileText size={18} className="md:w-6 md:h-6" />
                </div>
              </div>
              <div className="bg-white p-4 md:p-8 rounded-xl shadow-sm border border-black/5 flex justify-between items-start gap-2 md:gap-4">
                <div className="flex flex-col overflow-hidden">
                  <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2 truncate">
                    Newsletter
                  </h3>
                  <p className="text-xl md:text-4xl font-bold text-gray-900 truncate">
                    {newsletters.length}
                  </p>
                </div>
                <div className="w-8 h-8 md:w-12 md:h-12 rounded-xl bg-purple-50 text-purple-500 flex items-center justify-center shrink-0">
                  <Mail size={18} className="md:w-6 md:h-6" />
                </div>
              </div>
              <div className="bg-white p-4 md:p-8 rounded-xl shadow-sm border border-black/5 flex justify-between items-start gap-2 md:gap-4">
                <div className="flex flex-col overflow-hidden">
                  <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2 truncate">
                    Shop Items
                  </h3>
                  <p className="text-xl md:text-4xl font-bold text-gray-900 truncate">
                    {products.length}
                  </p>
                </div>
                <div className="w-8 h-8 md:w-12 md:h-12 rounded-xl bg-indigo-50 text-indigo-500 flex items-center justify-center shrink-0">
                  <Package size={18} className="md:w-6 md:h-6" />
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-black/5 mb-6">
              <h3 className="text-lg font-bold text-gray-900 mb-6">Store Sales & Project Inquiries</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6B7280' }} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6B7280' }} dx={-10} />
                    <Tooltip cursor={{ fill: '#F3F4F6' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                    <Bar dataKey="orders" name="Store Sales" fill="#D3A971" radius={[4, 4, 0, 0]} />
                    <Line type="monotone" dataKey="inquiries" name="Project Inquiries" stroke="#1A1A1A" strokeWidth={3} dot={{ r: 4, fill: '#1A1A1A' }} activeDot={{ r: 6 }} />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Recent Orders */}
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-black/5">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-bold text-gray-900">Recent Orders</h3>
                  <button 
                    onClick={() => setActiveTab('orders')}
                    className="text-sm font-medium text-[#D3A971] hover:text-brand-dark transition-colors"
                  >
                    View All
                  </button>
                </div>
                <div className="space-y-4">
                  {orders.length === 0 && <p className="text-sm text-gray-500">No orders yet.</p>}
                  {orders.slice(0, 5).map(order => (
                    <div key={order.id} className="flex justify-between items-center pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                      <div>
                        <p className="text-sm font-bold text-gray-900">{order.id.split('_')[0]}</p>
                        <p className="text-xs text-gray-500">{order.contactInfo?.name} • {new Date(order.date).toLocaleDateString()}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-bold text-[#D3A971]">${order.total.toFixed(2)}</p>
                        <span className="text-[10px] uppercase tracking-wider font-bold text-gray-500">{order.status}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Quote Requests */}
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-black/5">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-bold text-gray-900">Recent Quote Requests</h3>
                  <button 
                    onClick={() => setActiveTab('quotes')}
                    className="text-sm font-medium text-[#D3A971] hover:text-brand-dark transition-colors"
                  >
                    View All
                  </button>
                </div>
                <div className="space-y-4">
                  {quotes.length === 0 && <p className="text-sm text-gray-500">No quotes yet.</p>}
                  {quotes.slice(0, 5).map(quote => (
                    <div key={quote.id} className="flex justify-between items-start pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                      <div>
                        <p className="text-sm font-bold text-gray-900">{quote.name}</p>
                        <p className="text-xs text-gray-500 mb-1">{quote.type}</p>
                        <p className="text-xs text-gray-400 line-clamp-1">{quote.details}</p>
                      </div>
                      <div className="text-right whitespace-nowrap ml-4">
                        <span className="text-xs font-bold text-[#D3A971]">{quote.budget}</span>
                        <p className="text-[10px] text-gray-500 mt-1">{new Date(quote.date).toLocaleDateString()}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-black/5">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-bold text-gray-900">Recent Activity</h3>
                  <select
                    value={activityFilter}
                    onChange={(e) => setActivityFilter(e.target.value)}
                    className="bg-gray-50 border border-gray-200 text-gray-700 px-2 py-1 rounded text-xs font-semibold outline-none cursor-pointer"
                  >
                    <option value="all">All</option>
                    <option value="New Order">Orders</option>
                    <option value="Status Update">Status Update</option>
                    <option value="Support Request">Support</option>
                    <option value="Quote Request">Quotes</option>
                    <option value="Content Edit">Content Edit</option>
                  </select>
                </div>
                <div className="space-y-4">
                  {recentActivity.filter(a => activityFilter === 'all' || a.type === activityFilter).length === 0 && <p className="text-sm text-gray-500">No recent activity.</p>}
                  {recentActivity.filter(a => activityFilter === 'all' || a.type === activityFilter).map(activity => (
                    <div key={activity.id} className="flex justify-between items-start pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                      <div className="flex-1 min-w-0 pr-4">
                        <p className="text-sm font-bold text-gray-900 truncate">{activity.title}</p>
                        <p className="text-xs text-gray-400 line-clamp-1 mt-1">{activity.desc}</p>
                      </div>
                      <div className="flex items-start gap-3 shrink-0 mt-0.5">
                        <div className="w-[110px] flex justify-start">
                          <span className="text-[10px] uppercase tracking-wider font-bold text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded text-center break-words max-w-full leading-tight">{activity.type}</span>
                        </div>
                        <div className="w-[60px] text-right">
                          <p className="text-[10px] text-gray-500">{new Date(activity.date).toLocaleDateString()}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case "portfolio":
        return (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                Gallery Management
              </h2>
            </div>

            <div className="mb-8 flex justify-between items-center border-b border-black/5 pb-8">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">
                  Recent Shop Builds (Gallery)
                </h3>
                <p className="text-sm text-gray-500">
                  Manage the individual gallery images displayed on the
                  portfolio page.
                </p>
              </div>
              <button
                onClick={() => {
                  setEditingGallery(null);
                  setGalleryModalOpen(true);
                }}
                className="bg-[#1A1A1A] text-white px-6 py-2.5 rounded-lg flex items-center gap-2 font-bold text-sm hover:bg-[#D3A971] hover:text-[#1A1A1A] transition-colors"
              >
                <Plus size={16} /> Add Gallery Image
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {galleries.map((g) => (
                <div key={g.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col hover:shadow-md transition-shadow">
                  <div className="relative h-48 w-full group">
                    <img src={g.src} alt={g.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                      <button
                        onClick={() => {
                          setEditingGallery(g);
                          setGalleryModalOpen(true);
                        }}
                        className="w-10 h-10 rounded-full bg-white text-gray-900 hover:bg-[#D3A971] flex items-center justify-center transition-colors"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => {
                          setGalleryToDelete(g);
                        }}
                        className="w-10 h-10 rounded-full bg-white text-red-600 hover:bg-red-50 flex items-center justify-center transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                  <div className="p-4 flex flex-col flex-1">
                    <h4 className="font-bold text-gray-900 text-sm mb-2 truncate" title={g.title}>{g.title}</h4>
                    <span className="text-[10px] font-bold tracking-wider uppercase px-2 py-1 bg-gray-100 text-gray-600 rounded-md self-start">
                      {g.category}
                    </span>
                  </div>
                </div>
              ))}
              {galleries.length === 0 && (
                <div className="col-span-full py-12 text-center text-gray-500 text-sm bg-white rounded-xl border border-gray-100">
                  No gallery items yet.
                </div>
              )}
            </div>
          </div>
        );

      case "shop":
        return (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Shop Items</h2>
              <button
                onClick={() => {
                  setEditingProduct(null);
                  setProductModalOpen(true);
                }}
                className="bg-[#1A1A1A] text-white px-6 py-2.5 rounded-lg flex items-center gap-2 font-bold text-sm hover:bg-[#D3A971] hover:text-[#1A1A1A] transition-colors"
              >
                <Plus size={16} /> Add Item
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((p) => (
                <div key={p.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col hover:shadow-md transition-shadow">
                  <div className="relative h-48 w-full group">
                    <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                      <button
                        onClick={() => {
                          setEditingProduct(p);
                          setProductModalOpen(true);
                        }}
                        className="w-10 h-10 rounded-full bg-white text-gray-900 hover:bg-[#D3A971] flex items-center justify-center transition-colors"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => {
                          setProductToDelete(p);
                        }}
                        className="w-10 h-10 rounded-full bg-white text-red-600 hover:bg-red-50 flex items-center justify-center transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                  <div className="p-4 flex flex-col flex-1">
                    <h4 className="font-bold text-gray-900 text-sm mb-1 truncate" title={p.name}>{p.name}</h4>
                    <p className="text-[#D3A971] font-bold text-sm mb-2">${p.price.toFixed(2)}</p>
                    <span className="text-[10px] font-bold tracking-wider uppercase px-2 py-1 bg-gray-100 text-gray-600 rounded-md self-start">
                      {p.category}
                    </span>
                  </div>
                </div>
              ))}
              {products.length === 0 && (
                <div className="col-span-full py-12 text-center text-gray-500 text-sm bg-white rounded-xl border border-gray-100">
                  No shop items yet.
                </div>
              )}
            </div>
          </div>
        );

      case "orders":
        const selectedOrder = orders.find((o) => o.id === selectedContactId);
        return (
          <div className="h-full flex flex-col">
            <div className="flex justify-between items-center mb-6 print-hidden">
              <div className="flex items-center gap-4">
                <h2 className="text-2xl font-bold text-gray-900">
                  Orders Box
                </h2>
                {selectedOrderIds.length > 0 && (
                  <select
                    onChange={(e) => {
                      const status = e.target.value as any;
                      if(status) {
                        selectedOrderIds.forEach(id => updateOrderStatus(id, status));
                        logActivity('Status Update', `Bulk Update`, `Updated ${selectedOrderIds.length} orders to ${status}`);
                        showToast(`Updated ${selectedOrderIds.length} orders to ${status}`, "success");
                        setSelectedOrderIds([]);
                      }
                      e.target.value = "";
                    }}
                    className="bg-white border border-gray-200 text-gray-700 px-3 py-1.5 rounded-lg text-sm font-semibold outline-none cursor-pointer"
                  >
                    <option value="">Bulk Update Status...</option>
                    <option value="Pending">Pending</option>
                    <option value="Processing">Processing</option>
                    <option value="In Production">In Production</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                )}
              </div>
              <button
                onClick={() => {
                  const exportData = orders.map((o) => ({
                    OrderID: o.id,
                    Date: new Date(o.date).toLocaleDateString(),
                    Status: o.status,
                    Total: o.total.toFixed(2),
                    CustomerName: o.contactInfo?.name || "",
                    CustomerEmail: o.contactInfo?.email || "",
                  }));
                  downloadCSV(exportData, "orders_history.csv");
                }}
                className="bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-semibold hover:bg-gray-50 transition-colors shadow-sm"
              >
                Export to CSV
              </button>
            </div>
            <div className="flex-1 flex flex-col md:flex-row gap-6 h-auto md:h-[calc(100vh-200px)]">
              <div className="w-full md:w-1/3 flex flex-col space-y-4 overflow-y-auto pr-2 print-hidden">
                <div className="flex flex-col gap-2 p-4 bg-white rounded-2xl border border-black/5 shadow-sm">
                  <input
                    type="text"
                    placeholder="Search Order ID..."
                    value={orderSearch}
                    onChange={e => setOrderSearch(e.target.value)}
                    className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 outline-none focus:border-[#D3A971]"
                  />
                  <select 
                    value={orderStatusFilter} 
                    onChange={e => setOrderStatusFilter(e.target.value)}
                    className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 outline-none focus:border-[#D3A971]"
                  >
                    <option value="all">All Statuses</option>
                    <option value="Pending">Pending</option>
                    <option value="Processing">Processing</option>
                    <option value="In Production">In Production</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                  <div className="flex gap-2">
                    <input 
                      type="number" 
                      placeholder="Min $" 
                      value={orderMinAmount} 
                      onChange={e => setOrderMinAmount(e.target.value)}
                      className="w-1/2 text-sm border border-gray-200 rounded-lg px-3 py-2 outline-none focus:border-[#D3A971]"
                    />
                    <input 
                      type="number" 
                      placeholder="Max $" 
                      value={orderMaxAmount} 
                      onChange={e => setOrderMaxAmount(e.target.value)}
                      className="w-1/2 text-sm border border-gray-200 rounded-lg px-3 py-2 outline-none focus:border-[#D3A971]"
                    />
                  </div>
                  <div className="hidden md:flex gap-2">
                    <input 
                      type="date" 
                      value={orderDateRange.start} 
                      onChange={e => setOrderDateRange(prev => ({...prev, start: e.target.value}))}
                      className="w-1/2 text-xs border border-gray-200 rounded-lg px-2 py-2 outline-none focus:border-[#D3A971]"
                    />
                    <input 
                      type="date" 
                      value={orderDateRange.end} 
                      onChange={e => setOrderDateRange(prev => ({...prev, end: e.target.value}))}
                      className="w-1/2 text-xs border border-gray-200 rounded-lg px-2 py-2 outline-none focus:border-[#D3A971]"
                    />
                  </div>
                </div>

                {filteredOrders.length === 0 && (
                  <p className="text-gray-500 text-sm">No orders found.</p>
                )}
                {filteredOrders.slice(0, ordersLimit).map((order) => (
                  <div
                    key={order.id}
                    onClick={() => setSelectedContactId(order.id)}
                    className={`group relative text-left p-6 rounded-2xl border transition-colors cursor-pointer hover:bg-gray-50 ${
                      selectedContactId === order.id
                        ? "bg-white border-[#D3A971] shadow-sm"
                        : "bg-white border-black/5 hover:border-gray-300"
                    }`}
                  >
                    <div className="absolute top-4 left-4 z-10" onClick={e => e.stopPropagation()}>
                      <input 
                        type="checkbox" 
                        checked={selectedOrderIds.includes(order.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedOrderIds(prev => [...prev, order.id]);
                          } else {
                            setSelectedOrderIds(prev => prev.filter(id => id !== order.id));
                          }
                        }}
                        className="w-4 h-4 text-[#D3A971] rounded border-gray-300 focus:ring-[#D3A971]"
                      />
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setOrderToDelete(order.id);
                      }}
                      className="absolute top-4 right-4 text-gray-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                      title="Archive/Delete Order"
                    >
                      <Trash2 size={16} />
                    </button>
                    <div className="flex justify-between items-start mb-1 pl-6">
                      <h4 className="font-bold text-gray-900 text-sm flex items-center gap-2">
                        {order.id.split('_')[0]}
                      </h4>
                      <span className="text-[10px] font-medium text-gray-400">
                        {new Date(order.date).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mb-2 pl-6">
                      <button
                        onClick={(e) => cycleStatus(e, order.id, order.status)}
                        className={`px-2 py-0.5 border rounded font-medium transition-colors ${getStatusColor(order.status)}`}
                        title="Click to cycle status"
                      >
                        {order.status}
                      </button>
                    </p>
                    <p className="text-xs font-bold text-[#D3A971] pl-6">
                      ${order.total.toFixed(2)}
                    </p>
                  </div>
                ))}
                {filteredOrders.length > ordersLimit && (
                  <button 
                    onClick={() => setOrdersLimit(prev => prev + 5)}
                    className="w-full py-3 bg-gray-50 border border-gray-200 text-gray-600 rounded-xl text-sm font-semibold hover:bg-gray-100 transition-colors"
                  >
                    Load More Orders
                  </button>
                )}
              </div>
              <div className="flex-1 bg-white rounded-2xl border border-black/5 shadow-sm overflow-hidden flex flex-col print-area">
                {selectedOrder ? (
                  <div className="p-8 h-full overflow-y-auto">
                    <div className="flex justify-between items-start mb-8 border-b pb-6">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-1">
                          Order {selectedOrder.id}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {new Date(selectedOrder.date).toLocaleString()}
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => window.print()}
                          className="text-sm text-gray-600 bg-white border border-gray-200 px-3 py-1 rounded-md font-medium outline-none cursor-pointer hover:bg-gray-50 transition-colors flex items-center gap-2 print-hidden"
                        >
                          <FileText size={14} /> Print Invoice
                        </button>
                        <select 
                          value={selectedOrder.status}
                          onChange={(e) => handleStatusChange(selectedOrder.id, e.target.value as any)}
                          className="text-sm text-gray-600 bg-gray-50 border border-gray-200 px-3 py-1 rounded-md font-medium outline-none cursor-pointer hover:border-gray-300 transition-colors print-hidden"
                        >
                          <option value="Pending">Pending</option>
                          <option value="Processing">Processing</option>
                          <option value="In Production">In Production</option>
                          <option value="Shipped">Shipped</option>
                          <option value="Delivered">Delivered</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                      <div>
                        <h4 className="font-bold text-sm text-gray-900 uppercase tracking-wider mb-3">
                          Customer Info
                        </h4>
                        <p className="text-sm text-gray-600 mb-1 font-medium">
                          {selectedOrder.contactInfo?.name || "N/A"}
                        </p>
                        <p className="text-sm text-gray-500 mb-1">
                          {selectedOrder.contactInfo?.email || "N/A"}
                        </p>
                        <p className="text-sm text-gray-500">
                          {selectedOrder.contactInfo?.phone || "N/A"}
                        </p>
                      </div>
                      <div>
                        <h4 className="font-bold text-sm text-gray-900 uppercase tracking-wider mb-3">
                          Shipping Address
                        </h4>
                        <p className="text-sm text-gray-600 mb-1">
                          {selectedOrder.shippingAddress?.street || "N/A"}
                        </p>
                        <p className="text-sm text-gray-600 mb-1">
                          {selectedOrder.shippingAddress?.city},{" "}
                          {selectedOrder.shippingAddress?.state}{" "}
                          {selectedOrder.shippingAddress?.zip}
                        </p>
                        <p className="text-sm text-gray-600">
                          {selectedOrder.shippingAddress?.country || "N/A"}
                        </p>
                        {selectedOrder.trackingCode && (
                          <p className="text-xs text-[#D3A971] font-mono mt-2 flex items-center gap-2">
                            Tracking: {selectedOrder.trackingCode}
                          </p>
                        )}
                      </div>
                    </div>

                    <h4 className="font-bold text-sm text-gray-900 uppercase tracking-wider mb-4 border-b pb-2">
                      Order Items
                    </h4>
                    <div className="space-y-4 mb-8">
                      {selectedOrder.items.map((item, idx) => (
                        <div
                          key={idx}
                          className="flex justify-between items-center text-sm"
                        >
                          <div className="flex items-center gap-3">
                            <span className="font-medium text-gray-900">
                              {item.quantity}x
                            </span>
                            <span className="text-gray-600">
                              {item.product.name}
                            </span>
                          </div>
                          <span className="text-gray-900">
                            ${(item.product.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="flex justify-end pt-4 border-t border-gray-100">
                      <div className="text-right">
                        <span className="text-gray-500 text-sm mr-4">
                          Total Amount:
                        </span>
                        <span className="text-xl font-bold text-[#D3A971]">
                          ${selectedOrder.total.toFixed(2)}
                        </span>
                      </div>
                    </div>

                    <div className="mt-8 pt-6 border-t border-gray-100">
                      <h4 className="font-bold text-sm text-gray-900 uppercase tracking-wider mb-3">
                        Internal Order Notes
                      </h4>
                      <textarea
                        value={selectedOrder.notes || ''}
                        onChange={(e) => updateOrderNote(selectedOrder.id, e.target.value)}
                        placeholder="Add internal notes, tracking details, or special instructions here. These are only visible to admins..."
                        className="w-full bg-gray-50 border border-gray-200 rounded-lg p-4 text-sm text-gray-700 outline-none focus:border-[#D3A971] focus:bg-white transition-colors resize-y min-h-[120px]"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-gray-400">
                    <p className="text-sm font-medium">
                      Select an order to view its details
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        );

      case "newsletter":
        return (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                Newsletter Subscribers List
              </h2>
              <button
                onClick={() =>
                  downloadCSV(newsletters, "newsletter_subscribers.csv")
                }
                className="bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-semibold hover:bg-gray-50 transition-colors shadow-sm"
              >
                Download CSV
              </button>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-black/5 mb-6 flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-sm text-gray-500">
                List of subscribers who signed up for newsletter updates on your
                website footer.
              </p>
              <div className="relative w-full md:w-64">
                <input
                  type="text"
                  placeholder="Search emails..."
                  className="w-full bg-gray-50 border border-gray-200 text-sm rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-[#D3A971]"
                />
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-black/5 overflow-hidden">
              <table className="w-full text-left">
                <thead className="bg-[#FAFAFA]">
                  <tr>
                    <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase border-b border-gray-100">
                      Subscriber Email
                    </th>
                    <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase border-b border-gray-100">
                      Status
                    </th>
                    <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase border-b border-gray-100">
                      Date Joined
                    </th>
                    <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase border-b border-gray-100 text-right">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {newsletters.length === 0 && (
                    <tr>
                      <td
                        colSpan={4}
                        className="px-6 py-8 text-center text-gray-500 text-sm"
                      >
                        No subscribers yet.
                      </td>
                    </tr>
                  )}
                  {newsletters.map((n) => (
                    <tr
                      key={n.id}
                      className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors"
                    >
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">
                        {n.email}
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-xs font-medium px-2.5 py-1 bg-green-50 text-green-600 rounded-md">
                          Active
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {new Date(n.date).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button className="w-8 h-8 rounded bg-red-50 text-red-400 hover:text-red-600 inline-flex items-center justify-center transition-colors">
                          <Trash2 size={14} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );

      case "contact":
        const selectedContact = contactMessages.find(
          (m) => m.id === selectedContactId,
        );

        return (
          <div className="h-full flex flex-col">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Contact Inquiries Box
            </h2>
            <p className="text-sm text-gray-500 mb-6">
              Client inquiries and greetings submitted via the general Contact
              form.
            </p>

            <div className="flex-1 flex flex-col md:flex-row gap-6 h-auto md:h-[calc(100vh-200px)]">
              <div className="w-full md:w-1/3 flex flex-col space-y-4 overflow-y-auto pr-2">
                {contactMessages.length === 0 && (
                  <p className="text-gray-500 text-sm">No messages yet.</p>
                )}
                {contactMessages.map((msg) => (
                  <button
                    key={msg.id}
                    onClick={() => setSelectedContactId(msg.id)}
                    className={`text-left p-6 rounded-2xl border transition-colors ${
                      selectedContactId === msg.id
                        ? "bg-white border-[#D3A971] shadow-sm"
                        : "bg-white border-black/5 hover:border-gray-300"
                    }`}
                  >
                    <div className="flex justify-between items-start mb-1">
                      <h4 className="font-bold text-gray-900 text-sm">
                        {msg.name}
                      </h4>
                      <span className="text-[10px] font-medium text-gray-400">
                        {new Date(msg.date).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mb-2">{msg.email}</p>
                    <p className="text-xs text-gray-400 line-clamp-1">
                      {msg.message}
                    </p>
                  </button>
                ))}
              </div>
              <div className="flex-1 bg-white rounded-2xl border border-black/5 shadow-sm overflow-hidden flex flex-col">
                {selectedContact ? (
                  <div className="p-8 h-full overflow-y-auto">
                    <div className="flex justify-between items-start mb-8">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-1">
                          {selectedContact.name}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {selectedContact.email}{" "}
                          {selectedContact.phone &&
                            `| ${selectedContact.phone}`}
                        </p>
                      </div>
                      <span className="text-sm text-gray-400 bg-gray-50 px-3 py-1 rounded-md">
                        {new Date(selectedContact.date).toLocaleString()}
                      </span>
                    </div>
                    <div className="prose prose-sm max-w-none">
                      <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                        {selectedContact.message}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-gray-400">
                    <Mail size={48} className="mb-4 opacity-20" />
                    <p className="text-sm font-medium">
                      Select an inquiry to view its message details
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        );

      case "quotes":
        const selectedQuote = quotes.find((q) => q.id === selectedContactId);
        return (
          <div className="h-full flex flex-col">
            <div className="flex justify-between items-start mb-2">
              <h2 className="text-2xl font-bold text-gray-900">
                Quote Requests Box
              </h2>
              <button
                onClick={() => downloadCSV(quotes, "quote_requests.csv")}
                className="bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-semibold hover:bg-gray-50 transition-colors shadow-sm"
              >
                Download CSV
              </button>
            </div>
            <p className="text-sm text-gray-500 mb-6">
              Client project quote requests submitted via the Quote form.
            </p>

            <div className="flex-1 flex flex-col md:flex-row gap-6 h-auto md:h-[calc(100vh-200px)]">
              <div className="w-full md:w-1/3 flex flex-col space-y-4 overflow-y-auto pr-2">
                {quotes.length === 0 && (
                  <p className="text-gray-500 text-sm">No requests yet.</p>
                )}
                {quotes.map((quote) => (
                  <button
                    key={quote.id}
                    onClick={() => setSelectedContactId(quote.id)}
                    className={`text-left p-6 rounded-2xl border transition-colors ${
                      selectedContactId === quote.id
                        ? "bg-white border-[#D3A971] shadow-sm"
                        : "bg-white border-black/5 hover:border-gray-300"
                    }`}
                  >
                    <div className="flex justify-between items-start mb-1">
                      <h4 className="font-bold text-gray-900 text-sm">
                        {quote.name}
                      </h4>
                      <span className="text-[10px] font-medium text-gray-400">
                        {new Date(quote.date).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mb-2">{quote.email}</p>
                    <p className="text-xs text-gray-400 line-clamp-1">
                      {quote.type}
                    </p>
                  </button>
                ))}
              </div>
              <div className="flex-1 bg-white rounded-2xl border border-black/5 shadow-sm overflow-hidden flex flex-col">
                {selectedQuote ? (
                  <div className="p-8 h-full overflow-y-auto">
                    <div className="flex justify-between items-start mb-8">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-1">
                          {selectedQuote.name}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {selectedQuote.email}{" "}
                          {selectedQuote.phone && `| ${selectedQuote.phone}`}
                        </p>
                      </div>
                      <span className="text-sm text-gray-400 bg-gray-50 px-3 py-1 rounded-md">
                        {new Date(selectedQuote.date).toLocaleString()}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6 border-b pb-6">
                      <div>
                        <span className="block text-[10px] uppercase font-bold text-gray-400 tracking-wider mb-1">
                          Project Type
                        </span>
                        <span className="text-sm font-medium text-gray-900">
                          {selectedQuote.type || "N/A"}
                        </span>
                      </div>
                      <div>
                        <span className="block text-[10px] uppercase font-bold text-gray-400 tracking-wider mb-1">
                          Est. Budget
                        </span>
                        <span className="text-sm font-medium text-gray-900">
                          {selectedQuote.budget || "N/A"}
                        </span>
                      </div>
                      <div>
                        <span className="block text-[10px] uppercase font-bold text-gray-400 tracking-wider mb-1">
                          Timeline
                        </span>
                        <span className="text-sm font-medium text-gray-900">
                          {selectedQuote.timeline || "N/A"}
                        </span>
                      </div>
                    </div>

                    <div className="prose prose-sm max-w-none">
                      <h4 className="font-bold text-sm text-gray-900 mb-2">
                        Additional Information
                      </h4>
                      <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                        {selectedQuote.details}
                      </p>
                    </div>

                    {selectedQuote.image && (
                      <div className="mt-8 border-t pt-8">
                        <h4 className="font-bold text-sm text-gray-900 mb-4">
                          Attached Image
                        </h4>
                        <a
                          href={selectedQuote.image}
                          target="_blank"
                          rel="noreferrer"
                          className="block w-full max-w-sm rounded-lg overflow-hidden border border-black/5 shadow-sm hover:opacity-90 transition-opacity"
                        >
                          <img
                            src={selectedQuote.image}
                            alt="Reference"
                            className="w-full h-auto object-cover"
                          />
                        </a>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-gray-400">
                    <FileText size={48} className="mb-4 opacity-20" />
                    <p className="text-sm font-medium">
                      Select a request to view its details
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-brand-light flex flex-col md:flex-row font-sans relative">
      {/* Sidebar */}
      <div className="w-full md:w-[280px] bg-[#1A1A1A] text-white md:h-screen md:sticky top-0 flex flex-col flex-shrink-0 z-20 md:rounded-br-3xl print-hidden border-b md:border-b-0 border-white/10">
        
        {/* Mobile Navbar */}
        <div className="flex md:hidden items-center justify-between p-4 border-b border-white/10">
          <h2 className="text-xl font-bold leading-tight">Admin Portal</h2>
          <button onClick={() => setIsAdminMenuOpen(!isAdminMenuOpen)} className="p-2 text-white">
            {isAdminMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        <div className="p-6 md:p-8 flex items-center gap-4 hidden md:flex">
          <div>
            <h2 className="text-2xl font-bold leading-tight">Admin Dashboard</h2>
          </div>
        </div>

        <nav className={`${isAdminMenuOpen ? "flex" : "hidden"} md:flex flex-col flex-none md:flex-1 px-4 py-4 md:py-0 overflow-y-auto md:overflow-visible gap-1 space-y-1 scrollbar-hide bg-[#1A1A1A] border-b border-white/10 md:border-0 z-50`}>
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => { setActiveTab(tab.id as Tab); setIsAdminMenuOpen(false); }}
                className={`whitespace-nowrap flex-shrink-0 md:w-full flex items-center gap-2 md:gap-3 px-4 py-2.5 md:py-3.5 rounded-lg transition-colors text-sm font-semibold ${
                  isActive
                    ? "bg-[#EFE4CC] text-[#1A1A1A]"
                    : "text-white/70 hover:bg-white/10 hover:text-white"
                }`}
              >
                <Icon
                  size={18}
                  className={isActive ? "text-[#1A1A1A]" : "text-white/70"}
                />
                {tab.label}
              </button>
            );
          })}
        </nav>

        <div className={`${isAdminMenuOpen ? "block" : "hidden"} md:block p-6 border-t border-white/10`}>
          <div className="flex items-center gap-3 text-sm text-white/70 mb-4">
            <div className="w-2 h-2 rounded-full bg-brand-gold"></div>
            Live
          </div>
          <a
            href="/"
            className="flex items-center gap-2 text-sm text-white hover:text-brand-gold transition-colors mb-6"
          >
            &larr; Back to Site
          </a>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-0 md:h-screen overflow-hidden bg-brand-light">
        <div className="flex-1 overflow-y-auto p-4 md:p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="max-w-7xl mx-auto"
            >
              {renderTabContent()}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Modals */}
      <datalist id="category-options">
        <option value="Kitchens" />
        <option value="Bathrooms" />
        <option value="Cabinetry" />
        <option value="Tables" />
        <option value="Seating" />
        <option value="Closets" />
        <option value="Doors" />
        <option value="Millwork" />
        <option value="CNC" />
        <option value="Commercial" />
      </datalist>
      <AnimatePresence>
        {isProductModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-brand-dark/80 z-[100] flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="bg-[#F4E6D5] rounded-lg shadow-xl w-full max-w-2xl overflow-hidden max-h-[90vh] flex flex-col"
            >
              <div className="flex justify-between items-center p-6 border-b border-brand-dark/10 shrink-0">
                <h3 className="text-xl font-bold">
                  {editingProduct ? "Edit Product" : "Add Product"}
                </h3>
                <button onClick={() => setProductModalOpen(false)}>
                  <X size={20} />
                </button>
              </div>
              <form
                onSubmit={handleProductSubmit}
                className="p-6 flex flex-col gap-4 overflow-y-auto"
              >
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-bold text-gray-500 uppercase">Product Name</label>
                    <input
                      name="name"
                      defaultValue={editingProduct?.name || ""}
                      placeholder="e.g. Walnut Cutting Board"
                      required
                      className="border border-black/10 p-3 rounded bg-white shadow-sm focus:outline-none focus:ring-1 focus:ring-brand-gold"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1">
                      <label className="text-xs font-bold text-gray-500 uppercase">Category</label>
                      <input
                        name="category"
                        list="category-options"
                        defaultValue={editingProduct?.category || "Kitchens"}
                        required
                        placeholder="Select or type category"
                        className="border border-black/10 p-3 rounded bg-white shadow-sm focus:outline-none focus:ring-1 focus:ring-brand-gold"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-xs font-bold text-gray-500 uppercase">Price ($)</label>
                      <input
                        name="price"
                        type="number"
                        step="0.01"
                        defaultValue={editingProduct?.price || ""}
                        placeholder="e.g. 150.00"
                        required
                        className="border border-black/10 p-3 rounded bg-white shadow-sm focus:outline-none focus:ring-1 focus:ring-brand-gold"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <ImageInput
                      name="image"
                      defaultValue={editingProduct?.image || ""}
                      label="Image"
                      placeholder="https://images.unsplash.com/..."
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-bold text-gray-500 uppercase">Description</label>
                    <textarea
                      name="description"
                      defaultValue={
                        editingProduct?.description || ""
                      }
                      placeholder="Enter product description here..."
                      required
                      rows={4}
                      className="border border-black/10 p-3 rounded resize-none bg-white shadow-sm focus:outline-none focus:ring-1 focus:ring-brand-gold"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="bg-brand-dark text-white py-3 rounded mt-4 font-bold uppercase tracking-wider"
                >
                  Save Product
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}

        {isProjectModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-brand-dark/80 z-[100] flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="bg-[#F4E6D5] rounded-lg shadow-xl w-full max-w-2xl overflow-hidden max-h-[90vh] flex flex-col"
            >
              <div className="flex justify-between items-center p-6 border-b border-brand-dark/10 shrink-0">
                <h3 className="text-xl font-bold">
                  {editingProject ? "Edit Project" : "Add Project"}
                </h3>
                <button onClick={() => setProjectModalOpen(false)}>
                  <X size={20} />
                </button>
              </div>
              <form
                onSubmit={handleProjectSubmit}
                className="p-6 flex flex-col gap-4 overflow-y-auto"
              >
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-bold text-gray-500 uppercase">Project Title</label>
                    <input
                      name="title"
                      defaultValue={editingProject?.title || ""}
                      placeholder="e.g. Modern Walnut Desk"
                      required
                      className="border border-black/10 p-3 rounded bg-white shadow-sm focus:outline-none focus:ring-1 focus:ring-brand-gold"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-bold text-gray-500 uppercase">Category</label>
                    <input
                      name="category"
                      list="category-options"
                      defaultValue={editingProject?.category || "Kitchens"}
                      required
                      placeholder="Select or type category"
                      className="border border-black/10 p-3 rounded bg-white shadow-sm focus:outline-none focus:ring-1 focus:ring-brand-gold"
                    />
                  </div>
                </div>
                <ImageInput
                  name="coverImage"
                  defaultValue={editingProject?.coverImage || ""}
                  label="Cover Image"
                  placeholder="https://images.unsplash.com/..."
                />
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-bold text-gray-500 uppercase">Short Description</label>
                  <textarea
                    name="shortDescription"
                    defaultValue={
                      editingProject?.shortDescription || ""
                    }
                    placeholder="Brief description of the project"
                    required
                    rows={2}
                    className="border border-black/10 p-3 rounded resize-none bg-white shadow-sm focus:outline-none focus:ring-1 focus:ring-brand-gold"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-bold text-gray-500 uppercase">Long Descriptions (One paragraph per line)</label>
                  <textarea
                    name="descriptions"
                    defaultValue={
                      editingProject?.descriptions?.join("\n") || ""
                    }
                    placeholder="Enter detailed project description here..."
                    required
                    rows={4}
                    className="border border-black/10 p-3 rounded resize-none text-sm leading-relaxed bg-white shadow-sm focus:outline-none focus:ring-1 focus:ring-brand-gold"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-bold text-gray-500 uppercase">Additional Images</label>
                  <div className="grid grid-cols-2 gap-4">
                    <ImageInput name="image1" defaultValue={editingProject?.images?.[0] || ""} placeholder="Image 1" />
                    <ImageInput name="image2" defaultValue={editingProject?.images?.[1] || ""} placeholder="Image 2" />
                    <ImageInput name="image3" defaultValue={editingProject?.images?.[2] || ""} placeholder="Image 3" />
                    <ImageInput name="image4" defaultValue={editingProject?.images?.[3] || ""} placeholder="Image 4" />
                  </div>
                </div>
                <button
                  type="submit"
                  className="bg-[#1A1A1A] hover:bg-[#D3A971] hover:text-[#1A1A1A] transition-colors text-white py-3 rounded mt-4 font-bold uppercase tracking-wider"
                >
                  Save Project
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
        {isGalleryModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="bg-[#F4E6D5] rounded-2xl shadow-xl w-full max-w-md overflow-hidden max-h-[90vh] flex flex-col"
            >
              <div className="flex justify-between items-center p-6 border-b border-black/5 shrink-0">
                <h3 className="text-xl font-bold">
                  {editingGallery ? "Edit Gallery Item" : "Add Gallery Item"}
                </h3>
                <button
                  onClick={() => setGalleryModalOpen(false)}
                  className="text-gray-400 hover:text-gray-900"
                >
                  <X size={20} />
                </button>
              </div>
              <form
                onSubmit={handleGallerySubmit}
                className="p-6 flex flex-col gap-4 overflow-y-auto"
              >
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-bold text-gray-500 uppercase">Image Title</label>
                  <input
                    name="title"
                    defaultValue={editingGallery?.title || ""}
                    placeholder="e.g. Cherry Wood Cabinet"
                    required
                    className="border border-black/10 p-3 rounded-lg text-sm bg-white shadow-sm focus:outline-none focus:ring-1 focus:ring-brand-gold"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-bold text-gray-500 uppercase">Category</label>
                  <input
                    name="category"
                    list="category-options"
                    defaultValue={editingGallery?.category || "Kitchens"}
                    required
                    placeholder="Select or type category"
                    className="border border-black/10 p-3 rounded-lg text-sm bg-white shadow-sm focus:outline-none focus:ring-1 focus:ring-brand-gold"
                  />
                </div>
                <ImageInput
                  name="src"
                  defaultValue={editingGallery?.src || ""}
                  label="Image"
                  placeholder="https://images.unsplash.com/..."
                />
                <button
                  type="submit"
                  className="bg-[#1A1A1A] hover:bg-[#D3A971] hover:text-[#1A1A1A] transition-colors text-white py-3 rounded-lg mt-4 font-bold text-sm tracking-wider"
                >
                  Save Image
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
        
        {orderToDelete && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="bg-[#F4E6D5] rounded-2xl shadow-xl w-full max-w-md p-6"
            >
              <h3 className="text-xl font-bold mb-4 text-gray-900">Delete Order</h3>
              <p className="text-gray-600 mb-6">Are you sure you want to permanently delete order <strong>{orderToDelete}</strong>? This action cannot be undone.</p>
              <div className="flex gap-4 justify-end">
                <button 
                  onClick={() => setOrderToDelete(null)}
                  className="px-6 py-2 border rounded-lg text-gray-700 hover:bg-gray-50 font-semibold"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => {
                    deleteOrder(orderToDelete);
                    if (selectedContactId === orderToDelete) {
                      setSelectedContactId(null);
                    }
                    setOrderToDelete(null);
                    showToast("Order deleted successfully", "success");
                  }}
                  className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-semibold"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}

        {galleryToDelete && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="bg-[#F4E6D5] rounded-2xl shadow-xl w-full max-w-md p-6"
            >
              <h3 className="text-xl font-bold mb-4 text-gray-900">Delete Gallery Item</h3>
              <p className="text-gray-600 mb-6">Are you sure you want to permanently delete <strong>{galleryToDelete.title}</strong>? This action cannot be undone.</p>
              <div className="flex gap-4 justify-end">
                <button 
                  onClick={() => setGalleryToDelete(null)}
                  className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-semibold"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => {
                    deleteGalleryItem(galleryToDelete.id);
                    logActivity('Content Edit', 'Gallery Item Deleted', galleryToDelete.title);
                    setGalleryToDelete(null);
                    showToast("Gallery item deleted successfully", "success");
                  }}
                  className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-semibold"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}

        {productToDelete && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="bg-[#F4E6D5] rounded-2xl shadow-xl w-full max-w-md p-6"
            >
              <h3 className="text-xl font-bold mb-4 text-gray-900">Delete Shop Item</h3>
              <p className="text-gray-600 mb-6">Are you sure you want to permanently delete <strong>{productToDelete.name}</strong>? This action cannot be undone.</p>
              <div className="flex gap-4 justify-end">
                <button 
                  onClick={() => setProductToDelete(null)}
                  className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-semibold"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => {
                    deleteProduct(productToDelete.id);
                    logActivity('Content Edit', 'Shop Item Deleted', productToDelete.name);
                    setProductToDelete(null);
                    showToast("Shop item deleted successfully", "success");
                  }}
                  className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-semibold"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
