import React, { useState } from 'react';
import { PlusCircle, Wallet, CreditCard } from 'lucide-react';
import type { Asset, Liability } from '../types';

type Props = {
  assets: Asset[];
  liabilities: Liability[];
  onAddAsset: (asset: Asset) => void;
  onAddLiability: (liability: Liability) => void;
};

const assetTypes = ['cash', 'investment', 'property', 'vehicle', 'other'] as const;
const liabilityTypes = ['credit_card', 'loan', 'mortgage', 'other'] as const;

export function NetWorth({ assets, liabilities, onAddAsset, onAddLiability }: Props) {
  const [isAddingAsset, setIsAddingAsset] = useState(false);
  const [isAddingLiability, setIsAddingLiability] = useState(false);
  
  // Asset form state
  const [assetName, setAssetName] = useState('');
  const [assetValue, setAssetValue] = useState('');
  const [assetType, setAssetType] = useState<Asset['type']>('cash');
  
  // Liability form state
  const [liabilityName, setLiabilityName] = useState('');
  const [liabilityAmount, setLiabilityAmount] = useState('');
  const [liabilityType, setLiabilityType] = useState<Liability['type']>('credit_card');

  const handleAddAsset = (e: React.FormEvent) => {
    e.preventDefault();
    if (!assetName || !assetValue) return;

    onAddAsset({
      id: Date.now().toString(),
      name: assetName,
      value: parseFloat(assetValue),
      type: assetType,
    });

    setAssetName('');
    setAssetValue('');
    setIsAddingAsset(false);
  };

  const handleAddLiability = (e: React.FormEvent) => {
    e.preventDefault();
    if (!liabilityName || !liabilityAmount) return;

    onAddLiability({
      id: Date.now().toString(),
      name: liabilityName,
      amount: parseFloat(liabilityAmount),
      type: liabilityType,
    });

    setLiabilityName('');
    setLiabilityAmount('');
    setIsAddingLiability(false);
  };

  const totalAssets = assets.reduce((sum, asset) => sum + asset.value, 0);
  const totalLiabilities = liabilities.reduce((sum, liability) => sum + liability.amount, 0);
  const netWorth = totalAssets - totalLiabilities;

  return (
    <div className="bg-white rounded-lg">
      <div className="p-6 border-b border-gray-100">
        <h2 className="text-xl font-semibold text-gray-800">Net Worth Calculator</h2>
        <p className="text-sm text-gray-600 mt-1">Track your assets and liabilities</p>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="p-6 bg-green-50 rounded-lg">
            <h3 className="text-lg font-semibold text-green-800">Total Assets</h3>
            <p className="text-2xl font-bold text-green-600 mt-2">${totalAssets.toFixed(2)}</p>
          </div>
          <div className="p-6 bg-red-50 rounded-lg">
            <h3 className="text-lg font-semibold text-red-800">Total Liabilities</h3>
            <p className="text-2xl font-bold text-red-600 mt-2">${totalLiabilities.toFixed(2)}</p>
          </div>
          <div className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-800">Net Worth</h3>
            <p className={`text-2xl font-bold mt-2 ${netWorth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              ${netWorth.toFixed(2)}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Assets Section */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Assets</h3>
              <button
                onClick={() => setIsAddingAsset(!isAddingAsset)}
                className="flex items-center gap-2 text-blue-600 hover:text-blue-700"
              >
                <PlusCircle size={20} />
                Add Asset
              </button>
            </div>

            {isAddingAsset && (
              <form onSubmit={handleAddAsset} className="mb-6 p-4 bg-gray-50 rounded-lg">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Asset Name</label>
                    <input
                      type="text"
                      value={assetName}
                      onChange={(e) => setAssetName(e.target.value)}
                      className="w-full rounded-lg border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Value</label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                      <input
                        type="number"
                        value={assetValue}
                        onChange={(e) => setAssetValue(e.target.value)}
                        className="pl-8 w-full rounded-lg border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                    <select
                      value={assetType}
                      onChange={(e) => setAssetType(e.target.value as Asset['type'])}
                      className="w-full rounded-lg border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                    >
                      {assetTypes.map((type) => (
                        <option key={type} value={type}>
                          {type.charAt(0).toUpperCase() + type.slice(1)}
                        </option>
                      ))}
                    </select>
                  </div>
                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Wallet size={20} />
                    Add Asset
                  </button>
                </div>
              </form>
            )}

            <div className="space-y-2">
              {assets.map((asset) => (
                <div
                  key={asset.id}
                  className="p-4 bg-white border border-gray-200 rounded-lg flex justify-between items-center"
                >
                  <div>
                    <h4 className="font-medium text-gray-900">{asset.name}</h4>
                    <p className="text-sm text-gray-500">{asset.type}</p>
                  </div>
                  <p className="text-green-600 font-medium">${asset.value.toFixed(2)}</p>
                </div>
              ))}
              {assets.length === 0 && (
                <p className="text-center text-gray-500 py-4">No assets added yet</p>
              )}
            </div>
          </div>

          {/* Liabilities Section */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Liabilities</h3>
              <button
                onClick={() => setIsAddingLiability(!isAddingLiability)}
                className="flex items-center gap-2 text-blue-600 hover:text-blue-700"
              >
                <PlusCircle size={20} />
                Add Liability
              </button>
            </div>

            {isAddingLiability && (
              <form onSubmit={handleAddLiability} className="mb-6 p-4 bg-gray-50 rounded-lg">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Liability Name
                    </label>
                    <input
                      type="text"
                      value={liabilityName}
                      onChange={(e) => setLiabilityName(e.target.value)}
                      className="w-full rounded-lg border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                      <input
                        type="number"
                        value={liabilityAmount}
                        onChange={(e) => setLiabilityAmount(e.target.value)}
                        className="pl-8 w-full rounded-lg border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                    <select
                      value={liabilityType}
                      onChange={(e) => setLiabilityType(e.target.value as Liability['type'])}
                      className="w-full rounded-lg border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                    >
                      {liabilityTypes.map((type) => (
                        <option key={type} value={type}>
                          {type.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                        </option>
                      ))}
                    </select>
                  </div>
                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <CreditCard size={20} />
                    Add Liability
                  </button>
                </div>
              </form>
            )}

            <div className="space-y-2">
              {liabilities.map((liability) => (
                <div
                  key={liability.id}
                  className="p-4 bg-white border border-gray-200 rounded-lg flex justify-between items-center"
                >
                  <div>
                    <h4 className="font-medium text-gray-900">{liability.name}</h4>
                    <p className="text-sm text-gray-500">
                      {liability.type.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                    </p>
                  </div>
                  <p className="text-red-600 font-medium">${liability.amount.toFixed(2)}</p>
                </div>
              ))}
              {liabilities.length === 0 && (
                <p className="text-center text-gray-500 py-4">No liabilities added yet</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}