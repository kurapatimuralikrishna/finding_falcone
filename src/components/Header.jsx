import React from "react";
import { REQUIRED_PLANS } from "../services/Constants";

export const Header = ({ buttonName, onClick, len, refresh }) => {
  return (
    <header className="header">
      <h2>Falcone Finder</h2>
      {len !== undefined && (
        <button className="btn" onClick={refresh}>
          Reset
        </button>
      )}
      <button
        className="btn"
        onClick={onClick}
        disabled={len && len >= REQUIRED_PLANS}
      >
        {buttonName}
      </button>
    </header>
  );
};
