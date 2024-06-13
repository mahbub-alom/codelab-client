// import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
// import { AuthContext } from "../../../Provider/AuthProvider";
import { FaSignOutAlt } from "react-icons/fa";
// import { ToggleContext } from "../../../Provider/ToggleProvider";
// import useAdmin from "../../../Hooks/useAdmin";
// import useInstructorRole from "../../../Hooks/useInstructorRole";

const NavBar = () => {
  //   const { user, logOut } = useContext(AuthContext);
  //   const { isDark, toggleMode } = useContext(ToggleContext);

  //   const [isAdmin] = useAdmin();
  //   const [isInstructor] = useInstructorRole();
  const user = true;

  const navItems = (
    <>
      <li>
        <NavLink to="/" exact="true">
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/instructors" exact="true">
          Instructors
        </NavLink>
      </li>
      <li>
        <NavLink to="/allClasses" exact="true">
          Classes
        </NavLink>
      </li>
      {user && (
        <li>
          <NavLink to="/Dashboard" exact="true">
            Dashboard
          </NavLink>
        </li>
      )}
    </>
  );

    const handleLogout = () => {
        console.log("log out")
    //   logOut();
    };
  return (
    <div className="navbar fixed z-10 text-[#2196F3] shadow-sm bg-gray-500 bg-opacity-30 shadow-[#2196F3] h-10 ">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 text-3xl"
          >
            {navItems}
          </ul>
        </div>
        <Link to="/">
          <h1 className="text-md md:text-2xl text-[#2196F3] font-bold md:ml-4">
            CodeLab
          </h1>
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 text-2xl">{navItems}</ul>
      </div>
      <div className="navbar-end">
      <div className="md:mx-10 ml-auto mr-1">
        {user ? (
          <>
            {user?.photoURL && (
              <div className="avatar">
                <div className="w-12 h-12 rounded-full">
                  <img src={ user?.photoURL} />
                </div>
              </div>
            )}
            <button
              onClick={handleLogout}
              className="btn text-[#2196F3] rounded-full btn-outline ml-5"
            >
              Logout <FaSignOutAlt></FaSignOutAlt>
            </button>
          </>
        ) : (
          <Link to="/login">
            <button className="btn bg-[#6aa5cd] text-white">Login</button>
          </Link>
        )}
      </div>
      </div>
    </div>
  );
};

export default NavBar;
