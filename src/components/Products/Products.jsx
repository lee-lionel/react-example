import { useMemo, useState } from "react";
import ProductCard from "../ProductCard/ProductCard";
import products from "../../data/cards";
import "./Products.css";

const SORTS = {
    featured: { label: "Featured", compare: null },
    priceLow: { label: "Price: low to high", compare: (a, b) => a.price - b.price },
    priceHigh: { label: "Price: high to low", compare: (a, b) => b.price - a.price },
    name: { label: "Name", compare: (a, b) => a.name.localeCompare(b.name) },
};

const money = (value) =>
    value.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0,
    });

function Products() {
    const [search, setSearch] = useState("");
    const [sort, setSort] = useState("featured");
    const [inStockOnly, setInStockOnly] = useState(false);
    /** id -> how many of it are in the basket. */
    const [basket, setBasket] = useState({});

    const visible = useMemo(() => {
        const term = search.trim().toLowerCase();
        const list = products.filter((product) => {
            if (inStockOnly && product.quantity === 0) return false;
            if (!term) return true;
            return (
                product.name.toLowerCase().includes(term) ||
                product.description.toLowerCase().includes(term)
            );
        });
        const { compare } = SORTS[sort];
        return compare ? [...list].sort(compare) : list;
    }, [search, sort, inStockOnly]);

    const basketCount = Object.values(basket).reduce((sum, n) => sum + n, 0);
    const basketTotal = products.reduce(
        (sum, product) => sum + (basket[product.id] ?? 0) * product.price,
        0,
    );

    /** Never lets the basket exceed what's actually in stock. */
    const addToBasket = (product) =>
        setBasket((current) => {
            const held = current[product.id] ?? 0;
            if (held >= product.quantity) return current;
            return { ...current, [product.id]: held + 1 };
        });

    return (
        <section className="products">
            <header className="products-head">
                <h1 className="products-title">Cards for sale</h1>
                <p className="products-sub">
                    {products.length} singles from the One Piece TCG.
                </p>
            </header>

            <div className="products-controls">
                <label className="search-field">
                    <span className="sr-only">Search cards</span>
                    <svg
                        className="search-icon"
                        viewBox="0 0 24 24"
                        width="17"
                        height="17"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        aria-hidden="true"
                    >
                        <circle cx="11" cy="11" r="7" />
                        <path d="M20 20l-3.5-3.5" />
                    </svg>
                    <input
                        type="search"
                        placeholder="Search by name or set…"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </label>

                <label className="control">
                    <span className="sr-only">Sort by</span>
                    <select value={sort} onChange={(e) => setSort(e.target.value)}>
                        {Object.entries(SORTS).map(([key, { label }]) => (
                            <option key={key} value={key}>
                                {label}
                            </option>
                        ))}
                    </select>
                </label>

                <label className="control checkbox">
                    <input
                        type="checkbox"
                        checked={inStockOnly}
                        onChange={(e) => setInStockOnly(e.target.checked)}
                    />
                    In stock only
                </label>
            </div>

            <p className="products-count" aria-live="polite">
                {visible.length === products.length
                    ? `Showing all ${products.length}`
                    : `${visible.length} of ${products.length}`}
            </p>

            {visible.length > 0 ? (
                <div className="products-grid">
                    {visible.map((product) => (
                        <ProductCard
                            key={product.id}
                            {...product}
                            inBasket={basket[product.id] ?? 0}
                            onAdd={() => addToBasket(product)}
                        />
                    ))}
                </div>
            ) : (
                <div className="products-empty">
                    <p className="empty-title">Nothing matches “{search}”</p>
                    <p className="empty-hint">
                        Try a character name like Luffy, or clear the filters.
                    </p>
                    <button
                        type="button"
                        className="empty-reset"
                        onClick={() => {
                            setSearch("");
                            setInStockOnly(false);
                        }}
                    >
                        Clear filters
                    </button>
                </div>
            )}

            {basketCount > 0 && (
                <div className="basket-bar" role="status">
                    <span className="basket-count">
                        {basketCount} {basketCount === 1 ? "card" : "cards"}
                    </span>
                    <span className="basket-total">{money(basketTotal)}</span>
                    <button
                        type="button"
                        className="basket-clear"
                        onClick={() => setBasket({})}
                    >
                        Clear
                    </button>
                </div>
            )}
        </section>
    );
}

export default Products;
