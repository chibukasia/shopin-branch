export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: 'admin' | 'staff' | 'customer';
  status: 'active' | 'inactive' | 'suspended';
  avatar?: string;
  joinDate: string;
  lastLogin?: string;
  totalOrders: number;
  totalSpent: number;
  address?: Address;
  preferences?: UserPreferences;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface UserPreferences {
  notifications: boolean;
  emailMarketing: boolean;
  smsUpdates: boolean;
  language: string;
  currency: string;
}
