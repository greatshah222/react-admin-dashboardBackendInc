import React, { useState } from "react";

import {
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";

import {
  SettingsOutlined,
  ChevronLeft,
  ChevronRightOutlined,
  HomeOutlined,
  ShoppingCartOutlined,
  Groups2Outlined,
  ReceiptLongOutlined,
  PublicOutlined,
  PointOfSaleOutlined,
  TodayOutlined,
  CalendarMonthOutlined,
  AdminPanelSettingsOutlined,
  TrendingUpOutlined,
  PieChartOutlined,
} from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import FlexBetween from "./FlexBetweens";

const navItems = [
  {
    text: "Dashboard",
    icon: <HomeOutlined />,
  },
  {
    text: "Client Facing",
    icon: null,
  },
  {
    text: "Products",
    icon: <ShoppingCartOutlined />,
  },
  {
    text: "Customers",
    icon: <Groups2Outlined />,
  },
  {
    text: "Transaction",
    icon: <ReceiptLongOutlined />,
  },
  {
    text: "Geopgraphy",
    icon: <PublicOutlined />,
  },
  {
    text: "Sales",
    icon: null,
  },
  {
    text: "Overview",
    icon: <PointOfSaleOutlined />,
  },
  {
    text: "Daily",
    icon: <TodayOutlined />,
  },
  {
    text: "Monthly",
    icon: <CalendarMonthOutlined />,
  },
  {
    text: "Breakdown",
    icon: <PieChartOutlined />,
  },
  {
    text: "Management",
    icon: null,
  },
  {
    text: "Admin",
    icon: <AdminPanelSettingsOutlined />,
  },
  {
    text: "Performance",
    icon: <TrendingUpOutlined />,
  },
];

const Sidebar = ({
  drawerWidth,
  isSidebarOpen,
  setIsSidebarOpen,
  isNonMobile,
  user,
}) => {
  const { pathname } = useLocation();

  const [active, setActive] = useState("");
  const navigate = useNavigate();

  const theme = useTheme();
  // setting the active whenever the url changes
  useEffect(() => {
    setActive(pathname.substring(1));
  }, [pathname]);

  return (
    <Box component="nav">
      {isSidebarOpen && (
        <Drawer
          open={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          variant="persistent"
          anchor="left"
          sx={{
            width: drawerWidth,
            "& .MuiDrawer-paper": {
              color: theme.palette.secondary[200],
              backgroundColor: theme.palette.background.alt,
              boxSizing: "border-box",
              borderWidth: isNonMobile ? 0 : "2px",
              width: drawerWidth,
            },
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "20px",
              height: "100%",
            }}
          >
            <Box width={"100%"} flex="1">
              <Box m="1.5rem 2rem 2rem 3rem">
                <FlexBetween color={theme.palette.secondary.main}>
                  <Box display={"flex"} alignItems="center" gap="0.5rem">
                    <Typography variant="h4" fontWeight={"bold"}>
                      BishalVision
                    </Typography>
                  </Box>

                  {/* ON mobile screen */}

                  {!isNonMobile && (
                    <IconButton
                      onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    >
                      <ChevronLeft />
                    </IconButton>
                  )}
                </FlexBetween>
              </Box>

              <List>
                {navItems.map(({ text, icon }) => {
                  if (!icon) {
                    // this will just be title
                    return (
                      <Typography
                        sx={{
                          m: "2.25rem 0 1rem 3rem",
                        }}
                        key={text}
                      >
                        {text}
                      </Typography>
                    );
                  }

                  const lctext = text.toLowerCase();

                  return (
                    <ListItem key={text} disablePadding>
                      <ListItemButton
                        onClick={() => {
                          navigate(`/${lctext}`);
                          setActive(lctext);
                        }}
                        sx={{
                          backgroundColor:
                            active === lctext
                              ? theme.palette.secondary[400]
                              : "transparent",
                          color:
                            active === lctext
                              ? theme.palette.primary[600]
                              : theme.palette.secondary[100],
                        }}
                      >
                        <ListItemIcon
                          sx={{
                            ml: "2rem",
                            color:
                              active === lctext
                                ? theme.palette.primary[600]
                                : theme.palette.secondary[200],
                          }}
                        >
                          {icon}
                        </ListItemIcon>
                        <ListItemText primary={text} />
                        {active === lctext && (
                          <ChevronRightOutlined
                            sx={{
                              ml: "auto",
                            }}
                          />
                        )}
                      </ListItemButton>
                    </ListItem>
                  );
                })}
              </List>
            </Box>

            <Box
              sx={{
                pb: "20px",
              }}
            >
              <Divider />
              <FlexBetween
                textTransform={"none"}
                gap="1rem"
                m="1.5rem 2rem 0 3rem"
              >
                {/* Image */}
                <Box
                  component={"img"}
                  alt="profile"
                  src="https://bishalshah.netlify.app/static/media/IMG_3818-removebg-preview%20(2).790495a1.png"
                  height={"40px"}
                  width="40px"
                  borderRadius={"50%"}
                  sx={{
                    objectFit: "cover",
                  }}
                />
                {/* Name */}
                <Box textAlign={"left"}>
                  <Typography
                    fontWeight={"bold"}
                    fontSize="0.9rem"
                    sx={{
                      color: theme.palette.secondary[100],
                    }}
                  >
                    {user?.name}
                  </Typography>
                  <Typography
                    fontSize="0.8rem"
                    sx={{
                      color: theme.palette.secondary[200],
                    }}
                  >
                    {user?.occupation}
                  </Typography>
                </Box>
                {/* ICOn */}
                <SettingsOutlined
                  sx={{
                    color: theme.palette.secondary[300],
                    fontSize: "25px",
                  }}
                />
              </FlexBetween>
            </Box>
          </Box>
        </Drawer>
      )}
    </Box>
  );
};

export default Sidebar;
