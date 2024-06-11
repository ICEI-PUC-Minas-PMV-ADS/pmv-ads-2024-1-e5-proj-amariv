import React from 'react';
import amarivLogo from '../assets/images/amarivlogo.png';
import { Link } from 'react-router-dom';

/**
 * SideBar
 */

const Sidebar: React.FC = () => {
  return (
    <div
      className={`w-[20rem] min-h-full bg-[#53735B] text-white p-8 pr-28 flex flex-col`}>
      <div className="flex items-start mb-36 justify-start w-full">
        <img
          src={amarivLogo}
          alt="Amariv Logo"
          className="h-12 mr-2 cursor-pointer"
          style={{ position: 'absolute', left: '2rem', top: '2.1rem', zIndex: 1, padding: '0rem' }} // Adicionado padding à logo
        />
      </div>
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
          <li>
            <Link to="/lista_de_coletas_pendentes" className="hover:bg-gray-700 rounded p-2 block">
              Lista de coletas pendentes
            </Link>
          </li>
          <li>
            <Link to="/roteiro_de_coleta" className="hover:bg-gray-700 rounded p-2 block">
              Roteiro de coleta
            </Link>
          </li>
          <li>
            <Link to="/logout" className="hover:bg-gray-700 rounded p-2 block">
              Logout
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;