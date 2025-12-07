// Temporary in-memory storage for development
// This will be replaced with proper database storage later

export interface User {
  id: string;
  email: string;
  password: string;
  name: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}

export interface Contract {
  id: string;
  title: string;
  content: string;
  createdById: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  sentAt?: string;
  signedAt?: string;
  createdBy: {
    id: string;
    email: string;
    name: string;
    role: string;
  };
  signedBy?: any;
  signatures?: any[];
}

export const users: User[] = [];
export const contracts: Contract[] = [
  {
    id: "1765118078478",
    title: "Sample Contract",
    content: "This is a sample contract for testing.",
    createdById: "1",
    status: "draft",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    createdBy: {
      id: "1",
      email: "admin@example.com",
      name: "Admin User",
      role: "admin"
    },
    signatures: []
  }
];