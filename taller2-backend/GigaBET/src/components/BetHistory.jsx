import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  RadioGroup,
  Radio,
  Grid,
} from "@mui/material";
import { useUserContext } from "../hooks/UserProvider";
import { useState, useEffect } from "react";

export default function BetHistory() {
  const user = useUserContext();

  const [bets, setBets] = useState(null);
  const [betsFiltered, setBetsFiltered] = useState(null);
  const [selected, setSelected] = useState("all");

  const handleFetchBets = async () => {
    const requestBody = {
      query: `
        query {
          getBets(nick: "${user.nick}") {
            team
            amount
            ts
            result
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
        if (data.data.getBets) {
          setBets(data.data.getBets);
          setBetsFiltered(data.data.getBets);
        }
      });
  };

  const handleSelected = (e) => {
    setSelected(e.target.value);
    if (e.target.value === "all") {
      setBetsFiltered(bets);
    } else {
      setBetsFiltered(bets.filter((bet) => bet.result === e.target.value));
    }
  };

  const tsToDate = (ts) => {
    const date = new Date(ts);
    return date.toString();
  };

  useEffect(() => {
    handleFetchBets();
  }, []);

  return (
    <>
      <Grid container spacing={0}>
        <Grid item xs={4}></Grid>
        <Grid item xs={6}>
          <FormControl>
            <FormLabel id="demo-row-radio-buttons-group-label">
              Filter bets
            </FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
              value={selected}
            >
              <FormControlLabel
                value="all"
                control={<Radio />}
                label="All"
                onChange={handleSelected}
              />
              <FormControlLabel
                value="pending"
                control={<Radio />}
                label="Pending"
                onChange={handleSelected}
              />
              <FormControlLabel
                value="won"
                control={<Radio />}
                label="Won"
                onChange={handleSelected}
              />
              <FormControlLabel
                value="lost"
                control={<Radio />}
                label="Lost"
                onChange={handleSelected}
              />
            </RadioGroup>
          </FormControl>
        </Grid>
      </Grid>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Team</TableCell>
              <TableCell align="right">Amount</TableCell>
              <TableCell align="right">Result</TableCell>
              <TableCell align="right">Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {betsFiltered &&
              betsFiltered.map((row) => (
                <TableRow
                  key={row.ts}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.team}
                  </TableCell>
                  <TableCell align="right">{row.amount}</TableCell>
                  <TableCell align="right">{row.result}</TableCell>
                  <TableCell align="right">{tsToDate(row.ts)}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
