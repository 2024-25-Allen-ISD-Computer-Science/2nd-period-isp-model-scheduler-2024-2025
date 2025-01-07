import { MdOutlineBiotech } from "react-icons/md";
import { GiEagleHead } from "react-icons/gi";
import { GiMaterialsScience } from "react-icons/gi";

export function CampusTag({ campus, disabled=false, className }: {campus: string, disabled?: boolean, className?: string}) {
    if (campus == "STEAM") {
        return (
            <div
                className={`${className} border-2 ${disabled ? "text-[#525252] hover:text-blue-100 border-[#525252] hover:border-blue-100" : "text-blue-100 border-blue-100"} w-24 h-full flex items-center justify-center rounded-lg bg-transparent gap-1 transition-all`}
            >
                <GiMaterialsScience /> STEAM
            </div>
        )
    } else if (campus == "AHS") {
        return (
            <div
                className={`${className} border-2 ${disabled ? "text-[#525252] hover:text-red-100 border-[#525252] hover:border-red-100" : "text-red-100 border-red-100"} w-24 h-full flex items-center justify-center rounded-lg bg-transparent gap-1 transition-all`}
            >
                <GiEagleHead /> AHS
            </div>
        )
    } else if (campus == "CTE") {
        return (
            <div
                className={`${className} border-2 ${disabled ? "text-[#525252] hover:text-green-100 border-[#525252] hover:border-green-100" : "text-green-100 border-green-100"} w-24 h-full flex items-center justify-center rounded-lg bg-transparent gap-1 transition-all`}
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
        return <div className={`${className} border-2 ${disabled ? "text-[#525252] hover:text-[#f1a800] border-[#525252] hover:border-[#f1a800]" : "border-[#f1a800] text-[#f1a800]"} w-24 h-full flex items-center justify-center rounded-lg bg-gransparent transition-all`}>
            Fall
        </div>
    } else if (term.length == 1 && term[0] == 2) {
        return <div className={`${className} border-2 ${disabled ? "text-[#525252] hover:text-[#17ebcb] border-[#525252] hover:border-[#17ebcb]" : "border-[#17ebcb] text-[#17ebcb]"} w-24 h-full flex items-center justify-center rounded-lg bg-gransparent transition-all`}>
            Spring
        </div>
    } else if (term.length == 2) {
        return <div className="bg-gradient-to-r from-[#f1a800] to-[#17ebcb] w-24 h-full flex items-center justify-center rounded-lg p-0.5">
            <div className="bg-baseM-100 w-full h-full flex items-center justify-center rounded-md">
                <div className="bg-gradient-to-r from-[#f1a800] to-[#17ebcb] text-transparent bg-clip-text">Year</div>
            </div>
        </div>
    } else {
        return <></>
    }
}