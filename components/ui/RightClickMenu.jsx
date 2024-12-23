import { useState, useEffect, useRef } from "react";

export default function RightClickMenu({ triggerRef, children }) {
  const [menuVisible, setMenuVisible] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
  const menuRef = useRef(null);

  const handleContextMenu = (e) => {
    e.preventDefault();
    setMenuVisible(true);
    setMenuPosition({ x: e.pageX, y: e.pageY });
  };

  const handleClickOutside = (e) => {
    if (
      menuRef.current &&
      !menuRef.current.contains(e.target) &&
      (!triggerRef.current || !triggerRef.current.contains(e.target)) &&
      !document.querySelector(".dialog-panel")?.contains(e.target)
    ) {
      setMenuVisible(false);
    }
  };

  useEffect(() => {
    // Attach context menu event to the trigger element
    const triggerElement = triggerRef.current;
    if (triggerElement) {
      triggerElement.addEventListener("contextmenu", handleContextMenu);
    }

    // Add click event listener to detect clicks outside
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      if (triggerElement) {
        triggerElement.removeEventListener("contextmenu", handleContextMenu);
      }
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [triggerRef]);

  if (!menuVisible) return null;

  return (
    <div
      ref={menuRef}
      className="absolute z-10"
      style={{
        top: `${menuPosition.y}px`,
        left: `${menuPosition.x}px`,
      }}
    >
      <div className="absolute bg-white border border-black shadow-md rounded-md w-40">
        {children}
      </div>
    </div>
  );
}