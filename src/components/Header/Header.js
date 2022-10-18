import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/UserContext';

import logo from '../../images/Logo.svg'
import './Header.css'

const Header = () => {

    const { user, userSignOut } = useContext(AuthContext)

    // const handleSignOut = () => {
    //     ()
    //         .then(result => { })
    //         .catch(error => console.error(error))
    // }

    return (
        <nav className='header-nav'>
            <img src={logo} alt="" />
            <div>
                <Link to="/">Shop</Link>
                <Link to="/orders">Orders</Link>
                <Link to="/inventory">Inventory</Link>
                <Link to="/about">About</Link>
                {user?.uid ?
                    <Link onClick={userSignOut}>Log Out</Link> :
                    <>
                        <Link to="/login">Log In</Link>
                        <Link to="/signup">Sign Up</Link>
                    </>
                }

                {/* {
                    user?.uid && <Link> <span onClick={handleSignOut}>Log Out</span></Link>
                } */}
            </div>

        </nav>
    );
};

export default Header;