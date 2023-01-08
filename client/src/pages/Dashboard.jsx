import React from "react";

import {
  DownloadOutlined,
  Email,
  PointOfSale,
  PersonAdd,
  Traffic,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useGetDashboardQuery } from "../state/api";
import FlexBetween from "../components/FlexBetweens";
import Header from "../components/Header";
import { fontWeight } from "@mui/system";
import Statbox from "../components/Statbox";
import OverviewChart from "../components/OverviewChart";
import BreakDownChart from "../components/BreakDownChart";

const Dashboard = () => {
  const theme = useTheme();
  const isNonMediumScreens = useMediaQuery("(min-width:1200px)");

  const { data, isLoading } = useGetDashboardQuery();

  const columns = [
    {
      field: "_id",
      headerName: "ID",
      flex: 1,
    },
    {
      field: "userId",
      headerName: "User ID",
      flex: 1,
    },
    {
      field: "createdAt",
      headerName: "createdAt",
      flex: 1,
    },

    {
      field: "products",
      headerName: "# of Products",
      flex: 0.5,
      sortable: false,
      renderCell: (params) => params.value.length,
    },
    {
      field: "cost",
      headerName: "Cost",
      flex: 1,
      renderCell: (params) => `€${Number(params.value).toFixed(2)}`,
    },
  ];

  return (
    <Box m="1.5rem 2.5rem">
      {/* HEader */}
      <FlexBetween>
        <Header title={"DASHBOARD"} subTitle="Welcome to your dashboard " />

        <Box>
          <Button
            sx={{
              backgroundColor: theme.palette.primary[400],
              color: theme.palette.secondary[400],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
          >
            <DownloadOutlined sx={{ mr: "10px" }} />
            Download Reports
          </Button>
        </Box>
      </FlexBetween>

      <Box
        display={"grid"}
        gridTemplateColumns="repeat(12,1fr)"
        gridAutoRows={"160px"}
        gap="20px"
        sx={{
          "& >div": {
            gridColumn: isNonMediumScreens ? undefined : "span 12",
          },
        }}
      >
        {/* ROW 1 */}

        <Statbox
          title={"Total Customer"}
          value={(data && data.totalCustomers) || 18789}
          increase={"+14%"}
          description="Since last month"
          icon={
            <Email
              sx={{
                fontSize: "26px",
                color: theme.palette.secondary[300],
              }}
            />
          }
        />
        <Statbox
          title={"Sales today"}
          value={data && data.todayStats.totalSales}
          increase={"+24%"}
          description="Since last month"
          icon={
            <PointOfSale
              sx={{
                fontSize: "26px",
                color: theme.palette.secondary[300],
              }}
            />
          }
        />
        <Box
          gridColumn="span 8"
          gridRow="span 2"
          backgroundColor={theme.palette.background.alt}
          p="1rem"
          borderRadius={"0.55rem"}
        >
          <OverviewChart isDashboard={true} view="sales" />
        </Box>
        <Statbox
          title={"Monthly Sales"}
          value={data && data.thisMonthStats.totalSales}
          increase={"+5%"}
          description="Since last month"
          icon={
            <PersonAdd
              sx={{
                fontSize: "26px",
                color: theme.palette.secondary[300],
              }}
            />
          }
        />
        <Statbox
          title={"Yearly Sales"}
          value={data && data.yearlySalesTotal}
          increase={"+44%"}
          description="Since last month"
          icon={
            <Traffic
              sx={{
                fontSize: "26px",
                color: theme.palette.secondary[300],
              }}
            />
          }
        />

        {/* ROW 2 */}
        {/* LEFT */}
        <Box
          gridColumn={"span 8"}
          gridRow="span 3"
          sx={{
            "& .MuiDataGrid-root": {
              border: "none",
              borderRadius: "5rem",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: "none",
            },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: theme.palette.background.alt,
              color: theme.palette.secondary[100],
              borderBottom: "none",
            },
            "& .MuiDataGrid-virtualScroller": {
              backgroundColor: theme.palette.background.alt,
            },
            "& .MuiDataGrid-footerContainer": {
              backgroundColor: theme.palette.background.alt,
              color: theme.palette.secondary[100],
              borderTop: "none",
            },
            "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
              color: `${theme.palette.secondary[200]} !important`,
            },
          }}
        >
          <DataGrid
            rows={(data && data.transactions) || []}
            columns={columns}
            loading={isLoading || !data}
            // by default it looks for .id so we are changing it to look for ._id
            getRowId={(row) => row._id}
          />
        </Box>
        <Box
          gridColumn={"span 4"}
          gridRow="span 3"
          backgroundColor={theme.palette.background.alt}
          p="1.5rem"
          borderRadius={"0.55rem"}
        >
          <Typography
            variant="h6"
            sx={{
              color: theme.palette.secondary[100],
            }}
          >
            Sales By Category
          </Typography>
          <BreakDownChart isDashboard={true} />
          <Typography
            variant="h6"
            p="0 0.6rem"
            fontSize={"0.8rem"}
            sx={{
              color: theme.palette.secondary[200],
            }}
          >
            Breakdown of sales and information
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
