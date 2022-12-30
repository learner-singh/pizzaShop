// import { GoogleAuthProvider } from "firebase/auth";
// import { getAuth, signInWithPopup } from "firebase/auth";

import { GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js";
import { getAuth, signInWithPopup } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js";

"https://www.gstatic.com/firebasejs/9.14.0/firebase-analytics.js"

// const provider = new GoogleAuthProvider();

// const auth = getAuth();
// auth.languageCode = 'it';

// To apply the default browser preference instead of explicitly setting it.
// firebase.auth().useDeviceLanguage();


export function loginWithGoogle() {
    console.log("Login WIth Google Called");
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    signInWithPopup(auth, provider)
        .then((result) => {
            console.log("Entered .then")
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;
            console.log('After login', user);
            // ...
        }).catch((error) => {
            // // Handle Errors here.
            // const errorCode = error.code;
            // const errorMessage = error.message;
            // // The email of the user's account used.
            // const email = error.customData.email;
            // // The AuthCredential type that was used.
            // const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
            console.log("Entered .catch")

            console.log('Login Error', error);
        });
        console.log("End of function");
}
