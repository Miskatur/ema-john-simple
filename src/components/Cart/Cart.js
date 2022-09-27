import React from 'react';

const Cart = (props) => {
    return (
        <div>
            <h3 style={{ textAlign: 'center', paddingBottom: '30px' }}>Order Summary</h3>
            <p>Selected Items : {props.cart.length}</p>
        </div>
    );
};

export default Cart;