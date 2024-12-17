import { motion } from "motion/react";

export default function Home() {
    return (
        <>
        <div className="w-full h-full flex items-center justify-center">
            <motion.ellipse
                className="w-96 h-96 rounded-full"
                animate={{
                    x: 100,
                    y: 100,
                }}
                style={{
                    color: "white"
                }}
                >
                
            </motion.ellipse>
        </div>
        </>
    )
}