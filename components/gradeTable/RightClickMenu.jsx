import UpdateStudentBtn from "@/components/gradeTable/UpdateStudentBtn";
import DeleteStudentBtn from "@/components/gradeTable/DeleteStudentBtn";

export default function RightClickMenu({menuPosition, currentStudent, getStudents, setMenuVisible}){
    return(
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
    );
}