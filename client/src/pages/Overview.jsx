import { Box, Select, FormControl, MenuItem, InputLabel } from "@mui/material";
import { useState } from "react";
import Header from "../components/Header";
import OverviewChart from "../components/OverviewChart";
const Overview = () => {
  const [view, setView] = useState("units");
  return (
    <Box m="1.5rem 2.5rem">
      <Header title="OVERVIEW" subTitle={"Overview of some data"} />
      <Box height={"75vh"}>
        <FormControl
          sx={{
            mt: "1rem",
          }}
        >
          <InputLabel>View</InputLabel>
          <Select
            value={view}
            label="View"
            onChange={({ target }) => setView(target.value)}
          >
            <MenuItem value="units">Units</MenuItem>
            <MenuItem value="sales">Sales</MenuItem>
          </Select>
        </FormControl>

        <OverviewChart view={view} />
      </Box>
    </Box>
  );
};

export default Overview;
