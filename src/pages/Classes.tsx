import { useState } from "react";
import { CiFilter } from "react-icons/ci";
import { AnimatePresence, motion } from "motion/react";
import { IoMdClose } from "react-icons/io";

import { data } from "../assets/data";
import ClassButton from "../components/ClassButton";
import { CampusTag, TermTag } from "../components/Tags";
import { MdArrowLeft, MdArrowRight } from "react-icons/md";

export default function Classes() {

    const [leftSearch, setLeftSearch] = useState<string>("");
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [filters, setFilters] = useState<{
        periods: Array<number>,
        term: Array<number>,
        campus: Array<string>,
    }>({
        periods: [1, 2, 3, 4, 5, 6, 7, 8],
        term: [1, 2],
        campus: ["STEAM", "AHS", "CTE"],
    });
    const [selected, setSelected] = useState<{[side: string]: number}>({});

    function filterTerms(filterArray: Array<number>, classArray: Array<number>) {
        if (filterArray.length == 2) {
            return true;
        } else if (JSON.stringify(filterArray) == JSON.stringify(classArray)) {
            return true;
        } else {
            return false
        }
    }

    function filterPeriods(filterArray: Array<number>, classArray: Array<number>) {
        for (let i = 0; i < filterArray.length; i++) {
            if (classArray.includes(filterArray[i])) {
                return true;
            }
        }
        return false;
    }

    return (
        <>
        <AnimatePresence>
        {
            modalOpen ? <motion.div
                className={`absolute w-full h-full bg-[#000000]/60 p-4 flex items-center justify-center top-0 left-0`}
                onClick={() => setModalOpen(false)}
                initial={{
                    opacity: 0,
                }}
                animate={{
                    opacity: 1,
                }}
                exit={{
                    opacity: 0,
                }}
                >
                    <div className="flex flex-col w-[50%] h-[90%] bg-baseM-200 rounded-lg p-8" onClick={(e) => {e.stopPropagation()}}>
                        <div className="relative w-full h-[10%] flex justify-center items-center">
                            <button className="absolute top-0 right-0 text-2xl hover:text-red-100 transition-all" onClick={() => setModalOpen(false)}>
                                <IoMdClose />
                            </button>
                            <div className="text-3xl tracking-widest font-bold">
                                Filters
                            </div>
                        </div>
                        <div className="w-full h-full flex flex-col p-8 gap-4">
                            <div className="flex gap-3">
                                <div className="flex flex-grow justify-evenly">
                                    {
                                        Object.entries(["STEAM", "CTE", "AHS"]).map((value, i) => {
                                            return <button key={i} className="w-fit" onClick={() => {
                                                if (!filters.campus.includes(value[1])) {
                                                    setFilters((prev) => ({
                                                        ...prev,
                                                        campus: [...prev.campus, value[1]],
                                                    }));
                                                } else {
                                                    setFilters((prev) => ({
                                                        ...prev,
                                                        campus: prev.campus.filter((campus) => campus !== value[1])
                                                    }))
                                                }
                                            }}>
                                                <CampusTag campus={value[1]} disabled={!filters.campus.includes(value[1])} className="h-[5vh]" />
                                            </button>
                                        })
                                    }
                                </div>
                            </div>
                            <div className="divider my-1"></div>
                            <div className="flex gap-3">
                                <div className="flex flex-grow justify-evenly">
                                    {
                                        Object.entries([1, 2, 3]).map((value, i) => {
                                            if (value[1] == 1) {
                                                return <button key={i} className="w-fit" onClick={() => {
                                                    if (filters.term.includes(value[1])) {
                                                        setFilters((prev) => ({
                                                            ...prev,
                                                            term: prev.term.filter(term => term !== value[1]).sort()
                                                        }))
                                                    } else {
                                                        setFilters((prev) => ({
                                                            ...prev,
                                                            term: [...prev.term, 1].sort()
                                                        }))
                                                    }
                                                }}>
                                                    <TermTag term={[1]} disabled={!filters.term.includes(1)} className="h-[5vh]" />
                                                </button>
                                            } else if (value[1] == 2) {
                                                return <button key={i} className="w-fit" onClick={() => {
                                                    if (filters.term.includes(value[1])) {
                                                        setFilters((prev) => ({
                                                            ...prev,
                                                            term: prev.term.filter(term => term !== value[1]).sort()
                                                        }))
                                                    } else {
                                                        setFilters((prev) => ({
                                                            ...prev,
                                                            term: [...prev.term, 2].sort()
                                                        }))
                                                    }
                                                }}>
                                                    <TermTag term={[2]} disabled={!filters.term.includes(2)} />
                                                </button>
                                            }
                                        })
                                    }
                                </div>
                            </div>
                            <div className="divider my-1"></div>
                            <div className="flex flex-col flex-grow items-center w-full p-4">
                                <div className="w-full h-full grid grid-rows-5 grid-cols-2 gap-4">
                                    {
                                        Object.entries([1, 2, 3, 4, 5, 6, 7, 8]).map((value, i) => {
                                            return <button
                                                key={i}
                                                className={`w-full h-[7vh] ${filters.periods.includes(value[1]) ? "bg-black" : "bg-[#181818]"} ${value[1] == 1 || value[1] == 8 ? "col-span-2" : ""} hover:bg-black rounded-lg p-4 transition-all flex items-center justify-center`}
                                                onClick={() => {
                                                    if (filters.periods.includes(value[1])) {
                                                        setFilters((prev) => ({
                                                            ...prev,
                                                            periods: filters.periods.filter(period => period !== value[1]).sort()
                                                        }))
                                                    } else {
                                                        setFilters((prev) => ({
                                                            ...prev,
                                                            periods: [...prev.periods, value[1]]
                                                        }))
                                                    }
                                                }}
                                                >
                                                Period {value[1]}
                                            </button>
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
            </motion.div> : null
        }
        </AnimatePresence>
        <div className="w-full h-full flex justify-evenly gap-3">
            {/* Left Side */}
            <div className="w-1/3 h-full flex flex-col">
                <div className="w-full h-[10vh] bg-baseM-200 flex items-center justify-center mb-4 rounded-lg p-4 gap-3">
                    <div className="text-2xl text-center font-semibold tracking-wider">Available Classes</div>
                </div>
                {/* Class Selection */}
                <div className="w-full max-h-[80vh] h-full flex flex-col bg-baseM-200 py-4 items-center rounded-lg">
                        <div
                            className="w-full flex flex-col px-2 items-center overflow-y-scroll overflow-x-hidden"
                            style={{
                                scrollbarWidth: "thin",
                            }}
                        >
                        {
                            Object.entries(data).map(([key, value], i) => {
                                if ((leftSearch == "" || key.toLocaleLowerCase().includes(leftSearch.toLocaleLowerCase())) && filters.campus.includes(value.department) && filterPeriods(filters.periods, value.periods) && filterTerms(filters.term, value.term)) {
                                    return <div key={i} className="w-full h-36 flex items-center my-2">
                                        <ClassButton name={key} value={value} />
                                    </div>
                                } else {
                                    return <div key={key}></div>
                                }
                            })
                        }
                    </div>
                </div>
            </div>
            {/* Middle */}
            <div className="w-1/4 h-full flex items-center justify-between mb-4 rounded-lg p-4 gap-3">
                <div className="w-full h-[60%] bg-baseM-200 p-4 gap-3 rounded-lg flex flex-col items-center justify-center">
                    {/* Search Bar and Filter */}
                    <div className="w-full  flex items-center justify-between gap-3">
                        <div className="flex-grow flex h-full items-between justify-between bg-baseM-100 rounded-lg px-3 py-2 border-none focus:outline outline-offset-2 outline-blue-100 transition-all">
                        <input
                            id="available_classes"
                            className="w-10/12 h-full bg-transparent focus:outline-none"
                            placeholder="Search"
                            onChange={(e) => (setLeftSearch(e.target.value))}
                            value={leftSearch}
                        />
                        <button className="h-full hover:text-red-100 transition-all" onClick={() => {setLeftSearch("")}}>
                            <IoMdClose />
                        </button>
                        </div>
                        <button
                            className="btn bg-baseM-100 w-12 h-full flex items-center justify-center rounded-md text-white"
                            onClick={() => {setModalOpen(true)}}
                            >
                            <CiFilter />
                        </button>
                    </div>
                    {/* Transfer Buttons */}
                    <div className="w-full flex flex-col flex-grow items-center justify-center p-4 gap-6">
                        <button
                            className={`w-1/2 p-3 flex items-center justify-evenly rounded-md border-2 border-green-100 text-green-100 transition-colors`}
                            // border-green-100/60
                        >
                            <span className="text-lg">Add</span>
                            <span className="text-2xl"><MdArrowRight /></span>
                        </button>
                        <button
                            className={`w-1/2 p-3 flex items-center justify-evenly rounded-md border-2`}
                        >
                            <span className="text-2xl"><MdArrowLeft /></span>
                            <span className="text-lg">Remove</span>
                        </button>
                    </div>
                </div>
            </div>
            {/* Right Side */}
            <div className="w-1/3 h-full flex flex-col">
                <div className="w-full h-[10vh] bg-baseM-200 flex items-center justify-center mb-4 rounded-lg p-4 gap-3">
                    <div className="text-2xl text-center font-semibold tracking-wider">Your Classes</div>
                </div>
                {/* Class Selection */}
                <div className="w-full max-h-[80vh] h-full flex flex-col bg-baseM-200 py-4 items-center rounded-lg">
                        <div
                            className="w-full flex flex-col px-2 items-center overflow-y-scroll overflow-x-hidden"
                            style={{
                                scrollbarWidth: "thin",
                            }}
                        >
                        {
                            Object.entries(data).map(([key, value], i) => {
                                if ((leftSearch == "" || key.toLocaleLowerCase().includes(leftSearch.toLocaleLowerCase())) && filters.campus.includes(value.department) && filterPeriods(filters.periods, value.periods) && filterTerms(filters.term, value.term)) {
                                    return <div key={i} className="w-full h-36 flex items-center my-2">
                                        <ClassButton name={key} value={value} />
                                    </div>
                                } else {
                                    return <div key={key}></div>
                                }
                            })
                        }
                    </div>
                </div>
            </div>

        </div>
        </>
    )
}