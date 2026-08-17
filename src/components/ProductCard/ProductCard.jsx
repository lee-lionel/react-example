import { useState } from "react"
import "./ProductCard.css"

/** Currency, with separators — $10000 is hard to read at a glance. */
const money = (value) =>
    value.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0,
    })

/** Stock as a state, not a raw number: the shopper wants "can I buy it?". */
function stockState(quantity) {
    if (quantity === 0) return { label: "Sold out", tone: "gone" }
    if (quantity <= 2) return { label: `Only ${quantity} left`, tone: "low" }
    return { label: `${quantity} in stock`, tone: "ok" }
}

function ProductCard({
    name,
    price,
    image,
    description,
    quantity,
    isOnSale,
    inBasket = 0,
    onAdd,
}) {
    const [imageFailed, setImageFailed] = useState(false)
    const isOutOfStock = quantity === 0
    const stock = stockState(quantity)
    const remaining = quantity - inBasket
    const canAdd = remaining > 0

    return (
        <article className={`product-card${isOutOfStock ? " is-gone" : ""}`}>
            <div className="image-container">
                {imageFailed ? (
                    // The art is the product, so a missing file should still
                    // say what the listing is rather than show a broken icon.
                    <p className="image-missing">{name}</p>
                ) : (
                    <img
                        src={image}
                        alt={`${name} — ${description}`}
                        loading="lazy"
                        onError={() => setImageFailed(true)}
                        className={isOutOfStock ? "sold-out" : ""}
                    />
                )}

                {isOnSale && !isOutOfStock && <span className="sale-banner">Sale</span>}
                {isOutOfStock && <span className="out-of-stock">Sold out</span>}
            </div>

            <div className="product-body">
                <h3 className="product-name">{name}</h3>
                <p className="product-desc">{description}</p>
            </div>

            <div className="product-foot">
                <div className="product-price-row">
                    <span className="product-price">{money(price)}</span>
                    <span className={`stock-chip stock-${stock.tone}`}>{stock.label}</span>
                </div>

                <button
                    type="button"
                    className="add-button"
                    disabled={!canAdd}
                    onClick={() => onAdd?.()}
                >
                    {isOutOfStock
                        ? "Sold out"
                        : !canAdd
                          ? "All in basket"
                          : inBasket > 0
                            ? `In basket (${inBasket})`
                            : "Add to basket"}
                </button>
            </div>
        </article>
    )
}

export default ProductCard
