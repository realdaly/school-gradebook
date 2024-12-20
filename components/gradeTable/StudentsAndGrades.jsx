import { useState } from "react";
import UpdateStudentBtn from "@/components/gradeTable/UpdateStudentBtn";
import DeleteStudentBtn from "@/components/gradeTable/DeleteStudentBtn";

export default function StudentsAndGrades({students, subjects, marks, currentTerm, getStudents}) {
    const [menuVisible, setMenuVisible] = useState(false);
    const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
    const [currentStudent, setCurrentStudent] = useState();

    const handleContextMenu = (e, student) => {
        e.preventDefault();
        setMenuVisible(true);
        setMenuPosition(e.pageY);
        setCurrentStudent(student);
    };

    const handleCloseMenu = () => {
        setMenuVisible(false);
    };

    return (
        <div onClick={handleCloseMenu}>
            {students?.map((student, studentIndex) => (
                <div
                    key={studentIndex}
                    className="flex odd:bg-domI border-x border-b border-black/30 last:rounded-b-2xl"
                >
                    <div className="w-8 px-1 py-1 text-center">{studentIndex + 1}</div>
                    <div
                        title={student.name}
                        className="min-w-[195px] max-w-[195px] overflow-clip px-2 py-1 border-r border-black/30 text-right whitespace-nowrap flex-shrink-0"
                        onContextMenu={e => handleContextMenu(e, student)}
                    >
                        {student.name}
                    </div>
                    {subjects.map((subject, gradeIndex) => {
                        const mark = marks.find(
                            (termMark) =>
                                termMark.student_id === student.id &&
                                termMark.subject_id === subject.id
                        );

                        // round mark value before displaying it
                        const markValue = mark ? Math.round(mark[currentTerm?.mark_ref] ?? 0) : "";

                        return (
                            <div
                                key={gradeIndex}
                                className="min-w-[105px] max-w-[105px] px-2 py-1 border-r border-black/30 text-center"
                            >
                                {markValue}
                            </div>
                        );
                    })}
                </div>
            ))}

            {/* right click menu */}
            {menuVisible && (
                <div
                    className="absolute z-10 mr-8"
                    style={{
                        top: `${menuPosition}px`,
                    }}
                >
                    <div className="absolute bg-white border border-black shadow-md rounded-md min-w-36">
                        <UpdateStudentBtn 
                            currentStudent={currentStudent}
                            getStudents={getStudents}
                            closeMenu={() => setMenuVisible(false)}
                        />
                        <DeleteStudentBtn 
                            currentStudent={currentStudent}
                            getStudents={getStudents}
                            closeMenu={() => setMenuVisible(false)}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}
