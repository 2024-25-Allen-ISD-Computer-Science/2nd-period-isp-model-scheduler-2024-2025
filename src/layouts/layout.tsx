import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useRef } from "react";
import { IoPhonePortraitOutline } from "react-icons/io5";

export default function Layout() {

    const contentRef = useRef<HTMLDivElement>(null);
    console.log("height: ", window.screen.height)
    console.log("width: ", window.screen.width)
    
    return <>
        <div ref={contentRef} className={`flex flex-col w-[100vw] max-w-[100vw] h-[100vh] max-h-[100vh] overflow-hidden bg-[#0d0d0d] relative ${window.screen.width <= 1200 ? "hidden" : ""}`}>
            <Navbar />
            <div className="flex flex-col w-full h-full p-8 overflow-hidden z-0">
                <Outlet />
            </div>
        </div>
        <div className={`h-full w-full flex text-2xl items-center justify-center bg-black ${window.screen.width >= 1200 ? "hidden" : ""}`}>
            <div><IoPhonePortraitOutline /></div>
            <div>Please access this app on a computer.</div>
        </div>
    </>
}