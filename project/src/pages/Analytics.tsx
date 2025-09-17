import React, { useState, useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Bar, Line, Doughnut } from 'react-chartjs-2';
import { TrendingUp, DollarSign, ShoppingBag, Calendar } from 'lucide-react';
import { analyticsApi, AnalyticsData } from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const Analytics: React.FC = () => {
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

  if (!analytics) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">No Data Available</h2>
        <p className="text-gray-600">Upload some receipts to see analytics</p>
      </div>
    );
  }

  // Monthly spending chart
  const monthlyData = {
    labels: Object.keys(analytics.monthlySpending || {}),
    datasets: [
      {
        label: 'Monthly Spending',
        data: Object.values(analytics.monthlySpending || {}),
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
        borderColor: 'rgb(59, 130, 246)',
        borderWidth: 2,
        fill: true,
      },
    ],
  };

  // Top items chart
  const topItemsData = {
    labels: Object.keys(analytics.topItems || {}).slice(0, 10),
    datasets: [
      {
        label: 'Purchase Count',
        data: Object.values(analytics.topItems || {}).slice(0, 10),
        backgroundColor: [
          'rgba(59, 130, 246, 0.8)',
          'rgba(16, 185, 129, 0.8)',
          'rgba(245, 158, 11, 0.8)',
          'rgba(239, 68, 68, 0.8)',
          'rgba(139, 92, 246, 0.8)',
          'rgba(236, 72, 153, 0.8)',
          'rgba(34, 197, 94, 0.8)',
          'rgba(249, 115, 22, 0.8)',
          'rgba(168, 85, 247, 0.8)',
          'rgba(14, 165, 233, 0.8)',
        ],
        borderWidth: 0,
      },
    ],
  };

  // Category spending chart
  const categoryData = {
    labels: Object.keys(analytics.categorySpending || {}),
    datasets: [
      {
        data: Object.values(analytics.categorySpending || {}),
        backgroundColor: [
          'rgba(59, 130, 246, 0.8)',
          'rgba(16, 185, 129, 0.8)',
          'rgba(245, 158, 11, 0.8)',
          'rgba(239, 68, 68, 0.8)',
          'rgba(139, 92, 246, 0.8)',
          'rgba(236, 72, 153, 0.8)',
        ],
        borderWidth: 0,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Analytics Dashboard</h1>
        <p className="text-gray-600">Insights into your spending patterns and habits</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Spent</p>
              <p className="text-2xl font-bold text-green-600">
                ${analytics.totalSpent.toFixed(2)}
              </p>
            </div>
            <DollarSign className="w-8 h-8 text-green-500" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Receipts</p>
              <p className="text-2xl font-bold text-blue-600">{analytics.totalReceipts}</p>
            </div>
            <ShoppingBag className="w-8 h-8 text-blue-500" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avg. Receipt</p>
              <p className="text-2xl font-bold text-purple-600">
                ${analytics.averageReceiptAmount.toFixed(2)}
              </p>
            </div>
            <TrendingUp className="w-8 h-8 text-purple-500" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">This Month</p>
              <p className="text-2xl font-bold text-orange-600">
                ${Object.values(analytics.monthlySpending || {}).pop()?.toFixed(2) || '0.00'}
              </p>
            </div>
            <Calendar className="w-8 h-8 text-orange-500" />
          </div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Monthly Spending Trend */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Spending Trend</h3>
          <div className="h-80">
            <Line data={monthlyData} options={chartOptions} />
          </div>
        </div>

        {/* Category Spending */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Spending by Category</h3>
          <div className="h-80">
            <Doughnut data={categoryData} options={chartOptions} />
          </div>
        </div>
      </div>

      {/* Top Items Chart */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Most Purchased Items</h3>
        <div className="h-80">
          <Bar data={topItemsData} options={chartOptions} />
        </div>
      </div>

      {/* Detailed Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Top Items List */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Items</h3>
          <div className="space-y-3">
            {Object.entries(analytics.topItems || {})
              .slice(0, 10)
              .map(([item, count], index) => (
                <div key={item} className="flex items-center justify-between py-2">
                  <div className="flex items-center space-x-3">
                    <div className="text-sm font-semibold text-gray-500 w-6">
                      #{index + 1}
                    </div>
                    <span className="text-gray-800">{item}</span>
                  </div>
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                    {count} times
                  </span>
                </div>
              ))}
          </div>
        </div>

        {/* Category Breakdown */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Category Breakdown</h3>
          <div className="space-y-3">
            {Object.entries(analytics.categorySpending || {})
              .sort(([,a], [,b]) => b - a)
              .map(([category, amount]) => (
                <div key={category} className="flex items-center justify-between py-2">
                  <span className="text-gray-800">{category}</span>
                  <div className="text-right">
                    <span className="text-green-600 font-semibold">
                      ${amount.toFixed(2)}
                    </span>
                    <div className="text-sm text-gray-500">
                      {((amount / analytics.totalSpent) * 100).toFixed(1)}%
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;