import React, { useEffect, useState } from "react";
import { AddPlan } from "../components/AddPlan";
import Plans from "../components/Plans";
import { Header } from "../components/Header";
import ApiService from "../services/ApiService";
import { useNavigate, useOutletContext } from "react-router-dom";
import Footer from "../components/Footer";
import { REQUIRED_PLANS } from "../services/Constants";

const Homepage = ({ context }) => {
  const [token, setToken] = useState("");
  const [planets, setPlanets] = useState([]);
  const [spaceShips, setSpaceShips] = useState([]);
  const [availablePlanets, setAvailablePlanets] = useState(new Set());
  const [availableShips, setAvailableShips] = useState(new Map());
  const [showForm, setShowForm] = useState(false);
  const [plans, setPlans] = useState([]);
  const [request, setRequest] = useOutletContext();

  const navigate = useNavigate();

  useEffect(() => {
    initialize();

    async function initialize() {
      let res = await ApiService.getPlanets();
      setPlanets(res);

      res = await ApiService.getVehicles();
      setSpaceShips(res);

      res = await ApiService.getToken();
      setToken(res);
    }
  }, []);

  useEffect(() => {
    setRequest((request) => {
      request.time = 0;
      request.payload = {};
      return request;
    });
  }, [setRequest]);

  useEffect(() => {
    let set = new Set();
    planets.forEach((planet) => set.add(planet.name));
    // plans && plans.forEach((plan) => set.delete(plan.planetName));
    setAvailablePlanets(set);
  }, [planets]);

  useEffect(() => {
    let map = new Map();
    spaceShips.forEach((ship) => map.set(ship.name, ship.total_no));
    // plans &&
    //   plans.forEach((plan) => {
    //     let freeShips = map.get(plan.shipName) - 1;
    //     map.set(plan.shipName, freeShips);
    //   });
    setAvailableShips(map);
  }, [spaceShips]);

  const toggleForm = () => setShowForm((flag) => !flag);

  const deletePlan = (e, plan) => {
    e.preventDefault();
    let count = availableShips.get(plan.shipName);
    setAvailableShips((availableShips) => {
      availableShips.set(plan.shipName, count + 1);
      return new Map(availableShips);
    });
    setAvailablePlanets((availablePlanets) => {
      availablePlanets.add(plan.planetName);
      return new Set(availablePlanets);
    });
    setRequest((request) => {
      request.time -= plan.time;
      return request;
    });
    setPlans((plans) =>
      plans.filter((current) => current.planetName !== plan.planetName)
    );
  };

  const addPlan = (e, selectedPlanet, selectedShip) => {
    e.preventDefault();
    setAvailablePlanets((availablePlanets) => {
      availablePlanets.delete(selectedPlanet.name);
      return new Set(availablePlanets);
    });
    let count = availableShips.get(selectedShip.name);
    setAvailableShips((availableShips) => {
      availableShips.set(selectedShip.name, count - 1);
      return new Map(availableShips);
    });
    let distance = selectedPlanet.distance;
    let speed = selectedShip.speed;
    let time = distance / speed;
    setPlans((plans) =>
      plans.concat([
        {
          planetName: selectedPlanet.name,
          shipName: selectedShip.name,
          time: time,
        },
      ])
    );
    setRequest((request) => {
      request.time += time;
      return request;
    });
    toggleForm();
  };

  const cancelPlan = (e) => {
    e.preventDefault();
    toggleForm();
  };

  const findFalcone = (e) => {
    e.preventDefault();
    let planet_names = [];
    let vehicle_names = [];
    plans &&
      plans.forEach((plan) => {
        planet_names.push(plan.planetName);
        vehicle_names.push(plan.shipName);
      });
    let payload = {
      token: token,
      planet_names: planet_names,
      vehicle_names: vehicle_names,
    };
    setRequest((request) => {
      request.payload = payload;
      return request;
    });
    navigate("/result");
  };

  const refresh = () => window.location.reload(false);
  return (
    <div className="container">
      <Header
        buttonName="Add Planet"
        onClick={toggleForm}
        len={plans.length}
        refresh={refresh}
      />
      {showForm && plans.length < REQUIRED_PLANS && (
        <AddPlan
          planets={Array.from(planets)}
          spaceShips={Array.from(spaceShips)}
          availablePlanets={Array.from(availablePlanets)}
          availableShips={availableShips}
          onSave={addPlan}
          onCancel={cancelPlan}
        />
      )}
      {plans.length > 0 && <Plans plans={plans} onDelete={deletePlan} />}
      <h4>Total time: {request.time}</h4>
      {plans.length === REQUIRED_PLANS ? (
        <div>
          <button className="btn" onClick={findFalcone}>
            Search
          </button>
          <button className="btn" onClick={refresh}>
            Reset
          </button>
        </div>
      ) : (
        <p>Add {REQUIRED_PLANS} planets to search</p>
      )}
      <Footer />
    </div>
  );
};

export default Homepage;
