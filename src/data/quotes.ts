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
  status: 'new' | 'reviewed' | 'contacted';
  tenantId?: string;
}

export const quotes: QuoteRequest[] = [
  {
    id: "QT-1001",
    name: "Bob Jones",
    email: "bob@example.com",
    phone: "555-0987",
    type: "Custom Furniture",
    budget: "$1000 - $3000",
    timeline: "3 months",
    details: "I would like a quote for a custom dining table made of walnut.",
    date: new Date(Date.now() - 5 * 86400000).toISOString(),
    status: 'reviewed'
  },
  {
    id: "QT-1002",
    name: "Michael Chang",
    email: "mchang@example.com",
    phone: "555-7766",
    type: "Cabinetry",
    budget: "$5000+",
    timeline: "Flexible",
    details: "We are remodeling our kitchen and need full wrap-around cabinets in white oak.",
    date: new Date(Date.now() - 2 * 86400000).toISOString(),
    status: 'new'
  },
  {
    id: "QT-1003",
    name: "Linda Ramirez",
    email: "lramirez@example.com",
    phone: "555-4422",
    type: "Custom Seating",
    budget: "Under $1000",
    timeline: "1 month",
    details: "Looking for a custom mudroom bench with shoe cubbies underneath.",
    date: new Date().toISOString(),
    status: 'new'
  },
  {
    id: "QT-1004",
    name: "James Anderson",
    email: "janderson.design@example.com",
    phone: "555-8899",
    type: "Millwork",
    budget: "$10000+",
    timeline: "6 months",
    details: "Need a complete office fit-out including custom desks and a conference table.",
    date: new Date(Date.now() - 7 * 86400000).toISOString(),
    status: 'contacted'
  },
  {
    id: "QT-1005",
    name: "Susan Lee",
    email: "slee88@example.com",
    phone: "555-1122",
    type: "Millwork",
    budget: "$3000 - $5000",
    timeline: "2 months",
    details: "Looking for custom wainscoting and crown molding for a dining room.",
    date: new Date(Date.now() - 14 * 86400000).toISOString(),
    status: 'reviewed'
  }
];
