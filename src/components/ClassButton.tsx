import { CampusTag, TermTag } from "./Tags";

export default function ClassButton({
    name,
    value,
}: {
    name: string,
    value: {
        department: string,
        periods: Array<number>,
        term: Array<number>,
        total_enrollment: number,
        max_positions: number,
    }
}) {
    const fraction = parseFloat((5 - (value.total_enrollment / value.max_positions) * 5).toFixed(2));
    
    return <div className="w-full h-full flex gap-1 justify-between bg-baseM-100 rounded-lg my-3 mx-2 p-4">
        <div className="w-grow flex flex-col gap-1 justify-between">
            {/* Class Name */}
            <div className="text-xl font-bold tracking-wider">
                {name}
            </div>

            {/* Availabe Periods */}
            <div className="w-full h-8 flex items-center justify-start gap-2">
                <div>Periods:</div>
                {[1, 2, 3, 4, 5, 6, 7, 8].map((period) => {
                    return <div key={period} className={`w-6 h-6 bg-[#222222] flex items-center justify-center rounded-lg bg-baseM-100 ${value.periods.includes(period) ? "text-text-white" : "text-text-sub"}`}>
                        {period}
                    </div>
                })}
            </div>
            
            {/* Availability */}
            <div className="w-full h-8 flex items-center justify-start gap-3">
                <div>Availability:</div>
                {
                    [1, 2, 3, 4, 5].map((value) => {
                        if (fraction - value >= 1) {
                            return <div
                                key={value}
                                className={`w-4 h-4 bg-white rounded-full`}
                                ></div>
                        } else if (fraction - value <= 0) {
                            return <div
                            key={value}
                            className={`w-4 h-4 bg-[#333333] rounded-full`}
                            ></div>
                        } else {
                            return <div
                            key={value}
                            className={`w-4 h-4 rounded-full flex`}
                            style={{
                                backgroundImage: "linear-gradient(to right, #cccccc 50%, #333333 50%)",
                            }}
                            ></div>
                        }
                    })
                }
            </div>
        </div>
        <div className="w-24 h-full flex flex-col justify-evenly">
            <div className="w-full h-10">
                <CampusTag campus={value.department} />
            </div>
            <div className="w-full h-10">
                <TermTag term={value.term} />
            </div>
        </div>
    </div>
}