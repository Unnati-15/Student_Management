import React, { useEffect, useState } from 'react'
import axios from "axios"
import { Link } from 'react-router-dom';
const StudentsView = () => {
  const [students,setStudents] = useState([]);  
  useEffect(()=>{
    loadStudents();
  },[]);
 
  const loadStudents = async()=>{
    const result = await axios.get("http://localhost:8080/students",{
        validateStatus:()=>{
            return true;
        },
    });
    if(result.status === 302){
        setStudents(result.data);
    }
    
  };
  const handleDelete = async(id)=>{
    await axios.delete(`http://localhost:8080/students/delete/${id}`);
    loadStudents();
  }

  return (
    <section>
        <table className='table table-bordered table-hover'>
            <thead>
                <tr className='text-center'>
                    <th>ID </th>
                    <th>Name </th>
                    <th>Email </th>
                    <th>Department </th>
                    <th colSpan={3}>Actions</th>
                </tr>
            </thead>
            <tbody className='text-center'>
                {students.map((student,index)=>(
                    <tr key={student.id}>
                        <th scope='row' key={index}>
                            {index+1}
                        </th>
                    <td>{student.name}</td>
                    <td>{student.email}</td>
                    <td>{student.department}</td>
                    {/* <td className='mx-2'>
                        <Link to={`students/${student.id}`} className='btn btn-info'>
                        View
                        </Link>
                    </td> */}
                    <td className='mx-2'>
                    <Link to={`edit_students/${student.id}`} className='btn btn-warning'>
                        Update
                        </Link>
                    </td>
                    <td className='mx-2'>
                        <button className='btn btn-danger' onClick={()=>handleDelete(student.id)}>
                        Delete
                        </button>
                    </td>
                   
                    </tr>
                ))}
                
            </tbody>
        </table>
    </section>
  )
}

export default StudentsView
