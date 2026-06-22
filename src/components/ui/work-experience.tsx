// components/work-experience.tsx
import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { MapPinned } from 'lucide-react'

// Register plugin safely outside component lifecycle
gsap.registerPlugin(ScrollTrigger);

export default function WorkExperience() {
    const sectionRef = useRef<HTMLElement>(null);
    const lineRef = useRef<HTMLDivElement>(null);
    const circleRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    // Dynamic array ref handling
    const experienceRefs = useRef<HTMLDivElement[]>([]);

    const workExperiences = [
        {
            id: 2,
            position: "Front-end Developer Intern",
            company: "Warlen Industrial Sales Corporation",
            period: "Feb - May 2026",
            location: "Bacolod City, Philippines",
            description: "Contributed as a front-end developer to design, build, and optimize an internal Payroll Management System.",
            highlights: [
                "Architecture: Refactored fragmented attendance views into a unified, multi-tab React module to optimize navigation.",
                "UX Optimization: Enhanced system architecture and polished responsive multi-role dashboards to deliver a smooth, uniform user experience.",
                "Feature Engineering: Developed custom print features for individual employee payroll receipts and high-level summary payroll reports.",
                "Implementation: Translated high-fidelity wireframes into static Inertia.js modules to bridge frontend views with backend endpoints.",
                "Collaboration: Partnered with backend developers and designers to align UI components with database logic requirements."
            ],
            technologies: ["Laravel", "React.js", "TailwindCSS","Inertia.js"],
        }
    ];

    useGSAP(() => {
        if (!sectionRef.current || !containerRef.current) return;

        // 1. Initial State Resets
        gsap.set([titleRef.current, circleRef.current], { opacity: 0 });
        gsap.set(titleRef.current, { y: 30 });
        gsap.set(circleRef.current, { scale: 0 });

        // 2. Section Entry Animation Timeline
        const introTl = gsap.timeline({
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 80%",
                toggleActions: "play none none reverse",
            }
        });

        introTl
            .to(titleRef.current, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" })
            .fromTo(lineRef.current,
                { scaleY: 0, transformOrigin: "top center" },
                { scaleY: 1, duration: 1, ease: "power2.inOut" },
                "-=0.3"
            )
            .to(circleRef.current, { opacity: 1, scale: 1, duration: 0.4, ease: "back.out(1.7)" }, "-=0.2");

        // 3. Scrubbing Dot down the Timeline Line
        gsap.to(circleRef.current, {
            top: "100%",
            ease: "none",
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 70%", // Spans exactly across viewport middle axis
                end: "bottom 70%",
                scrub: 0.5,
            }
        });

        // 4. Reveal Cards and Animate Associated Connector Dots/Lines
        experienceRefs.current.forEach((el) => {
            if (!el) return;

            const contentCard = el.querySelector('.card-content');
            const connectorLine = el.querySelector('.connector-line');
            const connectorDot = el.querySelector('.connector-dot');

            const itemTl = gsap.timeline({
                scrollTrigger: {
                    trigger: el,
                    start: "top 55%",  // Triggers just before the main dot matches axis line

                    // CHANGED: "play none none reverse" 
                    // play = when entering from top
                    // none = do nothing when leaving from bottom (stays visible)
                    // none = do nothing when entering back from bottom
                    // reverse = fade out when leaving back from top
                    toggleActions: "play none none reverse",
                }
            });

            itemTl.fromTo([contentCard, connectorLine, connectorDot],
                { opacity: 0, y: 20, scale: 0.95 },
                { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: "power2.out", stagger: 0.1 }
            );
        });

    });

    return (
        <section ref={sectionRef} id = "experience" className="relative py-24 overflow-hidden w-full text-slate-100 flex flex-col items-center">
            {/* Background Aesthetic Striped Grid Lines matching wireframe */}
            <div className="absolute inset-0 grid grid-cols-6 md:grid-cols-12 pointer-events-none opacity-[0.03] border-x border-slate-500">
                {[...Array(12)].map((_, i) => <div key={i} className="border-r border-slate-500 h-full" />)}
            </div>

            <div className="max-w-5xl w-full px-6 z-10">
                {/* Master Title Header */}
                <h2
                    ref={titleRef}
                    style={{ fontFamily: 'var(--Instrument-Serif, serif)', fontStyle: 'italic' }}
                    className="text-2xl md:text-3xl text-center mb-24 text-[var(--text-color)] font-light tracking-wide"
                >
                    Professional Experience
                </h2>

                {/* Central Timeline Component Core Wrapper */}
                <div className="relative w-full ">

                    {/* Absolute Vector Core Center Guide Rail */}
                    <div className="absolute left-0 lg:left-4 xl:left-125 md:left-1/2 top-0 bottom-0 transform md:-translate-x-1/2 w-0.5 pointer-events-none">
                        {/* Background Base Track Line */}
                        <div ref={lineRef} className="w-full h-full bg-gradient-to-b from-blue-500/50 via-indigo-500/50 to-transparent" />

                        {/* Interactive Main Scrub Tracking Ball Indicator */}
                        <div
                            ref={circleRef}
                            className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-5 h-5 bg-blue-500 rounded-full z-30"
                            style={{ top: '0%', boxShadow: '0 0 15px #3b82f6, 0 0 30px #3b82f6' }}
                        >
                            <div className="absolute inset-1 bg-white rounded-full" />
                        </div>
                    </div>

                    {/* Node Cards Mapping Container */}
                    <div ref={containerRef} className="relative w-full space-y-20">
                        {workExperiences.map((experience, index) => {
                            const isEven = index % 2 === 0;
                            return (
                                <div
                                    key={experience.id}
                                    ref={(el) => { if (el) experienceRefs.current[index] = el; }}
                                    className={`relative flex flex-col md:flex-row items-start w-full ${isEven ? 'md:justify-start lg:justify-start xl:justify-start' : 'md:justify-end lg:justify-end xl:justify-end'
                                        }`}
                                >
                                    {/* Structural Content Layout Block */}
                                    <div className={`w-full md:w-[calc(50%-2.5rem)] xl:w-[calc(51%-2.5rem)] lg:w-[calc(50%-2.5rem)] pl-5 md:pl-12 lg:pl-12 xl:pl-12 md:pl-0 ${isEven ? 'md:text-left xl:text-left' : 'md:text-left xl:text-normal'
                                        }`}>

                                        {/* Interactive Main Dashboard Entry Card Panel */}
                                        <div className="card-content bg-[#111827]/60 border border-slate-800/80 rounded-2xl p-6 xl:p-6 md:p-8 backdrop-blur-md hover:border-blue-500/50 transition-colors duration-300 shadow-xl">

                                            {/* Header Header Info Metrics */}
                                            <div className="flex flex-row xl:flex-row justify-between gap-2">
                                                <h3 style={{ fontFamily: 'var(--Instrument-Serif, serif)', fontStyle: 'italic' }} className="text-lg md:text-2xl lg: xl:text-2xl font-normal text-white">
                                                    {experience.position}
                                                </h3>
                                                <span className="text-xs md:text-sm lg:text-sm xl:text-sm font-base text-slate-400 py-2 xl:py-2 self-start sm:self-auto xl:self-start">
                                                    {experience.period}
                                                </span>
                                            </div>

                                            <h4
                                                className="text-base text-blue-400 font-medium tracking-wide mb-1"
                                                style={{ fontFamily: 'var(--Inter)' }}
                                            >
                                                {experience.company}
                                            </h4>

                                            <div className="text-xs text-slate-400 flex items-center gap-1.5 mb-4">
                                                <MapPinned className="h-3.5 w-3.5 text-slate-500" />
                                                <span>{experience.location}</span>
                                            </div>

                                            <p className="text-sm text-slate-300 leading-relaxed mb-4 font-light">
                                                {experience.description}
                                            </p>

                                            {/* Detailed Target Accomplishment Bullet Breakdowns */}
                                            {experience.highlights && (
                                                <ul className="space-y-2 mb-5 text-xs text-slate-400 list-disc list-inside font-light pl-1">
                                                    {experience.highlights.map((highlight, hIdx) => (
                                                        <li key={hIdx} className="leading-relaxed">
                                                            <span className="text-slate-300 font-normal">{highlight.split(':')[0]}:</span>
                                                            {highlight.split(':')[1]}
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}

                                            {/* Technical Competency Badges Footer */}
                                            <div className="flex flex-wrap gap-1.5 pt-2">
                                                {experience.technologies.map((tech, techIndex) => (
                                                    <span
                                                        key={techIndex}
                                                        className="px-2.5 py-1 bg-blue-500/10 text-[var(--secondary-color)] text-[11px] font-medium rounded-xl border border-blue-500/20"
                                                    >
                                                        {tech}
                                                    </span>
                                                ))}
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                </div>
            </div>
        </section>
    );
}