import {logRoles, render, screen, fireEvent} from '@testing-library/react';
import App from "./App";

// test("App contains correct heading", () => {
//   render(<App />);
//   const headingElement = screen.getByText(/learn react/i);
//   expect(headingElement).toBeInTheDocument();
// });
//
// test("empty test", () => {})
//
// test("test throws error explicityl", () => {
//   throw new Error("fail this test")
// })
//
// test("App contains correct heading", () => {
//   render(<App />);
//   const headingElement = screen.getByRole("heading", {name: /learn react/i})
//   expect(headingElement).toBeInTheDocument();
// })

test("button click flow", () => {
  // render app
  render(<App />);
  // find the button
  const buttonElement = screen.getByRole("button", {name: /blue/i});
  // check initial color
  expect(buttonElement).toHaveClass("red");
  // click the button
  fireEvent.click(buttonElement);
  // check button text
  expect(buttonElement).toHaveTextContent(/red/i);
  // check button color
  expect(buttonElement).toHaveClass("blue");
  expect(buttonElement).toHaveStyle({"background-color": "rgb(0,0,255)"});
})

test("checkbox flow", () => {
  render(<App />);

  // find elements
  const buttonElement = screen.getByRole("button", {name: /blue/i});
  const checkboxElement = screen.getByRole("checkbox", {name: /disable button/i});

  // check initial conditions
  expect(buttonElement).toBeEnabled();
  expect(checkboxElement).not.toBeChecked();
})