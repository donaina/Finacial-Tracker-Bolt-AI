export type TransactionType = 'expense' | 'income';
export type RecurringInterval = 'weekly' | 'monthly' | 'quarterly' | 'yearly';

export type Transaction = {
  id: string;
  type: TransactionType;
  amount: number;
  category: string;
  description: string;
  date: Date;
};

export type RecurringTransaction = {
  id: string;
  type: TransactionType;
  amount: number;
  category: string;
  description: string;
  interval: RecurringInterval;
  startDate: Date;
  isActive: boolean;
};

export type CategoryTotal = {
  category: string;
  amount: number;
};

export type Asset = {
  id: string;
  name: string;
  value: number;
  type: 'cash' | 'investment' | 'property' | 'vehicle' | 'other';
};

export type Liability = {
  id: string;
  name: string;
  amount: number;
  type: 'credit_card' | 'loan' | 'mortgage' | 'other';
};