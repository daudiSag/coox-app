import UserProfile from './UserProfile.js';
// import SearchBar from './SearchBar.js';
// import PopularCooks from './PopularCooks.js'
import { SiCodechef } from 'react-icons/si';
import { BsGear } from 'react-icons/bs';
import { Dropdown } from 'react-bootstrap';

function openMenu() {
    document.getElementById("side-menu").style.width = "250px";
}

function closeMenu() {
    document.getElementById("side-menu").style.width = "0px";
}

function darkMode(){
    if(document.getElementById("App").style.backgroundColor === "black"){
        document.getElementById("App").style.backgroundColor = "#fff";
        document.getElementById("App").style.color = "black";
    }else{
        document.getElementById("App").style.backgroundColor = "black";
        document.getElementById("App").style.color = "#fff";
    }
}

function logout() {

    localStorage.removeItem("user");
    window.location.replace('/');

}

const SideMenu = () => {
    return (
        // eslint-disable-next-line react/jsx-no-comment-textnodes
        <div>
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <a className="open-button" href="#" onClick={() => openMenu()}><SiCodechef /></a>
            <div id="side-menu" className="side-menu">
                 {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                <a className="close-button" href="#" onClick={() => closeMenu()}><SiCodechef /></a>
                <UserProfile />
                <Dropdown>
                    <Dropdown.Toggle variant="" className="dropdown-basic2" id="dropdown-basic">
                        <BsGear /> <b>Settings</b>
                    </Dropdown.Toggle>
                    <Dropdown.Menu className="drop-down">
                        <Dropdown.Item className="item" href="#">View Profile</Dropdown.Item>
                        <Dropdown.Item className="item" href="#">Terms & Conditions</Dropdown.Item>
                        <Dropdown.Item className="item" onClick={() => darkMode()}>Dark Mode</Dropdown.Item>
                        <Dropdown.Item className="item" href="#" onClick={logout}>Logout</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>
        </div>
    );
    /*<Dropdown.Item className="item" onClick={() => setDarkMode(prevMode => !prevMode)}>Dark Mode</Dropdown.Item>*/

}

export default SideMenu;