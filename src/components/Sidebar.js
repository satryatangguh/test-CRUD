import React from "react";
import { SidebarData } from "../data/SidebarData";
import { NavLink } from "react-router-dom";
import "../App.css"

const Sidebar = () => {
  return (
    <React.Fragment>
      <div className="sidebar-sticky">
        {SidebarData.map((item, index) => {
          return (
            <React.Fragment key={index}>
              <div className="text-center fs-5 border-bottom border-secondary bg-link">
                <NavLink
                  to={item.path}
                  // className="text-decoration-none text-dark fst-italic link"
                  className={({ isActive }) =>
                    isActive ? "link-active" : "link"
                  }
                >
                  {item.title}
                </NavLink>
              </div>
            </React.Fragment>
          );
        })}
      </div>
    </React.Fragment>
  );
};

export default Sidebar;
