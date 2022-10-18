import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/UserContext';
import './SignUp.css'


const SignUp = () => {
    const { createUser, signInWithGoogle } = useContext(AuthContext)

    const [error, setError] = useState(null)

    const handleSubmit = event => {
        event.preventDefault()
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        const confirm = form.confirm.value;
        console.log(email, password, confirm)

        if (password.length < 6) {
            setError('Password must be atleast 6 characters or more.')
            return
        }
        if (password !== confirm) {
            setError("Your password didn't match.")
            return
        }

        createUser(email, password)
            .then(result => {
                const user = result.user;
                console.log(user)
                form.reset()
            })
            .catch(error => console.error(error))
    }


    const handleGoogleSignIn = () => {
        signInWithGoogle()
            .then(result => {
                const user = result.user;
                console.log(user)
            })
            .catch(error => console.error(error))
    }

    return (
        <div className='form-container'>
            <h2 className='form-title'>Sign Up</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-control">
                    <label htmlFor="email"> Email :  </label>
                    <input type="email" name="email" required />
                    <label htmlFor="password"> Password : </label>
                    <input type="password" name="password" required />
                    <label htmlFor="confirm"> Confirm Password : </label>
                    <input type="password" name="confirm" required />
                    <p className='error'>{error}</p>
                </div>

                <input className='btn-submit' type="submit" value="Sign Up" />
            </form>
            <p className='create-new'>Already have an Account? <Link to={'/login'}>Login</Link></p>

            <button onClick={handleGoogleSignIn} className='sign-in-with-google'>
                <span>Sign In With Google</span>
            </button>
        </div>

    );
};

export default SignUp;