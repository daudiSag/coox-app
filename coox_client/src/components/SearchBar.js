

import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import { BsSearch } from 'react-icons/bs';
import { AiFillCloseCircle } from 'react-icons/ai';


const SearchBar = () => {
    const [searchTerm, setSearchTerm]   = useState('');
    const [clearSearch, setClearSearch] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(`${searchTerm}`);
    }

    const handleKeyPress = (e) => {
        //e.preventDefault();
        let searchterms = e.target.value;

        console.log(searchterms.length);

        if (searchterms.length > 0) {   
            setClearSearch(<AiFillCloseCircle />)
        } else if (searchterms.length < 1) {
            setClearSearch('');
        }
        
    }

    const handleClearSearch = (e) => {
        setSearchTerm('');
        setClearSearch('');
    }

   

    return (
        <div className="search-div">
            <div className="search-icon-div"><BsSearch /></div>
            <Form className="search-form" onSubmit={handleSubmit}>
                {/* <Form.Group controlId="formSearch"> */}
                <Form.Control className="search-input" type="text" placeholder="Search Coox" value={searchTerm} onKeyDown={handleKeyPress} onChange={e => setSearchTerm(e.target.value)} />
                {/* </Form.Group> */}
                
            </Form>
            <div className="clear-search-icon-div" onClick={handleClearSearch}>{clearSearch}</div>
        </div>
    );

}

export default SearchBar;