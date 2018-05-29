import React from 'react';
import './UserOutput.css'

const UserOutput = (props) => {
    return (
        <div className="UserOutput">
            <p>Username: { props.username }</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque quasi id harum ipsum error consequuntur dolor impedit quisquam soluta, quos recusandae, libero hic voluptatibus perferendis, cum distinctio! Recusandae, consequatur hic!</p>
        </div>
    )
}

export default UserOutput;
