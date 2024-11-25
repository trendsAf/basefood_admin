import { FaRegBell, FaSearch } from "react-icons/fa";
import { FiMail } from "react-icons/fi";
import { IoMdMenu } from "react-icons/io";
// import { FaChevronDown } from "react-icons/fa";
import ProfileDropdown from "../modals/Profile";

interface HeaderProps {
  toggleSidebar: () => void;
  isCollapsed: boolean;
}

const Header = ({ toggleSidebar, isCollapsed }: HeaderProps) => {
  return (
    <header
      className={`fixed ${
        isCollapsed
          ? "lg:w-[100%] lg:ml-0 pl-24 pr-6"
          : "lg:w-[85%] lg:ml-[15%] px-8"
      } flex items-center w-[100%] bg-white justify-between p-4 dark:bg-secondary-black dark:text-white border-b border-gray-200 z-20 dark:border-gray-700`}
    >
      <div className="flex items-center gap-3 relative w-[25%]">
        <button onClick={toggleSidebar} className="md:hidden">
          <IoMdMenu className="text-gray-900 dark:text-white text-2xl" />
        </button>
        <div className="hidden md:flex items-center bg-bg-gray dark:bg-gray-800 rounded py-2 px-3 w-full">
          <FaSearch className="text-gray-500 dark:text-gray-400" />
          <input
            type="text"
            placeholder="Search by product or location"
            className="ml-2 bg-transparent border-none outline-none w-full text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
          />
        </div>
      </div>
      <div className="flex items-center space-x-6">
        <button className="relative">
          <FiMail className="text-xl" />
          <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
        </button>
        <button className="relative">
          <FaRegBell className="text-xl" />
          <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
        </button>

        {/* <div className="flex items-center space-x-3">
          <img
            src="https://images.unsplash.com/photo-1480455624313-e29b44bbfde1?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Z3V5fGVufDB8fDB8fHww"
            alt="User"
            className="w-10 h-10 rounded-full object-cover"
          />
          <span>Admim</span>
          <FaChevronDown />
        </div> */}
        <ProfileDropdown />
      </div>
    </header>
  );
};

export default Header;
