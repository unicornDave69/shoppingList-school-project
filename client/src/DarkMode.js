import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";

const DarkMode = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const body = document.body;
    if (isDarkMode) {
      body.classList.add("dark-mode");
    } else {
      body.classList.remove("dark-mode");
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  return (
    <div className="text-center mt-3">
      <Button variant={isDarkMode ? "light" : "dark"} onClick={toggleDarkMode}>
        {isDarkMode ? "Světlý režim" : "Tmavý režim"}
      </Button>
    </div>
  );
};

export default DarkMode;
