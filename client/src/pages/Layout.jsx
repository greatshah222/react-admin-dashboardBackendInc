import FlexBetween from "../components/FlexBetweens";

import { Box, useMediaQuery } from "@mui/material";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { useState } from "react";
import { useGetUserQuery } from "../state/api";
import { useSelector } from "react-redux";

const Layout = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const userId = useSelector((state) => state.global.userId);

  const { data } = useGetUserQuery(userId);
  console.log("🚀 ~ file: Layout.jsx:18 ~ Layout ~ data ", data);

  return (
    <Box display={isNonMobile ? "flex" : "block"} width="100%" height="100%">
      <Sidebar
        isNonMobile={isNonMobile}
        drawerWidth="250px"
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        user={data || {}}
      />
      <Box flex={1}>
        <Navbar
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
          user={data || {}}
        />

        {/* // Outlet is like props.children so if we pass dashboard component ->it will render Nabvar and dahboard */}

        <Outlet />
      </Box>
    </Box>
  );
};

export default Layout;
