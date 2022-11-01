import React, { useState } from "react";
import { BiLock } from "react-icons/bi";
import { IoArrowBackSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { CenterContainer, Button } from "..";
import { useAuth } from "../../Context/AuthContext";
import { FiLogOut } from "react-icons/fi";
import "./Headers.scss";

export const AuthHeader = ({ children }) => {
  return (
    <CenterContainer
      style={{
        marginBottom: "1rem",
      }}
    >
      <span
        className="p-rel fl fl-c m-1"
        style={{
          width: "40px",
          height: "40px",
          fontSize: "1.5rem",
          borderRadius: "50%",
          userSelect: "none",
          backgroundColor: "#9c27b0",
        }}
      >
        <BiLock color="#fff" />
      </span>

      <h1
        className="text-center"
        style={{
          fontFamily: "Roboto, Helvetica, Arial, sans-serif",
          fontWeight: 400,
          fontSize: "1.5rem",
          lineHeight: 1.334,
          letterSpacing: "0em",
          color: "#101010",
        }}
      >
        {children}
      </h1>
    </CenterContainer>
  );
};

export const Header = ({ showLogout = false, back = false }) => {
  const [error, setError] = useState("");
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    setError("");
    try {
      await logout();
      navigate("login");
    } catch (e) {
      setError(`Failed to Log In ${e.code}`);
      console.log(error);
    }
  };
  console.log(back);
  return (
    <div
      id="header"
      className={`p-abs t-0 l-0 w-100 fl fl-c fl-j-sb ${!back && "pl-1 pr-1"}`}
    >
      <div className="fl fl-c">
        {back && (
          <Button
            className="BackBtn p-rel fl fl-c c-p"
            onClick={() => navigate(-1)}
          >
            <IoArrowBackSharp />
          </Button>
        )}
        <span className={`${!back && "pl-1"} logo`}>Kuber Group</span>
      </div>
      {showLogout && (
        <span
          className=" fl fl-c pr-1 c-p"
          style={{ color: "#ff0000" }}
          onClick={handleLogout}
        >
          <FiLogOut style={{ marginRight: 5 }} />
          Log Out
        </span>
      )}
    </div>
  );
};
