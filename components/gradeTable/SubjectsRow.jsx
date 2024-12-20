export default function SubjectsRow({subjects}){
    return(
        <div className="flex bg-comp text-center border-x border-b border-black/30">
            <div className="w-8 border-l text-base font-bold border-black/30">ت</div>
            <div className="min-w-[195px] max-w-[195px] overflow-clip px-2 py-1 text-base font-bold whitespace-nowrap">اسم الطالب</div>
            {subjects?.map(subject => (
                <div 
                    key={subject.id} 
                    className="min-w-[105px] max-w-[105px] px-2 py-1 border-r border-black/30 text-base font-bold whitespace-nowrap"
                >
                    {subject.title}
                </div>
            ))}
        </div>
    );
}