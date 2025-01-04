import getMarkForSubjectAndTerm from "@/utils/classpage/getMarkForSubjectAndTerm";
import { useState } from "react";
import updateMarks from "@/utils/marks/updateMarks";
import handleMarkInput from "@/utils/handleMarkInput";
import createMarks from "@/utils/marks/createMarks";
import DeleteCurrentMarkBtn from "@/components/gradeTable/DeleteCurrentMarkBtn";
import { useTheme } from "@/components/template/ConfigContext";

export default function TableBody({classId, studentId, classSubjects, terms, studentMarks, getStudentMarks, markMenu, setMarkMenu, setEmptyAllMenu}){
    const { setIsAlert } = useTheme();
    const [currentTerm, setCurrentTerm] = useState();
    const [mark, setMark] = useState();

    const [menuPosition, setMenuPosition] = useState();

    const handleMarkMenu = (e, term, mark) => {        
      e.preventDefault();
      setEmptyAllMenu(false);
      setMarkMenu(true);
      setMenuPosition({x: e.pageX, y: e.pageY});
      setCurrentTerm(term);
      setMark(mark);
    };

    const addMark = async (event, subjectId, term) => {
        event.preventDefault();
        await createMarks(classId, subjectId, studentId, term?.mark_ref, mark);
        await getStudentMarks();
        setMark("");
        setIsAlert(true);
    }

    const changeMark = async (event, term, currentMark) => {        
        event.preventDefault();
        await updateMarks(term?.mark_ref, mark, currentMark);
        await getStudentMarks();
        setMark("");
        setIsAlert(true);
    }

    return(
    <>
        {classSubjects?.map(subject => (
        <div 
            className="flex w-fit"
            key={subject.id}
        >
            {/* Subject title */}
            <div className="w-32 p-2 border-b border-r border-l border-black/30 text-center font-bold">
                {subject.title}
            </div>
            {/* Marks for each term for this subject */}
            {terms?.map((term, gradeIndex) => {            
            // round mark value before displaying it if there's value, else return empty string
            const currentMark = getMarkForSubjectAndTerm(studentMarks, subject.id);
            
            const markValue = currentMark && currentMark[term?.mark_ref] != null 
            ? Math.round(currentMark[term?.mark_ref]) 
            : "";

            // render non-editable field if mark is not supposed to be edited manually
            if (
                term?.mark_ref === "average_mark" ||
                term?.mark_ref === "final_mark" ||
                term?.mark_ref === "final_mark_after_second_try"
            ){
                return(
                <div 
                    key={gradeIndex}
                    className={`p-2 border-b border-l border-black/30 text-center w-16 ${markValue != "" && markValue < 50 ? "bg-danger/40" : ""}`}
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
                        onSubmit={e => changeMark(e, term, currentMark?.id)}
                        onContextMenu={e => handleMarkMenu(e, term, currentMark?.id)}
                    >
                        <input
                            type="text"
                            maxLength={3}
                            onKeyDown={e => handleMarkInput(e, setMark)}
                            placeholder={markValue}
                            className={`p-2 border-b last:border-l border-black/30 text-center w-16 placeholder:text-black cursor-cell ${markValue != "" && markValue < 50 ? "bg-danger/40" : ""}`}
                        />
                    </form>
                );
                } else {
                    return(
                        <form 
                            key={gradeIndex}
                            onSubmit={e => addMark(e, subject?.id, term)}
                            onContextMenu={e => handleMarkMenu(e, term, currentMark?.id)}
                        >
                            <input
                                type="text"
                                maxLength={3}
                                onKeyDown={e => handleMarkInput(e, setMark)}
                                placeholder={markValue}
                                className={`p-2 border-b last:border-l border-black/30 text-center w-16 placeholder:text-black cursor-cell ${markValue != "" && markValue < 50 ? "bg-danger/40" : ""}`}
                            />
                        </form>
                    );
                }
            }
            })}
        </div>
        ))}
        {classSubjects?.length == 0 &&
            <div className="p-2 border-b border-r border-l border-black/30 text-center font-bold">
                قائمة المواد الدراسية فارغة!
            </div>
        }
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
                        getMarks={getStudentMarks}
                        markId={mark}    
                        closeMenu={() => setMarkMenu(false)}
                    />
                </div>
            </div>
        )}
    </>
    );
}