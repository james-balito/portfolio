import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default function TechStackCarousel() {
    const sectionRef = useRef(null);
    const titleRef = useRef(null);
    const subtitleRef = useRef(null);
    const carouselRef = useRef(null);

    const techStack = [
        { id: 1, icon: "/tech-stacks/react.png", name: "React" },
        { id: 2, icon: "/tech-stacks/typescript.png", name: "TypeScript" },
        { id: 3, icon: "/tech-stacks/tailwindcss.png", name: "TailwindCSS" },
        { id: 4, icon: "/tech-stacks/laravel.png", name: "Laravel" },
        { id: 5, icon: "/tech-stacks/php.png", name: "PHP" },
        { id: 6, icon: "/tech-stacks/javascript.png", name: "JavaScript" },
        { id: 7, icon: "/tech-stacks/html5.png", name: "HTML5" },
        { id: 8, icon: "/tech-stacks/css3.png", name: "CSS3" },
        { id: 9, icon: "/tech-stacks/gsap.png", name: "GSAP" },
    ];

    gsap.registerPlugin(ScrollTrigger);

    useGSAP(() => {
        // Get all tech items
        const techItems = gsap.utils.toArray(".tech-item");

        // Set initial states
        gsap.set([titleRef.current, subtitleRef.current], {
            opacity: 0,
            y: 30
        });

        gsap.set(carouselRef.current, {
            opacity: 0,
            y: 50,
            scale: 0.95
        });

        gsap.set(techItems, {
            opacity: 0,
            scale: 0.8,
        });

        // Create main timeline
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 100%",
                end: "top 100%",
                toggleActions: "play none none reverse",
                markers: true, // Uncomment to debug
            }
        });

        // Animate everything in sequence
        tl.to(titleRef.current, {
            opacity: 1,
            y: 0,
            duration: 0.4,
            ease: "power2.out(1.7)"
        })
            .to(subtitleRef.current, {
                opacity: 1,
                y: 0,
                duration: 0.5,
                ease: "power2.out"
            }, "-=0.3")
            .to(carouselRef.current, {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.4,
                ease: "power3.out"
            }, "-=0.2")
            .to(techItems, {
                opacity: 1,
                scale: 1,
                duration: 0.1,

            }); // Overlap with carousel reveal
    }, []);

    return (
        <>
            <section ref={sectionRef} className="relative mt-10">
                <h1
                    ref={titleRef}
                    style={{ fontFamily: 'var(--Instrument-Serif)' }}
                    className="flex justify-center font-black text-2xl text-[var(--text-color)] mt-20"
                >
                    Tech Stack
                </h1>
                <p
                    ref={subtitleRef}
                    className="flex justify-center text-[var(--text-color)]/70"
                >
                    Languages & Frameworks I acquired knowledge in
                </p>

                <div className="flex justify-center">
                    <div ref={carouselRef} className="relative w-[91%] overflow-hidden my-6">
                        <div className="overflow-hidden mask-gradient">
                            <div className="flex animate-endless-scroll gap-10">
                                {[...techStack, ...techStack, ...techStack].map((tech, i) => (
                                    <div
                                        key={i}
                                        className="tech-item group mx-2 w-28 h-28 flex flex-col items-center justify-center gap-2 rounded-xl flex-shrink-0 transition-all duration-300"
                                    >
                                        <img
                                            src={tech.icon}
                                            alt={tech.name}
                                            className="w-15 h-15 object-contain transition-all duration-300 
                                           brightness-75 contrast-125 saturate-0 grayscale
                                           group-hover:brightness-100 group-hover:contrast-100 
                                           group-hover:saturate-100 group-hover:grayscale-0
                                           group-hover:scale-110"
                                        />
                                        <span className="text-xs font-medium text-[var(--text-color)]/0 group-hover:text-[var(--text-color)]/70 transition-all duration-300">
                                            {tech.name}
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