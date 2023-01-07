import { IconButton, TextField, InputAdornment } from "@mui/material";

import { Search } from "@mui/icons-material";
import FlexBetween from "./FlexBetweens";

import {
  GridToolbarDensitySelector,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarColumnsButton,
} from "@mui/x-data-grid";

const DataGridCustomToolbar = ({ searchInput, setSearchInput, setSearch }) => {
  return (
    <GridToolbarContainer>
      <FlexBetween width={"100%"}>
        <FlexBetween>
          <GridToolbarColumnsButton />
          <GridToolbarDensitySelector />
          <GridToolbarExport />
        </FlexBetween>
        <TextField
          label="Search ..."
          sx={{
            mb: "0.5rem",
            width: "15rem",
          }}
          onChange={(e) => setSearchInput(e.target.value)}
          value={searchInput}
          variant="standard"
          // customization
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => {
                    setSearch(searchInput);
                    setSearchInput("");
                  }}
                >
                  <Search />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </FlexBetween>
    </GridToolbarContainer>
  );
};

export default DataGridCustomToolbar;
