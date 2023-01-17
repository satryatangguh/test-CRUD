import React from "react";
import NavPage from "./NavPage";
import Sidebar from "./Sidebar";
import "../App.css"

const MainPage = () => {
  return (
    <React.Fragment>
      <section className="container-fluid">
        <div className="row">
          <div className="col-2 bg-white border border-secondary min-vh-100 px-0">
            <Sidebar />
          </div>
          <div className="col-10 min-vh-100 bg-white ">
            <NavPage />
          </div>
        </div>
      </section>
    </React.Fragment>
  );
};

export default MainPage;
