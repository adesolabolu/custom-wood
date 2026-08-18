export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone?: string;
  message: string;
  date: string;
  status: 'unread' | 'read';
  tenantId?: string;
}

export const contactMessages: ContactMessage[] = [
  {
    id: "MSG-1001",
    name: "Alice Smith",
    email: "alice@example.com",
    message: "Hello, I am interested in custom kitchen cabinets. What is your current lead time?",
    date: new Date(Date.now() - 2 * 86400000).toISOString(),
    status: 'read'
  },
  {
    id: "MSG-1002",
    name: "David Miller",
    email: "davidm@example.com",
    phone: "555-3344",
    message: "Do you ship your cutting boards internationally? Looking to buy 5 as corporate gifts.",
    date: new Date(Date.now() - 40000000).toISOString(),
    status: 'unread'
  },
  {
    id: "MSG-1003",
    name: "Emma Wilson",
    email: "ewilson99@example.com",
    message: "I submitted a quote request but forgot to mention that the wood must be ethically sourced. Please note this!",
    date: new Date().toISOString(),
    status: 'unread'
  },
  {
    id: "MSG-1004",
    name: "Robert Taylor",
    email: "robert.t@example.com",
    phone: "555-7788",
    message: "Do you offer any maintenance services for dining tables purchased previously? Mine has a small scratch.",
    date: new Date(Date.now() - 10 * 86400000).toISOString(),
    status: 'read'
  },
  {
    id: "MSG-1005",
    name: "Sophia Martinez",
    email: "smartinez@example.com",
    message: "Can we schedule a visit to your showroom next week? We are looking to remodel our entire kitchen.",
    date: new Date(Date.now() - 15 * 86400000).toISOString(),
    status: 'read'
  }
];
