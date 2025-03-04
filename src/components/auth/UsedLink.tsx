import { IoTimeOutline } from "react-icons/io5";
import { Link, useLocation } from "react-router-dom";

const UsedLink = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const message = searchParams.get("message");

  return (
    <div className="w-full h-screen flex items-center justify-center bg-gray-50">
      <main className="text-center p-6 bg-white rounded-lg shadow-lg max-w-lg w-full">
        <h1 className="text-4xl font-bold mb-4 text-red-600 text-black">
          {message}
        </h1>
        {message === "link has expired" ? (
          <p className="text-gray-500 text-xl">Session Timeout</p>
        ) : (
          ""
        )}

        <div className="flex flex-col items-center">
          <IoTimeOutline className="text-[#ED4337] text-[8rem]" />
          <p className="text-lg text-gray-700">
            Please contact the system manager
          </p>
          <p className="text-black my-5">
            Return to
            <Link to="/login" className="text-blue-600 hover:underline mx-1">
              Login
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
};

export default UsedLink;
