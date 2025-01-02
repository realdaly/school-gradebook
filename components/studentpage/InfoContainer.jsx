import { useTheme } from "@/components/template/ConfigContext";
import UpdateStudentBtn from "@/components/gradeTable/UpdateStudentBtn";
import { useState } from "react";

export default function InfoContainer({studentInfo, classLabel, studentInfoMenu, setStudentInfoMenu, getStudentInfo}){
    const { school, year } = useTheme();
    const [menuPosition, setMenuPosition] = useState();

    const handleStudentInfoMenu = e => {        
        e.preventDefault();
        setStudentInfoMenu(true);
        setMenuPosition({x: e.pageX, y: e.pageY});
    };

    return(
        <>
            <div className="relative flex justify-center text-white rounded-t-2xl pb-3">
                <div className="flex justify-center items-center text-center text-xl w-1/3 bg-slate-500 rounded-2xl p-2">
                    <p className="w-28 line-clamp-5">
                        {school}
                    </p>
                </div>
                <div className="text-center w-1/3 text-black self-center">
                    <p className="text-2xl font-bold">سجل الدرجات</p>
                    <p className="text-xl font-bold">للعام الدراسي</p>
                    <p className="text-lg">{year}</p>
                </div>
                <div 
                    onContextMenu={e => handleStudentInfoMenu(e)}
                    className="w-5/12 text-lg bg-slate-500 rounded-2xl p-2"
                >
                    <p className="line-clamp-2">
                        <span className="ml-1">
                            اسم الطالب: 
                        </span>
                        {studentInfo?.name}
                    </p>
                    <p>الصف: {classLabel}</p>
                    <p className="line-clamp-1">
                        <span className="ml-1">
                            رقم القيد: 
                        </span>
                        {studentInfo?.reg_num}
                    </p>
                </div>
            </div>
            
            {/* student right click menu */}
            {studentInfoMenu && (
                <div
                    className="absolute z-10 mr-8"
                    style={{
                        top: `${menuPosition.y}px`,
                        left: `${menuPosition.x}px`
                    }}
                >
                    <div className="absolute bg-white border border-black shadow-md rounded-md min-w-36">
                        <UpdateStudentBtn 
                            currentStudent={studentInfo}
                            closeMenu={() => setStudentInfoMenu(false)}
                            getStudent={getStudentInfo}
                        />
                    </div>
                </div>
            )}
        </>
    );
}