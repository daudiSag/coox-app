

import React, { useEffect, useState } from 'react';
import axios from "axios"; //for api requests
import authHeader from '../api_services/authHeader.js';
import { Form } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { BsSearch } from 'react-icons/bs';
import { AiFillCloseCircle } from 'react-icons/ai';
import PostReaction from './PostReaction.js';
import { FaUserCircle } from 'react-icons/fa';
import Moment from 'react-moment';

const API_URL = "http://localhost:3005/";  //api url

let searchStatus;



const SearchBar = () => {
    const [searchTerm, setSearchTerm]       = useState('');
    const [searchResults, setSearchResults] = useState(undefined);
    const [clearSearch, setClearSearch]     = useState('');

    useEffect(() => {
        if (sessionStorage.getItem('searchTerm') ) {
            axios.get(API_URL + 'searchPosts', { headers: authHeader(), params: { searchTerm: sessionStorage.getItem('searchTerm') } }).then(response => {
                //  console.log(response.data);
                setSearchResults(response.data);

            }).catch(error => {
                console.log(error);
            });
            // sessionStorage.removeItem('searchTerm')
        }

    }, []);

    const handleSubmit = () => {
        // event.preventDefault();
        //  console.log(`${searchTerm}`);
        sessionStorage.setItem('search', 'True');
        sessionStorage.setItem('searchTerm', searchTerm);
     

       return axios.get(API_URL + 'searchPosts', { headers: authHeader(), params: { searchTerm: searchTerm } }).then(response => {
            // console.log(response.data);
            setSearchResults(response.data);

        }).catch(error => {
            console.log(error);
        });
    }

    const handleKeyPress = (e) => {
        //e.preventDefault();
        let searchterms = e.target.value;

        // console.log(searchterms.length);

        if (searchterms.length > 0) {   
            
            setClearSearch(<AiFillCloseCircle />)

        } else if (searchterms.length < 1) {
            setClearSearch('');
        }

        
    }

    function cancelSearch() {
        setSearchTerm('');
        setClearSearch('');
        sessionStorage.removeItem('search');
        sessionStorage.removeItem('searchTerm');
        setSearchResults(undefined);
    }


    if (searchTerm.length > 0) {

        searchStatus = <div onClick={handleSubmit} className="search-icon-div-active"><BsSearch /></div>

    } else {

        searchStatus = <div className="search-icon-div"><BsSearch /></div>

    }

    const handleClearSearch = (e) => {
        setSearchTerm('');
        setClearSearch('');
    }

    const SearchResults = () => {
        if (searchResults !== undefined) {
            if (searchResults.length > 0) {
                return (
                    <div className="results-div">
                        {searchResults.map(post => (
                            
                            <div className="post-info">
                                <hr></hr>
                                <div className="post-creator-info">
                                    <b className="creator-name"> {post.createdBy}</b> &nbsp; <b className="divider">.</b> &nbsp;
                                    <b className="created-at"><Moment fromNow>{post.createdAt}</Moment> </b>
                                </div>
                                <div className="post-title">{post.title}</div>
                                <PostReaction postId={post._id} postCreator={post.createdBy} />
                            </div>


                        ))}
                        <div>
                            <Button onClick={cancelSearch} href="#" className="cancel-search-button" variant="outline-primary" size="lg">Cancel Search</Button>
                        </div>
                   </div>
                );

            } else {

                return (
                    <div className="results-div">
                        <div className="popular-cooks-empty">No Posts found </div>
                        <Button onClick={cancelSearch} href="#" className="cancel-search-button" variant="outline-primary" size="lg">Cancel Search</Button>
                    </div>
                );

            }

            
        } else {
            return (<div></div>);
        }
    }

    return (
        <div>
            <div className="search-div">
                {searchStatus}
                <Form className="search-form">
                    {/* <Form.Group controlId="formSearch"> */}
                    <Form.Control className="search-input" type="text" placeholder="Search For Posts" value={searchTerm} onKeyDown={handleKeyPress} onChange={e => setSearchTerm(e.target.value)} />
                    {/* </Form.Group> */}
                    
                </Form>
                <div className="clear-search-icon-div" onClick={handleClearSearch}>{clearSearch}</div>
            </div>
            <SearchResults />
           
        </div>
    );

}

export default SearchBar;