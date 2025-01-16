import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddStudents = () => {
    let navigate = useNavigate();
    const [student, setStudents] = useState({
        name: '',
        email: '',
        department: ''
    });

    const { name, email, department } = student;

    // Handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setStudents((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    // Save student data to the server
    const saveStudents = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:8080/students", student);
            navigate('/view_students')
            // Optionally clear form after submitting
            setStudents({ name: '', email: '', department: '' });
        } catch (error) {
            console.error("Error saving student data:", error);
        }
    };

    return (
        <div className='col-sm-8 py-2 px-5'>
            <form onSubmit={saveStudents}>
                <div className='input-group mb-5'>
                    <label className='input-group-text' htmlFor='name'>
                        Name
                    </label>
                    <input
                        className='form-control col-sm-6'
                        type='text'
                        name='name'
                        id='name'
                        value={name}
                        required
                        onChange={handleInputChange}
                    />
                </div>

                <div className='input-group mb-5'>
                    <label className='input-group-text' htmlFor='email'>
                        Email
                    </label>
                    <input
                        className='form-control col-sm-6'
                        type='email'
                        name='email'
                        id='email'
                        value={email}
                        required
                        onChange={handleInputChange}
                    />
                </div>

                <div className='input-group mb-5'>
                    <label className='input-group-text' htmlFor='department'>
                        Department
                    </label>
                    <input
                        className='form-control col-sm-6'
                        type='text'
                        name='department'
                        id='department'
                        value={department}
                        required
                        onChange={handleInputChange}
                    />
                </div>

                <div className='row mb-5'>
                    <div className='col-sm-2'>
                        <button type='submit' className='btn btn-outline-success btn-lg'>
                            Save
                        </button>
                    </div>
                    <div className='col-sm-2'>
                        <Link to='/view_students' className='btn btn-outline-warning btn-lg'>
                            Back
                        </Link>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default AddStudents;
