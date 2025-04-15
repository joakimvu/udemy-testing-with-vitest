import "./App.css"
import React from 'react';

function App() {
    const [buttonColor, setButtonColor] = React.useState("red");
    const nextColor = buttonColor === "red" ? "blue" : "red";

  return (
    <div>
        <button className={buttonColor} onClick={() => setButtonColor(nextColor)}>Change to {nextColor}</button>

        <br/>
        <input type="checkbox" id="disable-button-checkbox" defaultChecked={false} />
        <label htmlFor="disable-button-checkbox">Disable button</label>
    </div>
  );
}

export default App;
