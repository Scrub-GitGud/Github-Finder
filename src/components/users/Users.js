import React  from 'react'
import UserItem from './UserItem'
import LoadingSpinner from '../loading'

const users = (props) => {
    if(props.loading){
        return < LoadingSpinner />
    }else{
        return (
            <div style={userStyle}>
                {props.usersData.map(i=>(
                    <UserItem key={i.id} user={i} />
                ))}
            </div>
        )
    }
}

const userStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gridGap: '1rem'
}

export default users
