import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import UploadReceipt from './pages/UploadReceipt';
import Analytics from './pages/Analytics';
import Receipts from './pages/Receipts';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/upload" element={<UploadReceipt />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/receipts" element={<Receipts />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;