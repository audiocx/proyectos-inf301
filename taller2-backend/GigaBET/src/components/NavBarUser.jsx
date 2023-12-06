import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { useUserLogChanger } from "../hooks/UserProvider";

export default function NavBarUser() {
  const navigate = useNavigate();

  const logger = useUserLogChanger();

  const handleLogout = () => {
    logger(null);
    navigate("/login");
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
            GigaBET
          </Typography>
          <Button
            color="success"
            variant="contained"
            onClick={() => navigate("/bet")}
          >
            Bet
          </Button>
          <Button
            color="success"
            variant="contained"
            onClick={() => {
              navigate("/bethistory");
            }}
          >
            Bet history
          </Button>
          <Button color="error" variant="contained" onClick={handleLogout}>
            Log out
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
