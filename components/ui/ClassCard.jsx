export default function ClassCard({label, numOfStudents, theme}){
    return(
        <div className="flex w-3/4 border border-opacity-25 max-w-96 h-24 bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl hover:scale-105 transition-all">
            <div className="p-4 overflow-hidden w-full self-center">
                <p className={`text-2xl font-bold text-${theme} leading-loose overflow-hidden text-ellipsis whitespace-nowrap`}>
                    {label}
                </p>
                <p className="overflow-hidden text-lg text-zinc-400">
                    عدد الطلاب: {numOfStudents}
                </p>
            </div>
            <svg width="16" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M 8 0 Q 4 4.8, 8 9.6 T 8 19.2 Q 4 24, 8 28.8 T 8 38.4 Q 4 43.2, 8 48 T 8 57.6 Q 4 62.4, 8 67.2 T 8 76.8 Q 4 81.6, 8 86.4 T 8 96 L 0 96 L 0 0 Z"
                    className={`fill-${theme} stroke stroke-${theme} stroke-2`}
                    strokeLinecap="round"
                ></path>
            </svg>
        </div>
    );
}