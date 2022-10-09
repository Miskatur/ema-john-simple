import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faStar } from '@fortawesome/free-solid-svg-icons'
import './Product.css'
const Product = (props) => {
    const { handleAddToCart } = props;
    const { name, price, seller, ratings, img } = props.product;
    return (
        <div className='product'>
            <img src={img} alt="" />
            <div className='product-info'>
                <div className='product-main'>
                    <p className='product-name'>{name}</p>
                    <p className='product-price'>Price : ${price}</p>
                </div>
                <div className='product-detail'>
                    <p><small>Manufacturer : {seller}</small></p>

                    <p className='rating'><small>Ratings : {ratings} <FontAwesomeIcon className='faStar' icon={faStar}></FontAwesomeIcon> </small></p>

                </div>

            </div>
            <button onClick={() => handleAddToCart(props.product)} className='btn-cart'>
                <p>Add To Cart</p>
                <FontAwesomeIcon icon={faShoppingCart}></FontAwesomeIcon>
            </button>
        </div>
    );
};

export default Product;