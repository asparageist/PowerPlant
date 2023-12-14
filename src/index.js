const getId = () => {
  let currId = 0;
  return () => {
    currId++;
    return currId;
  }
}

const determineUniqueId = getId();

const storeState = () => {
  let currentState = {soil:0, water:0, light:0, id:determineUniqueId()};
  return (stateChangeFunction = (state) => state) => {
    const newState = stateChangeFunction(currentState);
    currentState = { ...newState };
    return newState;
  };
};

const stateControl = storeState();

//creates the elements
const elementFactory = function (elemName) {
  return (prop) => {
    return (state) => {
      document.createElement(elemName).setAttribute('id', `${prop}${state.id})}`)
      } 
    };
}

const buttonFactory = elementFactory("button");
const divFactory = elementFactory("div");
const headingFactory = elementFactory("h3");

const drawPlant = (state) => {
  Object.keys(state).map(buttonFactory).map(stateControl);
  stateControl(divFactory)

  return ;
}

// {buttonFactory("light"), buttonFactory("water"), buttonFactory("food")}.map(stateControl)

const appendChild = (state) => {
  return (prop) => {
    return () => {
      drawPlant(state).map(document.getElementById(`${prop}${state.id}`).appendChild)
    }
    
  }
  
}

const changeState = (prop) => {
  return (value) => {
    return (state) => ({
      ...state,
      [prop]: (state[prop] || 0) + value,
    });
  };
};

// Object.keys(plant).map(buttonFactory) -> {buttonFactory("water"), buttonFactory("food"), buttonFactory("light")} = resultArr
// resultArr.map(stateControl) => {stateControl(buttonFactory("water")), stateControl(buttonFactory("food")), stateControl(buttonFactory("light"))}

const feed = changeState("soil")(1); 
const hydrate = changeState("water")(1);
const light = changeState("light")(1);


window.onload = function () {
  document.getElementById("feed").onclick = function () {
    const newState = stateControl(feed);
    document.getElementById("soil-value").innerText = `Soil: ${newState.soil}`;
  };

  document.getElementById("water").onclick = function () {
    const newState = stateControl(hydrate);
    document.getElementById(
      "water-value"
    ).innerText = `Water: ${newState.water}`;
  };

  document.getElementById("light").onclick = function () {
    const newState = stateControl(light);
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

