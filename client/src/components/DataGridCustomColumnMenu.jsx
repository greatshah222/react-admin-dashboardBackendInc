import {
  GridColumnMenuContainer,
  GridFilterMenuItem,
  HideGridColMenuItem,
} from "@mui/x-data-grid";
import React from "react";

const CustomColumnMenu = (props) => {
  // this is custom menu when we click 3 dots->here we are only showing filter and hide option
  const { hideMenu, currentColumn, open } = props;
  return (
    <GridColumnMenuContainer
      open={open}
      hideMenu={hideMenu}
      currentColumn={currentColumn}
    >
      <GridFilterMenuItem onClick={hideMenu} column={currentColumn} />
      <HideGridColMenuItem onClick={hideMenu} column={currentColumn} />
    </GridColumnMenuContainer>
  );
};

export default CustomColumnMenu;
