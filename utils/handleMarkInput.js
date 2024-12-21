export default function handleMarkInput(e, setMark){
    const isAllowedKey = (e.key >= "0" && e.key <= "9") || e.key === "Backspace" || (e.ctrlKey && e.key === "a") || e.key === "Enter" || (e.ctrlKey && e.key === "r") || e.key === "Tab"
    
    if(!isAllowedKey) {
        e.preventDefault()
    } else{
        setMark(e.target.value ? e.target.value : "")
        if(e.key === "Enter"){
            e.target.value = ""
        }
    }
}