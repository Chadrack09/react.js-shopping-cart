import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "../redux/store";
import ItemDes from "../components/ItemDes";

/**
 * Button component test suite with Jest and React Testing Library
 * @see https://testing-library.com/docs/react-testing-library/intro
 * @see https://jestjs.io/docs/en/getting-started
 */
test("Button renders correctly", () => {
  render(<Provider store={store}>
            <ItemDes 
              brand="nike"
              name="nike-shoes" />
          </Provider>);

  screen.debug();
});