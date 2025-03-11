import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { post } from '../services/ApiEndPoint'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { logout } from '../Redux/AuthSlice'
import { CiSearch } from "react-icons/ci";
import './../App.css'
export default function Navbar({searchGet}) {
  const disptach = useDispatch()
  const navigate = useNavigate()
  const [value, setValue] = useState('');
  console.log(value)
  const handleLogout = async () => {
    try {

      const request = await post('/auth/logout')
      const response = request.data
      if (response.success) {
        toast.success(response.message)
        disptach(logout())
        navigate('/login')
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message)
      }
      console.log(error)
    }
  }
  return (
    <nav className="navbar ">
      <div className="container-fluid p-2 ">
        <div className="search-container">

          <div className="search-container">
            <input
              className="SerachInput"
              type="search"
              placeholder="Search"
              onChange={(e) => setValue(e.target.value)}
            />
            {console.log(searchGet)}
            <CiSearch size={20} className="search-icon" cursor="pointer" onClick={()=>searchGet(value)}/>
          </div>

        </div>
        <button type="button" class="btn bg-dark text-white mx-3" onClick={handleLogout}>Logout</button>

      </div>
    </nav>
  )
}
