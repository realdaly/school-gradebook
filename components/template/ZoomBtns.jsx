import { RiZoomInFill, RiZoomOutFill } from "react-icons/ri";
import { TbZoomReplace } from "react-icons/tb";
import Button from "@/components/ui/Button";
import { useState } from "react";

export default function ZoomBtns(){
    const [zoomLevel, setZoomLevel] = useState(1.0);

    const updateZoom = async (newZoomLevel) => {
        try {
            const { getCurrentWebview } = await import("@tauri-apps/api/webview");
            await getCurrentWebview().setZoom(newZoomLevel);
            setZoomLevel(newZoomLevel);
        } catch (error) {
            console.error(error);
        }
    };

    const zoomIn = () => {
        const newZoom = zoomLevel + 0.1; // Increase zoom by 0.1
        updateZoom(newZoom);
    };

    const zoomOut = () => {
        const newZoom = Math.max(0.1, zoomLevel - 0.1); // Decrease zoom by 0.1 but not below 0.1
        updateZoom(newZoom);
    };

    const resetZoom = () => {
        updateZoom(1.0); // Reset to default zoom level
    };

    return(
        <div className="flex items-center px-3 gap-x-1">
            <Button 
                setFunc={() => zoomOut()}
                style="py-1.5"
                title="تصغير"
            >
                <RiZoomOutFill className="size-5" />
            </Button>
            <Button 
                setFunc={() => resetZoom()}
                style="py-1.5"
                title="الحجم الطبيعي"
            >
                <TbZoomReplace className="size-5" />
            </Button>
            <Button 
                setFunc={() => zoomIn()}
                style="py-1.5"
                title="تكبير"
            >
                <RiZoomInFill className="size-5" />
            </Button>
        </div>
    );
}