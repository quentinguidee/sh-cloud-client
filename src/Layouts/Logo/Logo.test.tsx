import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";

import Logo from "./Logo";
import { Provider } from "react-redux";
import store from "Store/Store";

it("renders", async () => {
    const { getByText } = render(
        <Provider store={store}>
            <Logo />
        </Provider>,
    );
    expect(getByText("cloud.sh")).toBeInTheDocument();
});
