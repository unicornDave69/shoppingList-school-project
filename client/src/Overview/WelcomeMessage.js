import React from "react";

function WelcomeMessage({ userName }) {
  return (
    <div className="welcome" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
      <h2>Welcome, {userName}!</h2>
    </div>
  );
}

export default WelcomeMessage;
