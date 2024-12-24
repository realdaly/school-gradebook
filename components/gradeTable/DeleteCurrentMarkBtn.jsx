import { BsEraserFill } from "react-icons/bs";
import updateMarks from "@/utils/marks/updateMarks";

export default function DeleteCurrentMarkBtn({currentTerm, markId, getMarks, closeMenu}){
    const submitFunc = async () => {
        await updateMarks(currentTerm, null, markId);
        await getMarks();
        closeMenu();
    }

    return(
        <>
            <button
                onClick={e => {
                    e.stopPropagation(); // Prevent the parent click event
                    submitFunc();
                }}
                className="text-green-600 transition-all hover:opacity-75 flex justify-between w-full font-bold hover:bg-comp/50 px-2 py-1"
            >
                إفراغ الحقل
                <BsEraserFill className="size-5" />
            </button>
        </>
    );
}