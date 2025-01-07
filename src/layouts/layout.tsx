import { Outlet } from "react-router-dom";

// import Navbar from "../components/Navbar"

export default function Layout() {
    return <>
        <div className="flex flex-col w-[100vw] max-w-[100vw] h-[100vh] max-h-[100vh] bg-baseM-50 p-8 overflow-hidden">
            <Outlet />
        </div>
    </>
}