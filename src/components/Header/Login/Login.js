import React, { useState } from 'react';
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from '../../../firebase.config';
import './Login.css'

firebase.initializeApp(firebaseConfig);

const Login = () => {
    const [newUser, setNewUser] = useState(false);
    const [user, setUser] = useState({
        isSignedIn: false,
        name: '',
        email: '',
        photo: '',
    });
    const provider = new firebase.auth.GoogleAuthProvider();
    const handleSignIn = () => {
        firebase.auth().signInWithPopup(provider)
        .then(res => {
            const {displayName, photoUrl, email} = res.user;
            const signedInUser = {
                isSignedIn: true,
                name: displayName,
                email: email,
                photo: photoUrl,
            };
            setUser(signedInUser);
            console.log(res)
        })
        .catch(err => {
            console.log(err);
            console.log(err.message);
        })
    }

    const handleSignOut = () => {
        firebase.auth().signOut()
        .then(res => {
            const signedOutUser = {
                isSignedIn: false,
                name: '',
                photo: '',
                email: '',
                password: '',
                error: '',
                success: false,
            };
            setUser(signedOutUser)
        })
        .catch(err => {

        })
    }

    const handleBlur = (e) => {
        let isFieldValid = true;
        if(e.target.name === 'email'){
            isFieldValid = /\S+@\S+\.\S+/.test(e.target.value);
        };
        if(e.target.name === 'password'){
            const isPasswordValid = e.target.value.length > 6;
            const passwordNeedNum = /\d{1}/.test(e.target.value)
            isFieldValid = isPasswordValid && passwordNeedNum 
        };
        if(isFieldValid){
            const newUserInfo = {...user};
            newUserInfo[e.target.name] = e.target.value;
            setUser(newUserInfo);
        }
    }

    const handleSubmit = (e) => {
        console.log(user.email, user.password)
        if(user.email && user.password){
            firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
            .then(res => {
                const newUserInfo = {...user};
                newUserInfo.error = '';
                newUserInfo.success = true;
                setUser(newUserInfo);
                updateUserName(user.name);
            })
            .catch(error => {
                const newUserInfo = {...user};
                newUserInfo.error = error.message;
                newUserInfo.success = false;
                setUser(newUserInfo);
              });
        };

        if(!newUser && user.email && user.password){
            firebase.auth().signInWithEmailAndPassword(user.email, user.password)
            .then(res => {
                const newUserInfo = {...user};
                newUserInfo.error = '';
                newUserInfo.success = true;
                setUser(newUserInfo);
                console.log('updated name', res.user)
            })
            .catch(function(error) {
                const newUserInfo = {...user};
                newUserInfo.error = error.message;
                newUserInfo.success = false;
                setUser(newUserInfo);
              });
        }

        const updateUserName = name => {
            var user = firebase.auth().currentUser;

            user.updateProfile({
            displayName: name,
            }).then(function() {
            // Update successful.
            }).catch(function(error) {
            // An error happened.
});
        }

        e.preventDefault();
    }
 
    return (
        <div className="main-container">
            <div className="sub-container">
                <div className="form-title">
                {newUser ? <h3>Create an account</h3> : <h3>Log In</h3>}
                </div>
                <div>
                    <form onSubmit={handleSubmit}>
                        {newUser && <input type="text" name="name" onBlur={handleBlur} placeholder="Username" className="input" required/>}
                        <br/>
                        <input type="text" name="email" onBlur={handleBlur} placeholder="Email" className="input" required/>
                        <br/>
                        <input type="password" name="password" onBlur={handleBlur} placeholder="Password" className="input" required/>
                        <br/>
                        <input className="input-btn" type="submit" value={newUser ? "Create an account" : "Login"}/>
                    </form>
                </div>
                <div className="toggle-style">
                {
                    newUser
                    ?
                    <> <span >Already have an account?</span> <button className="button" type="button" onClick={() => setNewUser(!newUser)}>Login</button> </>
                    :
                    <> <span>Don't have an account?</span> <button className="button" type="button" onClick={() => setNewUser(!newUser)}>Create an account</button> </>
                }
                </div>
            </div>
            <br/>
            <br/>
            <span className="or-style">OR</span>
            {user.isSignedIn ? <button onClick={handleSignOut} >Sign out</button> :
                <button onClick={handleSignIn} >Sign in</button>}
            
            
            {/* <p style={{color: 'red'}}>{user.error}</p>
            {user.success && <p style={{color: 'green'}}>user {newUser ? 'created' : 'logged in'} successfully</p>} */}
        </div>
    );
};

export default Login;

