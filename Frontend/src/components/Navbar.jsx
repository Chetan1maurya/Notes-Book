import { Link, useLocation, useNavigate } from "react-router-dom";
import { BookOpen } from "lucide-react";
import { useState, useEffect } from "react";
import ShinyText from "./ShinyText";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { auth, provider } from "../../firebase/firebase.js";
import { signInWithPopup, signOut } from "firebase/auth";


const Navbar = () => {
  const { user } = useContext(AuthContext);
  const location = useLocation();
  const [theme, setTheme] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    if (theme === true) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);
  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, provider);
    console.log("User logged in successfully");
      navigate("/home");
    } catch (err) {
      console.log(err);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <nav className="dark:bg-gray-900 bg-blue-100 text-white sm:px-6 sm:py-3 px-8 py-6 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/home" className="flex items-center gap-2">
          <BookOpen className="w-7 h-7 dark:text-blue-300 text-blue-800" />
          {/* <span className="text-2xl font-semibold dark:text-blue-300 text-blue-800 tracking-wide">Notes-Book</span> */}
          <ShinyText
            className="text-2xl"
            text="Notes-Book"
            speed={2}
            delay={0}
            color="#b5b5b5"
            shineColor="#ffffff"
            spread={120}
            direction="left"
            yoyo={false}
            pauseOnHover={false}
            disabled={false}
          />
        </Link>

        {/* Links */}
        <div className="flex sm:gap-6 gap-3 items-center">
          {/* Auth Section */}
          {user ? (
            <>
              <div className="text-sm text-white bg-blue-950 rounded-full w-8 h-8 flex items-center justify-center">
                {user.displayName[0]}
              </div>
              <button
                onClick={handleLogout}
                className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
              >
                Logout
              </button>
            </>
          ) : (
            <button
              onClick={handleLogin}
              className="bg-blue-500 px-3 py-1 rounded hover:bg-blue-600"
            >
              Login
            </button>
          )}
          {/* Theme Toggle */}
          <button onClick={() => setTheme(!theme)} className="cursor-pointer">
            {theme ? (
              <i className="ri-moon-fill"></i>
            ) : (
              <i className="ri-sun-fill bg-yellow-600 rounded-full p-1"></i>
            )}
          </button>
          <Link
            to="/home"
            className={`dark:hover:text-blue-300 hover:text-blue-900 transition ${location.pathname === "/home" ? "dark:text-blue-300 text-blue-800 font-semibold" : "dark:text-gray-300 text-gray-800"}`}
          >
            Home
          </Link>
          {user && (
            <Link
              to="/create"
              className={`dark:hover:text-blue-300 hover:text-blue-900 transition ${
                location.pathname === "/create"
                  ? "dark:text-blue-300 text-blue-800 font-semibold"
                  : "dark:text-gray-300 text-gray-800"
              }`}
            >
              Create Note
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
