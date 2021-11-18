import initializeFirebase from '../Pages/Login/Firebase/firebase.init';
import { useState, useEffect } from 'react'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, onAuthStateChanged, updateProfile, getIdToken, signOut } from "firebase/auth";

initializeFirebase();

const useFirebase = () => {
    const [user, setUser] = useState({});
    const [authError, setAuthError] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [admin, setAdmin] = useState(false);
    const [token, setToken] = useState('');

    const auth = getAuth();
    const googleProvider = new GoogleAuthProvider();

    const registerUser = (userName, email, password, location, navigate) => {
        setIsLoading(true);
        createUserWithEmailAndPassword(auth, email, password)
            .then(() => {
                const newUser = { email, displayName: userName };
                setUser(newUser);
                //save user info on database
                saveUser(email, userName, 'POST');
                //send name to firebase after create new user
                updateProfile(auth.currentUser, {
                    displayName: userName
                }).then(() => {
                    // Profile updated!
                }).catch((error) => {
                    setAuthError(error.message);
                });
                const destination = location?.state?.from || '/';
                navigate(destination);
                setAuthError('');
            })
            .catch((error) => {
                setAuthError(error.message);
            })
            .finally(() => setIsLoading(false));
    }

    //login existing user
    const loginUser = (email, password, location, navigate) => {
        setIsLoading(true);
        signInWithEmailAndPassword(auth, email, password)
            .then(() => {
                const destination = location?.state?.from || '/';
                navigate(destination);
                setAuthError('');
            })
            .catch((error) => {
                setAuthError(error.message);
            })
            .finally(() => setIsLoading(false));
    }

    const signInWithGoogle = (location, navigate) => {
        setIsLoading(true);
        signInWithPopup(auth, googleProvider)
            .then((result) => {
                const user = result.user;
                const destination = location?.state?.from || '/';
                navigate(destination);
                saveUser(user.email, user.displayName, 'PUT');
                setAuthError('');
            }).catch((error) => {
                // Handling Errors
                setAuthError(error.message);
            })
            .finally(() => setIsLoading(false));
    }

    //user state observer
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
                getIdToken(user)
                    .then(idToken => setToken(idToken));
            } else {
                setUser({});
            }
            setIsLoading(false);
        });
        return () => unsubscribe;
    }, [auth]);

    //verify admin 
    useEffect(() => {
        fetch(`https://powerful-mountain-98726.herokuapp.com/users/${user.email}`)
            .then(res => res.json())
            .then(data => setAdmin(data.admin));
    }, [user.email]);

    //logout user
    const logOut = () => {
        setIsLoading(true);
        signOut(auth).then(() => {
            setAuthError('');
        }).catch((error) => {
            setAuthError(error.message);
        })
            .finally(() => setIsLoading(false));
    }

    //save user to database
    const saveUser = (email, displayName, method) => {
        const user = { email, displayName };
        fetch('https://powerful-mountain-98726.herokuapp.com/users', {
            method: method,
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then()
    }

    return {
        user,
        admin,
        token,
        authError,
        isLoading,
        registerUser,
        signInWithGoogle,
        loginUser,
        logOut
    }
}

export default useFirebase;