export default function TableFooter({studentInfo}){
    return(
        <>
            <div className="flex border-l border-b border-black/30">
                <div className="w-32 bg-green-100 p-2 border-l border-r border-black/30 text-right font-bold">نتيجة الدور الأول</div>
                <div className="px-2 flex items-center">{studentInfo?.first_try_result}</div>
            </div>
            <div className="flex border-b border-l border-black/30">
                <div className="w-32 bg-red-100 p-2 border-l border-r border-black/30 text-right font-bold">نتيجة الدور الثاني</div>
                <div className="px-2 flex items-center">{studentInfo?.second_try_result}</div>
            </div>
        </>
    );
}