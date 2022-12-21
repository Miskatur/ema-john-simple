import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'
import React from 'react';
import './ReviewItem.css'

const ReviewItem = ({ product, handleRemoveItem }) => {
    const { _id, name, img, price, quantity, shipping } = product;


    return (
        <div className='review-product'>
            <div className='review-main'>
                <div>
                    <img className='product-image' src={img} alt="" />
                </div>
                <div className='product-text'>
                    <p className='product-name'>{name}</p>
                    <p><small>Price : ${price}</small></p>
                    <p><small>Shipping : ${shipping}</small></p>
                    <p><small>Quantity : ${quantity}</small></p>

                </div>
            </div>
            <div className='delete-container'>
                <button className='btn-delete' onClick={() => handleRemoveItem(_id)}>
                    <FontAwesomeIcon className='faTrashCan' icon={faTrashCan}></FontAwesomeIcon>
                </button>
            </div>

        </div>
    );
};

export default ReviewItem;