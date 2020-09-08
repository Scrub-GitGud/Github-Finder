import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Search = (props) => {

    const [text, setText] = useState('');

    const onChange = (e) => { // Sets state 'text' value from text input 
        setText(e.target.value)
    }
    const onSubmit = (e) => {
        e.preventDefault();

        if(text === ''){  // IF Text is empty, show alert
            props.setAlertProp('Please Enter Something', 'primary');
        }
        else{
            props.searchUsersProp(text); // Reverse pass a function as props
            setText('') // Clear state after submit.
        }
    }

    return (
        <div>
            <form onSubmit={onSubmit} className='form'>
                <input 
                    type="text" 
                    name='text' 
                    placeholder='Search Users' 
                    value={text}
                    onChange={onChange}
                />
                <input type="submit" value='search' className='btn btn-dark btn-block'/>
            </form>
        </div>
    )
}

Search.propTypes = {
    searchUsersProp: PropTypes.func.isRequired,
    setAlertProp: PropTypes.func.isRequired
}

export default Search
