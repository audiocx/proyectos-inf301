import BetHistory from "../components/BetHistory";
import NavBarAdmin from "../components/NavBarAdmin";
import NavBarUser from "../components/NavBArUser";
import { useUserContext } from "../hooks/UserProvider";

export default function BetHistoryPage() {
  const user = useUserContext();

  return (
    <>
      {user.profileType === "admin" ? (
        <NavBarAdmin></NavBarAdmin>
      ) : (
        <NavBarUser></NavBarUser>
      )}
      <BetHistory></BetHistory>
    </>
  );
}
