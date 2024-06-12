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
    <form className={`w-full flex flex-col items-center rounded-lg bg-[#e8f4eb] ${className}`}>
      <div className="title">
        <p className="text-[#666666] text-m my-1">{title}</p>
      </div>
      <div className="dados-cliente flex flex-wrap justify-center">
        {fields.map((field, index) => (
          <div key={index} className="flex flex-col mx-4 my-4">
            {field.type === 'input' && (
              <>
                <label className="mb-2 text-[#666666] text-sm">{field.label}</label>
                <input
                  type="text"
                  value={field.value}
                  onChange={(e) => field.onChange(e.target.value)}
                  required
                  className="w-48 sm:w-64 py-2 px-4 rounded-[30px] bg-white border border-[#004646] focus:outline-none focus:ring focus:border-[#004646]"
                />
              </>
            )}
            {field.type === 'select' && (
              <>
                <label className="mb-2 text-[#666666] text-sm">{field.label}</label>
                <select
                  value={field.value}
                  onChange={(e) => field.onChange(e.target.value)}
                  required
                  className="w-48 sm:w-64 py-2 px-4 rounded-[30px] bg-white border border-[#004646] focus:outline-none focus:ring focus:border-[#004646]"
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
              </>
            )}
          </div>
        ))}
      </div>
    </form>
  );
};

export default Filter;
