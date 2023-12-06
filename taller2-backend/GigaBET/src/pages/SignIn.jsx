import { useState } from "react";
import { Button, Container, Grid, TextField, Typography } from "@mui/material";
import { sha256 } from "js-sha256";
import { useUserLogChanger } from "../hooks/UserProvider";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function SignIn() {
  const [userNick, setUserNick] = useState("");
  const [userPw, setUserPw] = useState("");
  const [userRepeatPw, setUserRepeatPw] = useState("");
  const [userWallet, setUserWallet] = useState(0);

  const logger = useUserLogChanger();
  const navigate = useNavigate();

  const handleSignIn = async () => {
    if (userNick === "") {
      alert("Enter a nick to sign in!");
      return;
    }

    if (userPw != userRepeatPw) {
      alert("Both passwords must be the same!");
      return;
    }

    if (userWallet <= 0) {
      alert("Wallet amount must be greater than 0");
      return;
    }

    const requestBody = {
      query: `
        mutation {
          addUser(nick: "${userNick}", pwHash: "${sha256(
        userPw
      )}", profileType: "user", wallet: ${userWallet}) {
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
        if (data.data.addUser) {
          logger(data.data.addUser);
          navigate("/bet");
        } else {
          alert("User already exists!");
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
          <Grid item xs={4}></Grid>
          <Grid item xs={4}>
            <TextField
              type="password"
              label="Repeat Password"
              fullWidth
              onChange={(e) => setUserRepeatPw(e.target.value)}
            ></TextField>
          </Grid>
          <Grid item xs={4}></Grid>
          <Grid item xs={4}></Grid>
          <Grid item xs={4}>
            <TextField
              label="Wallet amount"
              fullWidth
              onChange={(e) => setUserWallet(e.target.value)}
            ></TextField>
          </Grid>
          <Grid item xs={4}></Grid>
          <Grid item xs={4}></Grid>
          <Grid item xs={4}>
            <Button fullWidth variant="contained" onClick={handleSignIn}>
              Sign In
            </Button>
          </Grid>
          <Grid item xs={4}></Grid>
          <Grid item xs={4}></Grid>
          <Grid item xs={4}>
            <Typography variant="h6">
              Already have an account? <Link to="/login">click here!</Link>
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
