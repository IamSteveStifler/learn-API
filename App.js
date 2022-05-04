import React from 'react'
import { useState, useEffect } from 'react'
import { Button, Table } from 'react-bootstrap';
const App = () => {

    const [userdata, setUserData] = useState([]);

    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [userID,setuserId] = useState(null);

    useEffect(()=>{
        apiData()
    }, []);

    const apiData = () =>{
        fetch(`http://localhost:3004/posts`).then((req)=>{
            req.json().then((res) =>{
                setUserData(res);
            })
        })
    }
    
    

    const driver = (id) =>{
        fetch(`http://localhost:3004/posts/${id}`, {
            method : 'DELETE'
        }).then((req)=>{
            req.json().then((res)=>{
                console.warn(res);
                apiData();
            })
        })
        
    }

    const driver3 = (id) =>{
        setName(userdata[id-1].name);
        setEmail(userdata[id-1].email);
        setuserId(id);
    }


    const updater = () =>{
        let item = {name, email}
        fetch(`http://localhost:3004/posts/${userID}`, {
            method : 'PUT',
            headers : {
                'Accept' : 'application/json',
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify(item)
        }).then((req) =>{
            req.json().then((res)=>{
                console.warn(res);
                apiData();
            })
        })
    }

    // const driver2 = () =>{
    //     let data = {name, email};
    //     console.log(data);
    //     fetch(`http://localhost:3004/posts`, {
    //         method : 'POST',
    //         headers : {
    //             'Accept' : 'application/json',
    //             'Content-Type' : 'application/json'
    //         },
    //         body : JSON.stringify(data)
    //     }).then((req)=>{
    //         req.json().then((res)=>{
    //             console.warn(res);
    //             apiData();
    //         })
    //     })
    // }

  return (
    <div>
        <h1>API Hitter</h1>
        {/* <input type ="text" onChange = {(event)=> setName(event.target.value) } value = {name} /> <br /><br />
        <input type ="email" onChange = {(event)=> setEmail(event.target.value) } value = {email} /> <br /><br />
        <Button onClick = {driver2} >Click Me</Button> */}

        <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                    <th>#</th>
                    <th>Name : </th>
                    <th>Email : </th>
                    <th>Operation : </th>
                    <th>Operation : </th>
                    
                    </tr>
                </thead>
                <tbody>
                    {

                        userdata.map((ele) =>
                        <tr>
                        <td>{ele.id}</td>
                        <td>{ele.name} </td>
                        <td> {ele.email} </td>
                        <td><Button onClick = {()=> driver(ele.id)} >Delete</Button></td>
                        <td><Button onClick = {()=> driver3(ele.id) }  >Update</Button></td>
                    </tr>)

                    }
        
                </tbody>
        </Table>
        <br /><br />
        <h1>Update Fields</h1>
        <input type = "text" value = {name} onChange = {(event)=> setName(event.target.value) } /> <br /><br />
        <input type = "text" value = {email} onChange = {(event)=> setEmail(event.target.value)} /><br /><br />
        <Button onClick={() => updater() } >Make Changes</Button>

    </div>
  )
}

export default App
