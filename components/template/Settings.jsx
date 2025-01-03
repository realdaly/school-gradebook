import { useState } from "react";
import { IoSettingsSharp } from "react-icons/io5";
import { useTheme } from "@/components/template/ConfigContext";
import Modal from "@/components/ui/Modal";
import updateConfig from "@/utils/updateConfig";

export default function Settings(){
    const { 
        title, 
        setTitle, 
        school,
        setSchool,
        year,
        setYear,
        principal,
        setPrincipal,
        accentColor, 
        setAccentColor,
        setIsAlert
    } = useTheme();

    let [isOpen, setIsOpen] = useState(false);
    const colors = [
        "accent1",
        "accent2",
        "accent3",
        "accent4",
    ];

    const submitFunc = () => {
        setTitle(title);
        setAccentColor(accentColor);
        setIsOpen(false);
        updateConfig(title, school, year, principal, accentColor);
        setIsAlert(true);
    }

    return(
        <>
            <button 
                className="absolute -left-10 group p-3"
                title="الاعدادات"
                onClick={() => setIsOpen(true)}
            >
                <IoSettingsSharp className="size-6 text-white transition-all group-hover:rotate-180 " />
            </button>
            <Modal 
                title="إعدادات عـــامــــــــــــة"
                sumbitLabel="تـــــــــم"
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                submitFunc={submitFunc}
            >
                <form 
                    className="flex flex-col items-center gap-3"
                    onSubmit={e => {
                        e.preventDefault();
                        submitFunc();
                    }}
                >
                    <input 
                        placeholder="عنوان التطبيق في الترويسة"
                        className="py-1 px-4 bg-comp rounded-2xl w-96 border-accent1 border"
                        onChange={e => setTitle(e.target.value)}
                        name="title"
                        value={title ?? ""}
                        data-autofocus
                    />
                    <input 
                        placeholder="اسم المدرسة"
                        className="py-1 px-4 bg-comp rounded-2xl w-96 border-accent1 border"
                        onChange={e => setSchool(e.target.value)}
                        name="school"
                        value={school  ?? ""}
                    />
                    <input 
                        placeholder="السنة الدراسية"
                        className="py-1 px-4 bg-comp rounded-2xl w-96 border-accent1 border"
                        onChange={e => setYear(e.target.value)}
                        name="year"
                        value={year ?? ""}
                    />
                    <input 
                        placeholder="اسم مدير المدرسة"
                        className="py-1 px-4 bg-comp rounded-2xl w-96 border-accent1 border"
                        onChange={e => setPrincipal(e.target.value)}
                        name="principal"
                        value={principal ?? ""}
                    />
                    <div className="flex flex-wrap items-center">
                        {colors.map(color => (
                            <div
                                className="px-1.5 cursor-pointer transition-all hover:opacity-75"
                                key={color}
                                onClick={() => setAccentColor(color)}
                            >
                                <div
                                    className={`bg-${color} size-5 rounded-full ${
                                        accentColor === color ? "border-2 border-black" : ""
                                    }`}
                                ></div>
                            </div>
                        ))}
                    </div>
                    <button type="submit" hidden />
                </form>
            </Modal>   
        </>
    );
}