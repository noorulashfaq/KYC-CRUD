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


    return(
        <>
            <h1>NOORUL BANK</h1>
            <div className="list">
                <table className="read-form">
                    <tr>
                        <th>Account Number</th>
                        <th>Account Holder</th>
                        <th>Account Balance</th>
                    </tr>
                        {read.map((item)=>(
                            <tr>
                            <td>{item.acc_number}</td>
                            <td>{item.acc_holder}</td>
                            <td>{item.acc_balance}</td>
                            </tr>
                            
                ))}
                    
                </table>
            </div>
        </>
    )
}

export default List