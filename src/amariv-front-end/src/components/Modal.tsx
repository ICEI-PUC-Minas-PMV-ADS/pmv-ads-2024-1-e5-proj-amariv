import React from 'react';
import { DropdownInput } from './DropdownInput';
import { Input } from './Input';

interface ModalProps {
  title: string;
  fields: {
    type: 'input' | 'select';
    label: string;
    value: string;
    onChange: (value: string) => void;
    options?: string[];
    placeholder?: string;
  }[];
  onSave: () => void;
  onCancel: () => void;
  className?: string;
}

const Modal: React.FC<ModalProps> = ({ title, fields, onSave, onCancel, className }) => {
  return (
    <div className="bg-[#e8f4eb] rounded-[5px] p-4 pr-16 pl-16">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">{title}</h2>
      <form onSubmit={onSave}>
        {fields.map((field, index) => (
          <div key={index} className="mb-3">
            <label htmlFor={field.label} className="text-sm text-gray-600">{field.label}:</label>
            {field.type === 'input' && (
              <input
                type="text"
                id={field.label}
                value={field.value}
                onChange={(e) => field.onChange(e.target.value)}
                className="w-full py-2 px-3 rounded-[30px] border border-gray-300 focus:outline-none focus:border-blue-500"
              />
            )}
            {field.type === 'select' && (
              <select
                id={field.label}
                value={field.value}
                onChange={(e) => field.onChange(e.target.value)}
                className="w-full py-2 px-3 rounded-[30px] border border-gray-300 focus:outline-none focus:border-blue-500"
              >
                {field.options && field.options.map((option, index) => (
                  <option key={index} value={option}>{option}</option>
                ))}
              </select>
            )}
          </div>
        ))}
        <div className="flex justify-end mt-4">
          <button
            type="submit"
            className="bg-[#53735B] hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-[30px] mr-2"
          >
            Salvar
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-[30px]"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default Modal;
