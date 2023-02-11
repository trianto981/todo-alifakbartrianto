import React, { useEffect,useState } from 'react'
import backIcon from '../gambar/todo-back-button.svg'
import editIcon from '../gambar/todo-item-edit-button.svg'
import editItemIcon from "../gambar/todo-item-edit-button.svg"
import deleteIcon from '../gambar/activity-item-delete-button.svg'
import sortIcon from '../gambar/atas.svg'
import empty from '../gambar/gambar1.png'
import checkIcon from '../gambar/cek.svg'
import AddButton from '../components/AddButton'
import {useNavigate, useParams} from 'react-router-dom'
import ListPrio from '../components/ListPrio'
import {Button, Dropdown, Form} from 'react-bootstrap'
import Delete from '../components/Delete'
import Loading from '../components/Loading'
import {API} from '../config/api'

const priorities = [
    {key: 'very-high', color: 'red'},
    {key: 'high', color: 'yellow'},
    {key: 'normal', color: 'green'},
    {key: 'low', color: 'blue'},
    {key: 'very-low', color: 'purple'}
]


function Detail() {
    const activityId= useParams().id
    const [list, setList] = useState([])
    const [title, setTitle] = useState(`New Activity`)
    const [onTitleChange, setOnTitleChange] = useState(false)
    const [item, setItem] = useState(undefined)
    const [ListPrio, setListPrioShow] = useState(false)
    const [deleteShow, setDeleteShow] = useState(false)
    const [loading, setLoading] = useState(false)
    const [alert, setAlert] = useState(false)
    const [sort, setSort] = useState('latest')

    const getList = async () =>{
        try{
            setLoading(true);
            const response = await API("/todo-item?activity_groups_id=${activityId}");
            sortList(sort, response.data.data)
            setLoading(false);
        }catch (err){
            console.log(err);
        }
    }

    const getActivity =async()=>{
        try{
            setLoading(true);
            const response = await API("/activity-groups/${activityId}");
            setTitle(response.data.title)
            setList(response.data.todo_items);
            setLoading(false);
        }catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getActivity()
    },[])

    const navigate = useNavigate()
    const goBack=()=> navigate("/")

    const toggleChangeTitle = ()=> setOnTitleChange(!onTitleChange)
    useEffect(()=>{
        if (onTitleChange){
            document.getElementById('todo-title-input').focus()
        }else{
            ChangeTitle()
        }
    },[onTitleChange])

    const handleChangeTitle = (e) => {
        setTitle(e.target.value)
    }

    const ChangeTitle = async ()=>{
        try{
            setLoading(true);
            const response = await API.patch(`/activity-groups/${activityId}`,{title});
            setTitle(response.data.title)
            setLoading(false);
        }catch (err){
            console.log(err);
        }
    }

    const hideListPrio = () => setListPrioShow(false)
    const hideDelete = ()=> setDeleteShow(false)

    const handleAddItem =()=>{
        setItem(undefined)
        setListPrioShow(true)
    }

    const handleEditItem = (data) =>{
        setItem(data)
        setListPrioShow(true)
    }
    const handleDeleteItem = (data) =>{
        setItem(data)
        setDeleteShow(true)
    }   
    
    const handleCheckItem = async (item, index) =>{
        const body ={
            acticity_group_id : item.acticity_group_id,
            id: item.id,
            title:item.title,
            priority:item.priority,
            is_active: item.is_active === 0?1:0
        }

        try{
            const response = await API.patch(`/todo-item/${item.id}`,body);
            if (response.status === 200){
                setList(prevState=>{
                    const newList = [...prevState]
                    newList[index].is_active=body.is_active
                    return newList
                })
            }
        }catch (err){
            console.log(err);
        }
    }

    const addItem = async ({title, priority}) =>{
        const body ={
            acticity_group_id:activityId,
            title,
            priority,
        }
        try{
            setLoading(true);
            const response = await API.post(`/todo-item/`,body);
            const {id,title,priority,acticity_group_id,is_active} = response.data
            getList()
            setLoading(false);
        }
        catch (err){
            console.log(err);
        }
    }

    const editItem= async ({title, priority, is_active})=>{
        const body = {
            id:item.id,
            title,priority,is_active,
        }
        try {
            setLoading(true);
            const response = await API.patch(`/todo-items/${item.id}`,body);
            const {id,title,priority, acticity_group_id, is_active}=response.data
            getList()
            setLoading(false);
        }catch (err){
            console.log(err);
        }
    }

    const deleteItem = async() => {
        try{
            setLoading(true);
            await API.delete(`/todo-item/${item.id}`);
            getList()
            showAlert()
            setLoading(false);
        }catch (err){
            console.log(err);
        }
        setDeleteShow(false)
    }

    const showAlert =() =>{
        setAlert(true)
        setTimeout(hideAlert, 1000)
    }
    const hideAlert =()=>setAlert(false)

    const SortButton = React.forwardRef(({children, onClick}, ref)=>(
        <Button size='sm'
        variant='transparent'
        className='p-0 me-3' ref={ref} onClick={e =>{e.preventDefault(); onClick(e);}} data-cy='todo-sort-button'>
            <img src={sortIcon} alt='sort_icon'></img>
        </Button>
    ))

    const handleSort = (eventKey, Event) =>{
        Event.preventDefault()
        setSort(eventKey)
        sortList(eventKey, list)
    }

    const sortList = (sort,list)=>{
        switch(sort){
            case 'az' : 
            setList([...list].sort((a,b)=> a.title<b.title?-1:a.title>b.title?1:0))
            break;
            case 'za' : 
            setList([...list].sort((a,b)=> a.title>b.title?-1:a.title<b.title?1:0))
            break;
            case 'unfinishead' : 
            setList([...list].sort((a,b)=> (a.is_active>b.is_active)?-1:(a.is_active<b.is_active)?1:0))
            break;
            case 'oldest' : 
            setList([...list].sort((a,b)=> a.id-b.id))
            break;
            case 'latest' : 
            setList([...list].sort((a,b)=> b.id-a.id))
            break;
        }
    }

    const Check = <img src={checkIcon} className="ms-3" ></img>




    return (
    <div className='container py-5'>
        <div className='row'>
            <div className='col d-flex justify-content-between'>
                <div className='d-flex align-items-center py-1'>
                    <img src={backIcon} role='button' onClick={goBack} data-cy='toda-back-button' ></img>
                    {
                        !onTitleChange ? <h1 className='fw-bold mb-0 mx-3' data-cy='todo-title' onClick={toggleChangeTitle}>{title}</h1> :
                        <input id='todo-title-input' value={title} className='input-title mx-3' onChange={handleChangeTitle} onBlur={toggleChangeTitle}/>
                    }
                    <img src={editIcon} role='button' onClick={toggleChangeTitle} data-cy='todo-title-button'></img>

                </div>
                <div className='d-flex'>
                    <Dropdown onSelect={handleSort}>
                        <Dropdown.Toggle as={SortButton}></Dropdown.Toggle>
                        <Dropdown.Menu>
                                <Dropdown.Item as="button" eventKey='latest' className='d-flex align-items-center' data-cy='sort-selection'><div className='d-flex justify-content-between w-100'>Terbaru {sort === 'latest' && Check}</div></Dropdown.Item>
                                <Dropdown.Item as="button" eventKey='oldest' className='d-flex align-items-center' data-cy='sort-selection'><div className='d-flex justify-content-between w-100'>Terlama {sort === 'oldest' && Check}</div></Dropdown.Item>
                                <Dropdown.Item as="button" eventKey='az' className='d-flex align-items-center' data-cy='sort-selection'><div className='d-flex justify-content-between w-100'>A-Z {sort === 'az' && Check}</div></Dropdown.Item>
                                <Dropdown.Item as="button" eventKey='za' className='d-flex align-items-center' data-cy='sort-selection'><div className='d-flex justify-content-between w-100'>Z-A {sort === 'za' && Check}</div></Dropdown.Item>
                                <Dropdown.Item as="button" eventKey='unfinished' className='d-flex align-items-center' data-cy='sort-selection'><div className='d-flex justify-content-between w-100'>Belum Selesai {sort === 'unfinished' && Check}</div></Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    <AddButton onClick={handleAddItem} data-cy='todo-add-button'></AddButton>
                </div>

            </div>

        </div>
        <div className='row mt-5'>
            {loading ? <Loading/> : 
                list.length < 1 ?
                    <div className='col text-center'>
                        <img src={empty} data-cy='todo-empty-state'></img>
                    </div>
            :

                    list.map((item, index) => {
                        const checkedClass = item.is_active === 0 ? 'checked' : ''
                        const { color } = priorities.find(priority => priority.key === item.priority)
                        const label = <><div className={`icon-priority-sm-bg-${color}`} data-cy='todo-item-priority-indicator'/><span className={checkedClass} data-cy='todo-item-title'>{item.title}</span></>
                        return(
                            <div className='card-list position-relative' key={item.id} data-cy='todo-item'>
                                <Form.Check type='checkbox' id={item.id} label={label} className='fw-medium' onChange={()=> handleCheckItem(item, index)} checked={!item.is_active} data-cy='todo-item-checkbox' />
                                <img alt='edit item' src={editItemIcon} className='text-lightgrey ms-3' role='button' onClick={()=> handleEditItem(item)} data-cy='todo-item-edit-button'/>
                                <img alt='delete item' src={deleteIcon} className='position-absolute end-0 me-4' role='button' onClick={() => handleDeleteItem(item)} data-cy='todo-item-delete-button' />
                            </div>
                        )
                    
                    })
            }
        </div>
        {ListPrio && item ?
            <ListPrio show={ListPrio} data={item} hide={hideListPrio} confirm={editItem} type='modal-edit'/>
            : <ListPrio show={ListPrio} hide={hideAlert} type='item'/>    
    
    }
    </div>
  )
}

export default Detail