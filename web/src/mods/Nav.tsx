import { BottomNavigation, BottomNavigationAction, Box } from "@mui/material";
import {
  Home as HomeIcon,
  List,
  Settings,
  ShowChart,
} from "@mui/icons-material";
import { SyntheticEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

export enum ROUTES {
  home = "/",
  workout = "/workout",
  progress = "/progress",
  account = "/account",
}

export function Nav() {
  const { handleChange, activeTab } = useNav();
  return (
    <Box>
      <BottomNavigation
        sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
        value={activeTab}
        onChange={handleChange}
      >
        <BottomNavigationAction
          value={ROUTES.home}
          label="Home"
          icon={<HomeIcon />}
        />
        <BottomNavigationAction
          value={ROUTES.workout}
          label="Workout"
          icon={<List />}
        />
        <BottomNavigationAction
          value={ROUTES.progress}
          label="Progress"
          icon={<ShowChart />}
        />
        <BottomNavigationAction
          value={ROUTES.account}
          label="Account"
          icon={<Settings />}
        />
      </BottomNavigation>
    </Box>
  );
}

function useNav() {
  const [activeTab, setActiveTab] = useState<string>(window.location.pathname);
  const nav = useNavigate();

  function handleChange(_: SyntheticEvent, val: string) {
    nav(val);
    setActiveTab(() => val);
  }

  return { activeTab, handleChange };
}
