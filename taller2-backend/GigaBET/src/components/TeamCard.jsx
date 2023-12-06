import * as React from "react";
import { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export default function TeamCard(props) {
  const [teamName, setTeamName] = useState("");
  const [teamPoints, setTeamPoints] = useState(0);
  const [edit, setEdit] = useState(false);
  const [newName, setNewName] = useState("");
  const [newPoints, setNewPoints] = useState(0);

  const handleFetchTeamInfo = async () => {
    const requestBody = {
      query: `
        query {
          getTeam(position: ${props.position}) {
            name
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
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setTeamName(data.data.getTeam.name);
        setNewName(data.data.getTeam.name);
        if (props.round === 1) {
          setTeamPoints(data.data.getTeam.round1);
          setNewPoints(data.data.getTeam.round1);
        }
        if (props.round === 2) {
          setTeamPoints(data.data.getTeam.round2);
          setNewPoints(data.data.getTeam.round2);
        }
        if (props.round === 3) {
          setTeamPoints(data.data.getTeam.round3);
          setNewPoints(data.data.getTeam.round3);
        }
      });
  };

  const handleEdit = async (e) => {
    const requestBody = {
      query: `
        mutation {
          updateTeam(name: "${teamName}", newName: "${newName}", round${props.round}: ${newPoints}) {
            name
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
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setTeamName(data.data.updateTeam.name);
        setNewName(data.data.updateTeam.name);
        if (props.round === 1) {
          setTeamPoints(data.data.updateTeam.round1);
          setNewPoints(data.data.updateTeam.round1);
        }
        if (props.round === 2) {
          setTeamPoints(data.data.updateTeam.round2);
          setNewPoints(data.data.updateTeam.round2);
        }
        if (props.round === 3) {
          setTeamPoints(data.data.updateTeam.round3);
          setNewPoints(data.data.updateTeam.round3);
        }
      });
    handleFetchTeamInfo();
    setEdit(false);
  };

  useEffect(() => {
    handleFetchTeamInfo();
  }, []);

  const normal = (
    <Button variant="contained" color="secondary" onClick={() => setEdit(true)}>
      {teamName} ({teamPoints})
    </Button>
  );

  const editMode = (
    <>
      <TextField
        id="teamname"
        variant="outlined"
        defaultValue={teamName}
        onChange={(e) => setNewName(e.target.value)}
      />
      <TextField
        id="teampoints"
        variant="outlined"
        defaultValue={teamPoints}
        onChange={(e) => setNewPoints(e.target.value)}
      />
      <Button variant="contained" onClick={handleEdit} fullWidth>
        Hecho
      </Button>
    </>
  );
  return edit ? editMode : normal;
}
