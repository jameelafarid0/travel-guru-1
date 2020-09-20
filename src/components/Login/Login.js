import React, { useContext, useState } from 'react';
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from '../../firebase.config';
import './Login.css'
import { TravelInfoContext } from '../../App';
import { useHistory, useLocation } from 'react-router-dom';

firebase.initializeApp(firebaseConfig);

const Login = () => {
    const [passwordMsg, setPasswordMsg] = useState("");
    const [newUser, setNewUser] = useState(false);
    const [user, setUser] = useState({
        isSignedIn: false,
        name: '',
        email: '',
        photo: '',
    });

    const {destineState, loggedUserState} = useContext(TravelInfoContext);
    const [loggedInUser, setLoggedInUser] = loggedUserState;
    const history = useHistory();
    const location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };

    const googleProvider = new firebase.auth.GoogleAuthProvider();
    const fbProvider = new firebase.auth.FacebookAuthProvider();

    const handleFbSignIn = () => {
        firebase.auth().signInWithPopup(fbProvider)
        .then(result => {
            // This gives you a Facebook Access Token. You can use it to access the Facebook API.
            var token = result.credential.accessToken;
            // The signed-in user info.
            var user = result.user;
          })
          .catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
          });
        }

    const handleGglSignIn = () => {
        firebase.auth().signInWithPopup(googleProvider)
        .then(res => {
            const {displayName, photoUrl, email} = res.user;
            const signedInUser = {
                isSignedIn: true,
                name: displayName,
                email: email,
                photo: photoUrl,
            };
            setUser(signedInUser);
            setLoggedInUser(signedInUser);
            history.replace(from);
        })
        .catch(err => {
            console.log(err);
            console.log(err.message);
        })
    }

    const handleGglSignOut = () => {
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
        if(user.email && user.password){
            firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
            .then(res => {
                const newUserInfo = {...user};
                newUserInfo.error = '';
                newUserInfo.success = true;
                setUser(newUserInfo);
                updateUserName(user.name);
                setLoggedInUser(newUserInfo);
                history.replace(from);
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
                setLoggedInUser(newUserInfo);
                history.replace(from);
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

    const confirmPassword = (e) => {
        if(e.target.value === user.password){
            const newUserInfo = {...user};
            newUserInfo[e.target.name] = true;
            setUser(newUserInfo); 
            setPasswordMsg("");
        } 
        else {
            const newUserInfo = { ...user };
            newUserInfo[e.target.name] = false;
            setUser(newUserInfo);
            setPasswordMsg("Password did not match !")
        }
    };
 
    return (
        <div>
            <div className="sub-container">
                <div>
                {newUser ? <h3>Create an account</h3> : <h3>Log In</h3>}
                </div>
                <div>
                    <form onSubmit={handleSubmit}>
                        {
                        newUser &&  <input className="form-input"type="text" name="name" onBlur={handleBlur} placeholder="Username" required/>
                        }
                        <br/>
                        <input className="form-input" type="text" name="email" onBlur={handleBlur} placeholder="Email" required/>
                        <br/>
                        <input className="form-input" type="password" name="password" onBlur={handleBlur} placeholder="Password" required/>
                        <br/>
                        {
                            newUser && <> <input className="form-input" type="password" name="conform password" onBlur={confirmPassword} placeholder="Confirm Password" required/>
                            {passwordMsg.length > 0 ? <small style={{ color: 'red', marginLeft: '45px'}}>{passwordMsg} </small> : <small></small>}
                       </> }
                        <br/>
                        <input className="submit" type="submit" value={newUser ? 'Create an account' : 'Login'}/>
                    </form>
                </div>
                {/* <p style={{color: 'red', marginLeft: '45px'}}>{user.error}</p> */}
                {user.success && <p style={{color: 'green', marginLeft: '45px'}}>user {newUser ? 'created' : 'logged in'} successfully</p>}
               
               <div style={{textAlign:"center"}}>
               {
                    newUser
                        ?
                        <> <span>Already have an account?</span>
                    <button className="last-button" type="button"
                    onClick={() => setNewUser(!newUser)}>Login</button> </>
                        :
                        <> <span>Don't have an account?</span> <button className="last-button"  type="button"
                    onClick={() => setNewUser(!newUser)}>Create an account</button> </>
                }
               </div>
                
            </div>
            
            <br/>
            <span className="span-or"><hr className="hori-line"/> OR <hr className="hori-line"/></span>
            <br/>

            {user.isSignedIn 
                ? <button  className="social-button" onClick={handleGglSignOut} >Signout</button> 
                :
                <button className="social-button" onClick={handleGglSignIn} >
                    <img src={'https://i.imgur.com/en07y50.png'} className="social-icon" alt=""/>
                    <span className="social-name">Continue with google</span> </button>
            }
            
            
            <button id="gg-btn" className="social-button" onClick={handleFbSignIn}>
            <img src={'https://i.imgur.com/JZEU1QD.png'} className="social-icon" alt=""/>
               <span className="social-name">Continue with facebook</span> </button>
            
        </div>
    );
}
export default Login;

