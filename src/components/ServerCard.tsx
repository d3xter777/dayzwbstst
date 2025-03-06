import React from 'react';
import { Users, Map, Server } from 'lucide-react';

interface ServerCardProps {
  name: string;
  description: string;
  map: string;
  players: string;
  ip: string;
  image: string;
}

const ServerCard: React.FC<ServerCardProps> = ({ name, description, map, players, ip, image }) => {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(ip);
    alert("IP сервера скопирован!");
  };

  return (
    <div className="bg-zinc-800 rounded-lg overflow-hidden transition-transform hover:scale-[1.02] duration-300">
      <div className="h-48 overflow-hidden relative">
        <img 
          src={image} 
          alt={name} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 to-transparent opacity-70"></div>
        <h3 className="absolute bottom-4 left-4 text-2xl font-bold text-white">{name}</h3>
      </div>
      
      <div className="p-5">
        <p className="text-zinc-300 mb-4">{description}</p>
        
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="flex items-center">
            <Map className="w-5 h-5 text-emerald-500 mr-2" />
            <span className="text-zinc-300">{map}</span>
          </div>
          <div className="flex items-center">
            <Users className="w-5 h-5 text-emerald-500 mr-2" />
            <span className="text-zinc-300">{players}</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between bg-zinc-700 px-3 py-2 rounded">
          <div className="flex items-center">
            <Server className="w-5 h-5 text-emerald-500 mr-2" />
            <span className="text-zinc-300 text-sm">{ip}</span>
          </div>
          <button 
            onClick={copyToClipboard}
            className="text-emerald-500 hover:text-emerald-400 text-sm font-medium"
          >
            Копировать
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServerCard;