import React, { useEffect, useState } from 'react';
import { Shield, AlertCircle, Users, Skull } from 'lucide-react';

const RulesPage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [visibleItems, setVisibleItems] = useState<number[]>([]);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    const items = [0, 1, 2, 3, 4, 5]; // Индексы правил
    items.forEach((item, index) => {
      setTimeout(() => {
        setVisibleItems(prev => [...prev, item]);
      }, index * 300);
    });
  }, []);

  const rules = [
    {
      icon: <Shield className="w-6 h-6 text-emerald-500" />,
      title: "Общие правила",
      items: [
        "Уважайте других игроков",
        "Запрещено использование читов и модификаций",
        "Запрещено использование багов игры",
        "Запрещено оскорбление игроков и администрации"
      ]
    },
    {
      icon: <AlertCircle className="w-6 h-6 text-emerald-500" />,
      title: "Правила строительства",
      items: [
        "Запрещено строительство в военных зонах",
        "Максимальная высота строений - 3 этажа",
        "Запрещено блокировать проходы и дороги",
        "Строения должны быть доступны для осмотра"
      ]
    },
    {
      icon: <Users className="w-6 h-6 text-emerald-500" />,
      title: "Правила взаимодействия",
      items: [
        "Запрещено убийство новичков без причины",
        "Запрещено использование эксплойтов",
        "Запрещено создание ловушек в спавн-зонах",
        "Запрещено использование сторонних программ"
      ]
    },
    {
      icon: <Skull className="w-6 h-6 text-emerald-500" />,
      title: "Наказания",
      items: [
        "Первое нарушение - предупреждение",
        "Второе нарушение - временный бан",
        "Третье нарушение - перманентный бан",
        "Серьезные нарушения - немедленный бан"
      ]
    }
  ];

  return (
    <>
      {/* Hero Section */}
      <header className="relative h-[40vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1643320/ss_8589bf4f88762910952fd0f1c3f6072d31f27aad.1920x1080.jpg?t=1736770066" 
            alt="DayZ Landscape" 
            className="w-full h-full object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-zinc-900"></div>
        </div>
        
        <div className="z-10 text-center px-4 max-w-4xl">
          <h1 className="text-5xl md:text-7xl font-bold mb-4 text-white">Правила сервера</h1>
          <p className="text-xl md:text-2xl text-zinc-300">Соблюдайте правила для комфортной игры всех участников</p>
        </div>
      </header>

      {/* Rules Content */}
      <div className="container mx-auto px-4 py-16">
        <div className={`text-center mb-12 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <h1 className="text-4xl font-bold mb-4">ПРАВИЛА СЕРВЕРА</h1>
          <p className="text-zinc-300 max-w-2xl mx-auto">
            Для комфортной игры на наших серверах, пожалуйста, ознакомьтесь с правилами. 
            Их соблюдение обеспечивает приятный игровой опыт для всех участников.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {rules.map((rule, index) => (
            <div 
              key={index}
              className={`bg-zinc-800 p-6 rounded-lg transform transition-all duration-700 ${visibleItems.includes(index) ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
            >
              <div className="flex items-center mb-4">
                {rule.icon}
                <h2 className="text-xl font-semibold ml-2">{rule.title}</h2>
              </div>
              <ul className="space-y-2">
                {rule.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex items-start">
                    <span className="text-emerald-500 mr-2">•</span>
                    <span className="text-zinc-300">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center text-zinc-400">
          <p>Соблюдение правил обеспечивает комфортную игру для всех участников.</p>
          <p className="mt-2">При нарушении правил администрация оставляет за собой право применить наказание.</p>
        </div>
      </div>
    </>
  );
};

export default RulesPage; 