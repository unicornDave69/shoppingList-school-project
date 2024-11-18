import React, { useContext, useState } from "react";
import { DetailContext } from "../Providers/DetailProvider";
import Button from "react-bootstrap/Button";

function ResolveItemButton({ itemId }) {
  const { handlerMap } = useContext(DetailContext);
  const [isBlocked, setIsBlocked] = useState(false);

  const handleResolveItem = () => {
    setIsBlocked(true);
    handlerMap.resolveItem({ itemId });
  };

  return (
    <div
      style={{
        opacity: isBlocked ? 0.5 : 1,
        pointerEvents: isBlocked ? "none" : "auto",
      }}
    >
      <Button
        variant="primary"
        onClick={handleResolveItem}
        disabled={isBlocked}
      >
        Resolve
      </Button>
    </div>
  );
}

export default ResolveItemButton;
