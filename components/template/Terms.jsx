import DropdownMenu from "@/components/ui/DropdownMenu";
import { useEffect, useState } from "react";
import { BsFileEarmarkSpreadsheetFill } from "react-icons/bs";
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import readTerms from "@/utils/terms/readTerms";
import createTerm from "@/utils/terms/createTerm";
import TermBtn from "@/components/terms/TermBtn";
import { defaultTermsArray } from "@/data/defaultTermsArray";

export default function Terms(){
    let [terms, setTerms] = useState([]);

    let [isOpen, setIsOpen] = useState(false);
    let [termTitle, setTermTitle] = useState("");

    async function fetchTerms(){
        const fetchedTerms = await readTerms();
        setTerms(fetchedTerms);
    };

    const submitFunc = async () => {
        setIsOpen(false);
        await createTerm(termTitle);
        await fetchTerms();
        setTermTitle("");
    }

    const createDefaultTerms = async () => {
        const fetchedTerms = await readTerms();
        
        if(!fetchedTerms.length > 0){
            for(const defaultTerm of defaultTermsArray){
                await createTerm(defaultTerm.title, defaultTerm.markRef);
            }
            fetchTerms(); //fetch terms again to update the state
        }
    }

    useEffect(() => {
        createDefaultTerms();
        fetchTerms(setTerms); 
    }, []);

    return(
        <>
            <DropdownMenu
                btn={
                    <Button
                        label="عناوين حقول الدرجات"
                    >
                        <BsFileEarmarkSpreadsheetFill className="size-4" />
                    </Button>
                }
                menuStyle="rounded-3xl"
            >
                {terms.map(term => (
                    <div 
                        key={term.id}
                    >
                        <TermBtn  
                            currentTerm={term}
                            fetchTerms={fetchTerms}
                        />
                    </div>
                ))}
                {/* <p 
                    className="px-5 py-1 whitespace-nowrap transition-all text-xl bg-comp/30 hover:bg-comp hover:text-black cursor-pointer"
                    onClick={() => setIsOpen(true)}
                >
                    إضافة فصل +
                </p> */}
            </DropdownMenu>
            {/* <Modal 
                title="إضافة فصل"
                sumbitLabel="إضافة"
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                submitFunc={submitFunc}
            >
                <form 
                    className="flex flex-col items-center gap-3"
                    onSubmit={e => {
                        e.preventDefault(),
                        submitFunc()
                    }}
                >
                    <input 
                        placeholder="عنوان الفصل"
                        className="py-1 px-4 bg-comp rounded-2xl w-72 border-accent1 border"
                        onChange={e => setTermTitle(e.target.value)}
                        name="title"
                        value={termTitle}
                        data-autofocus
                    />
                    <button type="submit" hidden />
                </form>
            </Modal> */}
        </>
    );
}