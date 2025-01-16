import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const EditStudents = () => {
    const { id } = useParams(); // Fetch the student ID from the URL params
    let navigate = useNavigate();

    // State to store student details
    const [student, setStudent] = useState({
        name: '',
        email: '',
        department: ''
    });

    // Loading state to show a loading message while data is being fetched
    const [loading, setLoading] = useState(true);

    const { name, email, department } = student;

    // Fetch student data when component is mounted or `id` changes
    useEffect(() => {
        loadStudent();
        // eslint-disable-next-line
    }, [id]); // Dependency array includes `id` to reload when ID changes

    const loadStudent = async () => {
        try {
            const result = await axios.get(`http://localhost:8080/students/student/${id}`);
            setStudent(result.data); // Set the student data into state
        } catch (error) {
            console.error("Error fetching student data:", error);
        } finally {
            setLoading(false); // Set loading to false once data is loaded
        }
    };

    // Handle input changes in the form
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setStudent((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    // Handle form submission and update student data
    const updateStudents = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:8080/students/update/${id}`, student);
            navigate('/view_students'); // Navigate back to the student list
        } catch (error) {
            console.error("Error saving student data:", error);
        }
    };

    // Show a loading message while data is being fetched
    if (loading) {
        return <div>Loading student data...</div>;
    }

    return (
        <div className='col-sm-8 py-2 px-5'>
            <form onSubmit={updateStudents}>
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

export default EditStudents;
