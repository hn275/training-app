import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Home from "pages/home/Home.view";
import Workout from "pages/workout/Workout.view";
import Progress from "pages/progress/Progress.view";
import Account from "pages/account/Account.view";
import Login from "pages/auth/Login.view";
import Register from "pages/auth/Register.view";
import { Nav, ROUTES } from "mods/Nav";
import { useAuth } from "mods/context/auth";
import { ReactNode } from "react";

export default function App() {
  const { pathname } = useLocation();
  const atAuth = pathname === ROUTES.login || pathname === ROUTES.register;

  return (
    <>
      <Routes key={pathname}>
        <Route
          index
          path={ROUTES.home}
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path={ROUTES.workout}
          element={
            <PrivateRoute>
              <Workout />
            </PrivateRoute>
          }
        />
        <Route
          path={ROUTES.progress}
          element={
            <PrivateRoute>
              <Progress />
            </PrivateRoute>
          }
        />
        <Route
          path={ROUTES.account}
          element={
            <PrivateRoute>
              <Account />
            </PrivateRoute>
          }
        />

        <Route path="/auth">
          <Route path={ROUTES.login} element={<Login />} />
          <Route path={ROUTES.register} element={<Register />} />
        </Route>
      </Routes>
      {!atAuth && <Nav />}
    </>
  );
}

interface PrivateRouteProp {
  children: ReactNode;
}
function PrivateRoute({ children }: PrivateRouteProp) {
  const { user } = useAuth();
  if (!user) return <Navigate to={ROUTES.login} replace />;
  return <>{children}</>;
}
