import Navbar from "../components/common/Navbar";

function Profile() {
    return (
        <>
            <Navbar />

            <div
                style={{
                    minHeight: "90vh",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    fontSize: "32px",
                    fontWeight: "bold"
                }}
            >
                Welcome to your Profile
            </div>
        </>
    );
}

export default Profile;