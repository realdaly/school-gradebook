import { useEffect, useState } from "react";
import { useTheme } from "@/components/template/ConfigContext";
import readStudentMarks from "@/utils/studentpage/readStudentMarks";
import readStudent from "@/utils/studentpage/readStudent";
import TableHeader from "@/components/studentpage/TableHeader";
import TableBody from "@/components/studentpage/TableBody";
import TableFooter from "@/components/studentpage/TableFooter";

export default function StudentTable({classId, isLiterary, studentId}){
    const { subjects, terms } = useTheme();
    let [studentInfo, setStudentInfo] = useState();
    let [studentMarks, setStudentMarks] = useState([]);
    let [classSubjects, setClassSubjects] = useState([]);

    // context menu states
    const [markMenu, setMarkMenu] = useState(false);
    const [emptyAllMenu, setEmptyAllMenu] = useState(false);

    // fetch class subjects based on the isLiterary flag
    async function getClassSubjects() {
        const filteredSubjects = subjects?.filter(
            subject => subject.is_literary == isLiterary
        );        
        setClassSubjects(filteredSubjects);
    }

    async function getStudentInfo(){
      const fetchedInfo = await readStudent(studentId);
      setStudentInfo(fetchedInfo[0] || "");
    };

    async function getStudentMarks(){
      const fetchedMarks = await readStudentMarks(studentId);
      setStudentMarks(fetchedMarks);
    };

    // function to close all context menus
    const closeMenus = () => {
      setMarkMenu(false);
      setEmptyAllMenu(false);
    }

    useEffect(() => {
        getClassSubjects();
        getStudentInfo();
        getStudentMarks();
    }, [subjects]);
  
    return (
      <div 
        onClick={() => closeMenus()}
        id="GradeTable"
        className="w-fit max-w-4xl mx-auto p-4"
      >
        <div className="flex flex-col w-fit">
          <TableHeader 
            studentId={studentId}
            getStudentMarks={getStudentMarks}
            terms={terms}
            emptyAllMenu={emptyAllMenu}
            setEmptyAllMenu={setEmptyAllMenu}
            setMarkMenu={setMarkMenu}
          />
          <TableBody 
            classId={classId}
            studentId={studentId}
            classSubjects={classSubjects}
            studentMarks={studentMarks}
            terms={terms}
            getStudentMarks={getStudentMarks}
            markMenu={markMenu}
            setMarkMenu={setMarkMenu}
            setEmptyAllMenu={setEmptyAllMenu}
          />
          <TableFooter 
            studentId={studentId}
            studentInfo={studentInfo}
          />
        </div>
      </div>
    );
}  