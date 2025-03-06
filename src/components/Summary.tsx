import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import type { Transaction, CategoryTotal } from '../types';

type Props = {
  transactions: Transaction[];
};

const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899'];

export function Summary({ transactions }: Props) {
  const calculateTotalsByCategory = (type: 'expense' | 'income'): CategoryTotal[] => {
    const totals = transactions
      .filter((t) => t.type === type)
      .reduce((acc, transaction) => {
        acc[transaction.category] = (acc[transaction.category] || 0) + transaction.amount;
        return acc;
      }, {} as Record<string, number>);

    return Object.entries(totals).map(([category, amount]) => ({
      category,
      amount,
    }));
  };

  const expenseTotals = calculateTotalsByCategory('expense');
  const incomeTotals = calculateTotalsByCategory('income');

  const totalExpenses = expenseTotals.reduce((sum, item) => sum + item.amount, 0);
  const totalIncome = incomeTotals.reduce((sum, item) => sum + item.amount, 0);
  const netBalance = totalIncome - totalExpenses;

  return (
    <div className="bg-white rounded-lg">
      <div className="p-6 border-b border-gray-100">
        <h2 className="text-xl font-semibold text-gray-800">Financial Summary</h2>
        <p className="text-sm text-gray-600 mt-1">Overview of your income and expenses</p>
      </div>
      
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800">Income Breakdown</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={incomeTotals}
                    dataKey="amount"
                    nameKey="category"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    label
                  >
                    {incomeTotals.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `$${Number(value).toFixed(2)}`} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <p className="text-sm text-green-600 font-medium">Total Income</p>
              <p className="text-2xl font-bold text-green-700">${totalIncome.toFixed(2)}</p>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800">Expense Breakdown</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={expenseTotals}
                    dataKey="amount"
                    nameKey="category"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    label
                  >
                    {expenseTotals.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `$${Number(value).toFixed(2)}`} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="text-center p-4 bg-red-50 rounded-lg">
              <p className="text-sm text-red-600 font-medium">Total Expenses</p>
              <p className="text-2xl font-bold text-red-700">${totalExpenses.toFixed(2)}</p>
            </div>
          </div>
        </div>

        <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Net Balance</h3>
            <p className={`text-3xl font-bold ${netBalance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              ${netBalance.toFixed(2)}
            </p>
            <p className="text-sm text-gray-600 mt-2">
              {netBalance >= 0 ? 'You\'re in good financial health!' : 'Consider reducing expenses'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}