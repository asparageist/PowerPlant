const storeState = () => {
  let currentState = {soil:0, water:0, light:0};
  return (stateChangeFunction = (state) => state) => {
    const newState = stateChangeFunction(currentState);
    currentState = { ...newState };
    return newState;
  };
};

const stateControl = storeState();

const changeState = (prop) => {
  return (value) => {
    return (state) => ({
      ...state,
      [prop]: (state[prop] || 0) + value,
    });
  };
};

const blueFood = changeState("soil")(5); //blueFood(plant) would then increment the soil level of a plant state by 5
const greenFood = changeState("soil")(10);
const yuckyFood = changeState("soil")(-5);

const hydrate = changeState("water")(1);
const superWater = changeState("water")(5);

const giveLight = changeState("light")(1);
const shineLight = changeState("light")(5);

window.onload = function () {
  document.getElementById("feed").onclick = function () {
    const newState = stateControl(blueFood);
    document.getElementById("soil-value").innerText = `Soil: ${newState.soil}`;
  };

  document.getElementById("water").onclick = function () {
    const newState = stateControl(hydrate);
    document.getElementById(
      "water-value"
    ).innerText = `Water: ${newState.water}`;
  };

  document.getElementById("light").onclick = function () {
    const newState = stateControl(giveLight);
    document.getElementById(
      "light-value"
    ).innerText = `Light: ${newState.light}`;
  };

  document.getElementById("show-state").onclick = function () {
    const currentState = stateControl();
    document.getElementById(
      "soil-value"
    ).innerText = `Your Soil = ${currentState.soil}`;

    document.getElementById(
      "water-value"
    ).innerText = `Your Water = ${currentState.water}`;

    document.getElementById(
      "light-value"
    ).innerText = `Your Light = ${currentState.light}`;

  };
};

