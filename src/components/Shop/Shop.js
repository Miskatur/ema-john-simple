import { faLongArrowAltRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { addToDb, deleteShoppingCart, getStoredCart } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css'

const Shop = () => {
    // const { products, count } = useLoaderData();
    const [products, setProducts] = useState([]);
    const [count, setCount] = useState(0)

    // cart handler 
    const [cart, setCart] = useState([]);
    const [page, setPage] = useState(0)
    const [size, setSize] = useState(10)

    useEffect(() => {
        const url = `http://localhost:5000/products?page=${page}&size=${size}`
        fetch(url)
            .then(res => res.json())
            .then(data => {
                setCount(data.count)
                setProducts(data.products)
            })
    }, [page, size])

    const pages = Math.ceil(count / size);

    useEffect(() => {
        const storedCart = getStoredCart();
        const saveCart = [];
        const ids = Object.keys(storedCart)
        console.log(ids)
        fetch(`http://localhost:5000/productsByIds`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(ids)
        })
            .then(res => res.json())
            .then(data => {
                for (const id in storedCart) {
                    const addedProduct = data.find(product => product._id === id)
                    if (addedProduct) {
                        const quantity = storedCart[id];
                        addedProduct.quantity = quantity;
                        saveCart.push(addedProduct)
                    }
                }
                setCart(saveCart)
            })
    }, [products])

    const handleAddToCart = (selectedProduct) => {
        const existedProduct = cart.find(product => product._id === selectedProduct._id);
        let newCart = []
        if (!existedProduct) {
            selectedProduct.quantity = 1;
            newCart = [...cart, selectedProduct]
        }
        else {
            const rest = cart.filter(product => product._id !== selectedProduct._id)
            existedProduct.quantity = existedProduct.quantity + 1;
            newCart = [...rest, existedProduct]
        }

        setCart(newCart)
        addToDb(selectedProduct._id)
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
                        key={product._id}
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

            {/* Pagination  */}
            <div className="pagination">
                <p>Currently selected Page : {page} which contains {size} products.</p>
                {
                    [...Array(pages).keys()].map(number => <button
                        key={number}
                        onClick={() => setPage(number)}
                        className={page === number ? 'selected' : null}
                    >
                        {number + 1}
                    </button>)
                }
                <select name="" id="" className='dropdown'
                    onChange={event => setSize(event.target.value)}>
                    <option value="5">5</option>
                    <option value="10" defaultValue={10}>10</option>
                    <option value="15">15</option>
                    <option value="20">20</option>
                </select>
            </div>
        </div>
    );
};

export default Shop;