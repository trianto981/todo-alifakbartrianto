import React, { useState } from "react";
import deleteIcon from '../gambar/activity-item-delete-button.svg';
import Delete from "./Delete";
import {useNavigate} from 'react-router-dom';
import moment from 'moment';

const ActivityCard =  ({data, deleteData, ...rest}) => {
    const dateTime = new Date(data.created_at)

    const [show, setShow] = useState(false)

    const showModal = () => setShow(true)
    const hideModal = () => setShow(false)

    const navigate = useNavigate()

    const viewActivity = (id) =>{
        navigate("/activity/${id}")
    }

    return (
        <div classname="card-activity" data-cy='activity-item'{...rest}>
            <div className="body" role='body' onClick={()=> viewActivity(data.id)}>
                <div className="title" data-cy="activity-item-title">{data.title}</div>
            </div>
            <div className="footer">
                <div data-cy="activity-item-date">{moment(dateTime).format('DD MMMM YYYY')}</div>
                <img src={deleteIcon} alt='delete' role="button" onClick={showModal} data-cy='activity-item-delete-button'/>
            </div>
            {show && <Delete show={show} hide={hideModal} confirm={deleteData} type='activity' data={data}/>}
        </div>

    )
}

export default ActivityCard