import { useEffect } from "react";
import Championship from "../components/Championship";
import Header from "../components/Header";
import { useUserContext } from "../hooks/UserProvider";
import { useNavigate } from "react-router-dom";
import NavBarAdmin from "../components/NavBarAdmin";
import NavBarUser from "../components/NavBArUser";

export default function Home() {
  const user = useUserContext();
  const navigate = useNavigate();

  return (
    <>
      {user.profileType === "admin" ? (
        <NavBarAdmin></NavBarAdmin>
      ) : (
        navigate("/bet")
      )}
      <Championship></Championship>
    </>
  );
}
