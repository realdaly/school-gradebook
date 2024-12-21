import { useState } from "react";
import RightClickMenu from "@/components/gradeTable/RightClickMenu";
import handleMarkInput from "@/utils/handleMarkInput";
import updateMarks from "@/utils/marks/updateMarks";
import createMarks from "@/utils/marks/createMarks";
import SuccessAlert from "@/components/template/SuccessAlert";

export default function StudentsAndGrades({students, subjects, marks, currentTerm, getStudents, getMarks, classId}) {
    const [isAlert, setIsAlert] = useState(false);
    const [menuVisible, setMenuVisible] = useState(false);
    const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });

    const [currentStudent, setCurrentStudent] = useState();
    const [mark, setMark] = useState();

    const addMark = (event, subjectId, studentId) => {
        event.preventDefault();
        createMarks(classId, subjectId, studentId, currentTerm.mark_ref, mark);
        setMark("");
        getMarks();
        setIsAlert(true);
    }

    const changeMark = (event, currentMark) => {        
        event.preventDefault();
        updateMarks([currentTerm?.mark_ref], mark, currentMark);
        setMark("");
        getMarks();
        setIsAlert(true);
    }

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
                    className="flex odd:bg-domI border-x border-b border-black/30"
                >
                    <div className={`w-8 px-1 py-1 text-center ${student.notes != "" && student.notes != null ? "bg-amber-200" : ""}`}>{studentIndex + 1}</div>
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

                        // round mark value before displaying it if there's value, else return empty string
                        const markValue = mark?.[currentTerm?.mark_ref] != null 
                            ? Math.round(mark[currentTerm.mark_ref]) 
                            : "";

                            // render non-editable field if mark is not supposed to be edited manually
                            if(currentTerm.mark_ref == "average_mark" || currentTerm.mark_ref == "final_mark" || currentTerm.mark_ref == "final_mark_after_second_try"){
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
                                if(mark){
                                    return (
                                        <form
                                            key={gradeIndex}
                                            onSubmit={e => changeMark(e, mark?.id)}
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

            {/* right click menu */}
            {menuVisible && (
                <RightClickMenu 
                    currentStudent={currentStudent}
                    getStudents={getStudents}
                    menuPosition={menuPosition}
                    setMenuVisible={setMenuVisible}
                />
            )}
            <SuccessAlert
                isVisible={isAlert}
                setIsVisible={setIsAlert}
                message="تم"
            />
        </div>
    );
}
