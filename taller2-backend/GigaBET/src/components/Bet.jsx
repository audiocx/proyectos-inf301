import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { TextField } from "@mui/material";
import { useState, useEffect } from "react";
import { useUpdateWallet, useUserContext } from "../hooks/UserProvider";
import { useNavigate } from "react-router-dom";

export default function Bet(props) {
  const [txtDisable, setTxtDisable] = useState(false);
  const [bet, setBet] = useState(false);
  const [del, setDel] = useState(true);
  const [amount, setAmount] = useState(0);
  const [editAmount, setEditAmount] = useState(0);

  const user = useUserContext();
  const updateWallet = useUpdateWallet();

  const navigate = useNavigate();

  const handleFetchBet = async () => {
    const requestBody = {
      query: `
        query {
          getBet(nick: "${user.nick}", team: "${props.team}") {
            amount
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
        if (data.data.getBet) {
          setAmount(data.data.getBet.amount);
          setTxtDisable(true);
          setBet(true);
          setDel(false);
        }
      });
  };

  const handleBet = async () => {
    if (amount <= 0) {
      alert("Bet amount must be greater than 0!");
      return;
    }
    const requestBody = {
      query: `
        mutation {
          addBet(nick: "${user.nick}", team: "${props.team}", amount: ${amount}) {
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
        if (data.data.addBet) {
          updateWallet(data.data.addBet.wallet);
          navigate("/bet");
        }
      });
  };

  const handleFetchWallet = async () => {
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

  const handleDeleteBet = async () => {
    const requestBody = {
      query: `
        mutation {
          deleteBet(nick: "${user.nick}", team: "${props.team}") {
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
        if (data.data.deleteBet) {
          updateWallet(data.data.deleteBet.wallet);
          setAmount(0);
          setBet(false);
          setDel(true);
          setTxtDisable(false);
          navigate("/bet");
        }
      });
  };

  useEffect(() => {
    handleFetchBet();
  });

  return (
    <Card>
      <CardContent>
        <Typography variant="h5">Team: {props.team}</Typography>
        <br></br>
        <TextField
          value={amount}
          label={amount > 0 ? "" : "Bet"}
          disabled={txtDisable}
          fullWidth
          onChange={(e) => setAmount(e.target.value)}
        ></TextField>
      </CardContent>
      <CardActions>
        <Button
          fullWidth
          variant="contained"
          disabled={bet}
          onClick={handleBet}
        >
          Bet
        </Button>
        <Button
          fullWidth
          variant="contained"
          color="error"
          disabled={del}
          onClick={handleDeleteBet}
        >
          Delete
        </Button>
      </CardActions>
    </Card>
  );
}
