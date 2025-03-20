import { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { data } from "../assets/data";
import useLocalStorage from "../util/useLocalStorage";
import ClassButton from "../components/ClassButton";
import { CampusTag } from "../components/Tags";
import { FiPrinter } from "react-icons/fi";
import Navbar from "../components/Navbar";
import download from "downloadjs";
import html2canvas from "html2canvas";

interface Schedule {
    fall: {
        1: number | null,
        2: number | null,
        3: number | null,
        4: number | null,
        5: number | null,
        6: number | null,
        7: number | null,
        8: number | null},
    spring: {
        1: number | null,
        2: number | null,
        3: number | null,
        4: number | null,
        5: number | null,
        6: number | null,
        7: number | null,
        8: number | null
    }
}

export default function Schedule() {

    const [classes] = useLocalStorage<Array<number>>("selected_classes", []);
    const [schedule, setSchedule] = useLocalStorage<Schedule>("scheduled_classes", {fall: {1: null, 2: null, 3: null, 4: null, 5: null, 6: null, 7: null, 8: null}, spring: {1: null, 2: null, 3: null, 4: null, 5: null, 6: null, 7: null, 8: null}})
    const [availableClasses, setAvailableClasses] = useState<Array<number>>(classes);
    const [focus, setFocus] = useState<{classID: number | null, period: number | null, semester: "fall" | "spring" | null}>({classID: null, period: null, semester: null});
    const times = {
        1: {
            AHS: ["8:45am", "9:37am"],
            STEAM: ["8:14am", "9:08am"],
        },
        2: {
            AHS: ["9:43am", "11:16am"],
            STEAM: ["9:25am", "10:58am"],
        },
        3: {
            AHS: ["11:22am", "1:28pm"],
            STEAM: ["11:39am", "1:12pm"],
        },
        4: {
            AHS: ["1:35pm", "3:08pm"],
            STEAM: ["2:00pm", "3:33pm"],
        },
        5: {
            AHS: ["9:43am", "11:16am"],
            STEAM: ["9:25am", "10:58am"],
        },
        6: {
            AHS: ["11:22a,", "1:28pm"],
            STEAM: ["11:39a,", "1:12pm"],
        },
        7: {
            AHS: ["1:35pm", "3:08pm"],
            STEAM: ["2:00pm", "3:33pm"],
        },
        8: {
            AHS: ["3:14pm", "4:05pm"],
            STEAM: ["3:14pm", "4:05pm"],
        }
    }
    const contentRef = useRef<HTMLDivElement>(null);
    const handleCaptureClick = async () => {
        const canvas = await html2canvas(document.getElementById('home') as HTMLElement, {
            scrollX: 0,
            scrollY: 0,
            useCORS: true,
        });
        const dataURL = canvas.toDataURL('image/png');
        download(dataURL, 'download.png', 'image/png');
    }

    useEffect(() => {
        resetFocus();
    }, [schedule])

    function isAvailable(id: number, period: number, term: Array<number>) {
        let isAvailable : boolean = true;

        // Check if class has the certain period in a certain semester
        if (data[id].term.length == 2) {
            isAvailable = data[id].periods.includes(period);
        } else if (term.toString() == data[id].term.toString()) {
            isAvailable = data[id].periods.includes(period);
        } else {
            isAvailable = false;
        }

        if (!isAvailable) return isAvailable;
        return checkCampusAvailable(period);
        // return isAvailable;
    }

    // is the focus allowed to go into the specific period
    function checkCampusAvailable(period: number) {
        const semesters = {1: "fall", 2: "spring"};
        if (focus.classID == null) {
            return false
        } else if (period == 1) {
            let isAvailable = true;
            for (const num of data[focus.classID as number].term) {
                const semester = semesters[num as 1 | 2] as "fall" | "spring";
                if (schedule[semester][2] != null && (data[schedule[semester][2] as number].department == "STEAM" || data[schedule[semester][2] as number].department == "CTE" || data[schedule[semester][2] as number].name.includes('Privilege Period')) && data[focus.classID].department == "AHS") {
                    isAvailable = false;
                }
            }
            for (const num of data[focus.classID as number].term) {
                const semester = semesters[num as 1 | 2] as "fall" | "spring";
                if (schedule[semester][5] != null && (data[schedule[semester][5] as number].department == "STEAM" || data[schedule[semester][5] as number].department == "CTE"  || data[schedule[semester][5] as number].name.includes('Privilege Period')) && data[focus.classID].department == "AHS") {
                    isAvailable = false;
                }
            }
            return isAvailable;
        } else if (period == 2) {
            let isAvailable = true;
            for (const num of data[focus.classID as number].term) {
                const semester = semesters[num as 1 | 2] as "fall" | "spring";
                if (schedule[semester][1] != null && (data[schedule[semester][1] as number].department == "AHS" || data[schedule[semester][1] as number].name.includes('Privilege Period')) && (data[focus.classID].department == "STEAM" || data[focus.classID].department == "CTE")) {
                    isAvailable = false;
                }
            }
            return isAvailable;
        } else if (period == 5) {
            let isAvailable = true;
            for (const num of data[focus.classID as number].term) {
                const semester = semesters[num as 1 | 2] as "fall" | "spring";
                if (schedule[semester][1] != null && (data[schedule[semester][1] as number].department == "AHS" || data[schedule[semester][1] as number].name.includes('Privilege Period')) && (data[focus.classID].department == "STEAM" || data[focus.classID].department == "CTE")) {
                    isAvailable = false;
                }
            }
            return isAvailable;
        } else if (period == 8) {
            let isAvailable = true;
            for (const num of data[focus.classID as number].term) {
                const semester = semesters[num as 1 | 2] as "fall" | "spring";
                if (schedule[semester][4] != null && (data[schedule[semester][4] as number].department == "STEAM" || data[schedule[semester][4] as number].department == "CTE" || data[schedule[semester][4] as number].name.includes('Privilege Period')) && data[focus.classID].department == "AHS") {
                    isAvailable = false;
                }
            }
            for (const num of data[focus.classID as number].term) {
                const semester = semesters[num as 1 | 2] as "fall" | "spring";
                if (schedule[semester][7] != null && (data[schedule[semester][7] as number].department == "STEAM" || data[schedule[semester][7] as number].department == "CTE" || data[schedule[semester][7] as number].name.includes('Privilege Period')) && data[focus.classID].department == "AHS") {
                    isAvailable = false;
                }
            }
            return isAvailable;
        }
        return true;
    }

    function addToSchedule(id: number, period: number) {
        const newSchedule: Schedule = { ...schedule };
        
        if (data[id].term.length == 2) {
            newSchedule.fall[period as 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8] = id;
            newSchedule.spring[period  as 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8] = id;
        } else if (data[id].term.length == 1 && data[id].term[0] == 1) {
            newSchedule.fall[period as 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8] = id;
        } else if (data[id].term.length == 1 && data[id].term[0] == 2) {
            newSchedule.spring[period as 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8] = id;
        }
        setSchedule(newSchedule);
    }

    function removeFromSchedule(period: number, section: "fall" | "spring" | null) {
        const newSchedule: Schedule = { ...schedule };

        if (section == "fall") {
            newSchedule.fall[period as 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8] = null;
        } else if (section == "spring") {
            newSchedule.spring[period as 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8] = null;
        } else if (section == null) {
            newSchedule.fall[period as 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8] = null;
            newSchedule.spring[period as 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8] = null;
        }
        setSchedule(newSchedule);
    }

    function resetFocus() {
        setFocus({classID: null, period: null, semester: null});
    }

    function resetSchedule() {
        Object.entries(schedule.fall).map((value) => {
            if (value[1] != null && !availableClasses.includes(value[1])) setAvailableClasses([...availableClasses, value[1]]);
        })
        Object.entries(schedule.spring).map((value) => {
            if (value[1] != null && !availableClasses.includes(value[1])) setAvailableClasses([...availableClasses, value[1]]);
        })
        setSchedule({fall: {1: null, 2: null, 3: null, 4: null, 5: null, 6: null, 7: null, 8: null}, spring: {1: null, 2: null, 3: null, 4: null, 5: null, 6: null, 7: null, 8: null}});
    }

    function returnTime(index: number, value: [string, number[]]) {
        return times[value[1][index] as 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8].AHS.concat(times[value[1][index] as 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8].STEAM);
    }

    function focusInAvailable() {
        if (focus.classID != null) {
            return availableClasses.findIndex(element => element == focus.classID) != -1
        }
        return false;
    }

    function returnButton(period: number, time: Array<string>, semester: "spring" | "fall", half: boolean=false) {
        const add = semester == "spring" ? 0 : 1;
        return (
            <button 
                key={period + add + 100}
                className={`${half ? "w-1/2 max-w-1/2" : "w-full"} h-full border-2 border-transparent ${focus.classID != null ? isAvailable(focus.classID, period, semester == "spring" ? [2] : [1]) ? "bg-zinc-800 border-zinc-600" : "bg-zinc-900" : "bg-zinc-800"} rounded-lg transition-all p-2`}
                disabled={focus.classID == null ? schedule[semester][period as 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8] == null ? true : false : isAvailable(focus.classID, period, semester == "spring" ? [2] : [1]) ? false : true}
                onClick={() => {
                    // Determine action if Focus contains a class
                    if (focus.classID != null) {
                        const originalPos = focus;
                        // If the focus is the same as the one clicked
                        if (focus.period == period) {
                            resetFocus();
                        // If the focus isn't the same as the one clicked and it's a different period 
                        } else if (focus.period != period) {
                            if (schedule[semester][period as 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8] == null) {
                                addToSchedule(focus.classID as number, period);
                                removeFromSchedule(originalPos.period as number, originalPos.semester)
                            } else {
                                setAvailableClasses([...availableClasses].concat([schedule[semester][period as 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8] as number]));
                                removeFromSchedule(period, originalPos.semester);
                                addToSchedule(focus.classID as number, period);
                                removeFromSchedule(originalPos.period as number, originalPos.semester);
                            }
                            // If the focus is another class and clicked in an already occupied period
                        }
                    // Set the focus if the focus doesn't contain anything
                    } else {
                        setFocus({classID: schedule[semester][period as 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8], period: period, semester: data[schedule[semester][period as 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8] as number].term.length == 1 ? data[schedule[semester][period as 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8] as number].term[0] == 1 ? "fall" : "spring" : null})
                    };
                }}
            >
                { schedule[semester][period as 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8] == null ? (
                    period == 1 ? <span>1<sup>st</sup> Period</span> : period == 2 ? <span>2<sup>nd</sup> Period</span> : period == 3 ? <span>3<sup>rd</sup> Period</span> : <span>{period}<sup>th</sup> Period</span>
                    ) : (
                    <div className={`w-full h-full rounded-lg flex flex-col justify-center p-2`}>
                        <div>
                            {period != null && schedule[semester][period as 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8] != null ? data[schedule[semester][period as 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8] as number].name : null}
                        </div>
                        <div className="w-full flex items-center justify-evenly">
                            <div className="w-1/3 text-sm">
                                <CampusTag campus={data[schedule[semester][period as 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8] as number].department} />
                            </div>
                            <div className="w-2/3 text-sm">
                                <span>{data[schedule[semester][period as 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8] as number].department == "AHS" ? time[0] : time[2]}</span><span>-</span><span>{data[schedule[semester][period as 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8] as number].department == "AHS" ? time[1] : time[3]}</span>
                            </div>
                        </div>
                    </div>
                    )
                }
            </button>
        )
    }

    // Set the availableClasses array to only include classes selected and not scheduled
    useEffect(() => {
        setAvailableClasses([]);
        const scheduledClasses : Array<number> = [];
        Object.entries(schedule.fall).map((value) => {
            if (value[1] != null && !scheduledClasses.includes(value[1])) scheduledClasses.push(value[1]);
        })
        Object.entries(schedule.spring).map((value) => {
            if (value[1] != null && !scheduledClasses.includes(value[1])) scheduledClasses.push(value[1]);
        })
        for (const item in classes) {
            if (!scheduledClasses.includes(classes[parseInt(item)])) setAvailableClasses(prev => [...prev, classes[parseInt(item)]]);
        }
    }, [schedule, classes])

    return (
        <>
        <div id="home" className="flex flex-col w-[100vw] max-w-[100vw] h-[100vh] max-h-[100vh] overflow-hidden bg-[#0d0d0d] relative" style={{ lineHeight: 'normal' }}>
            <Navbar />
            <div className="flex flex-col w-full h-full p-8 overflow-hidden">
                <div ref={contentRef} className="w-full h-full flex flex-grow justify-evenly gap-3">
                    {/* Fall Semester */}
                    <div className="w-[35%] h-full flex flex-col items-center justify-start px-4 py-4 rounded-lg gap-3">
                        <div className="w-full h-[8%] flex items-center justify-center font-semibold tracking-wider text-lg rounded-lg border border-zinc-700 bg-zinc-900 mb-1">
                            Fall Semester
                        </div>
                        <div className="w-full flex flex-col flex-grow gap-3">
                            <div className="w-full h-[8%] flex items-between gap-3">
                                <div className={`w-1/2 h-full flex items-center justify-center bg-red-600 py-3 px-4 rounded-lg font-semibold`}>
                                    A-Day
                                </div>
                                <div className={`w-1/2 h-full flex items-center justify-center bg-blue-600 py-3 px-4 rounded-lg font-semibold`}>
                                    B-Day
                                </div>
                            </div>
                            <div className="w-full flex flex-grow flex-col gap-3">
                                {
                                    Object.entries([[1], [2, 5], [3, 6], [4, 7], [8]]).map((value, i) => {
                                        const time = value[0].length == 1 ? returnTime(0, value) : returnTime(0, value).concat(returnTime(1, value));
                                        if (value[1].length == 1) return <div className="w-full h-full max-h-[20%]" key={i}>{returnButton(value[1][0], time, "fall")}</div>;
                                        if (value[1].length == 2) return (
                                            <div className="w-full h-full max-h-[20%] flex gap-3" key={i}>
                                                {returnButton(value[1][0], time, "fall", true)}
                                                {returnButton(value[1][1], time, "fall", true)}
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                    {/* Available Classes */}
                    <div className="w-[30%] h-full flex flex-col gap-2">
                    <div
                        className={`w-full h-full ${focus.classID != null && !focusInAvailable() ? "relative" : ""} flex flex-col flex-grow items-center ${availableClasses.length == 0 ? "justify-center" : "justify-start"} bg-baseM-200 ${focus.classID != null && !focusInAvailable() ? "" : "py-4"} rounded-lg overflow-y-auto`}
                        style={{
                            scrollbarWidth: "thin",
                        }}
                    >
                        {
                            availableClasses.length == 0 ?
                                <button
                                    className="w-full h-full flex flex-col justify-center items-center"
                                    onClick={() => {
                                        setAvailableClasses([...availableClasses].concat([focus.classID as number]));
                                        removeFromSchedule(focus.period as number, focus.semester as "fall" | "spring");
                                        resetFocus();
                                    }}
                                    >
                                    <span className="my-1 text-xl font-semibold tracking-wider">No Classes Available</span>
                                    <span className="my-1 text-base">Add classes <Link className="text-blue-500 hover:text-blue-600 transition-all underline" to={{
                                        pathname: "/classes"
                                    }}>here</Link></span>
                                </button>
                            : <>
                                <div
                                    className={`w-full h-full flex flex-col flex-grow overflow-x-hidden px-4 ${focus.classID != null && !focusInAvailable() ? "py-4" : ""}`}
                                    style={{
                                        scrollbarWidth: "thin",
                                    }}
                                    >
                                    {
                                        Object.entries(availableClasses).map((value) => {
                                            return <button
                                                        key={parseInt(value[0])}
                                                        className={`w-full flex items-center border-2 border-outline border-transparent my-4 ${focus.classID == value[1] ? "border-yellow-500" : "hover:border-yellow-600"} rounded-lg transition-all`}
                                                        onClick={() => {
                                                            if (focus.classID == value[1]) {
                                                                resetFocus();
                                                            } else {
                                                                setFocus({classID: value[1], period: focus.period, semester: null});
                                                            }
                                                        }}
                                                    >
                                                <ClassButton value={data[value[1]]} />
                                            </button>
                                        })
                                    }
                                </div>
                                <button
                                    className={`w-full h-full bg-zinc-800/30 z-10 border-2 border-zinc-600 rounded-lg transition-all ${focus.classID != null && !focusInAvailable() ? "absolute" : "hidden"}`}
                                    onClick={() => {
                                        setAvailableClasses([...availableClasses].concat([focus.classID as number]));
                                        removeFromSchedule(focus.period as number, focus.semester as "fall" | "spring");
                                        resetFocus();
                                    }}
                                >
                                </button>
                            </>
                        }
                    </div>
                    <div className="flex gap-2">
                        <button
                            className="w-full h-[7vh] bg-zinc-700 hover:bg-zinc-800 transition-all rounded-lg"
                            onClick={() => {
                                resetSchedule();
                            }}
                            >
                                Reset
                        </button>
                        <button
                            className="w-[30%] h-[7vh] bg-zinc-700 hover:bg-zinc-800 transition-all rounded-lg flex items-center justify-center text-xl"
                            onClick={() => {
                                handleCaptureClick()
                            }}
                            >
                                <FiPrinter />
                        </button>
                    </div>
                    </div>
                    {/* Spring Semester */}
                    <div className="w-[35%] h-full flex flex-col items-center justify-start px-4 py-4 rounded-lg gap-3">
                        <div className="w-full h-[8%] flex items-center justify-center font-semibold tracking-wider text-lg rounded-lg border border-zinc-700 bg-zinc-900 mb-1">
                            Spring Semester
                        </div>
                        <div className="w-full flex flex-col flex-grow gap-3">
                            <div className="w-full h-[8%] flex items-between gap-3">
                                <div className={`w-1/2 h-full flex items-center justify-center bg-red-600 py-3 px-4 rounded-lg font-semibold`}>
                                    A-Day
                                </div>
                                <div className={`w-1/2 h-full flex items-center justify-center bg-blue-600 py-3 px-4 rounded-lg font-semibold`}>
                                    B-Day
                                </div>
                            </div>
                            <div className="w-full flex flex-grow flex-col gap-3">
                                {
                                    Object.entries([[1], [2, 5], [3, 6], [4, 7], [8]]).map((value, i) => {
                                        const time = value[0].length == 1 ? returnTime(0, value) : returnTime(0, value).concat(returnTime(1, value));
                                        if (value[1].length == 1) return <div className="w-full h-full max-h-[20%]" key={i}>{returnButton(value[1][0], time, "spring")}</div>;
                                        if (value[1].length == 2) return (
                                            <div className="w-full h-full max-h-[20%] flex gap-3" key={i}>
                                                {returnButton(value[1][0], time, "spring", true)}
                                                {returnButton(value[1][1], time, "spring", true)}
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}