import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/index.css";
import App from "./App.jsx";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { brown, indigo } from "@mui/material/colors";

const theme = createTheme({
  palette: {
    primary: indigo,
    secondary: brown,
  },
  typography: {
    fontFamily: "Tajawal, sans serif",
  },
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </StrictMode>
);
