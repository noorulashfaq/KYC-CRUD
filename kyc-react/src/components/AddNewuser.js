import { useState } from "react"
import axios from 'axios'
import { useNavigate } from "react-router-dom"

const Add=()=>{
    const [newUser,setNewUser]=useState({
        acc_number:null,
        acc_holder:"",
        acc_balance:null
    })

    const navigate = useNavigate()

    const handleChange=(e)=>{
        setNewUser((prev)=>({...prev,[e.target.name]:e.target.value}))
    }

    const handleClick = async e=>{
        e.preventDefault()
        try{
            await axios.post("http://localhost:1122/insert",newUser)
            navigate("/")
        }catch(err){
            console.log(err)
        }
    }

    return(
        <div className="form">
            <h1>Add new account</h1>
            <input type="number" placeholder="Account number" onChange={handleChange} name="acc_number"/>
            <input type="text" placeholder="Account holder" onChange={handleChange} name="acc_holder"/>
            <input type="number" placeholder="Account balance" onChange={handleChange} name="acc_balance"/>
            <button onClick={handleClick}>ADD ACCOUNT</button>
        </div>
    )
}

export default Add