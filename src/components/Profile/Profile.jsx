import "./Profile.css";

import snorlaxPic from "../../assets/snorlax.png";

function Profile() {
    return (
        <section className="ProfileCard">
            <div className="ProfileImage">
                <img
                    className="ProfilePic"
                    src={snorlaxPic}
                    alt="Lionel"
                />
            </div>

            <div className="ProfileInfo">
                <p className="intro">HELLO!</p>

                <h1>
                    I'm <span>Lionel</span>
                </h1>

                <p className="description">
                    Future IT professional by day, professional button masher by night.
                    Constantly grinding experience points in coding, gaming, and life.
                </p>

            </div>
        </section>
    );
}

export default Profile;