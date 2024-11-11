import { LuMoon } from "react-icons/lu";
import { BsSun } from "react-icons/bs";
import { toggleTheme } from "../../redux/reducers/themeReducer";
import { useAppDispatch } from "../../redux/hooks";

interface ModeToggleProps {
  isCollapsed: boolean;
  isDarkMode: boolean;
  sidebar?: boolean;
}

const ModeToggle = ({ isCollapsed, isDarkMode, sidebar }: ModeToggleProps) => {
  const dispatch = useAppDispatch();

  return (
    <div
      className={`flex items-center ${isCollapsed ? "justify-center" : "justify-between px-2"} w-full py-4`}
    >
      {!isCollapsed && sidebar && (
        <div className="flex pl-1 gap-3">
          {isDarkMode ? (
            <LuMoon
              className={`text-md ${isDarkMode ? "text-gray-400" : "text-yellow-500"}`}
            />
          ) : (
            <BsSun
              className={`text-md ${isDarkMode ? "text-gray-400" : "text-yellow-500"}`}
            />
          )}
          <span
            className={` text-sm whitespace-nowrap font-medium ${isDarkMode ? "text-gray-200" : "text-gray-900"}`}
          >
            {isDarkMode ? "Dark mode" : "Light mode"}
          </span>
        </div>
      )}
      <div
        onClick={() => dispatch(toggleTheme())}
        className={`ml-2 relative inline-flex h-6 w-11 items-center rounded-full cursor-pointer transition-colors ${
          isDarkMode ? "bg-gray-600" : "bg-gray-300"
        }`}
      >
        <span
          className={`inline-block h-5 w-5 rounded-full bg-white transform transition-transform ${
            isDarkMode ? "translate-x-5" : "translate-x-1"
          }`}
        >
          {isDarkMode ? (
            <LuMoon className="absolute inset-0 m-auto text-black" />
          ) : (
            <BsSun className="absolute inset-0 m-auto text-yellow-500" />
          )}
        </span>
      </div>
    </div>
  );
};

export default ModeToggle;
