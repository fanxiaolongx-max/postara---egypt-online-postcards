import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Marketplace from './pages/Marketplace';
import Editor from './pages/Editor';
import Checkout from './pages/Checkout';
import Admin from './pages/Admin';

const App: React.FC = () => {
  return (
    <HashRouter>
      <Routes>
        {/* Pages with Layout */}
        <Route path="/" element={<Layout><Marketplace /></Layout>} />
        <Route path="/checkout" element={<Layout><Checkout /></Layout>} />
        <Route path="/admin" element={<Layout><Admin /></Layout>} />
        
        {/* Standalone Pages (Editor usually needs full screen) */}
        <Route path="/editor/:templateId" element={<Editor />} />
        
        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </HashRouter>
  );
};

export default App;
