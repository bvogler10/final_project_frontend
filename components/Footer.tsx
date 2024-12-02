"use client";

import { FC } from "react";

export const Footer: FC = () => {
  return (
    <footer className="border-t">
      <div className="container mx-auto px-4 py-6 flex justify-between items-center">
        <p className="text-sm text-muted-foreground">
          © 2023 CrochetKnitSocial. All rights reserved.
        </p>
        <nav className="flex space-x-4">
          <a
            href="#"
            className="text-sm text-muted-foreground hover:text-primary"
          >
            About
          </a>
          <a
            href="#"
            className="text-sm text-muted-foreground hover:text-primary"
          >
            Privacy
          </a>
          <a
            href="#"
            className="text-sm text-muted-foreground hover:text-primary"
          >
            Terms
          </a>
        </nav>
      </div>
    </footer>
  );
};
