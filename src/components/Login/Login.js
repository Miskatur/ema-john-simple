import React, { useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/UserContext';
import './Login.css'

const Login = () => {

    const { userSignIn, signInWithGoogle } = useContext(AuthContext)
    const navigate = useNavigate()
    const location = useLocation()
    const from = location.state?.from?.pathname || '/';


    const handleSubmit = (event) => {
        event.preventDefault()
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password)

        userSignIn(email, password)
            .then(result => {
                const user = result.user;
                console.log(user)
                form.reset()
                navigate(from, { replace: true })
            })
            .catch(error => {
                console.error(error)
            })
    }

    const handleGoogleSignIn = () => {
        signInWithGoogle()
            .then(result => {
                const user = result.user;
                console.log(user)
                navigate(from, { replace: true })

            })
            .catch(error => console.error(error))
    }

    return (
        <div className='form-containers'>
            <h2 className='form-title'>Login</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-control">
                    <label htmlFor="email"> Email :  </label>
                    <input type="email" name="email" required />
                    <label htmlFor="password"> Password : </label>
                    <input type="password" name="password" required />
                </div>
                <input className='btn-submit' type="submit" value="Login" />
            </form>
            <p className='create-new'>New to Ema-john? <Link to={'/signup'}>Create New Account</Link></p>

            <button onClick={handleGoogleSignIn} className='sign-in-with-google'>
                Sign In With Google
            </button>
        </div>
    );
};

export default Login;