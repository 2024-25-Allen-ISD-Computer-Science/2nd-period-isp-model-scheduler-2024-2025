import { motion } from "motion/react"
// import { radialGradient } from "motion/react-client"

export default function RadialGradientAnimation({
    color,
}: {
    color?: string,
}) {
    // const dimentions = radius == undefined ? "w-full" : "w-[" + radius + "] h-[" + radius + "]";
    const gradient = color == undefined ? "radial-gradient(circle, #54d1d1 1%, rgba(13, 13, 13, .5) 70%, transparent 100%)" : "radial-gradient(circle, " + color + " 1%, rgba(13, 13, 13, .5) 70%, transparent 100%)";
    return (
        <div
            className={`w-[100vw] h-[100vw]`}
            // className={`${radius == undefined ? "w-full" : `w-[50vw] h-[50vw]`}`}
            >
            <motion.div
            className="w-full h-full flex items-center justify-center rounded-full"
            style={{
                background: gradient
            }}
            animate={{
                opacity: 1,
                scale: [0.95, 1, 0.95],
            }}
            transition={{
                duration: 10,
                // ease: ["easeIn", "easeOut"],
                ease: [0, 0.71, 0.2, 1.01],
                repeat: Infinity,
                repeatType: "loop"
            }}
            >
                
            </motion.div>
        </div>
    )
}