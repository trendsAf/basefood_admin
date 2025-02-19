import { useEffect, useState, ReactNode } from "react";
import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";
import { decodeToken } from "../../utils/config/decode";
import { toast } from "react-toastify";

interface SessionTimeoutHookProps {
  children: ReactNode;
}

const SessionTimeoutHook = ({ children }: SessionTimeoutHookProps) => {
  const [isSessionValid, setIsSessionValid] = useState<boolean | null>(null);

  useEffect(() => {
    const access_token = Cookies.get("access_token");

    if (!access_token) {
      setIsSessionValid(false);
      return;
    }

    try {
      const to = decodeToken(access_token);
      const expirationTime = to?.exp ? to.exp * 1000 : 0;

      if (expirationTime > Date.now()) {
        setIsSessionValid(true);
      } else {
        setIsSessionValid(false);
      }
    } catch (error) {
      toast.error(String(error));
      setIsSessionValid(false);
    }
  }, []);

  if (isSessionValid === false) {
    Cookies.remove("access_token");
    return <Navigate to="/login" replace />;
  }

  return isSessionValid ? <>{children}</> : null;
};

export default SessionTimeoutHook;

// import { useState, useEffect, ReactNode } from "react";
// import Cookies from "js-cookie";
// import { Navigate } from "react-router-dom";

// interface SessionTimeoutHookProps {
//   children: ReactNode;
// }
// const _persist = import.meta.env.VITE_SESSION_PERSIST || "true";

// const SessionTimeoutHook = ({ children }: SessionTimeoutHookProps) => {
//   const handleLogout = () => {
//     Cookies.remove("access_token");
//     setLoggedIn(false);
//     Cookies.remove("_persist%3-mi$%maxzone_-impire");
//   };

//   const resume = () => {
//     setShowModal(!showModal);
//     Cookies.remove("_persist%3-mi$%maxzone_-impire");
//   };

//   const [loggedIn, setLoggedIn] = useState<boolean>(
//     !!Cookies.get("access_token"),
//   );
//   const [expired, setExpire] = useState<number>(Date.now() + 5000);
//   const [showModal, setShowModal] = useState<boolean>(() => {
//     const storedModalState = Cookies.get("_persist%3-mi$%maxzone_-impire");
//     return storedModalState === "true";
//   });

//   const checkInActivity = () => {
//     if (expired < Date.now()) {
//       setShowModal(true);
//       Cookies.set("_persist%3-mi$%maxzone_-impire", String(_persist));
//     }
//   };

//   const updateExpireTime = () => {
//     setExpire(Date.now() + 5000);
//   };

//   useEffect(() => {
//     const interval = setInterval(checkInActivity, 10000);
//     return () => clearInterval(interval);
//   }, [expired]);

//   useEffect(() => {
//     const events = [
//       "click",
//       "copy",
//       "keydown",
//       "keypress",
//       "scroll",
//       "mousemove",
//       "touchmove",
//     ];

//     events.forEach((event) => window.addEventListener(event, updateExpireTime));

//     return () => {
//       events.forEach((event) =>
//         window.removeEventListener(event, updateExpireTime),
//       );
//     };
//   }, []);

//   useEffect(() => {
//     if (showModal) {
//       const autoLogoutTimer = setTimeout(() => {
//         handleLogout();
//       }, 15000);

//       return () => clearTimeout(autoLogoutTimer);
//     }
//   }, [showModal, expired]);
//   useEffect(() => {
//     if (!showModal && expired) {
//       const autoLogoutTimer = setTimeout(() => {
//         handleLogout();
//       }, 20000);

//       return () => clearTimeout(autoLogoutTimer);
//     }
//   }, [showModal, expired]);

//   if (!loggedIn) {
//     return <Navigate to="/login" replace />;
//   }

//   return (
//     <>
//       {showModal && (
//         <div className="fixed inset-0 bg-black/20 z-50 flex justify-center items-center">
//           <div className="bg-white w-96 h-96 flex justify-center items-center flex-col p-2">
//             <p className="text-black">
//               You've been inactive for a while do you wish to continue?
//             </p>
//             <div className="flex items-center ga-2">
//               <button
//                 className="bg-blue-500 px-6 py-2 font-bold mt-4"
//                 onClick={() => resume()}
//               >
//                 Continue
//               </button>
//               <button
//                 className="bg-blue-500 px-6 py-2 font-bold mt-4"
//                 onClick={handleLogout}
//               >
//                 Cancel
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//       {children}
//     </>
//   );
// };

// export default SessionTimeoutHook;
