//main entry page for logged in user
import Posts from './Posts.js';
import UserProfile from './UserProfile.js';
import SearchBar from './SearchBar.js';
import PopularCooks from './PopularCooks.js'
import { SiCodechef } from 'react-icons/si';
import { BsGear } from 'react-icons/bs';
import { Dropdown } from 'react-bootstrap';
import AddPost from './AddPost.js';
const API_URL = "http://localhost:3005/";

const postsHeader = <h3 className="posts-title"><SiCodechef className="header-icon" /> Cooking Posts</h3>;
// const clearance = <div className="clearence"> Posts List</div>

export const HomePage = function () {

    function logout() {
        
        localStorage.removeItem("user");
        window.location.replace('/');

    }

    if ((window.location.pathname === '/') || (window.location.pathname === '/posts')) {
        return (
            <div className="home-page">
                <div className="left-div">
                    <div className="account-settings">
                        <Dropdown>
                            <Dropdown.Toggle variant="" id="dropdown-basic">
                                <BsGear /> <b>Settings</b>
                            </Dropdown.Toggle>
                            <Dropdown.Menu className="drop-down">
                                <Dropdown.Item className="item" href="#">View Profile</Dropdown.Item>
                                <Dropdown.Item className="item" href="#">Terms & Conditions</Dropdown.Item>
                                <Dropdown.Item className="item" href="#" onClick={logout}>Logout</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                    <UserProfile />   
                </div>
                <div className="center-div">
                    {postsHeader}
                    <Posts />
                </div>
                <div className="right-div">
                    <div className="right-container">
                        <SearchBar />
                        <PopularCooks />
                    </div>
                </div>
            </div>
        
        );

    } else if (window.location.pathname === '/addPost') {
        return <AddPost />
    }

}