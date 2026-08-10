import "../styles/Home.css";
import { useNavigate } from "react-router-dom";

function Home() {
    const navigate = useNavigate();

    return (
        <main className="home">

            {/* Background Video */}
            <video
                className="home-video"
                autoPlay
                muted
                loop
                playsInline
            >
                <source
                    src="/videos/marketplace.mp4"
                    type="video/mp4"
                />
            </video>

            {/* Dark Overlay */}
            <div className="video-overlay"></div>

            {/* Home Content */}
            <div className="hero-content">

                <div className="hero-badge">
                    🎓 Your Campus Marketplace
                </div>

                <h1>
                    Welcome to
                    <span>College Marketplace</span>
                </h1>

                <p>
                    Buy, sell, and discover everything you need on campus.
                    Find great deals from fellow students and make campus
                    life easier.
                </p>

                <div className="hero-buttons">

                    <button
                        className="primary-btn"
                        onClick={() => navigate("/products")}
                    >
                        Browse Products
                    </button>

                    <button
                        className="secondary-btn"
                        onClick={() => navigate("/sell")}
                    >
                        Sell Product
                    </button>

                </div>

            </div>

        </main>
    );
}

export default Home;