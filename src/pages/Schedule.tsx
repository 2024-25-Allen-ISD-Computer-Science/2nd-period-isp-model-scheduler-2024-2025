import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { data } from "../assets/data";
import useLocalStorage from "../util/useLocalStorage";
import ClassButton from "../components/ClassButton";
import { CampusTag } from "../components/Tags";

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
    // const [availableTimes, setAvailableTimes] = useState<{fall: Array<number>, spring: Array<number>}>({fall: [], spring: []});
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

    // update the availableTimes based on periods and campus travel times
    
    useEffect(() => {
        if (focus != null) {
            console.log("hi")
        }
    }, [focus])

    useEffect(() => {
        setFocus(null);
    }, [schedule])

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

    function returnTime(index: number, value: [string, number[]]) {
        return times[value[1][index] as 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8].AHS.concat(times[value[1][index] as 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8].STEAM);
    }
    function searchForID(id: number): number {
        Object.entries(schedule.spring).map((value) => {
            console.log(value)
        })
        return 0
    }
    function returnButton(period: number, time: Array<string>, half: boolean=false) {
        return (
            <button
                key={period + 100}
                className={`${half ? "w-1/2 max-w-1/2" : "w-full"} h-full border-2 border-transparent ${focus != null ? isAvailable(focus, period, [2]) ? "bg-zinc-800 border-zinc-600" : "bg-zinc-900" : "bg-zinc-800"} rounded-lg transition-all p-2`}
                disabled={focus == null ? schedule.spring[period as 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8] == null ? true : false : isAvailable(focus, period, [2]) ? false : true}
                onClick={() => {
                    if (focus != null) {
                        //! FIX BEING ABLE TO DUPLICATE CLASSES
                        // let prevPeriod : number = 0;
                        // for (const period of [1, 2, 3, 4, 5, 6, 7, 8]) {

                        // }
                        searchForID(focus)
                        addToSchedule(focus as number, period, data[focus].term[0] == 1 ? "fall" : "spring")
                    } else {
                        setFocus(schedule.spring[period as 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8])
                    };
                }}
            >
                { schedule.spring[period as 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8] == null ? (
                    period == 1 ? <span>1<sup>st</sup> Period</span> : period == 2 ? <span>2<sup>nd</sup> Period</span> : period == 3 ? <span>3<sup>rd</sup> Period</span> : <span>{period}<sup>th</sup> Period</span>
                    ) : (
                    <div className={`w-full h-full rounded-lg flex flex-col justify-center p-2`}>
                        <div>
                            {period != null && schedule.spring[period as 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8] != null ? data[schedule.spring[period as 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8] as number].name : null}
                        </div>
                        <div className="w-full flex items-center justify-evenly">
                            <div className="w-1/3 text-sm">
                                <CampusTag campus={data[schedule.spring[period as 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8] as number].department} />
                            </div>
                            <div className="w-2/3 text-sm">
                                <span>{data[schedule.spring[period as 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8] as number].department == "AHS" ? time[0] : time[2]}</span><span>-</span><span>{data[schedule.spring[period as 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8] as number].department == "AHS" ? time[1] : time[3]}</span>
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
                                                key={value[i]}
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
                        console.log(schedule.spring)
                        resetSchedule()
                    }}
                    >
                    {schedule.spring[7] == null ? "true" : schedule.spring[7]}
                </button>
                
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
                                if (value[1].length == 1) return <div className="w-full h-full max-h-[20%]">{returnButton(value[1][0], time)}</div>;
                                if (value[1].length == 2) return (
                                    <div className="w-full h-full max-h-[20%] flex gap-3">
                                        {returnButton(value[1][0], time, true)}
                                        {returnButton(value[1][1], time, true)}
                                    </div>
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