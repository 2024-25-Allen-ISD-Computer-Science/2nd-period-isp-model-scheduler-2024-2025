import { MdOutlineBiotech } from "react-icons/md";
import { GiEagleHead } from "react-icons/gi";
import { GiMaterialsScience } from "react-icons/gi";

export function CampusTag({ campus, disabled=false, className }: {campus: string, disabled?: boolean, className?: string}) {
    if (campus == "STEAM") {
        return (
            <div
                className={`${className} border-2 ${disabled ? "text-[#525252] border-[#525252]" : "text-blue-600 border-blue-600"} w-full h-full flex items-center justify-center rounded-lg bg-transparent gap-1 transition-all`}
            >
                <GiMaterialsScience /> STEAM
            </div>
        )
    } else if (campus == "AHS") {
        return (
            <div
                className={`${className} border-2 ${disabled ? "text-[#525252] border-[#525252]" : "text-red-600 border-red-600"} w-full h-full flex items-center justify-center rounded-lg bg-transparent gap-1 transition-all`}
            >
                <GiEagleHead /> AHS
            </div>
        )
    } else if (campus == "CTE") {
        return (
            <div
                className={`${className} border-2 ${disabled ? "text-[#525252] border-[#525252]" : "text-green-600 border-green-600"} w-full h-full flex items-center justify-center rounded-lg bg-transparent gap-1 transition-all`}
            >
                <MdOutlineBiotech /> CTE
            </div>
        )
    } else {
        return <></>
    }
}

export function TermTag({ term, disabled=false, className }: {term: Array<number>, disabled?: boolean, className?:string}) {
    if (term.length == 1 && term[0] == 1) {
        return <div className={`${className} border-2 ${disabled ? "text-[#525252] border-[#525252]" : "border-[#f1a800] text-[#f1a800]"} w-full h-full flex items-center justify-center rounded-lg bg-gransparent transition-all`}>
            Fall
        </div>
    } else if (term.length == 1 && term[0] == 2) {
        return <div className={`${className} border-2 ${disabled ? "text-[#525252] border-[#525252]" : "border-[#17ebcb] text-[#17ebcb]"} w-full h-full flex items-center justify-center rounded-lg bg-gransparent transition-all`}>
            Spring
        </div>
    } else if (term.length == 2) {
        return <div className="bg-gradient-to-r from-[#f1a800] to-[#17ebcb] w-full h-full flex items-center justify-center rounded-lg p-0.5">
            <div className="bg-baseM-100 w-full h-full flex items-center justify-center rounded-md">
                <div className="bg-gradient-to-r from-[#f1a800] to-[#17ebcb] text-transparent bg-clip-text">Year</div>
            </div>
        </div>
    } else {
        return <></>
    }
}