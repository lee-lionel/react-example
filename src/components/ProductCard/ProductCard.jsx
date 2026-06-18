import "./ProductCard.css"

function ProductCard({
    name,
    price,
    image,
    description,
    quantity,
    isOnSale
}) {
    const isOutOfStock = quantity === 0;

    return (
        <div className="product-card">
            <div className="image-container">
                <img
                    src={image}
                    alt={name}
                    className={isOutOfStock ? "sold-out" : ""}
                />

                {isOnSale && (
                    <div className="sale-banner">SALE</div>
                )}

                {isOutOfStock && (
                    <div className="out-of-stock">SOLD OUT</div>
                )}
            </div>

            <h3>{name}</h3>
            <p>${price}</p>
            <p>{description}</p>
            <p>Stock: {quantity}</p>
        </div>
    );
}

export default ProductCard