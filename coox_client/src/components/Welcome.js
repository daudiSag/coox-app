import welcomeImage from '../welcomeImage.jpg';
import { Button } from 'react-bootstrap';
import { SiCodechef } from 'react-icons/si';

function MealsPrepped() {
    var started = new Date(2020, 10, 26, 11, 0, 0);
    var now     = new Date();
    return (parseInt((started - now)/1000));
}



export const Welcome = () => (
           <div>
                <img src={welcomeImage} className="welcome-image" alt="welcome" />
                        <div className="welcome-message">
                        <h1 className="welcome-title"><SiCodechef className="header-icon" /> Welcome to Coox</h1>
                        <p>
                            A platform where you can showcase your cooking skills with your friends and fans
                            
                        </p>
                        </div>
                        <div className="meals-prepped">Over <MealsPrepped /> Meals Prepared</div>
                {/* make the number keep changing */ }
                <div className="join-message">
                    <h3>See Who and What's Cooking</h3>
                    <div className="join-inner">
                        <div className="join">Join Coox Today</div>
                        <Button href="/signup" className="signup-button" variant="success" size="lg" block>Sign up</Button>
                        <Button href="/login" className="join-button" variant="outline-primary" size="lg" block>Log in</Button>
                    </div>
                </div>
        
        </div>

);