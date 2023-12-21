
const UrlApi_Fwd = "http://localhost:3009/"

export async function getCourses() {

    try {
        const requestCourses = await fetch(UrlApi_Fwd+"course");
        const CourseData = await requestCourses.json(); //convierte mi request en un objeto
        console.log(CourseData);
        return CourseData;

    } catch (error) {
        return { error: "hubo un error en el api-----fwd.js" }
    }

}

export async function getGroups() {

    try {
        const requestGroups = await fetch(UrlApi_Fwd+"group");
        const groupData = await requestGroups.json(); //convierte mi request en un objeto
        console.log(groupData);
        return groupData ;

    } catch (error) {
        return { error: "hubo un error en el api-----fwd.js" }
    }

}