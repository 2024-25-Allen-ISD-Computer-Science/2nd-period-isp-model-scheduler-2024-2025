export default function FAQ() {

    const faq = [
        {
            question: "What is Arena Scheduling?",
            answer: "Allen ISD uses a system where you select your courses, then are placed into priority pools. Each priority pool then opens at a specified time and allows a first-come, first-serve form of course selection, enabling students to have more flexibility in scheduling and allowing for more agency in the process."
        },
        {
            question: "What grades use Arena Scheduling?",
            answer: "Only rising 11th and 12th grade Allen ISD students have access to Arena Scheduling during their grade level window. You will only be able to access Arena Scheduling during your current grade level assignment window."
        },
        {
            question: "When does Arena Scheduling open?",
            answer: "Class of 2026 opens March 31, 2025, while Class of 2027 opens April 9, 2025. Both typically open at 7 am, but this is yet to be confirmed."
        },
        {
            question: "What are my schedule requirements?",
            answer: "You must be enrolled in 6 full semesters of class. Incoming juniors and seniors may have 2 privilege periods, while incoming sophomores may have 1. You also must have the required courses for graduation."
        },
        {
            question: "What courses do I need to graduate?",
            answer: "By your final year in high school, you should have 26 credits total, with at least 4 in English, 4 in Mathematics, 4 in Science, 4 in Social Studies, 2 in LOTE (Language Other Than English), 1 in Fine Arts, 1 in Physical Education, and 6 in Electives."
        },
        {
            question: "Are the courses I select final?",
            answer: "There is a change course request system available from May 2nd to May 6th. You must submit the request via a form that Allen will upload. Some restrictions apply (see Course Change Request Information)."
        },
        {
            question: "Are there any restrictions on what time I can take my classes?",
            answer: "The STEAM Center runs on a different schedule than the main campus, so travel times should not overlap. For example, the 1st Period at the main campus ends at 9:37, while the 2nd Period at STEAM starts at 9:25, an invalid combination."
        },
        {
            question: "Are there any restrictions on privilege periods?",
            answer: "You cannot have more than two block periods on the same day as privilege, or a privilege period during 3rd or 6th period."
        },
        {
            question: "Who should I contact if I have questions about my schedule?",
            answer: "Students and parents should contact their current campus counselor for questions regarding scheduling."
        }
    ];

    return (
        <>
        <div className="w-full h-full flex flex-col items-center px-5 overflow-y-scroll" style={{ scrollbarWidth: "thin" }}>
            <div className="text-4xl font-bold my-5">Frequently Asked Questions</div>
            <div className="w-full h-full flex flex-col items-center">
            {
                Object.entries(faq).map((value) => {
                    return <>
                        <div className="w-full h-fit py-3 leading-loose">
                            <div className="my-3 text-2xl">
                                <span className="font-semibold">Question:</span> {value[1].question}
                            </div>
                            <div>
                                <span className="font-semibold">Answer:</span> {value[1].answer}
                            </div>
                        </div>
                    </>
                })
            }
            </div>
        </div>
        </>
    )
}