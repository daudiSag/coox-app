//main entry page for logged in user
import Posts from './Posts.js';
import UserProfile from './UserProfile.js';
import SearchBar from './SearchBar.js';
import PopularCooks from './PopularCooks.js'
import { SiCodechef } from 'react-icons/si';
import { BsGear } from 'react-icons/bs';
import { Dropdown } from 'react-bootstrap';
import AddPost from './AddPost.js';
import EditPost from './EditPost.js';
import EditProfile from './EditProfile.js';
import SharePost from './SharePost.js';
import PostItemPage from './PostItemPage.js';
import SideMenu from './SideMenu.js';
import TermsPage from './TermsPage.js';

//const API_URL = "http://localhost:3005/";

const postsHeader = <h3 className="posts-title"><SiCodechef className="header-icon" /> Cooking Posts</h3>;
// const clearance = <div className="clearence"> Posts List</div>

let showSearchResultsDiv;

export const HomePage = function () {

    if (sessionStorage.getItem('search') === 'True') {
            console.log('1111')
        showSearchResultsDiv = <div></div>

    } else {
        console.log('2222')
        showSearchResultsDiv = <PopularCooks />

    }
        

    function seeTerms() {

        window.location.assign('/terms');
    }

    function logout() {
        
        localStorage.removeItem("user");
         window.location.assign('/');

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
                                {/* <Dropdown.Item className="item" href="#">View Profile</Dropdown.Item> */}
                                <Dropdown.Item className="item" href="#" onClick={seeTerms}>Privacy Policy</Dropdown.Item>
                                <Dropdown.Item className="item" href="#" onClick={logout}>Logout</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                    <UserProfile />   
                </div>
                <div className="open-menu">
                    <SideMenu />
                </div>
                <div className="center-div">
                    {postsHeader}
                    <Posts />
                </div>
                <div className="right-div">
                    <div className="right-container"> 
                        <SearchBar />
                        <div className="bottom-right">
                            {showSearchResultsDiv}
                        </div>
                    </div>
                </div>
            </div>
        
        );

    } else if (window.location.pathname === '/postItem/') {

        return <PostItemPage />

    } else if (window.location.pathname === '/sharePost/') {

        return <SharePost />

    } else if (window.location.pathname === '/editPost/') {

    return <EditPost />
    
    } else if (window.location.pathname === '/addPost') {

        return <AddPost />

    } else if (window.location.pathname === '/editProfile/') {

    return <EditProfile />

    } else if (window.location.pathname === '/terms') {

        return <TermsPage />

    } 

}