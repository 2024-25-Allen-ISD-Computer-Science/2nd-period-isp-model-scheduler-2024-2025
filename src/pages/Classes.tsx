import { useState } from "react";
import { CiFilter } from "react-icons/ci";
import { AnimatePresence, motion } from "motion/react";
import { IoMdCheckmark, IoMdClose } from "react-icons/io";


import { data } from "../assets/data";
import ClassButton from "../components/ClassButton";
import { CampusTag, TermTag } from "../components/Tags";
import useLocalStorage from "../util/useLocalStorage";
import { Link } from "react-router-dom";

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
    const [selected, setSelected] = useState<{[side: string]: number | null}>({left: null, right: null});
    const [classes, setClasses] = useLocalStorage<Array<number>>("selected_classes", []);

    function filterTerms(filterArray: Array<number>, classArray: Array<number>) {
        if (filterArray.length == 2) {
            return true;
        } else if (JSON.stringify(filterArray) == JSON.stringify(classArray)) {
            return true;
        } else {
            return false;
        }
    }

    function resetSelected() {
        setSelected({left: null, right: null});
    }

    function updateSelected(position: string, id: number | null) {
        if (position === "left" || position === "right") {
            setSelected((prev) => ({
                ...prev,
                [position]: id,
            }))
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
        {/* Filters */}
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
                            <button className="absolute top-0 right-0 text-2xl transition-all" onClick={() => setModalOpen(false)}>
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
                                <div className="w-3/4 h-full grid grid-rows-5 grid-cols-2 gap-4">
                                    {
                                        Object.entries([1, 2, 3, 4, 5, 6, 7, 8]).map((value, i) => {
                                            return <button
                                                key={i}
                                                className={`w-full h-[7vh] gap-3 transition-all ${filters.periods.includes(value[1]) ? "bg-zinc-700" : "bg-zinc-800"} ${value[1] == 1 || value[1] == 8 ? "col-span-2" : ""} rounded-lg p-4 transition-all flex items-center justify-center`}
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
                                                <span>Period {value[1]}</span>{filters.periods.includes(value[1]) ? <IoMdCheckmark /> : <IoMdClose />}
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
        <div className="w-full h-full flex flex-grow justify-evenly gap-3">
            {/* Left Side */}
            <div className="w-1/3 h-full flex flex-col">
                <div className="w-full h-[10vh] bg-baseM-200 flex items-center justify-center mb-4 rounded-lg p-4 gap-3">
                    <div className="text-2xl text-center font-semibold tracking-wider">Available Classes</div>
                </div>
                {/* Class Selection */}
                <div className="w-full max-h-[80vh] h-full flex flex-col bg-baseM-200 py-4 px-2 items-center rounded-lg">
                        <div
                            className="w-full flex flex-col px-2 items-center overflow-y-auto overflow-x-hidden"
                            style={{
                                scrollbarWidth: "thin",
                            }}
                        >
                        {
                            Object.entries(data).map(([key, value], i) => {
                                if ((leftSearch == "" || value.name.toLocaleLowerCase().includes(leftSearch.toLocaleLowerCase())) && filters.campus.includes(value.department) && filterPeriods(filters.periods, value.periods) && filterTerms(filters.term, value.term)) {
                                    return <button
                                        key={i}
                                        className={`${classes.includes(i) ? "hidden" : ""} w-full h-36 flex items-center my-2 border-2 border-outline border-transparent rounded-lg ${selected.left == i ? "border-yellow-500" : "hover:border-yellow-600"} transition-all`}
                                        onClick={() => {
                                            if (selected.left != i) {
                                                updateSelected("left", i);
                                            } else {
                                                updateSelected("left", null);
                                            }
                                        }}
                                        >
                                        <ClassButton value={value} />
                                    </button>
                                } else {
                                    return <div key={key}>{key}</div>
                                }
                            })
                        }
                    </div>
                </div>
            </div>
            {/* Middle */}
            <div className="w-1/4 h-full flex items-center justify-between mb-4 rounded-lg p-4 gap-3">
                <div className="w-full h-fit bg-baseM-200 p-4 gap-3 rounded-lg flex flex-col items-center justify-center">
                    {/* Search Bar and Filter */}
                    <div className="w-full h-12 flex items-center justify-between gap-3">
                        <div className="flex flex-grow h-full items-center justify-between bg-baseM-100 rounded-lg px-3 py-2 border-none transition-all">
                            <input
                                id="available_classes"
                                className="w-10/12 h-full bg-transparent focus:outline-none"
                                placeholder="Search"
                                onChange={(e) => (setLeftSearch(e.target.value))}
                                value={leftSearch}
                            />
                            <button className="h-full transition-all" onClick={() => {setLeftSearch("")}}>
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
                    <div className="w-full grid grid-cols-1 place-items-center p-4 gap-6">
                        <button
                            className={`w-3/4 px-3 py-2 flex items-center justify-center gap-1 rounded-md border-2 ${selected.left == null ? "border-emerald-900 text-emerald-900" : "border-emerald-600 text-emerald-600 hover:border-emerald-700 hover:text-emerald-700"} transition-colors`}
                            onClick={() => {
                                // if (selected.left != null) setClasses(...classes, selected.left);
                                if (selected.left != null) setClasses([...classes, selected.left]);
                                updateSelected("left", null)
                            }}
                            disabled={selected.left == null}
                        >
                            <span className="text-lg">Add Class</span>
                        </button>
                        <button
                            className={`w-3/4 px-3 py-2 flex items-center justify-center gap-1 rounded-md border-2 ${selected.right == null ? "border-rose-900 text-rose-900" : "border-rose-600 text-rose-600 hover:border-rose-700 hover:text-rose-700"} transition-colors`}
                            onClick={() => {
                                if (selected.right != null) {
                                    setClasses(classes.filter((id) => id != selected.right))
                                    updateSelected("right", null)
                                };
                            }}
                            disabled={selected.right == null}
                        >
                            <span className="text-lg">Remove Class</span>
                        </button>
                        <button
                            className={`w-3/4 px-3 py-2 flex items-center justify-center gap-1 rounded-md border-2 ${JSON.stringify(classes) == "{}" ? "border-rose-900 text-rose-900" : "border-rose-600 text-rose-600 hover:border-rose-700 hover:text-rose-700"} transition-colors`}
                            onClick={() => {
                                resetSelected();
                                setClasses([]);
                            }}
                        >
                            <span className="text-lg">Clear</span>
                        </button>
                        <Link className="w-3/4 px-3 py-2 flex items-center justify-center gap-1 rounded-md border-2 text-zinc-300 border-zinc-300 hover:text-zinc-400 hover:border-zinc-400 transition-colors" to={{
                            pathname: "/schedule"
                        }}>
                            <span className="text-lg">Schedule</span>
                        </Link>
                    </div>
                </div>
            </div>
            {/* Right Side */}
            <div className="w-1/3 h-full flex flex-col">
                <div className="w-full h-[10vh] bg-baseM-200 flex items-center justify-center mb-4 rounded-lg p-4 gap-3">
                    <div className="text-2xl text-center font-semibold tracking-wider">Your Classes</div>
                </div>
                {/* Class Selection */}
                <div className="w-full max-h-[80vh] h-full flex flex-col bg-baseM-200 py-4 px-2 items-center rounded-lg">
                        <div
                            className="w-full flex flex-col px-2 items-center overflow-y-auto overflow-x-hidden"
                            style={{
                                scrollbarWidth: "thin",
                            }}
                        >
                        {
                            Object.entries(data).map(([key, value], i) => {
                                if ((leftSearch == "" || key.toLocaleLowerCase().includes(leftSearch.toLocaleLowerCase())) && filters.campus.includes(value.department) && filterPeriods(filters.periods, value.periods) && filterTerms(filters.term, value.term)) {
                                    return <button
                                        key={i}
                                        className={`${classes.includes(i) ? "" : "hidden"} w-full h-36 flex items-center my-2 border-2 border-outline border-transparent rounded-lg ${selected.right == i ? "border-yellow-500" : "hover:border-yellow-600"} transition-all`}
                                        onClick={() => {
                                            if (selected.right != i) {
                                                updateSelected("right", i);
                                            } else {
                                                updateSelected("right", null);
                                            }
                                        }}
                                        >
                                        <ClassButton value={value} />
                                    </button>
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