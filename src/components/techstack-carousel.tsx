export default function TechStackCarousel() {

    const techStack = [
        { id: 1, icon: "/tech-stacks/react.png", name: "React" },
        { id: 2, icon: "/tech-stacks/typescript.png", name: "TypeScript" },
        { id: 3, icon: "/tech-stacks/tailwindcss.png", name: "TailwindCSS" },
        { id: 4, icon: "/tech-stacks/laravel.png", name: "Laravel" },
        { id: 5, icon: "/tech-stacks/php.png", name: "PHP" },
        { id: 6, icon: "/tech-stacks/javascript.png", name: "JavaScript" },
        { id: 7, icon: "/tech-stacks/html5.png", name: "HTML5" },
        { id: 8, icon: "/tech-stacks/css3.png", name: "CSS3" },
    ];

    return (
        <>
            <section className="relative mt-10">
                <h1 className="flex justify-center text-2xl font-bold text-[var(--text-color)] mt-20">
                    Tech Stack
                </h1>
                <p className="flex justify-center">Current Languages & Frameworks I've mastered</p>

                {/* Centered Container */}
                <div className="flex justify-center">
                    <div className="relative w-[91%] overflow-hidden my-5">
                        {/* Carousel */}
                        <div className="overflow-hidden mask-gradient">
                            <div className="flex animate-endless-scroll gap-10">
                                {[...techStack, ...techStack, ...techStack].map((techStack, i) => (
                                    <div
                                        key={i}
                                        className="group mx-2 w-28 h-28 flex flex-col items-center justify-center gap-2 rounded-xl flex-shrink-0 transition-all duration-300 hover:scale-105"
                                    >
                                        <img
                                            src={techStack.icon}
                                            alt={techStack.name}
                                            className="w-15 h-15 object-contain transition-all duration-300 
                                           brightness-75 contrast-125 saturate-0 grayscale
                                           group-hover:brightness-100 group-hover:contrast-100 
                                           group-hover:saturate-100 group-hover:grayscale-0
                                           group-hover:scale-110"
                                        />
                                        <span className="text-xs font-medium text-[var(--text-color)]/0 group-hover:text-[var(--text-color)]/70 transition-all duration-300">
                                            {techStack.name}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <style>{`
        @keyframes endlessScroll {
            0% {
                transform: translateX(0);
            }
            100% {
                transform: translateX(-33.33%);
            }
        }
        
        .animate-endless-scroll {
            animation: endlessScroll 35s linear infinite;
            width: max-content;
            display: flex;
        }
        
        .animate-endless-scroll:hover {
            animation-play-state: paused;
        }

        /* Mask gradient with blur effect */
        .mask-gradient {
            mask-image: linear-gradient(
                to right,
                transparent,
                black 20%,
                black 95%,
                transparent
            );
            -webkit-mask-image: linear-gradient(
                to right,
                transparent,
                black 20%,
                black 95%,
                transparent
            );
        }
    `}</style>
            </section>
        </>
    )
}