import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "../lib/store";
import ProductDetails from "../pages/ProductDetails";
import { waitFor } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { server } from "../mocks/server";
import { rest } from "msw";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: () => ({
    id: "1",
  }),
}));

describe("<ProductDetails />", () => {
  // Particulary testing error first because fetch won't be sent and response with "Bad Request" will not be received
  // if fetch has succeeded once, as rtk query will cache the result and just retrieve data from cache for future queries
  it("Should render error state", async () => {
    server.use(
      rest.get("https://fakestoreapi.com/products", (_, res, ctx) => {
        return res(ctx.status(400));
      })
    );

    render(
      <Provider store={store}>
        <Router>
          <ProductDetails />
        </Router>
      </Provider>
    );

    await waitFor(
      () => {
        expect(screen.queryByText("Loading...")).toBeNull();
      },
      { timeout: 2000 }
    );

    expect(screen.getByText("An error has occurred.")).toBeInTheDocument();
  });

  it("Should render loading state", async () => {
    render(
      <Provider store={store}>
        <Router>
          <ProductDetails />
        </Router>
      </Provider>
    );

    expect(screen.queryByText("Loading...")).toBeInTheDocument();
  });

  it("Should render product details", async () => {
    render(
      <Provider store={store}>
        <Router>
          <ProductDetails />
        </Router>
      </Provider>
    );

    await waitFor(
      () => {
        expect(screen.queryByText("Loading...")).toBeNull();
      },
      { timeout: 2000 }
    );

    expect(
      screen.getByText("Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops")
    ).toBeInTheDocument();
  });
});
