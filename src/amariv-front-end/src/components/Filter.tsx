import React from 'react';

interface FilterProps {
  title: string;
  fields: {
    type: 'input' | 'select';
    label: string;
    value: string;
    onChange: (value: string) => void;
    options?: string[];
    placeholder?: string;
  }[];
  className?: string;
}

const Filter: React.FC<FilterProps> = ({ title, fields, className }) => {
  return (
    <form className={`w-full bg-[#e8f4eb] flex flex-col items-center rounded-lg p-4 ${className}`}>
      <div className="title mb-4">
        <p className="text-[#666666] text-m my-1">{title}</p>
      </div>
      <div className="dados-cliente w-full grid grid-cols-1 sm:grid-cols-2 gap-4">
        {fields.map((field, index) => (
          <div key={index} className="w-full max-w-md mx-auto">
            {field.type === 'input' && (
              <div className="flex flex-col w-full">
                <label className="mb-2 ml-2 text-[#666666] text-sm">{field.label}</label>
                <input
                  type="text"
                  value={field.value}
                  onChange={(e) => field.onChange(e.target.value)}
                  required
                  className="w-full py-2 px-4 rounded-[30px] bg-[#FBFFF3] border border-[#004646] focus:outline-none focus:ring focus:border-[#004646]"
                />
              </div>
            )}
            {field.type === 'select' && (
              <div className="flex flex-col w-full">
                <label className="mb-2 ml-2 text-[#666666] text-sm">{field.label}</label>
                <select
                  value={field.value}
                  onChange={(e) => field.onChange(e.target.value)}
                  required
                  className="w-full py-2 px-4 rounded-[30px] bg-[#FBFFF3] border border-[#004646] focus:outline-none focus:ring focus:border-[#004646]"
                >
                  {field.placeholder && (
                    <option value="" disabled hidden>
                      {field.placeholder}
                    </option>
                  )}
                  {field.options?.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>
        ))}
      </div>
    </form>
  );
};

export default Filter;
