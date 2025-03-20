import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useRef } from "react";
// import ReactToPrint from "react-to-print";

export default function Layout() {

    const contentRef = useRef<HTMLDivElement>(null);

    return <>
        <div ref={contentRef} className="flex flex-col w-[100vw] max-w-[100vw] h-[100vh] max-h-[100vh] overflow-hidden bg-[#0d0d0d] relative">
            <Navbar />
            <div className="flex flex-col w-full h-full p-8 overflow-hidden">
                <Outlet />
            </div>
        </div>
    </>
}