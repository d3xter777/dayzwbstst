import React, { useEffect, useState } from 'react';
import ServerCard from '../components/ServerCard';

function ServersPage() {
  const [isVisible, setIsVisible] = useState(false);
  const [visibleItems, setVisibleItems] = useState<number[]>([]);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    const items = [0, 1, 2]; // Индексы серверов
    items.forEach((item, index) => {
      setTimeout(() => {
        setVisibleItems(prev => [...prev, item]);
      }, index * 300);
    });
  }, []);

  const servers = [
    {
      name: "НАЗВАНИЕ #1",
      description: "Основной сервер с балансом между хардкорным геймплеем и комфортной игрой. Умеренный лут, активное сообщество.",
      map: "Chernarus",
      players: "50/50",
      ip: "127.0.0.1:2302",
      image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
    },
    {
      name: "НАЗВАНИЕ #2 PVP",
      description: "PVP-ориентированный сервер с повышенным количеством оружия и снаряжения. Для любителей активных боевых действий.",
      map: "Livonia",
      players: "40/50",
      ip: "127.0.0.1:2303",
      image: "https://images.unsplash.com/photo-1518546305927-5a555bb7020d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
    },
    {
      name: "НАЗВАНИЕ #3 RP",
      description: "Сервер с элементами ролевой игры. Торговые зоны, фракции и уникальные игровые события. Идеален для погружения в мир DayZ.",
      map: "Namalsk",
      players: "35/50",
      ip: "127.0.0.1:2304",
      image: "https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
    }
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className={`text-center mb-12 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
        <h1 className="text-4xl font-bold mb-4">НАШИ СЕРВЕРА</h1>
        <p className="text-zinc-300 max-w-2xl mx-auto">
          Выберите сервер, который подходит именно вам. У нас есть варианты для разных стилей игры - 
          от хардкорного выживания до PVP и ролевой игры.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {servers.map((server, index) => (
          <div 
            key={index}
            className={`transform transition-all duration-700 ${visibleItems.includes(index) ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
          >
            <ServerCard 
              name={server.name}
              description={server.description}
              map={server.map}
              players={server.players}
              ip={server.ip}
              image={server.image}
            />
          </div>
        ))}
      </div>
      
      <div className={`mt-16 bg-zinc-800 p-8 rounded-lg max-w-3xl mx-auto transform transition-all duration-700 ${visibleItems.includes(2) ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
        <h2 className="text-2xl font-bold mb-4 text-center">Как выбрать сервер?</h2>
        <ul className="space-y-3 text-zinc-300">
          <li className={`flex items-start transform transition-all duration-700 ${visibleItems.includes(0) ? 'translate-x-0 opacity-100' : 'translate-x-[-50px] opacity-0'}`}>
            <span className="text-emerald-500 font-bold mr-2">•</span>
            <span><strong>НАЗВАНИЕ #1</strong> - для классического опыта выживания с балансом сложности</span>
          </li>
          <li className={`flex items-start transform transition-all duration-700 ${visibleItems.includes(1) ? 'translate-x-0 opacity-100' : 'translate-x-[-50px] opacity-0'}`}>
            <span className="text-emerald-500 font-bold mr-2">•</span>
            <span><strong>НАЗВАНИЕ #2 PVP</strong> - если вы любите активные боевые действия и PVP</span>
          </li>
          <li className={`flex items-start transform transition-all duration-700 ${visibleItems.includes(2) ? 'translate-x-0 opacity-100' : 'translate-x-[-50px] opacity-0'}`}>
            <span className="text-emerald-500 font-bold mr-2">•</span>
            <span><strong>НАЗВАНИЕ #3 RP</strong> - для погружения в атмосферу и ролевой игры</span>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default ServersPage;