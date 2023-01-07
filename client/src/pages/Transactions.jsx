import { useTheme } from "@emotion/react";
import { DataGrid } from "@mui/x-data-grid";
import { useState } from "react";
import { useGetTransactionsQuery } from "../state/api";
import Header from "../components/Header";
import { Box } from "@mui/material";
import DataGridCustomToolbar from "../components/DataGridCustomToolbar.jsx";
const Transactions = () => {
  const theme = useTheme();

  //   values to be sent to backend

  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  const [sort, setSort] = useState({});
  const [search, setSearch] = useState("");

  const [searchInput, setSearchInput] = useState("");

  // whenever the below value changes in below hook redux toolkit makes an API call

  const { data, isLoading } = useGetTransactionsQuery({
    page,
    pageSize,
    sort: JSON.stringify(sort),
    search,
  });
  console.log("🚀 ~ file: Transactions.jsx:22 ~ Transactions ~ data", data);

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
      <Header title="TRANSACTIONS" subTitle={"Entire list of transactions"} />

      <Box
        height={"80vh"}
        mt="40px"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
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
            backgroundColor: theme.palette.primary.light,
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
          // server side pagination
          rowCount={(data && data.total) || 0}
          pagination
          page={page}
          pageSize={pageSize}
          paginationMode="server"
          sortingMode="server"
          rowsPerPageOptions={[20, 50, 100]}
          onPageChange={(newPage) => setPage(newPage)}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          onSortModelChange={(newSortModel) => setSort(...newSortModel)}
          components={{ Toolbar: DataGridCustomToolbar }}
          // passing props to component props
          componentsProps={{
            toolbar: {
              searchInput,
              setSearchInput,
              setSearch,
            },
          }}
        />
      </Box>
    </Box>
  );
};

export default Transactions;
