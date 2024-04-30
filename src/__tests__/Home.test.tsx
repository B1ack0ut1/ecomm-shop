import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "../lib/store"; // Import your Redux store
import Home from "../pages/Home";
import { waitFor } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { server } from "../mocks/server";
import { rest } from "msw";

describe("<Home />", () => {
  it("Should render error state message", async () => {
    server.use(
      rest.get("https://fakestoreapi.com/products", (_, res, ctx) => {
        return res(ctx.status(400));
      })
    );

    render(
      <Provider store={store}>
        <Router>
          <Home />
        </Router>
      </Provider>
    );

    await waitFor(
      () => {
        expect(screen.queryByTestId("skeleton-home")).toBeNull();
      },
      { timeout: 2000 }
    );

    expect(screen.getByText("An error has occurred.")).toBeInTheDocument();
  });

  it("Should render loading state skeleton", async () => {
    render(
      <Provider store={store}>
        <Router>
          <Home />
        </Router>
      </Provider>
    );

    expect(screen.queryByTestId("skeleton-home")).toBeInTheDocument();
  });

  it("Should render products", async () => {
    render(
      <Provider store={store}>
        <Router>
          <Home />
        </Router>
      </Provider>
    );

    await waitFor(
      () => {
        expect(screen.queryByTestId("skeleton-home")).toBeNull();
      },
      { timeout: 2000 }
    );

    expect(screen.getByTestId("hero")).toBeInTheDocument();
    expect(
      screen.getByText("Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops")
    ).toBeInTheDocument();
    expect(screen.getByText("Mens Cotton Jacket")).toBeInTheDocument();
  });
});
