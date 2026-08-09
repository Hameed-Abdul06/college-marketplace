import "../styles/Home.css";
import Navbar from "../components/common/Navbar";
import { useNavigate } from "react-router-dom";

function Home() {
    const navigate = useNavigate();

    return (
        <>
            <Navbar />

            <main className="home">
                <h1>Welcome to College Marketplace</h1>

                <p>
                    Buy, Sell, and Discover Everything You Need on Campus.
                </p>

                <div className="hero-buttons">
                    <button className="primary-btn" onClick={() => navigate("/products")}>
                        Browse Products
                    </button>

                    <button className="secondary-btn" onClick={() => navigate("/sell")}>
                        Sell Product
                    </button>
                </div>


            </main>
        </>
    );
}

export default Home;