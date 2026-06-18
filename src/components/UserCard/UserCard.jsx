import './UserCard.css'

function UserCard({
    name,
    stars,
    review,
}) {
    return (
        <div className="Card-container">

            <p>Name: {name}</p>

            <p>
                {"⭐".repeat(stars)}
            </p>

            <p>{review}</p>
        </div>
    );
}

export default UserCard;