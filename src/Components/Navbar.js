import React from "react";
import { GiSpotedFlower } from "react-icons/gi";
import { Accordion } from "react-bootstrap";
import Logo from "../assets/Logo.png";
import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="px-0">
      {/* <div className="row">
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
      </div> */}

      <ul id="navbar-items" className="p-0 ">
        <li className="admin">
          {" "}
          <span className="fas fa-th-list"></span>{" "}
          <span className="ps-3 name">
            {/* <Link
              to="home"
              className="text-white ps-3 "
              style={{ textDecoration: "none" }}
            >
              Admin
            </Link>
            <GiSpotedFlower className="ms-3 fs-5" /> */}
            <img src={Logo} style={{ width: "170px" }} className="img-fluid" />
          </span>{" "}
        </li>
        <li>
          {" "}
          <span className="fas fa-th-list"></span>{" "}
          <span className="ps-3 name">
            <Link
              to="home"
              className="text-white ps-3 "
              style={{ textDecoration: "none" }}
            >
              Home
            </Link>
          </span>{" "}
        </li>

        <Accordion>
          <Accordion.Item eventKey="0">
            <Accordion.Header className="text-white">
              <span class="ps-3 name fw-bold ms-3">User Setting</span>
            </Accordion.Header>
            <Accordion.Body>
              <NavLink to="user" className="nav-link text-white ms-5 ">
                Create User
              </NavLink>
              <NavLink to="role" className="nav-link text-white ms-5 ">
                Role Setting
              </NavLink>
              <NavLink to="screen" className="nav-link text-white ms-5 ">
                Screen Setup
              </NavLink>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </ul>
    </div>
  );
};

export default Navbar;
