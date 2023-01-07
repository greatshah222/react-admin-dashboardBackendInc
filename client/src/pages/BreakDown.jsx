import { Box } from "@mui/material";
import BreakDownChart from "../components/BreakDownChart";
import Header from "../components/Header";

const BreakDown = () => {
  return (
    <Box m="1.5rem 2.5rem">
      <Header title="BREAKDOWN" subTitle={"Breakdown of sales by category"} />
      <Box mt="40px" height={"75vh"}>
        <BreakDownChart />
      </Box>
    </Box>
  );
};

export default BreakDown;
