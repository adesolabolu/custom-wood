export interface Newsletter {
  id: string;
  email: string;
  date: string;
  tenantId?: string;
}

export const newsletters: Newsletter[] = [
  {
    id: "NL-1001",
    email: "subscriber@example.com",
    date: new Date(Date.now() - 10 * 86400000).toISOString()
  },
  {
    id: "NL-1002",
    email: "woodfan99@gmail.com",
    date: new Date(Date.now() - 5 * 86400000).toISOString()
  },
  {
    id: "NL-1003",
    email: "interior.design.pro@studio.net",
    date: new Date(Date.now() - 1 * 86400000).toISOString()
  },
  {
    id: "NL-1004",
    email: "diy_crafts@example.org",
    date: new Date().toISOString()
  },
  {
    id: "NL-1005",
    email: "woodworking.enthusiast@hotmail.com",
    date: new Date(Date.now() - 2 * 86400000).toISOString()
  },
  {
    id: "NL-1006",
    email: "custom_builds@example.co.uk",
    date: new Date(Date.now() - 3 * 86400000).toISOString()
  }
];
