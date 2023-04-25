import React from "react";
import { useSelector, useDispatch, Provider } from "react-redux";
import { createSlice, configureStore } from "@reduxjs/toolkit";

// Define a slice with initial state
const buttonSlice = createSlice({
  name: "buttons",
  initialState: {
    data: {}
  },
  reducers: {
    buttonClicked: (state, action) => {
      const { name } = action.payload;
      if (state.data[name]) {
        state.data[name].clickCount += 1;
      } else {
        state.data[name] = {
          clickCount: 1
        };
      }
    }
  }
});

// Export the action creator for buttonClicked
export const { buttonClicked } = buttonSlice.actions;

// Create a Redux store with the button slice
const store = configureStore({
  reducer: {
    buttons: buttonSlice.reducer
  }
});

// Define a Button component
const Button = ({ name }) => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(buttonClicked({ name }));
  };

  return <button onClick={handleClick}>{name}</button>;
};

// Define a Table component
const Table = () => {
  const data = useSelector((state) => state.buttons.data);

  return (
    <table>
      <thead>
        <tr>
          <th>Button Name</th>
          <th>Click Count</th>
        </tr>
      </thead>
      <tbody>
        {Object.keys(data).map((name) => (
          <tr key={name}>
            <td>{name}</td>
            <td>{data[name].clickCount}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

// Define the App component
const App = () => {
  const buttonNames = Array.from({ length: 30 }, (_, i) => `Button ${i + 1}`);

  return (
    <Provider store={store}>
    <div>
      <h1>Buttons</h1>
      <div>
        {buttonNames.map((name) => (
          <Button key={name} name={name} />
        ))}
      </div>
      <h1>Table</h1>
      <Table />
    </div>
    </Provider>
  );
};

export default App;