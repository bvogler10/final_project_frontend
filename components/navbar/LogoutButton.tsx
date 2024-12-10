"use client";

// File: LogoutButton.tsx
// Author: Brinja Vogler (bvogler@bu.edu)
// Description: a file for the logout button component

import { resetAuthCookies } from "@/app/lib/actions";
import { Button } from "@/components/ui/button";

export const LogoutButton: React.FC = () => {
  const submitLogout = async () => {
    // call the function to log out (from actions.ts)
    resetAuthCookies();

    // delay refresh
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  return <Button onClick={submitLogout}>Log out</Button>;
};
