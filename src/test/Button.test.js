import React from "react";
import { render, screen } from "@testing-library/react";
import Button from "../components/Button";
import { Provider } from "react-redux";
import store from "../redux/store";

/**
 * Button component test suite with Jest and React Testing Library
 * @see https://testing-library.com/docs/react-testing-library/intro
 * @see https://jestjs.io/docs/en/getting-started
 */
test("Button renders correctly", () => {
  render(<Provider store={store}>
            <Button
              text="Testing Button" // Button text prop is required or test will fail
              bgColor={"#000"} color={"#f1f1f1"} />
          </Provider>);

  screen.debug();
});