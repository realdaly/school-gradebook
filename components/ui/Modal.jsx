import { Description, Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react";

export default function Modal({isOpen, setIsOpen, title, desc, sumbitLabel, submitFunc, children}){
    return(
        <Dialog 
            open={isOpen} 
            onClose={() => setIsOpen(false)} 
            className="relative z-50 transition duration-150 ease-out data-[closed]:opacity-0"
            transition
        >
            <DialogBackdrop className="fixed inset-0 bg-black/70" />
            <div className="fixed inset-0 flex w-screen h-screen items-center justify-center p-4">
                <DialogPanel className="max-w-lg space-y-4 border bg-white p-7 rounded-2xl">
                    <DialogTitle className="font-bold text-xl text-center">
                        {title}
                    </DialogTitle>
                    <Description>{desc}</Description>
                    {children}
                    <div className="flex gap-4">
                        <button
                            className="text-white bg-danger py-0.5 px-3 rounded-full block mx-auto transition-all hover:opacity-75" 
                            onClick={() => setIsOpen(false)}
                        >
                            إلغاء
                        </button>
                        <button
                            className="text-white bg-success py-0.5 px-3 rounded-full block mx-auto transition-all hover:opacity-75"
                            onClick={submitFunc}
                            data-autofocus
                        >
                            {sumbitLabel}
                        </button>
                    </div>
                </DialogPanel>
            </div>
        </Dialog>
    );
}