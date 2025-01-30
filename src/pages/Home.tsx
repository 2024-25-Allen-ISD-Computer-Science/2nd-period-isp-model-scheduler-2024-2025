// import { motion } from "motion/react";

import RadialGradientAnimation from "../components/RadialGradientAnimation";

export default function Home() {
    return (
        <>
        {/* <div className="flex flex-grow items-center justify-center gap-3"> */}
        <div className="grid flex-grow gap-3 grid-rows-4 grid-cols-5">
            {
                Object.entries(["#D1495B", "#748CAB", "#076173", "#FFC857", "#931621", "#DB7C26", "#CFB3CD", "#C6EBBE"]).map((value) => {
                    return <RadialGradientAnimation radius="20px" color={value[1].toLocaleLowerCase()} />
                })
            }
            {/* <RadialGradientAnimation radius="20px" />
            <RadialGradientAnimation radius="20px" />
            <RadialGradientAnimation radius="20px" />
            <RadialGradientAnimation radius="20px" />
            <RadialGradientAnimation radius="20px" />
            <RadialGradientAnimation radius="20px" />
            <RadialGradientAnimation radius="20px" />
            <RadialGradientAnimation radius="20px" />
            <RadialGradientAnimation radius="20px" />
            <RadialGradientAnimation radius="20px" /> */}
            
        </div>
        </>
    )
}