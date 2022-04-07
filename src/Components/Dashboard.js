import React from "react";
import { Outlet, Route, Routes, useNavigate } from "react-router-dom";
import Home from "./Home";
import { MdMenu } from "react-icons/md";
import Navbar from "./Navbar";
import Logo from "../assets/Logo.png";
import { NavDropdown } from "react-bootstrap";
import { CgProfile } from "react-icons/cg";
import { FiSettings } from "react-icons/fi";
import { CgLogOff } from "react-icons/cg";

const Dashboard = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="row">
        <div className="col-3">
          <Navbar />
        </div>
        <div className="col-9">
          <div className="topbar">
            <MdMenu className="mx-4 me-5" style={{ fontSize: "22px" }} />
            <input type="text" placeholder="Search ..." className="Search" />
            <div className="d-flex justify-content-end me-5">
              <NavDropdown title="Admin" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">
                  <CgProfile className="me-2" /> Profile
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  <FiSettings className="me-2" />
                  Settings
                </NavDropdown.Item>

                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.3" className="text-danger">
                  <CgLogOff
                    className="me-2"
                    onClick={() => {
                      navigate("/");
                    }}
                  />
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            </div>
          </div>
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
