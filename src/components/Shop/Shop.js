import { faLongArrowAltRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import { addToDb, deleteShoppingCart, getStoredCart } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css'

const Shop = () => {
    const products = useLoaderData();
    // const [products, setProducts] = useState([]);
    // useEffect(() => {
    //     fetch('products.json')
    //         .then(res => res.json())
    //         .then(data => setProducts(data))
    // }, [])

    // cart handler 
    const [cart, setCart] = useState([])
    useEffect(() => {
        const storedCart = getStoredCart();
        const saveCart = [];
        for (const id in storedCart) {
            const addedProduct = products.find(product => product.id === id)
            if (addedProduct) {
                const quantity = storedCart[id];
                addedProduct.quantity = quantity;
                saveCart.push(addedProduct)
            }
        }
        setCart(saveCart)
    }, [products])

    const handleAddToCart = (selectedProduct) => {
        const existedProduct = cart.find(product => product.id === selectedProduct.id);
        let newCart = []
        if (!existedProduct) {
            selectedProduct.quantity = 1;
            newCart = [...cart, selectedProduct]
        }
        else {
            const rest = cart.filter(product => product.id !== selectedProduct.id)
            existedProduct.quantity = existedProduct.quantity + 1;
            newCart = [...rest, existedProduct]
        }

        setCart(newCart)
        addToDb(selectedProduct.id)
    }

    const clearFromCartHandler = () => {
        setCart([])
        deleteShoppingCart()
    }

    return (
        <div className='shop-container'>
            {/* products Container Component  */}
            <div className='products-container'>
                {
                    products.map(product => <Product
                        product={product}
                        key={product.id}
                        handleAddToCart={handleAddToCart}
                    ></Product>)
                }
            </div>
            {/* Cart Container Component  */}
            <div className='cart-container'>
                <Cart
                    cart={cart}
                    clearFromCartHandler={clearFromCartHandler}
                >
                    <Link to={"/orders"}>
                        <button className='btn-review'>
                            <span>Review Orders </span>
                            <span><FontAwesomeIcon icon={faLongArrowAltRight}></FontAwesomeIcon></span>
                        </button>
                    </Link>
                </Cart>
            </div>
        </div>
    );
};

export default Shop;