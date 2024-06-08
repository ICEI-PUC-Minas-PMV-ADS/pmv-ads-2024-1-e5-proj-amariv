import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import amarivLogo from '../assets/images/amarivlogo.png';

const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      className={`bg-[${isOpen ? '#53735B' : 'white'}] text-white h-screen p-8 pr-28 flex flex-col fixed top-0 left-0 z-50 ${isOpen ? 'w-64' : 'w-12'}`}
      style={{ transition: 'width 0.5s' }}
    >
      <div className="flex items-start mb-36 justify-start w-full">
        <img
          src={amarivLogo}
          alt="Amariv Logo"
          className="h-12 mr-2 cursor-pointer"
          onClick={handleToggle}
          style={{ position: 'absolute', left: '2rem', top: '2.1rem', zIndex: 1, padding: '0rem' }} // Adicionado padding à logo
        />
      </div>
      {isOpen && (
        <nav>
          <ul className="space-y-2">
            <li>
              <Link to="/home" className="hover:bg-gray-700 rounded p-2 block">
                Home
              </Link>
            </li>
            <li>
              <Link to="/coleta" className="hover:bg-gray-700 rounded p-2 block">
                Coleta
              </Link>
            </li>
            <li>
              <Link to="/materiais" className="hover:bg-gray-700 rounded p-2 block">
                Materiais
              </Link>
            </li>
            <li>
              <Link to="/funcionarios" className="hover:bg-gray-700 rounded p-2 block">
                Funcionários
              </Link>
            </li>
            <li>
              <Link to="/historico-coleta" className="hover:bg-gray-700 rounded p-2 block">
                Histórico
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
};

export default Sidebar;