import { useEffect, useState } from "react";
import updateStudentInfo from "@/utils/studentpage/updateStudentInfo";
import { useTheme } from "@/components/template/ConfigContext"

export default function TableFooter({studentId, studentInfo}){
    const { setIsAlert } = useTheme();
    const [firstTryResult, setFirstTryResult] = useState("");
    const [secondTryResult, setSecondTryResult] = useState("");

    const submitFunc = async (e, field, value) => { 
        e.preventDefault();    
        await updateStudentInfo(field, value, studentId);
        setIsAlert(true);
    }

    useEffect(() => {
        setFirstTryResult(studentInfo?.first_try_result ?? "");
        setSecondTryResult(studentInfo?.second_try_result ?? "");
    }, [studentInfo]);

    return(
        <>
            <div className="flex border-l border-b border-black/30">
                <div className="w-32 shrink-0 bg-green-100 p-2 border-l border-r border-black/30 text-right font-bold">نتيجة الدور الأول</div>
                <form 
                    onSubmit={e => submitFunc(e, "first_try_result", firstTryResult)}
                    className="flex items-center w-full"
                >
                    <input
                        className="p-2 w-full block" 
                        type="text" 
                        name="first_try_result" 
                        value={firstTryResult}
                        onChange={e => setFirstTryResult(e.target.value)}
                    />
                </form>
            </div>
            <div className="flex border-b border-l border-black/30">
                <div className="w-32 shrink-0 bg-red-100 p-2 border-l border-r border-black/30 text-right font-bold">نتيجة الدور الثاني</div>
                <form 
                    onSubmit={e => submitFunc(e, "second_try_result", secondTryResult)}
                    className="flex items-center w-full"
                >
                    <input
                        className="p-2 w-full block" 
                        type="text"
                        name="second_try_result" 
                        value={secondTryResult}
                        onChange={e => setSecondTryResult(e.target.value)}
                    />
                </form>
            </div>
        </>
    );
}