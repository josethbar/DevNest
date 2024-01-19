import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../PrivateText/AuthContext";
import { getMedicalRecord, getUserRole, getUsers } from "../../api/fwd";
import "./Records.css";

const RecordsComponent = () => {
  const { authenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  const [records, setRecords] = useState([]);
  const [isLoadingRecords, setIsLoadingRecords] = useState(true);
  const [error, setError] = useState(null);
  const [filteredRecords, setFilteredRecords] = useState([]);
  const [userDataFromLocalStorage, setUserDataFromLocalStorage] = useState({});
  const [userRole, setUserRole] = useState(null);
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedUserData =
          JSON.parse(localStorage.getItem("userData")) || {};
        setUserDataFromLocalStorage(storedUserData);

        if (!authenticated) {
          navigate("/login");
          return;
        }

        const [medicalRecords, userRoleData] = await Promise.all([
          getMedicalRecord(),
          getUserRole(),
        ]);

        setRecords(medicalRecords);
        setUserRole(userRoleData.role);
        setIsLoadingRecords(false);
      } catch (error) {
        console.error("Error al obtener registros:", error);
        setError(`Error al obtener registros desde la API: ${error.message}`);
        setIsLoadingRecords(false);
      }
    };

    fetchData();
  }, [authenticated, navigate]);

  useEffect(() => {
    if (records.length > 0 && userRole) {
      filterRecords(userRole, searchTerm);
    }
  }, [records, userRole, searchTerm]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersData = await getUsers();

        if (!usersData.error) {
          setUsers(usersData);
        } else {
          console.error(usersData.error);
        }
      } catch (error) {
        console.error("Error al obtener usuarios:", error);
      }
    };

    fetchUsers();
  }, []);

  const filterRecords = (role, term) => {
    if (!role) {
      return;
    }

    let filtered = [];

    if (role === "student") {
      const userRecords = records.filter(
        (record) => record.user_id === userDataFromLocalStorage.id
      );
      filtered = userRecords;
    } else {
      filtered = records.slice(); // Create a copy of records array
    }

    // Filter records by user name and suffering
    filtered = filtered.filter((record) => {
      const userName = getUserName(record.user_id).toLowerCase();
      const suffering = record.suffering.toLowerCase();
      const searchTermLower = term.toLowerCase();

      return (
        userName.includes(searchTermLower) ||
        suffering.includes(searchTermLower)
      );
    });

    // Sort filtered records by user name
    filtered.sort((a, b) => {
      const nameA = getUserName(a.user_id).toLowerCase();
      const nameB = getUserName(b.user_id).toLowerCase();
      return nameA.localeCompare(nameB);
    });

    setFilteredRecords(filtered);
  };

  const formNavigate = () => {
    navigate("/healthyForm");
  };

  const getUserName = (userId) => {
    const user = Array.isArray(users)
      ? users.find((u) => u.id === userId)
      : null;

    if (user) {
      const firstName = user.first_name || "Desconocido";
      const lastName = user.last_name || "";
      return `${firstName} ${lastName}`.trim();
    }

    return "Desconocido";
  };

  return (
    <div>
      {isLoadingRecords ? (
        <div>
          <div class="loader-container">
            <div class="loader"></div>
            <div class="loader-text">cargando expedientes..</div>
          </div>
        </div>
      ) : (
        <div>
          <div className="recordsHeader">
            <h1>
              {userDataFromLocalStorage.first_name}{" "}
              {userDataFromLocalStorage.last_name}
            </h1>
            <input
              className="buscador"
              type="text"
              placeholder="Buscar por padecimiento o nombre de usuario"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="newForm" onClick={formNavigate}>
              Llenar un nuevo formulario
            </button>
          </div>
          <ul>
            {filteredRecords.map((record) => (
              <li key={record.id}>
                {userRole === "student" ? (
                  <>
                    <p>Padecimiento: {record.suffering}</p>
                    <p>Especificaciones: {record.specifications}</p>
                  </>
                ) : (
                  <>
                    <p>Usuario: {getUserName(record.user_id)}</p>
                    <p>Padecimiento: {record.suffering}</p>
                    <p>Especificaciones: {record.specifications}</p>
                  </>
                )}
                <hr />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default RecordsComponent;
