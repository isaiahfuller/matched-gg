import React from "react";
import ReactDOM from "react-dom/client";
import { generateColors } from "@mantine/colors-generator";
import { createTheme, MantineProvider, virtualColor } from "@mantine/core";
import App from "./App.tsx";
import "@mantine/core/styles.css";
import "@mantine/charts/styles.css";
import "@mantine/carousel/styles.css";
import "./index.css";

const theme = createTheme({
  primaryColor: "primary",
  colors: {
    primary: virtualColor({
      name: "primary",
      dark: "ylw",
      light: "ylw",
    }),
    ylw: generateColors("#fc8a08"),
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <MantineProvider theme={theme} defaultColorScheme="dark">
      <App />
    </MantineProvider>
  </React.StrictMode>
);
