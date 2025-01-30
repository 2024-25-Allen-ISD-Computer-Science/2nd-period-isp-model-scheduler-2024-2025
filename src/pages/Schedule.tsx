import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { data } from "../assets/data";
import useLocalStorage from "../util/useLocalStorage";
import ClassButton from "../components/ClassButton";
import { GiConsoleController } from "react-icons/gi";

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
    const [focus, setFocus] = useState<null | number>(null);
    const [availableTimes, setAvailableTimes] = useState<{fall: Array<number>, spring: Array<number>}>({fall: [], spring: []});
    const periods = ["1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th"]
    // const times = {
    //     1: {
    //         AHS: ["8:45", "9:37"],
    //         STEAM: ["8:14", "9:08"],
    //     },
    //     2: {
    //         AHS: ["9:43", "11:16"],
    //         STEAM: ["9:25", "10:58"],
    //     },
    //     3: {
    //         AHS: ["11:22", "1:28"],
    //         STEAM: ["11:39", "1:12"],
    //     },
    //     4: {
    //         AHS: ["1:35", "3:08"],
    //         STEAM: ["2:00", "3:33"],
    //     },
    //     5: {
    //         AHS: ["9:43", "11:16"],
    //         STEAM: ["9:25", "10:58"],
    //     },
    //     6: {
    //         AHS: ["11:22", "1:28"],
    //         STEAM: ["11:39", "1:12"],
    //     },
    //     7: {
    //         AHS: ["1:35", "3:08"],
    //         STEAM: ["2:00", "3:33"],
    //     },
    //     8: {
    //         AHS: ["3:14", "4:05"],
    //     }
    // }

    // update the availableTimes based on periods and campus travel times
    
    useEffect(() => {
        if (focus != null) {
            console.log("hi")
        }
    }, [focus])

    function isAvailable(id: number, period: number, term: Array<number>) {
        if (data[id].term.length == 2) {
            return data[id].periods.includes(period);
        } else if (term.toString() == data[id].term.toString()) {
            return data[id].periods.includes(period);
        } else {
            return false;
        }
    }

    function addToSchedule(id: number, period: number, section?: "fall" | "spring", ) {
        const newSchedule: Schedule = { ...schedule };
        
        if (data[id].term.length == 2) {
            newSchedule.fall[period as 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8] = id;
            newSchedule.spring[period  as 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8] = id;
        } else if (section == "fall") {
            newSchedule.fall[period as 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8] = id;
        } else if (section == "spring") {
            newSchedule.spring[period  as 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8] = id;
        }
        setSchedule(newSchedule);
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
        <div className="w-full h-full flex flex-grow justify-evenly gap-3">
            {/* Fall Semester */}
            <div className="w-[35%] h-full flex flex-col items-center justify-start px-4 py-8 rounded-lg gap-3">
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
                    <div className="w-full flex flex-col flex-grow gap-3">
                        <button
                            className={`w-full h-[18%] border-2 border-transparent ${focus != null ? isAvailable(focus, 1, [1]) ? "bg-zinc-800 border-zinc-600" : "bg-zinc-900" : "bg-zinc-800"} rounded-lg transition-all`}
                            disabled={focus == null || !isAvailable(focus, 1, [1])}
                            onClick={() => {
                                if (focus != null) addToSchedule(focus as number, 1, data[focus].term[0] == 1 ? "fall" : "spring")
                                console.log(schedule)
                            }}
                        >
                            <span>1<sup>st</sup> Period</span>
                        </button>
                        <div className={'w-full h-[18%] flex justify-between gap-3'}>
                            <button
                                className={`w-1/2 h-full bg-zinc-800 rounded-lg`}
                            >
                                <span>2<sup>nd</sup> Period</span>
                            </button>
                            <button
                                className={`w-1/2 h-full bg-zinc-800 rounded-lg`}
                            >
                                <span>5<sup>th</sup> Period</span>
                            </button>
                        </div>
                        <div className={'w-full h-[18%] flex justify-between gap-3'}>
                            <button
                                className={`w-1/2 h-full bg-zinc-800 rounded-lg`}
                            >
                                <span>3<sup>rd</sup> Period</span>
                            </button>
                            <button
                                className={`w-1/2 h-full bg-zinc-800 rounded-lg`}
                            >
                                <span>6<sup>th</sup> Period</span>
                            </button>
                        </div>
                        <div className={'w-full h-[18%] flex justify-between gap-3'}>
                            <button
                                className={`w-1/2 h-full bg-zinc-800 rounded-lg`}
                            >
                                <span>4<sup>th</sup> Period</span>
                            </button>
                            <button
                                className={`w-1/2 h-full bg-zinc-800 rounded-lg`}
                            >
                                <span>7<sup>th</sup> Period</span>
                            </button>
                        </div>
                        <button
                            className={`w-full h-[18%] bg-zinc-800 rounded-lg`}
                        >
                            <span>8<sup>th</sup> Period</span>
                        </button>
                    </div>
                </div>
            </div>
            {/* Available Classes */}
            <div className="w-[30%] h-full flex flex-col gap-2">
            <div
                className={`w-full h-full flex flex-col flex-grow items-center ${availableClasses.length == 0 ? "justify-center" : "justify-start"} bg-baseM-200 py-4 rounded-lg overflow-y-auto`}
                style={{
                    scrollbarWidth: "thin",
                }}
            >
                {
                    availableClasses.length == 0 ? <>
                        <div className="flex flex-col justify-center items-center">
                            <span className="my-1 text-xl font-semibold tracking-wider">No Classes Available</span>
                            <span className="my-1 text-base">Add classes <Link className="text-blue-500 hover:text-blue-600 transition-all underline" to={{
                                pathname: "/classes"
                            }}>here</Link></span>
                        </div>
                    </> : <>
                        <div
                            className="w-full h-full flex flex-col flex-grow overflow-x-hidden px-4"
                            style={{
                                scrollbarWidth: "thin",
                            }}
                            >
                            {
                                Object.entries(availableClasses).map((value, i) => {
                                    return <button
                                                key={i}
                                                className={`w-full flex items-center border-2 border-outline border-transparent my-4 ${focus == value[1] ? "border-yellow-500" : "hover:border-yellow-600"} rounded-lg transition-all`}
                                                onClick={() => {
                                                    if (focus == value[1]) {
                                                        setFocus(null);
                                                    } else {
                                                        setFocus(value[1]);
                                                    }
                                                }}
                                            >
                                        <ClassButton value={data[value[1]]} />
                                    </button>
                                })
                            }
                        </div>
                    </>
                }
            </div>
                <button
                    className="w-full h-[7vh] bg-zinc-700 rounded-lg"
                    onClick={() => {
                        resetSchedule()
                    }}
                    >
                    Debug
                </button>
                
            </div>
            {/* Spring Semester */}
            <div className="w-[35%] h-full flex flex-col items-center justify-start px-4 py-8 rounded-lg gap-3">
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
                    <div className="w-full h-[7vh] grid flex-grow grid-cols-2 gap-3">
                        {
                            Object.entries([1, 2, 3, 4, 5, 6, 7, 8]).map((value, i) => {
                                return (
                                    <button
                                        key={i}
                                        className={`${value[1] == 1 || value[1] == 8 ? "col-span-2" : ""} w-full h-full border-2 border-transparent ${focus != null ? isAvailable(focus, value[1], [2]) ? "bg-zinc-800 border-zinc-600" : "bg-zinc-900" : "bg-zinc-800"} rounded-lg transition-all`}
                                        disabled={focus == null || !isAvailable(focus, value[1], [2])}
                                        onClick={() => {
                                            if (focus != null) addToSchedule(focus as number, value[1], data[focus].term[0] == 1 ? "fall" : "spring")
                                        }}
                                    >
                                        { schedule.spring[value[1] as 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8] == null ? (
                                            value[1] == 2 ? <span>2<sup>nd</sup> Period</span> : value[1] == 3 ? <span>3<sup>rd</sup> Period</span> : <span>{value[1]}<sup>st</sup> Period</span>
                                            ) : (
                                            <div className={`w-full h-full rounded-lg flex flex-col justify-evenly`}>
                                                <div>
                                                    {value[1] != null && schedule.spring[value[1] as 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8] != null ? data[schedule.spring[value[1] as 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8] as number].name : null}
                                                </div>
                                                <div>
                                                    TIME
                                                </div>
                                            </div>
                                            )
                                        }
                                    </button>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}