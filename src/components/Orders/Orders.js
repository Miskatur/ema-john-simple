import { faLongArrowAltRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import { deleteShoppingCart, removeFromDb } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import ReviewItem from '../ReviewItem/ReviewItem';

const Orders = () => {
    const { initialCart } = useLoaderData()
    const [cart, setCart] = useState(initialCart)
    const [grandTotal, setGrandTotal] = useState(0)

    const handleRemoveItem = id => {
        const remaining = cart.filter(product => product._id !== id);
        setCart(remaining)
        removeFromDb(id)
    }

    const clearFromCartHandler = () => {
        setCart([])
        deleteShoppingCart()
    }
    return (
        <div className='shop-container'>
            <div className='product-container'>
                {
                    cart.map(product => <ReviewItem
                        key={product._id}
                        product={product}
                        handleRemoveItem={handleRemoveItem}
                        setGrandTotal={setGrandTotal}
                    ></ReviewItem>)
                }
            </div>
            <div className='cart-container'>
                <Cart
                    clearFromCartHandler={clearFromCartHandler}
                    cart={cart}
                    grandTotal={grandTotal}>
                    <Link to={"/shipping"}>
                        <button className='btn-review'>
                            <span>Proceed Shipping </span>
                            <span><FontAwesomeIcon icon={faLongArrowAltRight}></FontAwesomeIcon></span>
                        </button>
                    </Link>
                </Cart>
            </div>

        </div>

    );
};

export default Orders;