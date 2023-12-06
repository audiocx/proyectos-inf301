import Header from "../components/Header";
import { useEffect, useState } from "react";
import { Button, Container, Grid, TextField, Typography } from "@mui/material";
import { sha256 } from "js-sha256";
import { useUserContext, useUserLogChanger } from "../hooks/UserProvider";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Login() {
  const [userNick, setUserNick] = useState("");
  const [userPw, setUserPw] = useState("");

  const logger = useUserLogChanger();
  const navigate = useNavigate();

  const handleLogin = async () => {
    const requestBody = {
      query: `
        query {
          userLogin(nick: "${userNick}", pwHash: "${sha256(userPw)}") {
            nick
            profileType
            wallet
          }
        }
      `,
    };

    await fetch("http://localhost:4000", {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((data) => {
        return data.json();
      })
      .then((data) => {
        if (data.data.userLogin) {
          logger(data.data.userLogin);
          if (data.data.userLogin.profileType === "admin") {
            navigate("/");
          } else {
            navigate("/bet");
          }
        }
      });
  };

  return (
    <>
      <Container>
        <Grid container spacing={3}>
          <Grid item xs={12}></Grid>
          <Grid item xs={4}></Grid>
          <Grid item xs={4}>
            <TextField
              label="User"
              fullWidth
              onChange={(e) => setUserNick(e.target.value)}
            ></TextField>
          </Grid>
          <Grid item xs={4}></Grid>
          <Grid item xs={4}></Grid>
          <Grid item xs={4}>
            <TextField
              type="password"
              label="Password"
              fullWidth
              onChange={(e) => setUserPw(e.target.value)}
            ></TextField>
          </Grid>
          <Grid item xs={4}></Grid>
          <Grid item xs={12}></Grid>
          <Grid item xs={4}></Grid>
          <Grid item xs={4}>
            <Button fullWidth variant="contained" onClick={handleLogin}>
              Login
            </Button>
          </Grid>
          <Grid item xs={4}></Grid>
          <Grid item xs={4}></Grid>
          <Grid item xs={4}>
            <Typography variant="h6">
              You don't have an account? <Link to="/signin">click here!</Link>
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
