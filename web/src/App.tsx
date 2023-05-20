import { Routes, Route } from "react-router-dom";
import Home from "pages/home/Home.view";
import Workout from "pages/workout/Workout.view";
import Progress from "pages/progress/Progress.view";
import Account from "pages/account/Account.view";
import { Nav, ROUTES } from "mods/Nav";
import { CssBaseline } from "@mui/material";

export default function App() {
  return (
    <>
      <CssBaseline />
      <Routes>
        <Route path={ROUTES.home} element={<Home />} />
        <Route path={ROUTES.workout} element={<Workout />} />
        <Route path={ROUTES.progress} element={<Progress />} />
        <Route path={ROUTES.account} element={<Account />} />
      </Routes>
      <Nav />
    </>
  );
}
