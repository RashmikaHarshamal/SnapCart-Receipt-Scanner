import React, { useState, useEffect } from 'react';
import { Receipt, DollarSign, TrendingUp, ShoppingBag } from 'lucide-react';
import { analyticsApi, AnalyticsData } from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';

const Dashboard: React.FC = () => {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const data = await analyticsApi.getAnalyticsSummary();
      setAnalytics(data);
    } catch (error) {
      console.error('Failed to fetch analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  const stats = [
    {
      title: 'Total Spent',
      value: analytics ? `$${analytics.totalSpent.toFixed(2)}` : '$0.00',
      icon: DollarSign,
      color: 'from-green-500 to-emerald-500',
    },
    {
      title: 'Total Receipts',
      value: analytics?.totalReceipts || 0,
      icon: Receipt,
      color: 'from-blue-500 to-cyan-500',
    },
    {
      title: 'Average Receipt',
      value: analytics ? `$${analytics.averageReceiptAmount.toFixed(2)}` : '$0.00',
      icon: TrendingUp,
      color: 'from-purple-500 to-violet-500',
    },
    {
      title: 'Categories',
      value: analytics ? Object.keys(analytics.categorySpending || {}).length : 0,
      icon: ShoppingBag,
      color: 'from-orange-500 to-red-500',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Welcome to SnapCart
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Track your expenses effortlessly by scanning receipts. Get insights into your spending patterns and make smarter financial decisions.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.title}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100"
            >
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 uppercase tracking-wide">
                      {stat.title}
                    </p>
                    <p className="text-2xl font-bold text-gray-900 mt-2">
                      {stat.value}
                    </p>
                  </div>
                  <div className={`p-3 rounded-lg bg-gradient-to-r ${stat.color}`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <button
            onClick={() => window.location.href = '/upload'}
            className="flex items-center justify-center p-6 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-200 shadow-md hover:shadow-lg"
          >
            <Receipt className="w-8 h-8 mr-3" />
            <span className="text-lg font-semibold">Upload Receipt</span>
          </button>
          
          <button
            onClick={() => window.location.href = '/analytics'}
            className="flex items-center justify-center p-6 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg hover:from-green-600 hover:to-emerald-600 transition-all duration-200 shadow-md hover:shadow-lg"
          >
            <TrendingUp className="w-8 h-8 mr-3" />
            <span className="text-lg font-semibold">View Analytics</span>
          </button>
          
          <button
            onClick={() => window.location.href = '/receipts'}
            className="flex items-center justify-center p-6 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg hover:from-orange-600 hover:to-red-600 transition-all duration-200 shadow-md hover:shadow-lg"
          >
            <ShoppingBag className="w-8 h-8 mr-3" />
            <span className="text-lg font-semibold">Browse Receipts</span>
          </button>
        </div>
      </div>

      {/* Recent Activity */}
      {analytics && analytics.totalReceipts > 0 && (
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Spending Overview</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Top Items */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Most Bought Items</h3>
              <div className="space-y-3">
                {Object.entries(analytics.topItems || {})
                  .slice(0, 5)
                  .map(([item, count]) => (
                    <div key={item} className="flex justify-between items-center py-2">
                      <span className="text-gray-700">{item}</span>
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm font-medium">
                        {count}
                      </span>
                    </div>
                  ))}
              </div>
            </div>

            {/* Categories */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Spending by Category</h3>
              <div className="space-y-3">
                {Object.entries(analytics.categorySpending || {})
                  .slice(0, 5)
                  .map(([category, amount]) => (
                    <div key={category} className="flex justify-between items-center py-2">
                      <span className="text-gray-700">{category}</span>
                      <span className="text-green-600 font-semibold">
                        ${amount.toFixed(2)}
                      </span>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;