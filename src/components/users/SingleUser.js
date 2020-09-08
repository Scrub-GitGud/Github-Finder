import React, { useEffect, Fragment } from 'react'
import {Link} from 'react-router-dom'

import LoadingSpinner from '../loading'
import PropTypes from 'prop-types'

import Repos from '../repos/Repos'

const SingleUser = (props) => {

    useEffect(() => {
        props.getSingleUserProp(props.match.params.login);
        props.getUserReposProp(props.match.params.login)

        // this comment removes a warning
        // eslint-disable-next-line
    }, [])

    // componentDidMount() { // Call the prop function as soon as component Runs..
    //     this.props.getSingleUserProp(this.props.match.params.login);// ???????????????????????????
    //     this.props.getUserReposProp(this.props.match.params.login);// ???????????????????????????
    // }

    const { // Destructuring
        name,
        login,
        avatar_url,
        location,
        bio,
        blog,
        html_url,
        followers,
        following,
        public_repos,
        public_gists,
        company
    } = props.singleUserProp

    if(props.loading) return <LoadingSpinner />

    return (
        <Fragment>

            <Link to='/' className='m badge badge-dark'><i className="fas fa-arrow-left"></i> Back to search </Link>
            <h1>{name}</h1>
            <div className="card grid-2">
                <div className="all-center">
                <img src={avatar_url} className='round-img' style={{width: '150px'}} alt='' />
                <h1>{name}</h1>
                <p>Location: {location}</p>
                </div>

                <div>
                    {bio && (
                        <Fragment>
                            <h1>Bio</h1>
                            <p>{bio}</p>
                        </Fragment>
                    )}
                    <a href={html_url} className='btn btn-dark my-1'>Visit Github Profile</a>

                    <ul>
                        <li>{login && <Fragment><strong>Username: </strong> {login}</Fragment>}</li>
                        <li>{company && <Fragment><strong>Company: </strong> {company}</Fragment>}</li>
                        <li>{blog && <Fragment><strong>Blog: </strong> {blog}</Fragment>}</li>
                    </ul>
                </div>
            </div>

            <div className='card text-center'>
                <div className='badge badge-primary'>Followers: {followers}</div>
                <div className='badge badge-success'>Following: {following}</div>
                <div className='badge badge-warning'>Public Repos: {public_repos}</div>
                <div className='badge badge-dark'>Public Gists: {public_gists}</div>
            </div>
            
            <Repos repos={props.reposProp } />

        </Fragment>
    )
}

SingleUser.propTypes = {
    loading: PropTypes.bool,
    singleUserProp: PropTypes.object.isRequired,
    getSingleUserProp: PropTypes.func.isRequired,
    getUserReposProp: PropTypes.func.isRequired
}

export default SingleUser
