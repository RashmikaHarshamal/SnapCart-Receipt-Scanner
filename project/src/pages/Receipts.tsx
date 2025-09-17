import React, { useState, useEffect } from 'react';
import { Calendar, Store, Search, Trash2, Eye } from 'lucide-react';
import { receiptApi, Receipt } from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';
import Header from '../components/Header';

const Receipts: React.FC = () => {
  const [receipts, setReceipts] = useState<Receipt[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedReceipt, setSelectedReceipt] = useState<Receipt | null>(null);

  useEffect(() => {
    fetchReceipts();
  }, []);

  const fetchReceipts = async () => {
    try {
      const data = await receiptApi.getAllReceipts();
      setReceipts(data);
    } catch (error) {
      console.error('Failed to fetch receipts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteReceipt = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this receipt?')) {
      try {
        await receiptApi.deleteReceipt(id);
        setReceipts(receipts.filter(receipt => receipt.id !== id));
      } catch (error) {
        console.error('Failed to delete receipt:', error);
      }
    }
  };

  const filteredReceipts = receipts.filter(receipt =>
    receipt.store.toLowerCase().includes(searchTerm.toLowerCase()) ||
    receipt.items.some(item => 
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div>
       <Header />
        <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Receipt History</h1>
          <p className="text-gray-600 mt-2">Manage and review your uploaded receipts</p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-green-600">
            ${receipts.reduce((sum, r) => sum + (r.totalAmount || 0), 0).toFixed(2)}
          </p>
          <p className="text-gray-600">Total Spent</p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search receipts by store or item..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Receipts Grid */}
      {filteredReceipts.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl shadow-lg border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            {searchTerm ? 'No matching receipts' : 'No receipts found'}
          </h2>
          <p className="text-gray-600">
            {searchTerm ? 'Try adjusting your search terms' : 'Upload your first receipt to get started'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReceipts.map((receipt) => (
            <div
              key={receipt.id}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100 overflow-hidden"
            >
              {/* Receipt Header */}
              <div className="p-6 border-b border-gray-100">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{receipt.store}</h3>
                    <div className="flex items-center space-x-2 text-gray-600 mt-1">
                      <Calendar className="w-4 h-4" />
                      <span className="text-sm">
                        {new Date(receipt.createdDate).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold text-green-600">
                      ${receipt.totalAmount.toFixed(2)}
                    </p>
                    <p className="text-sm text-gray-600">{receipt.items.length} items</p>
                  </div>
                </div>
              </div>

              {/* Receipt Items Preview */}
              <div className="p-6 space-y-3">
                <h4 className="font-medium text-gray-800 mb-3">Items:</h4>
                <div className="space-y-2 max-h-32 overflow-y-auto">
                  {receipt.items.slice(0, 3).map((item, index) => (
                    <div key={index} className="flex justify-between items-center text-sm">
                      <span className="text-gray-700 truncate">{item.name}</span>
                      <span className="font-semibold text-gray-900 ml-2">
                        ${item.price.toFixed(2)}
                      </span>
                    </div>
                  ))}
                  {receipt.items.length > 3 && (
                    <div className="text-sm text-gray-500 italic">
                      +{receipt.items.length - 3} more items
                    </div>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="p-6 pt-0">
                <div className="flex space-x-2">
                  <button
                    onClick={() => setSelectedReceipt(receipt)}
                    className="flex-1 flex items-center justify-center space-x-2 py-2 px-3 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
                  >
                    <Eye className="w-4 h-4" />
                    <span className="text-sm font-medium">View</span>
                  </button>
                  <button
                    onClick={() => handleDeleteReceipt(receipt.id)}
                    className="flex items-center justify-center space-x-2 py-2 px-3 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Receipt Details Modal */}
      {selectedReceipt && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{selectedReceipt.store}</h2>
                  <div className="flex items-center space-x-4 text-gray-600 mt-2">
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(selectedReceipt.createdDate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Store className="w-4 h-4" />
                      <span>{selectedReceipt.category}</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedReceipt(null)}
                  className="text-gray-500 hover:text-gray-700 text-xl"
                >
                  ×
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Total */}
              <div className="text-center py-4 bg-gray-50 rounded-lg">
                <p className="text-3xl font-bold text-green-600">
                  ${selectedReceipt.totalAmount.toFixed(2)}
                </p>
                <p className="text-gray-600">Total Amount</p>
              </div>

              {/* Items List */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Items</h3>
                <div className="space-y-2">
                  {selectedReceipt.items.map((item, index) => (
                    <div key={index} className="flex justify-between items-center py-3 px-4 bg-gray-50 rounded-lg">
                      <div>
                        <span className="text-gray-900 font-medium">{item.name}</span>
                        <div className="text-sm text-gray-600">
                          Qty: {item.quantity || 1} • Category: {item.category || 'General'}
                        </div>
                      </div>
                      <span className="font-semibold text-gray-900">
                        ${item.price.toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Extracted Text */}
              <details>
                <summary className="cursor-pointer text-gray-700 font-medium hover:text-gray-900">
                  View Original Text
                </summary>
                <div className="mt-3 p-4 bg-gray-100 rounded-lg">
                  <pre className="text-sm text-gray-700 whitespace-pre-wrap max-h-40 overflow-y-auto">
                    {selectedReceipt.extractedText}
                  </pre>
                </div>
              </details>
            </div>
          </div>
        </div>
      )}
    </div>
    </div>
  );
};

export default Receipts;