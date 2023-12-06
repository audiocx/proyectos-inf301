import * as React from "react";
import Grid from "@mui/material/Grid";
import { Container, Button } from "@mui/material";
import TeamCard from "./TeamCard";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Championship() {
  const final = [27];

  const vertConnector = [22, 66, 32, 76, 35, 46, 57, 41, 52, 63];
  const horConnector = [23, 67, 47, 31, 75, 51];
  const finalHorConnector = 49;
  const finalVertConnector = 38;

  const [winner1, setWinner1] = useState(null);
  const [winner2, setWinner2] = useState(null);
  const [winner3, setWinner3] = useState(null);
  const [winner4, setWinner4] = useState(null);
  const [winner5, setWinner5] = useState(null);
  const [winner6, setWinner6] = useState(null);
  const [winner7, setWinner7] = useState(null);

  const navigate = useNavigate();

  const handleFetchWinner = async (match) => {
    const requestBody = {
      query: `
        query {
          checkWinner(match: ${match}) {
            name
            position
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
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (match === 1) {
          setWinner1(data.data.checkWinner);
        }
        if (match === 2) {
          setWinner2(data.data.checkWinner);
        }
        if (match === 3) {
          setWinner3(data.data.checkWinner);
        }
        if (match === 4) {
          setWinner4(data.data.checkWinner);
        }
        if (match === 5) {
          setWinner5(data.data.checkWinner);
        }
        if (match === 6) {
          setWinner6(data.data.checkWinner);
        }
        if (match === 7) {
          setWinner7(data.data.checkWinner);
        }
      });
  };

  const handleClear = async () => {
    const requestBody = {
      query: `
        mutation {
          clearPoints
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
        if (data.data.clearPoints) {
          setWinner1(null);
          setWinner2(null);
          setWinner3(null);
          setWinner4(null);
          setWinner5(null);
          setWinner6(null);
          setWinner7(null);
          navigate("/");
        }
      });
  };

  const handleDeliverPrizes = async () => {
    const requestBody = {
      query: `
        mutation {
          updateWallets(team: "${winner7.name}")
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
      .then((data) => {});
  };

  useEffect(() => {}, []);

  return (
    <Container>
      <Grid container spacing={3}>
        {[...Array(99)].map((e, i) => {
          if (i % 11 === 5) {
            if (final.includes(i)) {
              if (winner7 != null) {
                return (
                  <Grid item xs={2} alignItems={"center"}>
                    <Button
                      variant="contained"
                      color="success"
                      fullWidth
                      onClick={() => handleFetchWinner(7)}
                    >
                      {winner7.name}
                    </Button>
                  </Grid>
                );
              }
              return (
                <Grid item xs={2}>
                  <Button
                    fullWidth
                    variant="contained"
                    color="success"
                    onClick={() => handleFetchWinner(7)}
                  >
                    -
                  </Button>
                </Grid>
              );
            }
            if (i === finalHorConnector) {
              return (
                <Grid item xs={2} textAlign={"center"}>
                  ------------------------------
                </Grid>
              );
            }
            if (i === finalVertConnector) {
              return (
                <Grid item xs={2} textAlign={"center"}>
                  |
                </Grid>
              );
            }
            if (i === 71) {
              return (
                <Grid item xs={2} textAlign={"center"}>
                  <Button
                    variant="contained"
                    fullWidth
                    disabled={winner7 === null}
                    onClick={handleDeliverPrizes}
                  >
                    Deliver prizes
                  </Button>
                </Grid>
              );
            }
            if (i === 82) {
              return (
                <Grid item xs={2} textAlign={"center"}>
                  <Button variant="contained" fullWidth onClick={handleClear}>
                    Clear
                  </Button>
                </Grid>
              );
            }
            return <Grid item xs={2}></Grid>;
          } else {
            switch (i) {
              case 11: // pos 0
                return (
                  <Grid item xs={1}>
                    <TeamCard position={0} round={1}></TeamCard>
                  </Grid>
                );
              case 33: // pos 1
                return (
                  <Grid item xs={1}>
                    <TeamCard position={1} round={1}></TeamCard>
                  </Grid>
                );
              case 55: // pos 2
                return (
                  <Grid item xs={1}>
                    <TeamCard position={2} round={1}></TeamCard>
                  </Grid>
                );
              case 77: // pos 3
                return (
                  <Grid item xs={1}>
                    <TeamCard position={3} round={1}></TeamCard>
                  </Grid>
                );
              case 21: // pos 4
                return (
                  <Grid item xs={1}>
                    <TeamCard position={4} round={1}></TeamCard>
                  </Grid>
                );
              case 43: // pos 5
                return (
                  <Grid item xs={1}>
                    <TeamCard position={5} round={1}></TeamCard>
                  </Grid>
                );
              case 65: // pos 6
                return (
                  <Grid item xs={1}>
                    <TeamCard position={6} round={1}></TeamCard>
                  </Grid>
                );
              case 87: // pos 7
                return (
                  <Grid item xs={1}>
                    <TeamCard position={7} round={1}></TeamCard>
                  </Grid>
                );
              case 24: // winner match 1
                if (winner1 != null) {
                  return (
                    <Grid item xs={1}>
                      <TeamCard
                        position={winner1.position}
                        round={2}
                      ></TeamCard>
                    </Grid>
                  );
                }
                return (
                  <Grid item xs={1}>
                    <Button
                      variant="contained"
                      fullWidth
                      color="success"
                      onClick={() => handleFetchWinner(1)}
                    >
                      -
                    </Button>
                  </Grid>
                );
              case 68: // winner match 2
                if (winner2 != null) {
                  return (
                    <Grid item xs={1}>
                      <TeamCard
                        position={winner2.position}
                        round={2}
                      ></TeamCard>
                    </Grid>
                  );
                }
                return (
                  <Grid item xs={1}>
                    <Button
                      variant="contained"
                      fullWidth
                      color="success"
                      onClick={() => handleFetchWinner(2)}
                    >
                      -
                    </Button>
                  </Grid>
                );
              case 30: // winner match 3
                if (winner3 != null) {
                  return (
                    <Grid item xs={1}>
                      <TeamCard
                        position={winner3.position}
                        round={2}
                      ></TeamCard>
                    </Grid>
                  );
                }
                return (
                  <Grid item xs={1}>
                    <Button
                      variant="contained"
                      fullWidth
                      color="success"
                      onClick={() => handleFetchWinner(3)}
                    >
                      -
                    </Button>
                  </Grid>
                );
              case 74: // winner match 4
                if (winner4 != null) {
                  return (
                    <Grid item xs={1}>
                      <TeamCard
                        position={winner4.position}
                        round={2}
                      ></TeamCard>
                    </Grid>
                  );
                }
                return (
                  <Grid item xs={1}>
                    <Button
                      variant="contained"
                      fullWidth
                      color="success"
                      onClick={() => handleFetchWinner(4)}
                    >
                      -
                    </Button>
                  </Grid>
                );
              case 48: // winner match 5
                if (winner5 != null) {
                  return (
                    <Grid item xs={1}>
                      <TeamCard
                        position={winner5.position}
                        round={3}
                      ></TeamCard>
                    </Grid>
                  );
                }
                return (
                  <Grid item xs={1}>
                    <Button
                      variant="contained"
                      fullWidth
                      color="success"
                      onClick={() => handleFetchWinner(5)}
                    >
                      -
                    </Button>
                  </Grid>
                );
              case 50: // winner match 6
                if (winner6 != null) {
                  return (
                    <Grid item xs={1}>
                      <TeamCard
                        position={winner6.position}
                        round={3}
                      ></TeamCard>
                    </Grid>
                  );
                }
                return (
                  <Grid item xs={1}>
                    <Button
                      variant="contained"
                      fullWidth
                      color="success"
                      onClick={() => handleFetchWinner(6)}
                    >
                      -
                    </Button>
                  </Grid>
                );
              default:
                break;
            }

            if (vertConnector.includes(i)) {
              return (
                <Grid item xs={1} textAlign={"center"}>
                  |
                </Grid>
              );
            }
            if (horConnector.includes(i)) {
              return (
                <Grid item xs={1}>
                  ------------
                </Grid>
              );
            }

            return <Grid item xs={1}></Grid>;
          }
        })}
      </Grid>
    </Container>
  );
}
