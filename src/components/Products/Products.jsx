import ProductCard from "../ProductCard/ProductCard";
import products from "../../data/cards";
import "./Products.css";
import { useState } from "react";

function Projects() {
    const [search, setSearch] = useState("");

    const filteredProducts = products.filter((product) => {
        if (search === "") return true;

        return (
            product.name.toLowerCase().includes(search.toLowerCase()) ||
            product.description.toLowerCase().includes(search.toLowerCase())
        );
    });

    return (
        <>
            <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            <div className="products-grid">
                {filteredProducts.length > 0 ? (
                    filteredProducts.map((product) => (
                        <ProductCard key={product.id} {...product} />
                    ))
                ) : (
                    <p>No products found</p>
                )}
            </div>
        </>
    );
}

export default Projects;