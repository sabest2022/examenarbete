import React from 'react';

const ProductList = () => {
    // Placeholder products array
    const products = [
        { id: 1, name: 'Product 1', price: '$100' },
        { id: 2, name: 'Product 2', price: '$200' }
        // Add more products here
    ];

    return (
        <div>
            <h2>Products</h2>
            <ul>
                {products.map(product => (
                    <li key={product.id}>
                        {product.name} - {product.price}
                        <button>Edit</button>
                        <button>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ProductList;
