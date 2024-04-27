import React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";

import ListItemText from "@mui/material/ListItemText";

import { Link } from "react-router-dom";

const Sidebar = ({ open, toggleDrawer }) => {
  return (
    <div>
      <Drawer open={open} onClose={toggleDrawer}>
        <Box p={2}>
          <List>
            <Link to="/temperature">
              <ListItem
                sx={{
                  cursor: "pointer"
                }}
              >
                <ListItemText primary="Temperature" />
              </ListItem>
            </Link>
            <Link to="/pressure">
              <ListItem
                sx={{
                  cursor: "pointer"
                }}
              >
                <ListItemText primary="Pressure" />
              </ListItem>
            </Link>
            <Link to="/humidity">
              <ListItem
                sx={{
                  cursor: "pointer"
                }}
              >
                <ListItemText primary="Humidity" />
              </ListItem>
            </Link>
            <Link to="/moon">
              <ListItem
                sx={{
                  cursor: "pointer"
                }}
              >
                <ListItemText primary="Moon" />
              </ListItem>
            </Link>
            <ListItem
              sx={{
                cursor: "pointer"
              }}
            >
              <ListItemText primary="Condition" />
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </div>
  );
};

export default Sidebar;
