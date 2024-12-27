import { useState } from "react";
import handleMarkInput from "@/utils/handleMarkInput";
import updateMarks from "@/utils/marks/updateMarks";
import createMarks from "@/utils/marks/createMarks";
import SuccessAlert from "@/components/template/SuccessAlert";
import UpdateStudentBtn from "@/components/gradeTable/UpdateStudentBtn";
import DeleteStudentBtn from "@/components/gradeTable/DeleteStudentBtn";
import DeleteCurrentMarkBtn from "./DeleteCurrentMarkBtn";
import Link from "next/link";

export default function StudentsAndGrades({students, subjects, marks, currentTerm, getStudents, getMarks, classId, classLabel, isLiterary}){
    const [isAlert, setIsAlert] = useState(false);
    const [studentMenu, setStudentMenu] = useState(false);
    const [markMenu, setMarkMenu] = useState(false);
    const [menuPosition, setMenuPosition] = useState();

    const [currentStudent, setCurrentStudent] = useState();
    const [mark, setMark] = useState();

    const addMark = async (event, subjectId, studentId) => {
        event.preventDefault();
        await createMarks(classId, subjectId, studentId, currentTerm?.mark_ref, mark);
        await getMarks();
        setMark("");
        setIsAlert(true);
    }

    const changeMark = async (event, currentMark) => {        
        event.preventDefault();
        await updateMarks([currentTerm?.mark_ref], mark, currentMark);
        await getMarks();
        setMark("");
        setIsAlert(true);
    }

    const handleStudentMenu = (e, student) => {        
        e.preventDefault();
        setCurrentStudent(student);
        setStudentMenu(true);
        setMarkMenu(false);
        setMenuPosition({x: e.pageX, y: e.pageY});
    };

    const handleMarkMenu = (e, mark) => {        
        e.preventDefault();
        setMarkMenu(true);
        setStudentMenu(false);
        setMenuPosition({x: e.pageX, y: e.pageY});
        setMark(mark);
    };

    const closeMenus = () => {
        setStudentMenu(false);
        setMarkMenu(false);
    }

    return (
        <div onClick={closeMenus}>
            {students?.map((student, studentIndex) => (
                <div
                    key={studentIndex}
                    className="flex border-x border-b border-black/30"
                >
                    <div className={`w-8 px-1 py-1 text-center ${student.notes != "" && student.notes != null ? "bg-amber-200" : ""}`}>
                        {studentIndex + 1}
                    </div>
                    <Link
                        href={`student?classlabel=${classLabel}&classid=${classId}&isliterary=${isLiterary}&studentid=${student.id}&studentname=${student.name}`}
                        title={student.name}
                        className="min-w-[195px] max-w-[195px] overflow-clip px-2 py-1 border-r border-black/30 text-right whitespace-nowrap flex-shrink-0"
                        onContextMenu={e => handleStudentMenu(e, student)}
                    >
                        {student.name}
                    </Link>
                    {subjects.map((subject, gradeIndex) => {
                        const currentMark = marks.find(
                            (termMark) =>
                                termMark.student_id === student.id &&
                                termMark.subject_id === subject.id
                        );

                        // round mark value before displaying it if there's value, else return empty string
                        const markValue = currentMark?.[currentTerm?.mark_ref] != null 
                            ? Math.round(currentMark[currentTerm?.mark_ref]) 
                            : "";

                            // render non-editable field if mark is not supposed to be edited manually
                            if(currentTerm?.mark_ref == "average_mark" || currentTerm?.mark_ref == "final_mark" || currentTerm?.mark_ref == "final_mark_after_second_try"){
                                return(
                                    <div
                                        key={gradeIndex}
                                        className={`min-w-[105px] max-w-[105px] px-2 py-1 border-r border-black/30 text-center ${markValue != "" && markValue < 50 ? "bg-danger/40" : ""}`}
                                    >
                                        {markValue}
                                    </div>
                                )
                            } else {
                                // render edit form if there's a mark already
                                if(currentMark){
                                    return (
                                        <form
                                            key={gradeIndex}
                                            onSubmit={e => changeMark(e, currentMark?.id)}
                                            onContextMenu={e => handleMarkMenu(e, currentMark?.id)}
                                        >
                                            <input
                                                type="text"
                                                maxLength={3}
                                                onKeyDown={e => handleMarkInput(e, setMark)}
                                                placeholder={markValue}
                                                className={`min-w-[105px] max-w-[105px] px-2 py-1 border-r border-black/30 text-center placeholder:text-black cursor-cell ${markValue != "" && markValue < 50 ? "bg-danger/40" : ""}`}
                                            />
                                        </form>
                                    );
                                } else {
                                    return(
                                        <form
                                            key={gradeIndex}
                                            onSubmit={e => addMark(e, subject.id, student.id)}
                                            onContextMenu={e => handleMarkMenu(e, currentMark?.id)}
                                        >
                                            <input
                                                type="text"
                                                maxLength={3}
                                                onKeyDown={e => handleMarkInput(e, setMark)}
                                                placeholder={markValue}
                                                className="min-w-[105px] max-w-[105px] px-2 py-1 border-r border-black/30 text-center placeholder:text-black cursor-cell"
                                            />
                                        </form>
                                    );
                                }
                            }
                    })}
                </div>
            ))}

            {/* student right click menu */}
            {studentMenu && (
                <div
                    className="absolute z-10 mr-8"
                    style={{
                        top: `${menuPosition.y}px`,
                    }}
                >
                    <div className="absolute bg-white border border-black shadow-md rounded-md min-w-36">
                        <UpdateStudentBtn 
                            currentStudent={currentStudent}
                            getStudents={getStudents}
                            closeMenu={() => setStudentMenu(false)}
                        />
                        <DeleteStudentBtn 
                            currentStudent={currentStudent}
                            getStudents={getStudents}
                            closeMenu={() => setStudentMenu(false)}
                        />
                    </div>
                </div>
            )}
            {/* mark right click menu */}
            {markMenu && (
                <div
                    className="absolute z-10 mr-8"
                    style={{
                        top: `${menuPosition.y}px`,
                        left: `${menuPosition.x}px`,
                    }}
                >
                    <div className="absolute bg-white border border-black shadow-md rounded-md min-w-28">
                        <DeleteCurrentMarkBtn 
                            currentTerm={currentTerm?.mark_ref}
                            getMarks={getMarks}
                            markId={mark}    
                            closeMenu={() => setMarkMenu(false)}
                        />
                    </div>
                </div>
            )}
            <SuccessAlert
                isVisible={isAlert}
                setIsVisible={setIsAlert}
                message="تم"
            />
        </div>
    );
}
