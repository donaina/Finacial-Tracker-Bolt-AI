import React, { useState } from 'react';
import { Clock, PlusCircle, Coins, Receipt } from 'lucide-react';
import type { RecurringTransaction, RecurringInterval, TransactionType } from '../types';
import { format } from 'date-fns';

type Props = {
  recurringTransactions: RecurringTransaction[];
  onAddRecurring: (transaction: RecurringTransaction) => void;
};

const intervals: RecurringInterval[] = ['weekly', 'monthly', 'quarterly', 'yearly'];
const expenseCategories = ['Rent', 'Utilities', 'Subscriptions', 'Insurance', 'Loan Payment', 'Other'];
const incomeCategories = ['Salary', 'Rental Income', 'Investment Income', 'Other'];

export function RecurringTransactions({ recurringTransactions, onAddRecurring }: Props) {
  const [type, setType] = useState<TransactionType>('expense');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [interval, setInterval] = useState<RecurringInterval>('monthly');
  const [startDate, setStartDate] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || !category || !startDate) return;

    const transaction: RecurringTransaction = {
      id: Date.now().toString(),
      type,
      amount: parseFloat(amount),
      category,
      description,
      interval,
      startDate: new Date(startDate),
      isActive: true,
    };

    onAddRecurring(transaction);
    setAmount('');
    setCategory('');
    setDescription('');
    setStartDate('');
    setIsAdding(false);
  };

  const calculateMonthlyTotal = (transactions: RecurringTransaction[]): number => {
    return transactions.reduce((total, t) => {
      if (!t.isActive) return total;
      const multiplier = {
        weekly: 4,
        monthly: 1,
        quarterly: 1/3,
        yearly: 1/12,
      }[t.interval];
      return total + (t.amount * multiplier);
    }, 0);
  };

  const monthlyExpenses = calculateMonthlyTotal(
    recurringTransactions.filter(t => t.type === 'expense')
  );
  const monthlyIncome = calculateMonthlyTotal(
    recurringTransactions.filter(t => t.type === 'income')
  );

  return (
    <div className="bg-white rounded-lg">
      <div className="p-6 border-b border-gray-100">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">Recurring Transactions</h2>
            <p className="text-sm text-gray-600 mt-1">Manage your regular income and expenses</p>
          </div>
          <button
            onClick={() => setIsAdding(!isAdding)}
            className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all"
          >
            {isAdding ? 'Cancel' : <><PlusCircle size={20} /> Add Recurring</>}
          </button>
        </div>
      </div>

      {isAdding && (
        <div className="p-6 border-b border-gray-100 bg-gray-50">
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                <label className="block text-sm font-medium text-gray-700 mb-1">Interval</label>
                <select
                  value={interval}
                  onChange={(e) => setInterval(e.target.value as RecurringInterval)}
                  className="w-full rounded-lg border-gray-200 focus:border-blue-500 focus:ring-blue-500 transition-colors"
                  required
                >
                  {intervals.map((int) => (
                    <option key={int} value={int}>
                      {int.charAt(0).toUpperCase() + int.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full rounded-lg border-gray-200 focus:border-blue-500 focus:ring-blue-500 transition-colors"
                  required
                />
              </div>

              <div className="md:col-span-2">
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
              <Clock size={20} />
              Add Recurring Transaction
            </button>
          </form>
        </div>
      )}

      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="p-4 bg-green-50 rounded-lg">
            <h3 className="text-lg font-semibold text-green-800">Monthly Recurring Income</h3>
            <p className="text-2xl font-bold text-green-600 mt-2">${monthlyIncome.toFixed(2)}</p>
          </div>
          <div className="p-4 bg-red-50 rounded-lg">
            <h3 className="text-lg font-semibold text-red-800">Monthly Recurring Expenses</h3>
            <p className="text-2xl font-bold text-red-600 mt-2">${monthlyExpenses.toFixed(2)}</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Description
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Interval
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Start Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recurringTransactions.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                    <Clock className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                    <p className="text-sm">No recurring transactions yet</p>
                    <p className="text-xs mt-1">Add your first recurring transaction</p>
                  </td>
                </tr>
              ) : (
                recurringTransactions.map((transaction) => (
                  <tr key={transaction.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {transaction.description || transaction.category}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          transaction.type === 'income'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {transaction.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <span
                        className={
                          transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                        }
                      >
                        ${transaction.amount.toFixed(2)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {transaction.interval.charAt(0).toUpperCase() + transaction.interval.slice(1)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {format(transaction.startDate, 'MMM d, yyyy')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          transaction.isActive
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {transaction.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}