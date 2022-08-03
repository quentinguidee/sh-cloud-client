import React, { CSSProperties } from "react";
import Router from "./Router";

import "Assets/Reset.sass";
import "Assets/App.sass";
import { Provider } from "react-redux";
import store, { persistor } from "Store/Store";
import { PersistGate } from "redux-persist/integration/react";
import MessageBoxStack from "Components/MessageBoxStack/MessageBoxStack";
import { useMessages } from "Store/Hooks/useMessages";
import { getCSSPalette } from "Assets/palettes/Palettes";
import { useTheme } from "Store/Hooks/useTheme";

function App() {
    return (
        <Provider store={store}>
            <PersistGate persistor={persistor}>
                <Container />
            </PersistGate>
        </Provider>
    );
}

function Container() {
    const messages = useMessages();

    const theme = useTheme();

    const palette: CSSProperties = getCSSPalette(
        theme.current === "light" ? theme.light : theme.dark,
        theme.current !== "light",
    );

    return (
        <div style={palette} className="palette">
            <Router />
            <MessageBoxStack messages={messages} />
        </div>
    );
}

export default App;
