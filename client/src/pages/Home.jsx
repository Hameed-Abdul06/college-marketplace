import "../styles/Home.css";
import Navbar from "../components/common/Navbar";

function Home() {
    return (
        <>
            <Navbar />

            <main className="home">
                <h1>Welcome to College Marketplace</h1>

                <p>
                    Buy, Sell, and Discover Everything You Need on Campus.
                </p>

                <div className="hero-buttons">
                    <button className="primary-btn">
                        Browse Products
                    </button>

                    <button className="secondary-btn">
                        Sell Product
                    </button>
                </div>


            </main>
        </>
    );
}

export default Home;