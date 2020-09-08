import React from 'react'
import loadingSpinner from './loading.gif';

export const loading = () => {
    return (
        <div>
            <img src={loadingSpinner} alt="Loading..." style={loadingSpinnerStyle}/>
        </div>
    )
}

const loadingSpinnerStyle = {
    width: '200px',
    margin: 'auto',
    display: 'block'
}

export default loading;