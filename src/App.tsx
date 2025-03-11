import { useState } from 'react';
import { Wallet } from 'lucide-react';
import { TransactionForm } from './components/TransactionForm';
import { TransactionList } from './components/TransactionList';
import { Summary } from './components/Summary';
import { RecurringTransactions } from './components/RecurringTransactions';
import { NetWorth } from './components/NetWorth';
import type { Transaction, RecurringTransaction, Asset, Liability } from './types';

function App() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [recurringTransactions, setRecurringTransactions] = useState<RecurringTransaction[]>([]);
  const [assets, setAssets] = useState<Asset[]>([]);
  const [liabilities, setLiabilities] = useState<Liability[]>([]);

  const handleAddTransaction = (transaction: Transaction) => {
    setTransactions((prev) => [...prev, transaction]);
  };

  const handleAddRecurring = (transaction: RecurringTransaction) => {
    setRecurringTransactions((prev) => [...prev, transaction]);
  };

  const handleAddAsset = (asset: Asset) => {
    setAssets((prev) => [...prev, asset]);
  };

  const handleAddLiability = (liability: Liability) => {
    setLiabilities((prev) => [...prev, liability]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <header className="bg-white border-b border-blue-100">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-center">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-3 rounded-lg">
              <Wallet className="h-8 w-8 text-white" />
            </div>
            <div className="ml-4">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Financial Tracker
              </h1>
              <p className="text-gray-600 text-sm mt-1">Manage your finances with ease</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-gradient-to-br from-blue-600 to-purple-600 p-1 rounded-xl">
              <div className="bg-white p-6 rounded-lg">
                <h2 className="text-xl font-semibold mb-6 text-gray-800">Add Expense & Income</h2>
                <TransactionForm onAddTransaction={handleAddTransaction} />
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-gradient-to-br from-blue-600 to-purple-600 p-1 rounded-xl">
              <Summary transactions={transactions} />
            </div>
            
            <div className="bg-gradient-to-br from-blue-600 to-purple-600 p-1 rounded-xl">
              <RecurringTransactions
                recurringTransactions={recurringTransactions}
                onAddRecurring={handleAddRecurring}
              />
            </div>

            <div className="bg-gradient-to-br from-blue-600 to-purple-600 p -1 rounded-xl">
              <NetWorth
                assets={assets}
                liabilities={liabilities}
                onAddAsset={handleAddAsset}
                onAddLiability={handleAddLiability}
              />
            </div>
            
            <div className="bg-gradient-to-br from-blue-600 to-purple-600 p-1 rounded-xl">
              <div className="bg-white rounded-lg">
                <div className="p-6 border-b border-gray-100">
                  <h2 className="text-xl font-semibold text-gray-800">Transaction History</h2>
                  <p className="text-sm text-gray-600 mt-1">View and track your financial activities</p>
                </div>
                <TransactionList transactions={transactions} />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;