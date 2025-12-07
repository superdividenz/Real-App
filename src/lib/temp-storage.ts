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
export const contracts: Contract[] = [];