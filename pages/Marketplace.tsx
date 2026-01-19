import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TEMPLATES } from '../constants';
import { Template } from '../types';
import { Button } from '../components/Button';
import { Search, Filter } from 'lucide-react';

const Marketplace: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState<string>('All');

  const filteredTemplates = TEMPLATES.filter(t => {
    const matchesSearch = t.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = category === 'All' || t.category === category;
    return matchesSearch && matchesCategory;
  });

  const categories = ['All', 'Birthday', 'Ramadan', 'Wedding', 'Travel', 'Business'];

  const handleCustomize = (templateId: string) => {
    // Generate a new design ID based on timestamp
    const newDesignId = `d_${Date.now()}`;
    navigate(`/editor/${templateId}?designId=${newDesignId}`);
  };

  return (
    <div className="bg-brand-50 min-h-screen">
      {/* Hero Section */}
      <div className="bg-brand-900 text-white py-16 px-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')]"></div>
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">
            Send a Story from Egypt
          </h1>
          <p className="text-lg md:text-xl text-brand-100 max-w-2xl mx-auto mb-8">
            Create personalized postcards with authentic Egyptian designs. 
            Printed in Cairo, delivered worldwide.
          </p>
          <div className="flex justify-center gap-4">
             <Button size="lg" onClick={() => document.getElementById('market')?.scrollIntoView({behavior: 'smooth'})}>
                Browse Templates
             </Button>
          </div>
        </div>
      </div>

      {/* Market Filters */}
      <div id="market" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div className="flex items-center space-x-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto">
             {categories.map(cat => (
               <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  category === cat 
                    ? 'bg-brand-600 text-white' 
                    : 'bg-white text-brand-700 hover:bg-brand-100'
                }`}
               >
                 {cat}
               </button>
             ))}
          </div>

          <div className="relative w-full md:w-64">
            <input
              type="text"
              placeholder="Search templates..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-brand-200 focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-brand-400" />
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTemplates.map((template) => (
            <div key={template.id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden border border-brand-100 group">
              <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                <img 
                  src={template.imageUrl} 
                  alt={template.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                   <Button onClick={() => handleCustomize(template.id)}>Customize</Button>
                </div>
              </div>
              <div className="p-5">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-serif font-bold text-lg text-brand-900">{template.title}</h3>
                    <p className="text-sm text-brand-500 font-medium">{template.category}</p>
                  </div>
                  <span className="bg-brand-100 text-brand-800 px-2 py-1 rounded text-xs font-bold">
                    ${template.price.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredTemplates.length === 0 && (
          <div className="text-center py-12">
            <p className="text-brand-500">No templates found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Marketplace;
