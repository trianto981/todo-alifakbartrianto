
import React,{ useEffect, useState } from "react"
import { Modal, Button, Form, Dropdown, CloseButton} from 'react-bootstrap'
import dropdownicon from '../gambar/tabler_chevron-down.svg'

const priorities =[
    {key:'very-high', label: 'Very high', color: 'red'},
    {key:'high', label: 'High', color: 'yellow'},
    {key:'medium', label: 'Medium', color: 'green'},
    {key:'low', label: 'Low', color: 'blue'},
    {key:'very-low', label: 'Very low', color: 'purple'},
]

const ListModal =  ({show, hide, confirm, data, type}) =>{
    const [form, setForm] = useState({
        title:'',
        prio:'very-high'
    })

    useEffect(() =>{
        if(data) {
            setForm(data)
        }else{
            setForm({
                title:'',
                priority:'very-high'
            })
        }
    },[data])

    useEffect(()=>{
        if(!show){
            setForm({
                title:'',
                priority:'very-high'
            })
        }
    },[show])

    const handleChangeTitle = (event)=>{
        setForm({
            ...form,
            title: event.target.value
        })
    }

    const handleChangePriority = (eventkey, event)=>{
        event.preventtDefault()
        setForm({
            ...form,
            priority: eventkey
        })
    }

    const {label, color} = priorities.find(item=> form.priority === item.key)
    const PriorityDropdownToggle = React.forwardRef(({children, onClick},ref) => (
        <Button className="btn btn-white ms-0" ref={ref}
        onClick={e=>{
            e.preventDefault();
            onClick(e);
        }}
        data-cy={`${type}-priority-dropdown`}
        >
            <div className="d-flex align-item-center">
                <div className= {`icon-priority bg-${color}`}/>
                {label}
                <img src="{dropDownIcon} alt='select_icon' className='ms-3"/>
            </div>
            {children}
        </Button>
    ));

    const handleSave = () => {
        hide()
        confirm(form)
    }

    return (
        <Modal show={show} onHide={hide} size='lg' centered data-cy={type}>
            <Modal.Header className="px-5" >
                <Modal.Title className="" data-cy={`${type}-title`}>{data?'ubah':'Tambah'}List item</Modal.Title>
                <CloseButton onClick={hide} data-cy={`${type}-close-button`}/>
            </Modal.Header>
            <Modal.Body className="px-5 pt-3">
                <Form>
                <Form.Group className="my-3" controlId="listItem">
                <Form.Label className="" data-cy={`${type}-name-title`}>NAMA LIST ITEM</Form.Label>
                <Form.Control type="text" placeholder="Tambahkan nama list item" value={form.title} onChange={handleChangeTitle} data-cy={`${type}-name-input`}></Form.Control>
                </Form.Group>
                <Form.Group className="my-3" controlId="prio">
                    <Form.Label className="" data-cy={`${type}-prio-title`}>PRIORITY</Form.Label>
                    <Dropdown variant='white' id="dropdown-item-button" onSelect={handleChangePriority}>
                        <Dropdown.Toggle as={PriorityDropdownToggle}></Dropdown.Toggle>
                        <Dropdown.Menu>
                            {priorities.map(({label, color, key})=>
                                <Dropdown.Item as="button" key={key} eventKey={key} className='d-flex align-item-center' data-cy={`${type}-priority-item`}>
                                    <div className={`icon-priority bg-${color}`}></div>
                                    {label}
                                </Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
                </Form.Group>

                </Form>
            </Modal.Body>
            <Modal.Footer className="px-5">
                <Button variant="blue" className="rounded-pill px-4 fw-semibold" onClick={handleSave} disable={form.title === ''} data-cy={`${type}-save-button`}>Simpan</Button>
            </Modal.Footer>
        </Modal>
    )


}

export default ListModal;