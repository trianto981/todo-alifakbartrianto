import React,{useState, useEffect} from 'react';
import emptyStateImage from '../gambar/gambar2.png';
import ActivityCard from '../components/ActivityCard';
import AddButton from '../components/AddButton';
import AlertModal from '../components/AlertModal';
import Loading from '../components/Loading';
import {API} from '../config/api';

const Dashboard = () =>{
    const [activities, setActivities] = useState([])
    const [loading, setLoading] = useState(false)
    const [alert, setAlert] = useState(false)

    const getActivities = async () =>{
        try{
            setLoading(true);
            const response = await API("/activity-groups?email=alifakbartrianto5@gmail.com");
            setActivities(response.data.data);
            setLoading(false);
        }catch (err){
            console.log(err);
        }
    };

    useEffect(()=>{
        getActivities();
    },[]);

    const addActivity = async () => {
        const body = {
            "title": "New Activity",
            "email": "alifakbartrianto5@gmail.com"
        }
        try {
            setLoading(true);
            const response = await API.post("/activity-groups", body);

            if(response.status===201){
                getActivities()
            }
            setLoading(false);
        }catch (err){
            console.log(err);
        }
    }

    const deleteActivity = async (id) =>{
        try{
            setLoading(true);
            await API.delete(`/activity-groups/${id}`);
            showAlert('activity')
            setLoading(false);
            getActivities()
        }catch (err){
            console.log(err);
        }
    }

    const showAlert = () =>{
        setAlert(true)
        setTimeout(hideAlert, 1000)
    }
    const hideAlert = () => setAlert(false);


        return (
    <div className='container py-5'>
        <div className='row'>
            <div className='col d-flex justify-content-between'>
                <h1 className='fw-bold' data-cy='activity-title'>Activity</h1>
                <AddButton onClick={()=> addActivity()} data-cy='activity-add-button'></AddButton>
            </div>
        </div>
        <div className='row mt-5'>
            {loading ? <Loading></Loading>:
            activities.length < 1 ?
            <div className='col text-center'>
                <img src={emptyStateImage} alt="Activity emoty" data-cy='activity-empty-state'></img>
            </div>
            :

            activities.map( activity =>
                <div className='col-3' key={activity.id}>
                    <ActivityCard data={activity} deleteData={()=> deleteActivity(activity.id)}/>
                </div>
                )
            }
            {alert && <AlertModal show={alert} hide={hideAlert} type='Activity'/>}
        </div>
    </div>
    )
}

export default Dashboard;