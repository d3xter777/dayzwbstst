import React, { useState } from 'react';
import { Menu, X, MessageCircle, Send } from 'lucide-react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ServersPage from './pages/ServersPage';
import RulesPage from './pages/RulesPage';
import ShopPage from './pages/ShopPage';
import banner from './img/banner.png';

function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <>
      {/* Social Links */}
      <div className="bg-zinc-950 py-2 border-b border-zinc-800">
        <div className="container mx-auto px-4 flex justify-end items-center">
          <div className="flex space-x-4">
            <a 
              href="https://discord.gg" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center text-zinc-400 hover:text-emerald-500 transition-colors"
              title="Присоединяйтесь к нашему Discord"
            >
              <MessageCircle className="w-5 h-5 mr-1" />
              <span className="text-sm hidden sm:inline">Discord</span>
            </a>
            <a 
              href="https://t.me" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center text-zinc-400 hover:text-emerald-500 transition-colors"
              title="Наш Telegram канал"
            >
              <Send className="w-5 h-5 mr-1" />
              <span className="text-sm hidden sm:inline">Telegram</span>
            </a>
          </div>
        </div>
      </div>
      
      {/* Navigation */}
      <nav className="bg-zinc-950 py-4 sticky top-0 z-50">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <img 
                src={banner} 
                alt="DreadSky Logo" 
                className="w-8 h-8 object-cover rounded mr-2"
              />
              <span className="text-xl font-bold">DreadSky</span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            <Link 
              to="/" 
              className={`font-medium transition-colors ${isActive('/') ? 'text-emerald-500' : 'text-zinc-400 hover:text-emerald-500'}`}
            >
              Главная
            </Link>
            <Link 
              to="/shop" 
              className={`font-medium transition-colors ${isActive('/shop') ? 'text-emerald-500' : 'text-zinc-400 hover:text-emerald-500'}`}
            >
              Магазин
            </Link>
            <Link 
              to="/servers" 
              className={`font-medium transition-colors ${isActive('/servers') ? 'text-emerald-500' : 'text-zinc-400 hover:text-emerald-500'}`}
            >
              Сервера
            </Link>
            <Link 
              to="/rules" 
              className={`font-medium transition-colors ${isActive('/rules') ? 'text-emerald-500' : 'text-zinc-400 hover:text-emerald-500'}`}
            >
              Правила
            </Link>
          </div>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-zinc-300 hover:text-white"
            onClick={toggleMobileMenu}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
        
        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-zinc-900 border-t border-zinc-800 mt-4">
            <div className="container mx-auto px-4 py-2">
              <div className="flex flex-col space-y-3 py-3">
                <Link 
                  to="/" 
                  className={`text-left py-2 font-medium ${isActive('/') ? 'text-emerald-500' : 'text-zinc-400'}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Главная
                </Link>
                <Link 
                  to="/shop" 
                  className={`text-left py-2 font-medium ${isActive('/shop') ? 'text-emerald-500' : 'text-zinc-400'}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Магазин
                </Link>
                <Link 
                  to="/servers" 
                  className={`text-left py-2 font-medium ${isActive('/servers') ? 'text-emerald-500' : 'text-zinc-400'}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Сервера
                </Link>
                <Link 
                  to="/rules" 
                  className={`text-left py-2 font-medium ${isActive('/rules') ? 'text-emerald-500' : 'text-zinc-400'}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Правила
                </Link>
              </div>
              
              {/* Social Links in Mobile Menu */}
              <div className="flex space-x-4 py-3 border-t border-zinc-800 mt-2">
                <a 
                  href="https://discord.gg" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center text-zinc-400 hover:text-emerald-500 transition-colors"
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  <span>Discord</span>
                </a>
                <a 
                  href="https://t.me" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center text-zinc-400 hover:text-emerald-500 transition-colors"
                >
                  <Send className="w-5 h-5 mr-2" />
                  <span>Telegram</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-zinc-900 text-zinc-100 flex flex-col">
        <Navigation />
        
        {/* Page Content */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/servers" element={<ServersPage />} />
          <Route path="/rules" element={<RulesPage />} />
          <Route path="/shop" element={<ShopPage />} />
        </Routes>

        {/* Footer */}
        <footer className="bg-zinc-950 py-6 text-center text-zinc-500 mt-auto">
          <div className="container mx-auto px-4">
            <p>© 2025 DreadSky - DayZ Server. Все права защищены.</p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;