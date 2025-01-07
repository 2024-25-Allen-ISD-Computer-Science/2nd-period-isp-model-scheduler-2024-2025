import { motion } from "motion/react";

export default function Home() {
    return (
        <>
        <div className="w-full h-full flex items-center justify-center">
            <motion.div
                className="w-48 h-48 rounded-[50%] absolute top-0 left"
                animate={{
                    background: [
                        'linear-gradient(45deg, #ff7e5f, #feb47b)',
                        'linear-gradient(135deg, #6a11cb, #2575fc)',
                        'linear-gradient(225deg, #ff9a8b, #fad0c4)',
                    ],
                    transition: {
                        repeat: Infinity,
                        repeatType: 'loop',
                        duration: 5,
                        ease: 'easeInOut'
                    }
                }}
                style={{
                    backgroundColor: "white",
                }}
                >
                    
            </motion.div>
        </div>
        </>
    )
}