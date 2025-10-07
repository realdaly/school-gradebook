import { useEffect, useState } from "react";
import { useTheme } from "@/components/template/ConfigContext";
import readStudentMarks from "@/utils/studentpage/readStudentMarks";
import readStudent from "@/utils/studentpage/readStudent";
import TableHeader from "@/components/studentpage/TableHeader";
import TableBody from "@/components/studentpage/TableBody";
import TableFooter from "@/components/studentpage/TableFooter";
import InfoContainer from "@/components/studentpage/InfoContainer";
import readStudents from "@/utils/classpage/readStudents";
import Button from "@/components/ui/Button";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";

export default function StudentTable({ classId, classLabel, category, setStudentName, studentId: defaultStudentId }) {
  const { subjects, terms } = useTheme();

  const [studentId, setStudentId] = useState(defaultStudentId); // State for current student ID
  const [studentInfo, setStudentInfo] = useState();
  const [studentMarks, setStudentMarks] = useState([]);
  const [classSubjects, setClassSubjects] = useState([]);
  const [students, setStudents] = useState([]);

  // Context menu states
  const [markMenu, setMarkMenu] = useState(false);
  const [emptyAllMenu, setEmptyAllMenu] = useState(false);
  const [studentInfoMenu, setStudentInfoMenu] = useState(false);

  // Fetch class subjects based on the category
  async function getClassSubjects() {
    const filteredSubjects = subjects?.filter(
      (subject) => subject.category == category
    );
    setClassSubjects(filteredSubjects);
  }

  async function getStudentInfo() {
    const fetchedInfo = await readStudent(studentId);
    setStudentName(fetchedInfo[0]?.name);
    setStudentInfo(fetchedInfo[0] || "");
  }

  async function getStudentMarks() {
    const fetchedMarks = await readStudentMarks(studentId);
    setStudentMarks(fetchedMarks);
  }

  async function getStudents() {
    const fetchedStudents = await readStudents(classId);
    setStudents(fetchedStudents);
  }

  // Calculate the next and previous students
  const getNextPrevStudents = () => {
    const currentIndex = students.findIndex((student) => student.id == studentId);
    const prevStudent = students[currentIndex - 1];
    const nextStudent = students[currentIndex + 1];

    return {
      prevStudent,
      nextStudent,
    };
  };

  // Close all context menus
  const closeMenus = () => {
    setMarkMenu(false);
    setEmptyAllMenu(false);
    setStudentInfoMenu(false);
  };

  // Fetch data when component mounts
  useEffect(() => {
    if (subjects) {
      getClassSubjects();
      getStudents();
    }
  }, [subjects]);

  // Fetch student-specific data when the studentId changes
  useEffect(() => {
    if (studentId) {
      getStudentInfo();
      getStudentMarks();
    }
  }, [studentId]);

  const { prevStudent, nextStudent } = getNextPrevStudents();

  return (
    <div
      onClick={() => closeMenus()}
      id="GradeTable"
      className="w-fit max-w-4xl mx-auto p-4 flex items-center gap-x-20"
    >
      {/* Previous Student Button */}
      <Button 
        title="عرض معلومات الطالب السابق"
        clickFunc={() => setStudentId(prevStudent?.id)}
        style={`py-3 select-none ${prevStudent ?? "opacity-20 pointer-events-none"}`}
      >
        <FaArrowRight className="size-6" />
      </Button>
      <div>
        <InfoContainer
          studentId={studentId}
          studentInfo={studentInfo}
          classLabel={classLabel}
          studentInfoMenu={studentInfoMenu}
          setStudentInfoMenu={setStudentInfoMenu}
          getStudentInfo={getStudentInfo}
        />
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
          <TableFooter studentId={studentId} studentInfo={studentInfo} />
        </div>
      </div>
      {/* Next Student Button */}
      <Button 
        title="عرض معلومات الطالب التالي"
        clickFunc={() => setStudentId(nextStudent?.id)}
        style={`py-3 select-none ${nextStudent ?? "opacity-20 pointer-events-none"}`}
      >
        <FaArrowLeft className="size-6" />
      </Button>
    </div>
  );
}
