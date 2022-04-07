import React, { useState } from "react";

import { Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import Dashboard from "./Components/Dashboard";

import Login from "./Components/Login";
// import ProtectedRoutes from "./Components/ProtectedRoutes";
import Role from "./Components/Role";
import Screen from "./Components/Screen";
import { User } from "./Components/User";
// import User from "./Components/User";

function App() {
  const [user, setUser] = useState(null);
  const [name, setName] = useState("");
  return (
    <>
      {/* <Routes>
        <Route path="/" element={<Login />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="/dashboard" element={<Dashboard />}>
            <Route path="screen" element={<Screen />} />
            <Route path="user" element={<User />} />
            <Route path="role" element={<Role />} />
          </Route>
        </Route>
      </Routes> */}

      <Routes>
        {!user && (
          <Route
            path="/"
            element={
              <Login
                authenticate={() => setUser(true)}
                name={name}
                setName={setName}
              />
            }
          />
        )}

        {user && (
          <Route path="dashboard" element={<Dashboard name={name} />}>
            <Route path="screen" element={<Screen />} />
            <Route path="user" element={<User />} />
            <Route path="role" element={<Role />} />
          </Route>
        )}
        <Route
          path="*"
          element={<Navigate replace to={user ? "/dashboard" : "/"} />}
        />
      </Routes>
    </>
  );
}

export default App;
