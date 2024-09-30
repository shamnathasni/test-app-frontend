import React, { useState } from "react";
import { Card, List, ListItem, ListItemPrefix } from "@material-tailwind/react";
import { ShoppingBagIcon, UserCircleIcon, PowerIcon } from "@heroicons/react/24/solid";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/slices/authSlice'; // Adjust the path to your auth slice

export function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.auth); // Access isAuthenticated from Redux state
  const [hoverText, setHoverText] = useState(""); // State for handling hover text

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const handleMouseEnter = () => {
    setHoverText(isAuthenticated ? "Logout" : "Login");
  };

  const handleMouseLeave = () => {
    setHoverText("");
  };

  return (
    <Card className="h-full w-full shadow-md rounded-lg border border-gray-600 bg-gray-950">
      <div className="p-4 flex items-center gap-4">
        <img
          src="https://docs.material-tailwind.com/img/logo-ct-dark.png"
          alt="brand"
          className="h-8 w-8"
        />
      </div>
      <div className="p-4">
        <MagnifyingGlassIcon className="h-5 w-5 text-white" />
      </div>
      <List>
        <ListItem>
          <ListItemPrefix>
            <ShoppingBagIcon className="h-5 w-5 text-white" />
          </ListItemPrefix>
        </ListItem>
        <ListItem>
          <ListItemPrefix>
            <UserCircleIcon className="h-5 w-5 text-white" />
          </ListItemPrefix>
        </ListItem>
        {isAuthenticated ? (
          <ListItem
            onClick={handleLogout}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="relative"
          >
            <ListItemPrefix>
              <PowerIcon className="h-5 w-5 text-white" />
            </ListItemPrefix>
            {hoverText && (
              <span className="absolute left-full ml-2 p-1 bg-gray-700 text-white text-xs rounded">
                {hoverText}
              </span>
            )}
          </ListItem>
        ) : (
          <ListItem
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="relative"
          >
            <Link to={"/signup"}>
              <ListItemPrefix>
                <PowerIcon className="h-5 w-5 text-white" />
              </ListItemPrefix>
              {hoverText && (
                <span className="absolute left-full ml-2 p-1 bg-gray-700 text-white text-xs rounded">
                  {hoverText}
                </span>
              )}
            </Link>
          </ListItem>
        )}
      </List>
    </Card>
  );
}
