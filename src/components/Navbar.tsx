import { Link } from "react-router-dom";

export default function Navbar() {
    return (
        <div className="w-full h-[5vh] flex justify-between items-center px-10 font-bold border-b-2 border-zinc-600">
          <div>
            AHS Model Scheduler
          </div>
          <div className="flex gap-10">
            <Link className="text-white hover:text-blue-500 transition-all" to={{pathname: "/"}}>Home</Link>
            <Link className="text-white hover:text-blue-500 transition-all" to={{pathname: "/faq"}}>FAQ</Link>
            <Link className="text-white hover:text-blue-500 transition-all" to={{pathname: "/classes"}}>Classes</Link>
            <Link className="text-white hover:text-blue-500 transition-all" to={{pathname: "/schedule"}}>Schedule</Link>
          </div>
        </div>
    )
}