import { useNavigate, useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { CartItem } from "../types/CartItem";
import { useState } from "react";
import WelcomeBand from "../components/WelcomeBand";

function DonatePage() {
  const navigate = useNavigate();
  const { projectName, projectId } = useParams();
  const { addToCart } = useCart();
  const [donationAmount, setDonationAmount] = useState<number>(0);

  const handleAddToCart = () => {
    const newItem: CartItem = {
      projectId: Number(projectId),
      projectName: projectName || "No Project Found",
      donationAmount,
    };
    addToCart(newItem);
    navigate("/cart");
  };

  return (
    <>
      <WelcomeBand />
      <h2>Donate to {projectName}</h2>

      <div>
        <input
          type="number"
          placeholder="Enter Donation Amount"
          value={donationAmount}
          onChange={(x) => setDonationAmount(Number(x.target.value))}
        />
        <button onClick={handleAddToCart}>Add to Cart</button>
      </div>

      <button onClick={() => navigate(-1)}>Go Back</button>
    </>
  );
}

export default DonatePage;
