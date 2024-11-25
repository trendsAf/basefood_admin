import React, { useState } from "react";
import { FaAngleDown } from "react-icons/fa";

interface CustomSelectProps {
  options: string[];
  defaultValue: string;
  onSelect: (option: string) => void;
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  options,
  defaultValue,
  onSelect,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(defaultValue);

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    setIsOpen(false);
    onSelect(option);
  };

  return (
    <div className="relative">
      <div
        className="appearance-none bg-transparent border flex items-center justify-between text-md gap-2 border-gray-500 text-dark-gray dark:text-white px-4 py-2 rounded-lg cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedOption} <FaAngleDown />
      </div>
      {isOpen && (
        <div className="absolute top-full left-0 z-10 bg-white dark:bg-secondary-black dark:text-white text-dark-gray rounded-lg border-[0.5px] border-gray-500 mt-1">
          {options.map((option) => (
            <div
              key={option}
              className="px-4 py-2 text-dark-gray text-md dark:text-white hover:bg-gray-700 cursor-pointer"
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomSelect;
