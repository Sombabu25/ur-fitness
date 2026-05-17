export interface Member {
  _id: string;
  fullName: string;
  mobileNumber: string;
  email: string;
  gender: 'Male' | 'Female' | 'Other';
  age: number;
  joiningDate: string;
  membershipPlan: '1 Month' | '3 Months' | '6 Months' | '12 Months';
  duration: number;
  price: number;
  expiryDate: string;
  paymentStatus: 'Paid' | 'Pending' | 'Overdue';
  notes: string;
  isActive: boolean;
  isExpired: boolean;
  daysRemaining: number;
  createdAt: string;
}

export interface Plan {
  _id: string;
  name: string;
  duration: number;
  price: number;
  description: string;
  features: string[];
  popular: boolean;
  isActive: boolean;
}

export interface Admin {
  id: string;
  name: string;
  email: string;
  role: string;
}

export interface Analytics {
  totalMembers: number;
  activeMembers: number;
  expiredMembers: number;
  newThisMonth: number;
  expiringIn7Days: number;
  totalRevenue: number;
  monthlyRevenue: number;
  planDistribution: { _id: string; count: number }[];
}

export interface MemberFormData {
  fullName: string;
  mobileNumber: string;
  email: string;
  gender: string;
  age: string;
  joiningDate: string;
  membershipPlan: string;
  duration: string;
  price: string;
  paymentStatus: string;
  notes: string;
}
