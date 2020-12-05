import Welcome from './Welcome.js';
import LoginForm  from './LoginForm.js';
import SignupForm from './SignupForm.js';

export const SelectWelcomePage= function() {
 
    if (window.location.pathname === '/') {

        return <Welcome />

    } else if (window.location.pathname === '/signup') {

        return <SignupForm />

    } else if (window.location.pathname === '/login') {

        return <LoginForm />

    } else {

        return <Welcome />

    }


}


