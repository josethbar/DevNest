import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// import { redirect } from 'react-router-dom';


const API_URL = "http://localhost:3009/course";

function NewCourse(authenticated) {
    const [newCourse, setNewCourse] = useState({
        name: '',
        description: '',
        info: ''
    });


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewCourse({ ...newCourse, [name]: value });
    };

    const handleCreateCourse = async (e) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem("token");
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ course: newCourse })
                // body: JSON.stringify({ course: newCourse })
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Course created:', data);

            } else {
                const errorData = await response.json();
                console.error('Error creating course:', errorData.errors);
                

            }
        } catch (error) {
            console.error('Error creating course en el catch:', error);
        }
    };

    const navigate = useNavigate()

    useEffect(() => {
        console.log(authenticated, "estas?")
        if (authenticated == false) {
            navigate("/login")
        }
    }, [authenticated, navigate])



    return (

        <div className='container-cage'>
            <h1>Create Course</h1>

            <form onSubmit={handleCreateCourse}>

                <input
                    type="text"
                    name="name"
                    placeholder="Course Name"
                    value={newCourse.name}
                    onChange={handleInputChange}
                /> <br />

                <textarea
                    name="description"
                    placeholder="Course Description"
                    value={newCourse.description}
                    onChange={handleInputChange}
                ></textarea><br />

                <input
                    type="text"
                    name="info"
                    placeholder="Additional Info"
                    value={newCourse.info}
                    onChange={handleInputChange}
                /> <br />

                {/* <button type="submit" onClick={}>Create Course</button> */}

                {/* {newCourse && <redirect to="/" />} */}
            </form>
        </div>
    )
}

export default NewCourse;