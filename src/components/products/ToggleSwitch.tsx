import React from "react";

interface ToggleSwitchProps {
  checked: boolean;
  onChange: () => void;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ checked, onChange }) => {
  return (
    <label className="relative inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        className="sr-only"
        checked={checked}
        onChange={onChange}
      />
      <div
        className={`block w-10 h-6 rounded-full ${checked ? "bg-brand-blue" : "bg-[#D4D4D4] dark:bg-[#687588]"}`}
      />
      <div
        className={`dot absolute left-1 top-1 flex justify-center bg-white w-4 h-4 rounded-full transition ${
          checked ? "transform translate-x-6 -left-[0.2rem]" : ""
        }`}
      >
        {checked ? (
          <svg
            className="w-4 h-4 text-brand-blue mx-auto my-auto"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        ) : (
          <svg
            className="w-4 h-4 text-dark-gray mx-auto my-auto"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 12h12"
            />
          </svg>
        )}
      </div>
    </label>
  );
};

export default ToggleSwitch;
