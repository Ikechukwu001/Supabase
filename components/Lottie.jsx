import React from "react";
import Lottie from "lottie-react";
import animation from "../components/Lottie.json";

export default function LottieAnimation() {
    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <Lottie
                animationData={animation}
                loop={true}
                className="w-64 h-64"
            />
        </div>
    );
}