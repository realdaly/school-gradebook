export default function TableHeader({terms}){
    return(
        <div className="flex w-fit bg-comp rounded-t-2xl">
            <div className="w-32 p-2 border-b border-black/30 font-bold flex items-center justify-center">الدرس</div>
            {terms?.map(term =>
              <div 
                key={term?.id} 
                className="p-2 border-r border-b border-black/30 relative h-28 w-16 flex items-center justify-center"
              >
                <div className="text-center font-bold absolute bottom-0 left-14 origin-bottom-left -rotate-90 transform p-2 w-28 h-12 flex items-center justify-center">
                  {term?.title}
                </div>
              </div>
            )}
        </div>
    );
}