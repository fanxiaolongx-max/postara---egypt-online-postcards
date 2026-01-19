import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Layout as LayoutIcon, ShoppingBag, Menu, X, User, Printer } from 'lucide-react';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path ? "text-brand-800 font-bold" : "text-brand-600 hover:text-brand-800";

  return (
    <div className="min-h-screen flex flex-col bg-brand-50">
      {/* Navigation */}
      <nav className="bg-white border-b border-brand-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="flex-shrink-0 flex items-center gap-2">
                <LayoutIcon className="h-8 w-8 text-brand-600" />
                <span className="font-serif text-2xl font-bold text-brand-800 tracking-tight">Postara</span>
              </Link>
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden sm:flex sm:items-center sm:space-x-8">
              <Link to="/" className={isActive('/')}>Template Market</Link>
              <Link to="/admin" className={isActive('/admin')}>Admin</Link>
              <Link to="/checkout" className={`relative p-2 rounded-full hover:bg-brand-100 ${isActive('/checkout')}`}>
                <ShoppingBag className="w-5 h-5" />
              </Link>
              <button className="p-2 rounded-full text-brand-600 hover:bg-brand-100">
                <User className="w-5 h-5" />
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="flex items-center sm:hidden">
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-brand-600 hover:text-brand-800 hover:bg-brand-100 focus:outline-none"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="sm:hidden bg-white border-b border-brand-200">
            <div className="pt-2 pb-3 space-y-1 px-4">
              <Link to="/" className="block py-2 text-base font-medium text-brand-700">Marketplace</Link>
              <Link to="/admin" className="block py-2 text-base font-medium text-brand-700">Admin Dashboard</Link>
              <Link to="/checkout" className="block py-2 text-base font-medium text-brand-700">Cart</Link>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-brand-900 text-brand-200 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <h3 className="text-xl font-serif font-bold text-white mb-4">Postara</h3>
              <p className="text-sm max-w-xs leading-relaxed">
                Send a piece of Egypt to the world. High-quality postcards, printed locally, delivered globally.
              </p>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Support</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white">Shipping Rates</a></li>
                <li><a href="#" className="hover:text-white">Returns</a></li>
                <li><a href="#" className="hover:text-white">Contact Us</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white">Privacy</a></li>
                <li><a href="#" className="hover:text-white">Terms</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-brand-800 text-center text-xs">
            &copy; 2023 Postara Inc. Made with ❤️ in Cairo.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
