import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import { RiArrowGoBackLine } from "react-icons/ri";

function BackToOverview({ memberId }) {
  const navigate = useNavigate();

  const handleBackToOverview = () => {
    navigate("/");
  };

  return (
    <>
      <Button variant="secondary" onClick={handleBackToOverview}>
        <RiArrowGoBackLine size={25} />
      </Button>
    </>
  );
}

export default BackToOverview;
