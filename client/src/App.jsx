import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Customers from "./pages/Customers";
import Dashboard from "./pages/Dashboard";
import Layout from "./pages/Layout";
import Products from "./pages/Products";
import { themeSettings } from "./theme";

function App() {
  // cause we have defined name as global in main.jsx
  const mode = useSelector((state) => state.global.mode);
  // so it doesnot render everytime it is useMemo
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          {/* Reset all css->cssbaseline */}
          <CssBaseline />

          <Routes>
            <Route element={<Layout />}>
              {/*  if we go to route(home page) / we will be rerouted */}
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/products" element={<Products />} />
              <Route path="/customers" element={<Customers />} />
            </Route>
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
