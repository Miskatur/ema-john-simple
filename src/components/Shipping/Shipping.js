import React from 'react';
import './Shipping.css'

const Shipping = () => {
    const key = `sk_test_51M6dSAIBhZ31yizUEfjGe8EsZuPQZV0XRl2McMkVd4vPt82byhqmIqyyng2DV6pwo2XgauGKB1mgSxV9FU7vyzC400S0WjyZ6O`
    const total = localStorage.getItem('total')
    return (
        <div>
            <h1 className='heading'>Your total Payment is {total}$</h1>
        </div>

    );
};

export default Shipping; 