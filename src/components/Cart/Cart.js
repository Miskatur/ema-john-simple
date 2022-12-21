import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import './Cart.css'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'


const Cart = ({ cart, clearFromCartHandler, children, setGrandTotal }) => {
    // console.log(cart)
    let total = 0;
    let shipping = 0;
    let quantity = 0;
    for (const product of cart) {
        quantity = quantity + product.quantity;
        total = total + product.price * product.quantity;
        shipping = shipping + product.shipping;
    }
    const tax = parseFloat((total * 0.1).toFixed(2));
    const grandTotal = total + shipping + tax;
    localStorage.setItem('total', grandTotal)

    return (
        <div className='cart'>
            <h3 className='cart-header'>Order Summary</h3>
            <div className='cart-details'>
                <p>Selected Items : {quantity}</p>
                <p>Total Price : ${total} </p>
                <p>Total Shipping Charge : ${shipping} </p>
                <p>Tax : ${tax} </p>
                <h4>Grand Total : ${grandTotal.toFixed(2)} </h4>
            </div>

            <button className='btn-clear' onClick={() => clearFromCartHandler()}>
                <span>Clear Cart </span>
                <span><FontAwesomeIcon icon={faTrashCan}></FontAwesomeIcon></span>
            </button>
            {/* <button className='btn-checkout'>
                <span>Review Orders </span>
                <span><FontAwesomeIcon icon={faCreditCard}></FontAwesomeIcon></span>
            </button> */}

            {
                children
            }

        </div>
    );
};

export default Cart;