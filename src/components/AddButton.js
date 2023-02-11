import React from "react";
import {Button} from "react-bootstrap";
import plusIcon from '../gambar/tabler_plus.png';

const AddButton = ({...rest}) =>{
    return(
        <Button variant="blue" className="rounded-pill px-4 fw-semibold" {...rest} ><img src={plusIcon} alt='plus'/>Tambah</Button>
    )
}

export default AddButton;