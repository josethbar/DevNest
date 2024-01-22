import React from 'react'
import { getSubject } from '../../api/fwd';
import { useState, useEffect } from 'react';

function Subject() {

    const [subject, setSubject] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const usersData = await getSubject();

                if (!usersData.error) {
                    setSubject(usersData);
                    // console.log("suject en subject", subject);
                } else {
                    console.error(usersData.error);
                }
            } catch (error) {
                console.error("Error al obtener usuarios:", error);
            }
        };

        fetchUsers();
    }, []);

    return (
        <div>
            <h1>Subjects</h1>
            <ul>
                {subject.map(subject => (
                    <li key={subject.id}>
                        <strong>Name:</strong> {subject.name}<br />
                        <strong>Type:</strong> {subject.type}<br />
                        <strong>Description:</strong> {subject.description}<br />
                        <strong>Grade:</strong> {subject.grade}<br />
                        {/* Aquí puedes agregar más información según las columnas de tu modelo */}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Subject