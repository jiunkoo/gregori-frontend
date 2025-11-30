import { Navigate } from "react-router-dom";

const Home = () => {
  return <Navigate to="/products?category=digital" replace />;
};

export default Home;
