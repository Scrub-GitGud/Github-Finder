import React from 'react'
import PropTypes from 'prop-types'


export const ReposItem = (props) => {
    return (
        <div className="m-1 p-1 badge badge-success"><a href={props.singleRepos.html_url}>{props.singleRepos.name}</a></div>
    )
}

ReposItem.prototype = {
    singleRepos: PropTypes.array.isRequired,
}

export default ReposItem