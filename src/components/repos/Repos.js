import React from 'react'
import PropTypes from 'prop-types'
import ReposItem from './ReposItem'

const Repos = (props) => {
    return props.repos.map(i_repos=> <ReposItem key={i_repos.id} singleRepos={i_repos}/>)
}

Repos.prototype = {
    repos: PropTypes.array.isRequired,
}

export default Repos
