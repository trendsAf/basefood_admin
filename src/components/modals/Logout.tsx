import React from "react";
import { GoAlert } from "react-icons/go";

interface LogoutModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const LogoutModal: React.FC<LogoutModalProps> = ({
  open,
  onClose,
  onConfirm,
}) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white dark:bg-[#252525] rounded-lg shadow-lg p-6 w-96">
        <div className="flex items-center mb-4">
          <GoAlert className="w-6 h-6 text-red mr-2" />
          <h2 className="text-lg font-semibold dark:text-white">
            Confirm Logout
          </h2>
        </div>
        <p className="mb-4 dark:text-white">Are you sure you want to logout?</p>
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded mr-2 hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="bg-red text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;
