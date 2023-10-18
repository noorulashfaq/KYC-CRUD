import { useEffect, useState } from "react"
import './style.css'
import axios from 'axios'

const List=()=>{
    const [read,setRead]=useState([])

    useEffect(()=>{
        const fetchAllRecords = async()=>{
            try{
                const res = await axios.get("http://localhost:1122/listAll")
                setRead(res.data.records)
            }catch(err){
                console.log(err)
            }
        }
        fetchAllRecords()
    },[])

    const handleDelete=async(acc_number)=>{
        try{
            await axios.delete(`http://localhost:1122/remove/${acc_number}`)
            window.location.reload();
        }catch(err){
            console.log(err)
        }
    }


    return(
        <>
            <h1>NOORUL BANK</h1>
            <div className="list">
                <table className="read-form">
                    <tr>
                        <th>Account Number</th>
                        <th>Account Holder</th>
                        <th>Account Balance</th>
                        <th>Actions</th>
                    </tr>
                        {read.map((item)=>(
                            <tr>
                            <td>{item.acc_number}</td>
                            <td>{item.acc_holder}</td>
                            <td>{item.acc_balance}</td>
                            <td><button className="update"><a href={`/update/${item.acc_number}`}>Update</a></button>
                            <button className="delete" onClick={()=>handleDelete(item.acc_number)}>Delete</button></td>
                            </tr>
                            
                ))}
                    
                </table>
                <button>
                    <a href="/add">Add account</a>
                </button>
            </div>
        </>
    )
}

export default List