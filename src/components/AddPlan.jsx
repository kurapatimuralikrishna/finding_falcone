import React, { useState } from "react";
import Select from "react-select";

export const AddPlan = ({
  planets,
  spaceShips,
  availablePlanets,
  availableShips,
  onSave,
  onCancel,
}) => {
  const [selectedPlanet, setSelectedPlanet] = useState(null);
  const [selectedShip, setSelectedShip] = useState(null);

  const createMap = () => {
    const map = new Map();
    for (let i = 0; i < spaceShips.length; i++) {
      map.set(spaceShips[i].name, false);
    }
    return map;
  };

  const [radioMap, setRadioMap] = useState(createMap());

  const options = availablePlanets.map((planet) => {
    return { value: planet, label: planet };
  });

  const selectPlanet = (newValue) => {
    setSelectedPlanet(null);
    setSelectedShip(null);
    setRadioMap((map) => {
      map.forEach((key) => map.set(key, false));
      return map;
    });
    //make all ships unchecked!
    if (newValue) {
      for (let i = 0; i < planets.length; i++) {
        if (planets[i].name === newValue.value) {
          setSelectedPlanet(planets[i]);
          break;
        }
      }
    }
  };

  const getLabel = (ship) => {
    return ship.name + "(" + availableShips.get(ship.name) + ")";
  };

  const isShipUnavailable = (ship) => {
    let travelDistance = selectedPlanet.distance;
    if (ship.max_distance < travelDistance) return true;
    if (availableShips.get(ship.name) === 0) return true;
    return false;
  };

  const selectShip = (e) => {
    let selectedShipName = e.target.value;
    if (selectedShipName) {
      setRadioMap((radioMap) => {
        radioMap.set(selectedShipName, true);
        return new Map(radioMap);
      });
      for (let i = 0; i < spaceShips.length; i++) {
        if (spaceShips[i].name === selectedShipName) {
          setSelectedShip(spaceShips[i]);
          break;
        }
      }
    }
  };

  //simplyfy css for radio
  //check css for select
  //select on change should refresh radio elements
  return (
    <form
      className="add-form"
      onSubmit={(e) => onSave(e, selectedPlanet, selectedShip)}
    >
      <div className="form-control">
        <label>Planet</label>
        <Select options={options} onChange={selectPlanet}></Select>
      </div>
      {selectedPlanet && (
        <div className="form-control">
          {spaceShips.map((ship, index) => (
            <label key={index}>
              <input
                style={{ height: "10px", width: "10px" }}
                type="radio"
                name="spaceships"
                value={ship.name}
                checked={radioMap.get(ship.name)}
                disabled={isShipUnavailable(ship)}
                onChange={selectShip}
              />
              {getLabel(ship)}
            </label>
          ))}
        </div>
      )}
      {selectedShip && (
        <div>
          <button type="submit" className="btn">
            Save
          </button>
          <button className="btn" onClick={onCancel}>
            Cancel
          </button>
        </div>
      )}
    </form>
  );
};
