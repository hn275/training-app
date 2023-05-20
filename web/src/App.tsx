import { Routes, Route } from "react-router-dom";
import Home from "pages/home/Home.view";
import Workout from "pages/workout/Workout.view";
import Progress from "pages/progress/Progress.view";
import Account from "pages/account/Account.view";
import Login from "pages/auth/Login.view";
import Register from "pages/auth/Register.view";
import { Nav, ROUTES } from "mods/Nav";
import { CssBaseline, createTheme } from "@mui/material";

export default function App() {
  const { pathname } = window.location;
  const isAuthRoute = pathname === "/register" || pathname === "/login";
  return (
    <>
      <CssBaseline />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path={ROUTES.home} element={<Home />} />
        <Route path={ROUTES.workout} element={<Workout />} />
        <Route path={ROUTES.progress} element={<Progress />} />
        <Route path={ROUTES.account} element={<Account />} />
      </Routes>
      {!isAuthRoute && <Nav />}
    </>
  );
}

const theme = createTheme({
  palette: {},
});
