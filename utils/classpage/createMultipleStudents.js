import createStudent from "@/utils/classpage/createStudent";

export default async function createMultipleStudents(studentNames, classId) {
    const namesArray = studentNames.split('\n').map(name => name.trim()).filter(name => name); // split names by new line
    for (let name of namesArray) {
        await createStudent(name, classId);
    }
}