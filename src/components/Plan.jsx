import React from "react";
import { FaTimes } from "react-icons/fa";

const Plan = ({ plan, onDelete }) => {
  return (
    <div className="plan">
      <h3>
        {plan.planetName}{" "}
        <FaTimes
          style={{ color: "red", cursor: "pointer" }}
          onClick={(e) => onDelete(e, plan)}
        />
      </h3>
      <p>{plan.shipName}</p>
      <p>Search time: {plan.time}</p>
    </div>
  );
};

export default Plan;
