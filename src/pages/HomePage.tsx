import React, { useEffect, useState } from 'react';
import { Copy, Users, Clock, Map, Server } from 'lucide-react';

function HomePage() {
  const serverIP = "127.0.0.1:2302";
  const [isVisible, setIsVisible] = useState(false);
  const [copied, setCopied] = useState(false);
  const [visibleItems, setVisibleItems] = useState<number[]>([]);
  
  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    const items = [0, 1, 2, 3, 4, 5]; // Индексы пунктов списка
    items.forEach((item, index) => {
      setTimeout(() => {
        setVisibleItems(prev => [...prev, item]);
      }, index * 300); // Увеличиваем задержку до 300мс
    });
  }, []);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(serverIP);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      {/* Hero Section */}
      <header className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1643320/ss_8589bf4f88762910952fd0f1c3f6072d31f27aad.1920x1080.jpg?t=1736770066" 
            alt="DayZ Landscape" 
            className="w-full h-full object-cover opacity-50 animate-fade-in"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-zinc-900"></div>
        </div>
        
        <div className={`z-10 text-center px-4 max-w-4xl transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <h1 className="text-5xl md:text-7xl font-bold mb-4 text-white animate-pulse">DreadSky</h1>
          <p className="text-xl md:text-2xl text-zinc-300">Испытай себя в мире постапокалипсиса</p>
        </div>
      </header>

      {/* Server Info Section */}
      <main className="flex-grow container mx-auto px-4 py-12 max-w-5xl">
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center transform transition-all duration-1000 hover:scale-105">О НАШЕМ СЕРВЕРЕ</h2>
          <p className="text-lg text-zinc-300 mb-8 text-center max-w-3xl mx-auto">
            Наш сервер DayZ предлагает уникальный опыт выживания с балансом между хардкорным геймплеем и 
            комфортной игрой. Умеренный лут, дружелюбное сообщество и регулярные обновления делают 
            игру интересной как для новичков, так и для опытных игроков.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <div className="bg-zinc-800 p-6 rounded-lg flex flex-col items-center text-center transform transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-emerald-500/20">
              <Users className="w-12 h-12 mb-4 text-emerald-500 animate-bounce" />
              <h3 className="text-xl font-semibold mb-2">Активное сообщество</h3>
              <p className="text-zinc-400">Десятки игроков онлайн и дружелюбная атмосфера</p>
            </div>
            
            <div className="bg-zinc-800 p-6 rounded-lg flex flex-col items-center text-center transform transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-emerald-500/20">
              <Clock className="w-12 h-12 mb-4 text-emerald-500 animate-pulse" />
              <h3 className="text-xl font-semibold mb-2">Ускоренное время</h3>
              <p className="text-zinc-400">Динамичная смена дня и ночи для разнообразного геймплея</p>
            </div>
            
            <div className="bg-zinc-800 p-6 rounded-lg flex flex-col items-center text-center transform transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-emerald-500/20">
              <Map className="w-12 h-12 mb-4 text-emerald-500 animate-bounce" />
              <h3 className="text-xl font-semibold mb-2">Карта Chernarus</h3>
              <p className="text-zinc-400">Классическая карта с нашими уникальными модификациями</p>
            </div>
          </div>
        </section>

        {/* Connection Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center transform transition-all duration-1000 hover:scale-105">КАК ПОДКЛЮЧИТЬСЯ</h2>
          
          <div className="bg-zinc-800 p-8 rounded-lg max-w-2xl mx-auto transform transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/20">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <Server className="w-6 h-6 mr-3 text-emerald-500 animate-pulse" />
                <h3 className="text-xl font-semibold">IP сервера:</h3>
              </div>
              <div className="flex items-center bg-zinc-700 px-4 py-2 rounded relative">
                <code className="text-emerald-400 mr-3">{serverIP}</code>
                <button 
                  onClick={copyToClipboard}
                  className="text-zinc-300 hover:text-white transition-colors relative group"
                  title="Копировать IP"
                >
                  <Copy className="w-5 h-5" />
                  {copied && (
                    <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-emerald-500 text-white px-2 py-1 rounded text-sm whitespace-nowrap">
                      Скопировано!
                    </span>
                  )}
                </button>
              </div>
            </div>
            
            <ol className="list-decimal pl-5 space-y-4 text-zinc-300">
              <li className={`transform transition-all duration-700 ${visibleItems.includes(0) ? 'translate-x-0 opacity-100' : 'translate-x-[-50px] opacity-0'}`}>
                Запустите DayZ через Steam
              </li>
              <li className={`transform transition-all duration-700 ${visibleItems.includes(1) ? 'translate-x-0 opacity-100' : 'translate-x-[-50px] opacity-0'}`}>
                В главном меню выберите <span className="text-white font-medium">ИГРАТЬ</span>
              </li>
              <li className={`transform transition-all duration-700 ${visibleItems.includes(2) ? 'translate-x-0 opacity-100' : 'translate-x-[-50px] opacity-0'}`}>
                Перейдите на вкладку <span className="text-white font-medium">СЕРВЕРЫ</span>
              </li>
              <li className={`transform transition-all duration-700 ${visibleItems.includes(3) ? 'translate-x-0 opacity-100' : 'translate-x-[-50px] opacity-0'}`}>
                Нажмите <span className="text-white font-medium">ПРЯМОЕ ПОДКЛЮЧЕНИЕ</span>
              </li>
              <li className={`transform transition-all duration-700 ${visibleItems.includes(4) ? 'translate-x-0 opacity-100' : 'translate-x-[-50px] opacity-0'}`}>
                Введите IP сервера: <span className="text-emerald-400 font-medium">{serverIP}</span>
              </li>
              <li className={`transform transition-all duration-700 ${visibleItems.includes(5) ? 'translate-x-0 opacity-100' : 'translate-x-[-50px] opacity-0'}`}>
                Нажмите <span className="text-white font-medium">ПОДКЛЮЧИТЬСЯ</span>
              </li>
            </ol>
          </div>
        </section>

        {/* Rules Section */}
        <section>
          <h2 className="text-3xl font-bold mb-8 text-center transform transition-all duration-1000 hover:scale-105">ПРАВИЛА СЕРВЕРА</h2>
          
          <div className="bg-zinc-800 p-8 rounded-lg max-w-3xl mx-auto transform transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/20">
            <ul className="space-y-4 text-zinc-300">
              <li className={`flex items-start transform transition-all duration-700 ${visibleItems.includes(0) ? 'translate-x-0 opacity-100' : 'translate-x-[-50px] opacity-0'}`}>
                <span className="text-emerald-500 font-bold mr-2">•</span>
                <span>Запрещены читы, эксплойты и любые сторонние программы</span>
              </li>
              <li className={`flex items-start transform transition-all duration-700 ${visibleItems.includes(1) ? 'translate-x-0 opacity-100' : 'translate-x-[-50px] opacity-0'}`}>
                <span className="text-emerald-500 font-bold mr-2">•</span>
                <span>Уважайте других игроков, избегайте токсичного поведения</span>
              </li>
              <li className={`flex items-start transform transition-all duration-700 ${visibleItems.includes(2) ? 'translate-x-0 opacity-100' : 'translate-x-[-50px] opacity-0'}`}>
                <span className="text-emerald-500 font-bold mr-2">•</span>
                <span>Запрещен гриферинг баз других игроков</span>
              </li>
              <li className={`flex items-start transform transition-all duration-700 ${visibleItems.includes(3) ? 'translate-x-0 opacity-100' : 'translate-x-[-50px] opacity-0'}`}>
                <span className="text-emerald-500 font-bold mr-2">•</span>
                <span>Разрешено PVP в любой точке карты</span>
              </li>
              <li className={`flex items-start transform transition-all duration-700 ${visibleItems.includes(4) ? 'translate-x-0 opacity-100' : 'translate-x-[-50px] opacity-0'}`}>
                <span className="text-emerald-500 font-bold mr-2">•</span>
                <span>Администрация оставляет за собой право наказывать игроков за нарушение правил</span>
              </li>
            </ul>
          </div>
        </section>
      </main>
    </>
  );
}

export default HomePage;