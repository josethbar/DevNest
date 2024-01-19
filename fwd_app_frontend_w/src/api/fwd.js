const UrlApi_Fwd = "http://localhost:3009/";

export async function getUsers() {
  try {
    const token = localStorage.getItem("token");

    const requestUsers = await fetch(UrlApi_Fwd + "api/v1/users", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token
      },
    });

    const users = await requestUsers.json();
    console.log("Users from API:", users);
    return users;
  } catch (error) {
    return { error: "Hubo un error en el API - fwd.js" };
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
    const requestGroups = await fetch(UrlApi_Fwd + "group");
    const groupData = await requestGroups.json(); //convierte mi request en un objeto
    console.log(groupData);
    return groupData;
  } catch (error) {
    return { error: "hubo un error en el api-----fwd.js" };
  }
}

export async function getMedicalRecord() {
  try {
    const token = localStorage.getItem("token");

    const requestRecords = await fetch(UrlApi_Fwd + "medical_record", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token
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

    const requestRole = await fetch(UrlApi_Fwd + "user_role", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token
      },
    });

    const UserRole = await requestRole.json();
    console.log(UserRole);
    return UserRole;
  } catch (error) {
    return { error: "Hubo un error en el API - fwd.js" };
  }
}
