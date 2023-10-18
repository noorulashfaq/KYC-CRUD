const expRef = require('express')
const sqlRef = require('mysql2')
const bodyParser = require('body-parser')

const app = expRef()

//DB connect
const db = sqlRef.createConnection(
    {
        "host":"localhost",
        "user":"root",
        "password":"",
        "database":"testfk"
    }
)

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

db.connect((err)=>{
    if(err){
        console.log(err)
    }
    else{
        console.log("Database connected")
    }
})

//get mapping
//async - multiple interactions
app.get('/listAll',async(req,res)=>{
    const sql = "select * from mec_students"
    db.query(sql,(err,records)=>{
        if(err){
            res.status(500).json({"error":err.message})
        }
        if(records.length==0){
            res.status(201).json({"error":"No records found"})
        }
        res.status(200).json({records})
    })
})

//post mapping
app.post('/insert',async(req,res)=>{
    const {id,name,dob,dept,gender,age} = req.body
    const sql = "insert into mec_students values (?,?,?,?,?,?)"
    //update mec_students set DOB=?, Age=? where id=?
    db.query(sql,[id,name,dob,dept,age,gender],(err,result)=>{
        if(err){
            res.status(500).json({"error":err.message})
        }
        res.status(200).json({"message":result.affectedRows})
    })
})

//put mapping
app.put('/update',async(req,res)=>{
    const {dob,id,age} = req.body
    const sql = "update mec_students set DOB=?, Age=? where id=?"
    db.query(sql,[dob,age,id],(err,result)=>{
        if(err){
            res.status(500).json({"error":err.message})
        }
        res.status(200).json({"message":result.affectedRows})
    })
})

//delete mapping
app.delete('/remove/:num',async(req,res)=>{
    const num = parseInt(req.params.num)
    const sql="delete from mec_students where id=?"
    db.query(sql,[num],(err,result)=>{
        if(err){
            res.status(500).json({"error":err.message})
        }
        res.status(200).json({"message":result.affectedRows})
    })
})

app.listen(1122,()=>{
    console.log("My server is running")
})