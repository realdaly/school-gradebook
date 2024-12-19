import { useEffect, useState } from "react";
import readStudents from "@/utils/classpage/readStudents";
import CreateStudentsBtn from "@/components/classpage/CreateStudentsBtn";
import GradeTable from "@/components/classpage/GradeTable";
import readSubjects from "@/utils/subjects/readSubjects";

export default function StudentsMarks({classId}){
    let [subjects, setSubjects] = useState([]);
    let [students, setStudents] = useState([]);

    async function getSubjects(){
        const fetchedSubjects = await readSubjects();
        setSubjects(fetchedSubjects);
    };

    async function getStudents(){
        const fetchedStudents = await readStudents(classId);
        setStudents(fetchedStudents);
    };

    useEffect(() => {
        getSubjects();
        getStudents(setStudents);
    }, []);

    return(
        <>
            <div>
                <GradeTable
                    subjects={subjects}
                    students={students}
                    classId={classId}
                />
            </div>
            <CreateStudentsBtn 
                classId={classId}
                getStudents={getStudents}
            />
        </>
    );
}