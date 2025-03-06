import React, { useState } from 'react';
import { PlusCircle, Coins, Receipt } from 'lucide-react';
import type { Transaction, TransactionType } from '../types';

type Props = {
  onAddTransaction: (transaction: Transaction) => void;
};

const expenseCategories = ['Food', 'Transport', 'Housing', 'Entertainment', 'Utilities', 'Other'];
const incomeCategories = ['Salary', 'Freelance', 'Investments', 'Other'];

export function TransactionForm({ onAddTransaction }: Props) {
  const [type, setType] = useState<TransactionType>('expense');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || !category) return;

    const transaction: Transaction = {
      id: Date.now().toString(),
      type,
      amount: parseFloat(amount),
      category,
      description,
      date: new Date(),
    };

    onAddTransaction(transaction);
    setAmount('');
    setCategory('');
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex gap-4">
        <button
          type="button"
          onClick={() => setType('expense')}
          className={`flex-1 flex items-center justify-center gap-2 p-3 rounded-lg border-2 transition-all ${
            type === 'expense'
              ? 'border-red-500 bg-red-50 text-red-700'
              : 'border-gray-200 hover:border-red-200 hover:bg-red-50'
          }`}
        >
          <Receipt size={20} />
          Expense
        </button>
        <button
          type="button"
          onClick={() => setType('income')}
          className={`flex-1 flex items-center justify-center gap-2 p-3 rounded-lg border-2 transition-all ${
            type === 'income'
              ? 'border-green-500 bg-green-50 text-green-700'
              : 'border-gray-200 hover:border-green-200 hover:bg-green-50'
          }`}
        >
          <Coins size={20} />
          Income
        </button>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="pl-8 w-full rounded-lg border-gray-200 focus:border-blue-500 focus:ring-blue-500 transition-colors"
              placeholder="0.00"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full rounded-lg border-gray-200 focus:border-blue-500 focus:ring-blue-500 transition-colors"
            required
          >
            <option value="">Select category</option>
            {(type === 'expense' ? expenseCategories : incomeCategories).map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full rounded-lg border-gray-200 focus:border-blue-500 focus:ring-blue-500 transition-colors"
            placeholder="Enter description"
          />
        </div>
      </div>

      <button
        type="submit"
        className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all"
      >
        <PlusCircle size={20} />
        Add Transaction
      </button>
    </form>
  );
}