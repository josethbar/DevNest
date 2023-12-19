import React, { useState } from 'react';
import Group from './Group';
import { useNavigate } from 'react-router-dom';


export default function NewGroup() {
    const API_URL = "http://localhost:3009/group";

    const [grupoData, setGrupoData] = useState({
        name: '',
        quantity: ''
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setGrupoData({ ...grupoData, [name]: value });
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
                body: JSON.stringify({ groups: grupoData })
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Group created:', data);
                console.log('Group created. Redirecting...');
            } else {
                const errorData = await response.json();
                console.error('Error creating group:', errorData.errors);
                console.log('Server response:', errorData);
            }
        } catch (error) {
            console.error('Error creating group en el catch:', error);
        }
        
        if(grupoData){
            console.log("weeeeeeeee");
            navigate("/group");
        }

    };

    return (
        <div>
            <h1>NewGroup</h1>

            <form onSubmit={handleCreateCourse}>
                <input
                    type="text"
                    name="name"
                    placeholder="Group Name"
                    value={grupoData.name} // Use grupoData.name here
                    onChange={handleChange}
                /> <br />

                <textarea
                    name="quantity"
                    placeholder="Group Quantity"
                    value={grupoData.quantity} // Use grupoData.quantity here
                    onChange={handleChange}
                ></textarea><br />

                <button type="submit">Create Group</button>
            </form>
        </div>
    )
}
