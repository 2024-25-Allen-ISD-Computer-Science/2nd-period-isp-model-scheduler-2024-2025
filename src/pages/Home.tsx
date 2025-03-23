// import { motion } from "motion/react";
// import Logo from "../assets/allenisd_logo-removebg-preview.png";

import { FiArrowRight } from "react-icons/fi";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useMotionTemplate, useMotionValue, animate, motion } from "motion/react";
import { useEffect } from "react";

// import RadialGradientAnimation from "../components/RadialGradientAnimation";

export default function Home() {
    const COLORS = ["#a32fef", "#303cef", "#f32d57"]
    const colors = useMotionValue(COLORS[0])
    const backgroundImage = useMotionTemplate`radial-gradient(100% 100% at 50% 0%, #020617 50%, ${colors})`

    useEffect(() => {
        animate(colors, COLORS, {
            ease: 'easeInOut',
            duration: 10,
            repeat: Infinity,
            repeatType: "mirror"
        })
    })

    return (
        <>
            <motion.section
                className="w-screen h-screen relative overflow-hidden"
                style={{
                    backgroundImage
                }}
            >
                <div className="w-full">
                    <Navbar />
                </div>
                <div className="w-full h-full flex flex-col items-center justify-center gap-4">
                    
                    <div className="text-6xl font-semibold">
                        Allen High School
                    </div>
                    <div className="text-2xl">
                        Model Scheduler 2024-2025
                    </div>
                    <Link to={{pathname: '/2nd-period-isp-model-scheduler-2024-2025/classes'}} className="border-2 border-black px-3 py-1 border-white hover:border-blue-500 hover:text-blue-500 transition-all rounded-lg flex items-center text-xl">
                        <span>Start </span><FiArrowRight />
                    </Link>
                </div>
            </motion.section>
        </>
    )
}
