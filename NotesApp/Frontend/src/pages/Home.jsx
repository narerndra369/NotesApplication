import React, { useEffect, useState } from 'react';
import SideBar from '../components/SideBar';
import Cookies from 'js-cookie';
import Notes from '../components/Notes';
import Navbar from '../components/Navbar';
import { delet, get, post, put } from '../services/ApiEndPoint';
import Modal from '../components/Modal';
import toast from 'react-hot-toast';
import EidtModal from '../components/EidtModal';
import DeleteModal from '../components/DeleteModal';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();
  const [notes, setNotes] = useState([]);
  console.log('notes', notes);
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState('');
  const [updatetitle, setUpdatetitle] = useState('');
  const [modalId, setModalId] = useState('');
  const [openDropdownId, setOpenDropdownId] = useState(null); // Manage open dropdown state
  const [refersh, setRefersh] = useState(false);
  const [closeModal, setCloseModal] = useState(false);

  // Function to format the date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleNoteSubmit = async () => {
    try {
      const request = await post('/notes/create', { title });
      const response = request.data;
      if (response.success) {
        toast.success(response.message);
        setRefersh(!refersh);
        setCloseModal(true);
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
      }
      console.log(error);
    }
  };

  const handleUpdate = async () => {
    try {
      console.log('Updating note ID:', modalId);
      const request = await put(`/notes/update/${modalId}`, { title: updatetitle });
      const response = request.data;
      console.log('Update Response:', response);
      if (response.success) {
        toast.success(response.message);
        setRefersh(!refersh);
        setCloseModal(true);
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
      }
      console.log(error);
    }
  };

  const handleUpdatePin = async (id) => {
    var m= '67b6b560f3a404a638e6ceb6';
    console.log(id)
    try {
      console.log('Pinning note ID:', id);
      const request = await put(`/notes/update/${id}`,{ pin:true});
      const response = request.data;
      console.log('Update Pin Response:', response);
      if (response.success) {
        toast.success(response.message);
        setRefersh(!refersh);
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
      }
      console.log(error);
    }
  };

  const handleNotesDelete = async () => {
    try {
      console.log('Deleting note ID:', modalId);
      const request = await delet(`/notes/delete/${modalId}`);
      const response = request.data;
      console.log('Delete Response:', response);
      if (response.success) {
        toast.success(response.message);
        setRefersh(!refersh);
        setCloseModal(true);
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
      }
      console.log(error);
    }
  };

  const searchGet = async (e) => {
    console.log("Search input:", e);
    if (!e.trim()) { 
      setRefersh(!refersh)
      return;
  }
    try {
      const request = await get(`/notes/getnotes/${e}`);
      const response = request.data;
      if(response.success){
        setNotes([response.Notes]);
      }else{
        setNotes([]);
      }
    } catch (error) {
      console.log("Search error:", error);
      setNotes([]);
    }
  };
  

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const request = await get('/notes/getnotes');
        const response = request.data;
        setNotes(response.Notes);
      } catch (error) {
        console.log(error);
      }
    };
    fetchNotes();
  }, [refersh]);

  return (
    <>
      <Modal
        Modaltitle="Write Notes"
        value={title}
        handleChange={(e) => setTitle(e.target.value)}
        handleNoteSubmit={handleNoteSubmit}
        HandleClose={closeModal}
      />

      <EidtModal
        Modaltitle="Updated Notes"
        handleChange={(e) => setUpdatetitle(e.target.value)}
        handleNoteSubmit={handleUpdate}
        value={updatetitle}
      />

      <DeleteModal handelNotesDelete={handleNotesDelete} />

      <div className="row">
        <div className="col-lg-2 col-md-2 shadow d-flex min-vh-100">
          <SideBar />
        </div>
        <div className="col-lg-10 col-md-10">
          <Navbar searchGet={searchGet} /> 

          {notes.length > 0 ? (
            <div className="mt-3 mx-5">
              <h1 className="fs-2 fw-bold">NOTES</h1>
            </div>
          ) : (
            <div className="mt-5 justify-content-center d-flex align-items-center">
              <h1 className="fs-1 fw-bold">No Notes Found</h1>
            </div>
          )}
          <div className="mt-4 mx-5 row">
            {notes.map((elem, index) => (
              <div className="col-lg-4 col-md-4 mb-5" key={index}>
                <Notes
                  note={elem}
                  title={elem.title}
                  date={formatDate(elem.updatedAt)}
                  handleUpdate={() => setModalId(elem._id)}
                  handleDelete={() => setModalId(elem._id)} 
                  handelPinUpdate={() => handleUpdatePin(elem._id)}
                  openDropdownId={openDropdownId}
                  setOpenDropdownId={setOpenDropdownId}
                />

              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
