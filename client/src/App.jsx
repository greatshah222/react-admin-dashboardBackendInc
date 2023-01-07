import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Admin from "./pages/Admin";
import BreakDown from "./pages/BreakDown";
import Customers from "./pages/Customers";
import Daily from "./pages/Daily";
import Dashboard from "./pages/Dashboard";
import Geography from "./pages/Geography";
import Layout from "./pages/Layout";
import Monthly from "./pages/Monthly";
import Overview from "./pages/Overview";
import Performance from "./pages/Performance";
import Products from "./pages/Products";
import Transactions from "./pages/Transactions";
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
              <Route path="/transaction" element={<Transactions />} />
              <Route path="/geography" element={<Geography />} />
              <Route path="/overview" element={<Overview />} />
              <Route path="/daily" element={<Daily />} />
              <Route path="/monthly" element={<Monthly />} />
              <Route path="/breakdown" element={<BreakDown />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/performance" element={<Performance />} />
            </Route>
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
