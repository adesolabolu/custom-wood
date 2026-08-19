import React from "react";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAdmin } from "../context/AdminContext";
import { useToast } from "../context/ToastContext";
import { ActivityLog, logActivity, getActivityLogs } from "../lib/ActivityLogger";
import { ImageUploadInput } from "../components/ui/ImageUploadInput";
import { MigrationTool } from "../components/MigrationTool";
import {
  LayoutDashboard,
  Image as ImageIcon,
  Mail,
  MessageSquare,
  FileText,
  Plus,
  Edit,
  Trash2,
  Menu,
  X,
} from "lucide-react";

type Tab =
  | "overview"
  | "portfolio"
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
    galleries,
    newsletters,
    contactMessages,
    quotes,
    deleteGalleryItem,
    addGalleryItem,
    updateGalleryItem,
  } = useAdmin();
  const { showToast } = useToast();

  const [isGalleryModalOpen, setGalleryModalOpen] = useState(false);
  const [editingGallery, setEditingGallery] = useState<any | null>(null);

  const [selectedContactId, setSelectedContactId] = useState<string | null>(
    null,
  );
  
  const [galleryToDelete, setGalleryToDelete] = useState<any | null>(null);
  const [dashboardDateRange, setDashboardDateRange] = useState<{ start: string, end: string }>({ start: '', end: '' });
  const [activityFilter, setActivityFilter] = useState<string>('all');

  const isDateInRange = (dateString: string) => {
    if (!dashboardDateRange.start && !dashboardDateRange.end) return true;
    const d = new Date(dateString).getTime();
    const start = dashboardDateRange.start ? new Date(dashboardDateRange.start).getTime() : 0;
    const end = dashboardDateRange.end ? new Date(dashboardDateRange.end).getTime() + 86400000 : Infinity; // add 1 day to include the end date fully
    return d >= start && d <= end;
  };

  const recentActivity = useMemo(() => {
    const activities: { id: string, type: string, title: string, date: string, desc: string }[] = [];
    contactMessages.filter(c => isDateInRange(c.date)).forEach(c => activities.push({ id: `msg-${c.id}`, type: 'Support Request', title: `Support Request from ${c.name}`, date: c.date, desc: 'Contact message' }));
    quotes.filter(q => isDateInRange(q.date)).forEach(q => activities.push({ id: `quote-${q.id}`, type: 'Quote Request', title: `Quote Request: ${q.type}`, date: q.date, desc: q.name }));
    
    getActivityLogs().filter(log => isDateInRange(log.date)).forEach(log => activities.push(log));

    return activities.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 5);
  }, [contactMessages, quotes, dashboardDateRange]);

  const tabs = [
    { id: "overview", label: "Overview", icon: LayoutDashboard },
    { id: "portfolio", label: "Gallery", icon: ImageIcon },
    { id: "newsletter", label: "Newsletter List", icon: Mail },
    { id: "contact", label: "Contact Messages", icon: MessageSquare },
    { id: "quotes", label: "Quote Requests", icon: FileText },
  ] as const;

  const getMaxId = (items: {id: string}[], prefix: string) => {
    const ids = items.map(i => parseInt(i.id.replace(prefix, ''))).filter(n => !isNaN(n));
    return ids.length > 0 ? Math.max(...ids) : 0;
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-6">
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
                    Newsletters
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
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Recent Contact Messages */}
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-black/5">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-bold text-gray-900">Recent Messages</h3>
                  <button 
                    onClick={() => setActiveTab('contact')}
                    className="text-sm font-medium text-[#D3A971] hover:text-brand-dark transition-colors"
                  >
                    View All
                  </button>
                </div>
                <div className="space-y-4">
                  {contactMessages.length === 0 && <p className="text-sm text-gray-500">No messages yet.</p>}
                  {contactMessages.slice(0, 5).map(msg => (
                    <div key={msg.id} className="flex justify-between items-center pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                      <div>
                        <p className="text-sm font-bold text-gray-900">{msg.name}</p>
                        <p className="text-xs text-gray-500">{msg.email}</p>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] font-medium text-gray-400">{new Date(msg.date).toLocaleDateString()}</span>
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
      </datalist>
      <AnimatePresence>
        </AnimatePresence>
    </div>
  );
}
