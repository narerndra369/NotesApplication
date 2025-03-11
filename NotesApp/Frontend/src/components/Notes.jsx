import React, { useState } from 'react'
import { HiDotsVertical } from "react-icons/hi";
import { FaPen } from "react-icons/fa";
import { MdDelete,MdPushPin } from "react-icons/md";
import Modal from './Modal';
import EditPinModal from './EditPinModal';
import './../App.css'

export default function Notes({note,title,date,handleUpdate,handleDelete,handelPinUpdate}) {
  const [show,setShow]=useState(false)
  const handleShow=()=>{
    setShow(!show)
  }
  return (
   <>
   <Modal/>
   


  <div className="card position-relative  rounded-4 border-0" style={{width:"18rem",backgroundColor:"#FEC971"}}>
  <div className="card-body position-relative">
    <div className="text d-flex justify-content-between align-items-center">
      <h5 className="card-title">{title}</h5>
      {console.log( 'handel pin update',handelPinUpdate)}
      
      <div className={note.pin ? "pin active" : "pin"}>
      <MdPushPin size={20} cursor="pointer" onClick={() => {console.log("Pin button clicked for note:", title);handelPinUpdate(); }} />
      </div>
    </div>

    <div className='bottomContent'>
        <div className='Date d-flex justify-content-between align-items-center'>
            <h5 className='fs-6 ' >{date}</h5>
             <div  className='d-flex justify-content-center flex-column align-items-center position-relative'>
               {show && (
                <div className='Dropdown'>
                <FaPen size={20} cursor={"pointer"} onClick={handleUpdate} data-bs-toggle="modal" data-bs-target="#eiditModal"/>
                <MdDelete size={25} color='red' cursor={"pointer"} onClick={handleDelete} data-bs-toggle="modal" data-bs-target="#deleteEmployeeModal"/>
                
                </div>
               )}
             <HiDotsVertical size={25} cursor={'pointer'} onClick={handleShow}/>
             </div>
        </div>
    </div>

    
  </div>
</div>
   </>
  )
}
