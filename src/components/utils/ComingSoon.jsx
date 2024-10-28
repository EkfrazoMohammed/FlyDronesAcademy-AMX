import React, { useEffect, useState } from 'react';
import './ComingSoon.css'; // Import the custom CSS file for animations

const ComingSoon = () => {
    const [countdown, setCountdown] = useState('');

    useEffect(() => {
        const endingDate = new Date("Nov 14, 2018 13:37:00").getTime();

        const interval = setInterval(() => {
            const current = new Date().getTime();
            const remainingTime = endingDate - current;

            const days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
            const hours = Math.floor((remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);

            setCountdown(`${days}D ${hours}H ${minutes}M ${seconds}S`);
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="min-h-screen bg-cover bg-center relative"
             style={{
                 backgroundImage: `linear-gradient(rgba(34, 41, 65, 0.55), rgba(46, 55, 86, 0.55)), url('https://fibregridstorage.blr1.cdn.digitaloceanspaces.com/Flydro_web_images/person-using-futuristic-drone.jpg')`
             }}>
            <header className="absolute top-[25%] w-full">
                <div className="flex justify-center py-5">
                    <img
                        className="w-40 h-40 fade fadeOne"
                        src="https://aactxg.stripocdn.email/content/guids/CABINET_f37167ea2322984dfeb6a0a05e92d2480b49356b15fb055bb2ce2e84131a12e4/images/flydro_logo_png_1.png"
                        alt="Logo"
                    />
                </div>
                <div className="flex flex-col justify-center items-center h-full">
                <h1 className="text-4xl font-light text-white tracking-[10px] mb-5 fade fadeTwo">COMING SOON</h1>
                <h1 className="text-4xl font-light text-white tracking-[2px] mb-5 fade fadeTwo">Building a Better Experience!</h1>
                {/* <h2 className="text-2xl font-mono text-white uppercase tracking-wide">{countdown}</h2> */}
            </div>
            </header>
           
        </div>
    );
};

export default ComingSoon;
