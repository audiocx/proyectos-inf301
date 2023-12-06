import Header from "../components/Header";
import { useState, useEffect } from "react";
import { Container, Grid, Typography } from "@mui/material";
import { useUpdateWallet, useUserContext } from "../hooks/UserProvider";
import Bet from "../components/Bet";
import NavBarAdmin from "../components/NavBarAdmin";
import NavBarUser from "../components/NavBArUser";

export default function BetPage() {
  const user = useUserContext();
  const updateWallet = useUpdateWallet();

  const [teams, setTeams] = useState(null);

  const handleFetchTeams = async () => {
    const requestBody = {
      query: `
        query {
          getTeams {
            name
            position
            round1
            round2
            round3
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
        if (data) {
          setTeams(data.data.getTeams);
        }
      });
  };

  const handleUpdateWallet = async () => {
    const requestBody = {
      query: `
        query {
          findUser(nick: "${user.nick}") {
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
        if (data.data.findUser) {
          updateWallet(data.data.findUser.wallet);
        }
      });
  };

  useEffect(() => {
    handleFetchTeams();
    handleUpdateWallet();
  }, []);

  return (
    <>
      {user.profileType === "admin" ? (
        <NavBarAdmin></NavBarAdmin>
      ) : (
        <NavBarUser></NavBarUser>
      )}
      <Container>
        <Grid container spacing={3}>
          <Grid item xs={12}></Grid>
          <Grid item xs={12}>
            <Typography variant="h5" align="center">
              Wallet: {user && user.wallet}
            </Typography>
          </Grid>

          {teams &&
            teams.map((team) => {
              return (
                <Grid item xs={3} alignItems={"center"}>
                  <Bet team={team.name}></Bet>
                </Grid>
              );
            })}
        </Grid>
      </Container>
    </>
  );
}
