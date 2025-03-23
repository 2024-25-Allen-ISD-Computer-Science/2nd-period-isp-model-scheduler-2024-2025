import { Link } from "react-router-dom";

export default function Navbar() {
    return (
        <div className="w-full h-[5vh] flex justify-between items-center z-[20] px-10 font-bold border-b-2 border-zinc-600 backdrop-blur-lg">
          <div>
            AHS Model Scheduler
          </div>
          <div className="flex gap-10">
            <Link className="text-white hover:text-blue-500 transition-all" to={{pathname: "/2nd-period-isp-model-scheduler-2024-2025/"}}>Home</Link>
            <Link className="text-white hover:text-blue-500 transition-all" to={{pathname: "/2nd-period-isp-model-scheduler-2024-2025/faq"}}>FAQ</Link>
            <Link className="text-white hover:text-blue-500 transition-all" to={{pathname: "/2nd-period-isp-model-scheduler-2024-2025/classes"}}>Classes</Link>
            <Link className="text-white hover:text-blue-500 transition-all" to={{pathname: "/2nd-period-isp-model-scheduler-2024-2025/schedule"}}>Schedule</Link>
          </div>
        </div>
    )
}
