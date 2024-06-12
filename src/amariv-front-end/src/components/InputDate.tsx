import React from "react";

export type InputProps = React.ComponentProps<"input"> & {
  label: string;
};

export const InputDate = React.forwardRef(
  ({ label, ...props }: InputProps, ref: React.LegacyRef<HTMLInputElement>) => {
    const isDateInput = props.type === "date";

    const getCurrentDate = () => {
      const today = new Date();
      const year = today.getFullYear();
      const month = String(today.getMonth() + 1).padStart(2, '0');
      const day = String(today.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    };

    // Renderiza um input de data nativo se o tipo for "date"
    if (isDateInput) {
      return (
        <div className="flex flex-col w-full my-4">
          <label className="mb-2 ml-2 text-[#666666] text-sm">{label}</label>
          <input
            {...props}
            ref={ref}
            type="date"
            min={getCurrentDate()}
            className="w-full py-2 px-4 rounded-[30px] rounded-md bg-[#FBFFF3] border border-[#004646] focus:outline-none focus:ring focus:border-[#004646]"
          />
        </div>
      );
    }

    // Renderiza um input de texto padrão se o tipo não for "date"
    return (
      <div className="flex flex-col w-full my-4">
        <label className="mb-2 ml-2 text-[#666666] text-sm">{label}</label>
        <input
          {...props}
          ref={ref}
          className="w-full py-2 px-4 rounded-md bg-[#FBFFF3] border border-[#004646] focus:outline-none focus:ring focus:border-[#004646]"
        />
      </div>
    );
  }
);
