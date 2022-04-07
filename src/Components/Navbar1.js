




import React from "react";
import { GiSpotedFlower } from "react-icons/gi";
import { Accordion } from "react-bootstrap";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="px-0 bg-light">
      <div className="d-flex">
        <div className="d-flex align-items-center " id="navbar">
          {" "}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbar-items"
            aria-controls="navbarSupportedContent"
            aria-expanded="true"
            aria-label="Toggle navigation"
          >
            {" "}
            <span className="fas fa-bars"></span>{" "}
          </button>{" "}
          <a className="text-decoration-none fs14 ps-2" htmlFor="#">
            ADMIN <GiSpotedFlower className="ms-3" />
          </a>{" "}
        </div>
        <div id="navbar2" className="d-flex justify-content-end pe-4">
          {" "}
          <span className="far fa-user-circle "></span>{" "}
        </div>
      </div>
      <div className="d-md-flex">
        <ul id="navbar-items" className="p-0">
          <li>
            {" "}
            <span className="fas fa-th-list"></span>{" "}
            <span className="ps-3 name"><Link to='/home'>Home</Link></span>{" "}
          </li>
        
         
          <Accordion>
            <Accordion.Item eventKey="0">
              <Accordion.Header className="text-white"><span class="ps-3 name fw-bold">User Setting</span></Accordion.Header>
              <Accordion.Body>
                <li> Create User</li>
                <li> Role Setting</li>
                <li> Screen Setup</li>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>

          <li>
            {" "}
            <span className="fas fa-calendar-alt"></span>{" "}
            <span className="ps-3 name">account</span>{" "}
          </li>
          <li>
            {" "}
            <span className="fas fa-comment-alt"></span>{" "}
            <span className="ps-3 name">reqests</span>{" "}
          </li>
          <li>
            {" "}
            <span className="fas fa-store-alt"></span>{" "}
            <span className="ps-3 name">merchants</span>{" "}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
