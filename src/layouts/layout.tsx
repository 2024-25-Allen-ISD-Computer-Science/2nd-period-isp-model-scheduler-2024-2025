import { Outlet } from "react-router-dom";

import { LinesBackground } from "../components/Background";
// import Navbar from "../components/Navbar"

export default function Layout() {
    return <>
        <div className="flex flex-col w-[100vw] max-w-[100vw] h-[100vh] max-h-[100vh] p-8 overflow-hidden bg-[#0d0d0d]">
            {/* <LinesBackground className="-z-10" /> */}
            <Outlet />
        </div>
    </>
}