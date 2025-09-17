import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import Navbar from "../components/Navbar"; // Import Navbar

export default function Home() {
  const monthlyChartRef = useRef(null);
  const categoryChartRef = useRef(null);
  const monthlyInstanceRef = useRef(null);
  const categoryInstanceRef = useRef(null);

  useEffect(() => {
    if (monthlyInstanceRef.current) monthlyInstanceRef.current.destroy();
    if (categoryInstanceRef.current) categoryInstanceRef.current.destroy();

    const monthlyCtx = monthlyChartRef.current;
    if (monthlyCtx) {
      monthlyInstanceRef.current = new Chart(monthlyCtx, {
        type: "line",
        data: {
          labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
          datasets: [
            {
              label: "Monthly Spending",
              data: [320, 450, 280, 510, 490, 620],
              backgroundColor: "rgba(59, 130, 246, 0.1)",
              borderColor: "rgba(59, 130, 246, 1)",
              borderWidth: 2,
              tension: 0.3,
              fill: true,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: { legend: { display: false } },
          scales: { y: { beginAtZero: true } },
        },
      });
    }

    const categoryCtx = categoryChartRef.current;
    if (categoryCtx) {
      categoryInstanceRef.current = new Chart(categoryCtx, {
        type: "doughnut",
        data: {
          labels: ["Groceries", "Dining", "Entertainment", "Utilities", "Shopping"],
          datasets: [
            {
              data: [45, 15, 10, 20, 10],
              backgroundColor: [
                "rgba(59, 130, 246, 0.8)",
                "rgba(16, 185, 129, 0.8)",
                "rgba(245, 158, 11, 0.8)",
                "rgba(139, 92, 246, 0.8)",
                "rgba(244, 63, 94, 0.8)",
              ],
              borderWidth: 0,
            },
          ],
        },
        options: { responsive: true, plugins: { legend: { position: "right" } } },
      });
    }

    return () => {
      if (monthlyInstanceRef.current) monthlyInstanceRef.current.destroy();
      if (categoryInstanceRef.current) categoryInstanceRef.current.destroy();
    };
  }, []);

  return (
    <div className="bg-gray-50">
      {/* Navbar */}
      <Navbar />

      {/* Hero */}
      <div className="bg-gradient-to-r from-blue-400 to-blue-600 text-white text-center py-16 sm:py-24">
        <h1 className="text-4xl font-extrabold sm:text-6xl underline decoration-yellow-400">
          Smart Receipt Scanning
        </h1>
        <p className="mt-6 max-w-3xl mx-auto text-xl">
          Upload your shopping receipts and let SnapCart automatically track your expenses with powerful analytics.
        </p>
        <button className="mt-10 px-8 py-3 text-lg font-medium rounded-md text-blue-600 bg-white hover:bg-gray-50">
          Upload Receipt
        </button>
      </div>

      {/* Analytics */}
      <div className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Your Spending Analytics</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-medium mb-4">Monthly Spending</h3>
              <canvas ref={monthlyChartRef} height="300"></canvas>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-medium mb-4">Category Breakdown</h3>
              <canvas ref={categoryChartRef} height="300"></canvas>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-400 text-center py-6">
        <p>&copy; 2025 SnapCart. All rights reserved.</p>
      </footer>
    </div>
  );
}
