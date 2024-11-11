import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import ProfileModal from "./ProfileModal";
import { AnimatePresence, motion } from "framer-motion";
import { AiOutlineUser } from "react-icons/ai";

const ProfileDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="flex items-center space-x-2 text-gray-900 dark:text-white relative z-50"
      >
        <AiOutlineUser className="text-2xl" />
        <span>Admim</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 20,
          }}
        >
          <FaChevronDown />
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && <ProfileModal toggleDropdown={toggleDropdown} />}
      </AnimatePresence>
    </div>
  );
};

export default ProfileDropdown;
