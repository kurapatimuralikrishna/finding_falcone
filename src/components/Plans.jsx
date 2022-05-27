import React from "react";
import Plan from "./Plan";

const Plans = ({ plans, onDelete }) => {
  return (
    <>
      {plans &&
        plans.map((plan) => (
          <Plan plan={plan} key={plan.planetName} onDelete={onDelete} />
        ))}
    </>
  );
};

export default Plans;
