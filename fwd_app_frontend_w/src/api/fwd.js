const UrlApi_Fwd = "http://localhost:3009/";

export async function getUsers() {
  try {
    const token = localStorage.getItem("token");

    const requestUsers = await fetch(UrlApi_Fwd + "api/v1/users", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });

    const users = await requestUsers.json();
    console.log("Users from API:", users);
    return users;
  } catch (error) {
    return { error: "Hubo un error en el API - fwd.js" };
  }
}


export async function updateUserRole(userId, newRole) {
  try {
    const token = localStorage.getItem("token");

    // Verifica que el nuevo rol sea uno de los roles permitidos (student, profesor, admin)
    const allowedRoles = ['student', 'professor', 'admin'];
    if (!allowedRoles.includes(newRole)) {
      throw new Error('Rol no permitido');
    }

    const requestUpdateRole = await fetch(UrlApi_Fwd + `user_roles/${userId}/update_role`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({ role: newRole }),
    });

    if (!requestUpdateRole.ok) {
      throw new Error('Error al actualizar el rol del usuario');
    }

    const response = await requestUpdateRole.json();
    console.log('Respuesta de actualización de rol:', response);
    return response;
  } catch (error) {
    console.error('Error en updateUserRole:', error.message);
    return { error: 'Hubo un error en el API - fwd.js' };
  }
}


export async function updateUserState(userId, newState) {
  try {
    const token = localStorage.getItem("token");

    const requestUpdateState = await fetch(UrlApi_Fwd + `api/v1/users/${userId}/update_state`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({ state: newState }),
    });

    if (!requestUpdateState.ok) {
      throw new Error('Error al actualizar el estado del usuario');
    }

    const response = await requestUpdateState.json();
    console.log('Respuesta de actualización de estado:', response);
    return response;
  } catch (error) {
    console.error('Error en updateUserState:', error.message);
    return { error: 'Hubo un error en el API - fwd.js' };
  }
}

export async function getCourses() {
  try {
    const requestCourses = await fetch(UrlApi_Fwd + "course");
    const CourseData = await requestCourses.json(); //convierte mi request en un objeto
    // console.log(CourseData);
    return CourseData;
  } catch (error) {
    return { error: "hubo un error en el api-----fwd.js" };
  }
}

export async function getGroups() {
  try {
    const token = localStorage.getItem("token");

    const response = await fetch(UrlApi_Fwd + "group", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });

    const groupsData = await response.json();
    console.log("Grupos en API:", groupsData);
    return groupsData;
  } catch (error) {
    return { error: "Hubo un error en el API - fwd.js" };
  }
}

export async function fetchGroupUsers(groupId) {
  try {
    const token = localStorage.getItem("token");

    const response = await fetch(`http://localhost:3009/group/${groupId}/users`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token
      }
    });

    console.log("URL requested:", `http://localhost:3009/group/${groupId}/users`);
    if (!response.ok) {
      throw new Error(`Error en la solicitud: ${response.status} ${response.statusText}`);
    }

    const usersData = await response.json();
    console.log("Grupos en API:", usersData);
    return usersData.map(userGroup => userGroup.user);
  } catch (error) {
    console.error("Error al obtener usuarios en el grupo:", error.message);
    return { error: `Error al obtener usuarios en el grupo: ${error.message}` };
  }
}


export async function getGroupByName(groupName) {
  try {
    const token = localStorage.getItem("token");

    const response = await fetch(`${UrlApi_Fwd}group/${groupName}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });

    const groupData = await response.json();
    console.log("Grupo en API:", groupData);
    return groupData;
  } catch (error) {
    return { error: "Hubo un error en el API - fwd.js" };
  }
}

export async function getMedicalRecord() {
  try {
    const token = localStorage.getItem("token");

    const requestRecords = await fetch(UrlApi_Fwd + "medical_record", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });

    const records = await requestRecords.json();
    console.log(records);
    return records;
  } catch (error) {
    return { error: "Hubo un error en el API - fwd.js" };
  }
}

export async function getUserRole() {
  try {
    const token = localStorage.getItem("token");

    const requestRole = await fetch(UrlApi_Fwd + "user_roles", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });

    if (!requestRole.ok) {
      throw new Error('Error al obtener roles de usuario');
    }

    const userRoles = await requestRole.json();
    console.log('Roles de Usuario:', userRoles);
    return userRoles;
  } catch (error) {
    console.error('Error en getUserRole:', error.message);
    return { error: 'Hubo un error en el API - fwd.js' };
  }
}

export async function getUserRoleUnique(userId) {
  try {
    const token = localStorage.getItem("token");

    const requestRole = await fetch(`${UrlApi_Fwd}user_roles/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });

    if (!requestRole.ok) {
      throw new Error('Error al obtener el rol del usuario');
    }

    const userRole = await requestRole.json();
    console.log('Rol del Usuario:', userRole);
    return userRole;
  } catch (error) {
    console.error('Error en getUserRole:', error.message);
    return { error: 'Hubo un error en el API - fwd.js' };
  }
}


export async function getSubject() {
  try {
    const token = localStorage.getItem("token");

    const requestRole = await fetch(UrlApi_Fwd + "subject", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });

    const subjectData = await requestRole.json();
    console.log("subject en api", subjectData);
    return subjectData;
  } catch (error) {
    return { error: "Hubo un error en el API - fwd.js" };
  }
}

export async function postSubject(newSubjectData) {
  try {
    const token = localStorage.getItem("token");

    const response = await fetch(UrlApi_Fwd + "subject", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify(newSubjectData),
    });
    console.log("newsubjectdata en el api", newSubjectData); // Enviar los datos del nuevo subject en el cuerpo de la solicitud

    const subjectData = await response.json();
    console.log("subject en api", subjectData);
    return subjectData;
  } catch (error) {
    return { error: "Hubo un error en el API - fwd.js" };
  }
}

export const postUserSubject = async (userSubjectData) => {
  try {
    const token = localStorage.getItem("token");

    const response = await fetch(UrlApi_Fwd + "user_subject", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify(userSubjectData),
    });

    return response.json();
  } catch (error) {
    return { error: "Hubo un error en el API - fwd.js" };
  }
};

export const getSubjectTypes = async () => {
  try {
    const token = localStorage.getItem("token");
    
    const response = await fetch("http://localhost:3009/subject_types", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });

    const typesData = await response.json();
    return typesData;  // Devuelve los datos en lugar de llamar a setSubjectTypes
  } catch (error) {
    console.error("Error al obtener tipos de sujetos:", error);
    throw error;  // Propaga el error para que pueda ser manejado donde se llama a fetchSubjectTypes
  }
};

