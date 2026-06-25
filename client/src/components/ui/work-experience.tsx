// components/work-experience.tsx
import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { MapPinned } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger);

export default function WorkExperience() {
    const sectionRef = useRef<HTMLElement>(null);
    const lineRef = useRef<HTMLDivElement>(null);
    const circleRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
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
            technologies: ["Laravel", "React.js", "TailwindCSS", "Inertia.js"],
        }
    ];

    useGSAP(() => {
        const ctx = gsap.context(() => {

            // ── 1. Initial states ─────────────────────────────────────────────
            gsap.set(titleRef.current,  { opacity: 0, y: 30 });
            gsap.set(circleRef.current, { opacity: 0, scale: 0 });
            gsap.set(lineRef.current,   { scaleY: 0, opacity: 0, transformOrigin: "top center" });

            // Hide all card targets before any scroll
            experienceRefs.current.forEach((el) => {
                if (!el) return;
                const targets = [
                    el.querySelector('.card-content'),
                    el.querySelector('.connector-line'),
                    el.querySelector('.connector-dot'),
                ].filter(Boolean);
                gsap.set(targets, { opacity: 0, y: 20, scale: 0.95 });
            });

            // ── 2. Header reveal timeline ─────────────────────────────────────
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 50%",
                    end: "top 0%",
                    toggleActions: "play none none reverse",
                }
            });

            tl.fromTo(titleRef.current,
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
            )
            .fromTo(lineRef.current,
                { scaleY: 0, opacity: 0 },
                { scaleY: 1, opacity: 1, duration: 1, ease: "power2.inOut" },
                "-=0.3"
            )
            .fromTo(circleRef.current,
                { opacity: 0, scale: 0 },
                { opacity: 1, scale: 1, duration: 0.4, ease: "back.out(1.7)" },
                "-=0.2"
            );

            // ── 3. Scrub dot tracks scroll progress down the line ─────────────
            gsap.to(circleRef.current, {
                top: "100%",
                ease: "none",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 50%",
                    end: "bottom 10%",
                    scrub: 0.2,
                }
            });

            // ── 4. Dot-triggered fade per card ────────────────────────────────
            //
            // Strategy: the scrub dot's `top` (0%–100%) maps linearly onto the
            // section's scroll range (start:"top 10%" → end:"bottom 10%").
            //
            // For each card we measure its vertical midpoint relative to the
            // section container, express that as a 0–1 progress value, then
            // convert it into the equivalent scroll position so ScrollTrigger
            // can fire at the exact moment the dot visually passes the card.
            //
            // We do this inside a small RAF after the first paint so that all
            // layout measurements are stable (fonts loaded, spacing settled).
            //
            requestAnimationFrame(() => {
                const section = sectionRef.current;
                if (!section) return;

                const sectionH = section.scrollHeight; // full scrollable height

                // The scrub runs from "top 10%" to "bottom 10%".
                // In scroll-pixels that is: scrollStart = sectionTop + 0.1 * vh
                //                           scrollEnd   = sectionBottom - 0.1 * vh
                // We don't need the absolute pixel math here — ScrollTrigger lets
                // us express start/end as offsets from the trigger element, so we
                // instead translate each card's relative position into a percentage
                // offset string for that same trigger.

                experienceRefs.current.forEach((el) => {
                    if (!el) return;

                    const cardContent   = el.querySelector('.card-content');
                    const connectorLine = el.querySelector('.connector-line');
                    const connectorDot  = el.querySelector('.connector-dot');
                    const targets = [cardContent, connectorLine, connectorDot].filter(Boolean);
                    if (!targets.length) return;

                    // Midpoint of this card relative to the section top
                    const cardMidY = el.offsetTop + el.offsetHeight / 2;

                    // Express as a fraction of the section's scroll height
                    const fraction = Math.min(Math.max(cardMidY / sectionH, 0), 1);

                    // The scrub occupies 80% of the section scroll range (10%→90%).
                    // Map fraction into that window so the dot "reaches" the card
                    // exactly when the trigger fires.
                    //
                    // scrubFraction = 0.1 + fraction * 0.8
                    //
                    // Convert back to a pixel offset from section top for the
                    // ScrollTrigger start value:
                    //   startOffset = scrubFraction * sectionH
                    //
                    const scrubFraction = 0.1 + fraction * 0.8;
                    const startPx  = Math.round(scrubFraction * sectionH);

                    // Fade window: 80px before the dot arrives → 80px after
                    const window = 250;

                    ScrollTrigger.create({
                        trigger: section,
                        // "top Npx" means "when section top is N pixels above viewport top"
                        // i.e. when the user has scrolled (sectionOffsetTop + startPx - N)px
                        start: `top+=${startPx - window}px top`,
                        end:   `top+=${startPx + window}px top`,
                        toggleActions: "play none none reverse",
                        onEnter: () => {
                            gsap.to(targets, {
                                opacity: 1,
                                y: 0,
                                scale: 1,
                                duration: 0.5,
                                ease: "power2.out",
                                stagger: 0.08,
                            });
                        },
                        onLeaveBack: () => {
                            // Fade out when scrolling back up past the dot
                            gsap.to(targets, {
                                opacity: 0,
                                y: 20,
                                scale: 0.95,
                                duration: 0.35,
                                ease: "power2.in",
                                stagger: { each: 0.06, from: "end" },
                            });
                        },
                    });
                });

                ScrollTrigger.refresh();
            });

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            id="experience"
            className="relative py-24 overflow-hidden w-full text-slate-100 flex flex-col items-center"
        >
            {/* Background grid */}
            <div className="absolute inset-0 grid grid-cols-6 md:grid-cols-12 pointer-events-none opacity-[0.03] border-x border-slate-500">
                {[...Array(12)].map((_, i) => (
                    <div key={i} className="border-r border-slate-500 h-full" />
                ))}
            </div>

            <div className="max-w-5xl w-full px-6 z-10">

                {/* Section title */}
                <h2
                    ref={titleRef}
                    style={{ fontFamily: 'var(--Instrument-Serif, serif)', fontStyle: 'italic' }}
                    className="text-2xl md:text-3xl text-center mb-24 text-[var(--text-color)] font-light tracking-wide"
                >
                    Professional Experience
                </h2>

                {/* Timeline wrapper */}
                <div className="relative w-full">

                    {/* Center guide rail */}
                    <div className="absolute left-0 md:left-1/2 top-0 bottom-0 transform md:-translate-x-1/2 w-0.5 pointer-events-none">

                        {/* Track line */}
                        <div
                            ref={lineRef}
                            className="w-full h-full bg-gradient-to-b from-blue-500/50 via-indigo-500/50 to-transparent"
                        />

                        {/* Scrub dot */}
                        <div
                            ref={circleRef}
                            className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-5 h-5 bg-blue-500 rounded-full z-30"
                            style={{ top: '0%', boxShadow: '0 0 15px #3b82f6, 0 0 30px #3b82f6' }}
                        >
                            <div className="absolute inset-1 bg-white rounded-full" />
                        </div>
                    </div>

                    {/* Cards */}
                    <div ref={containerRef} className="relative w-full space-y-20">
                        {workExperiences.map((experience, index) => {
                            const isEven = index % 2 === 0;
                            return (
                                <div
                                    key={experience.id}
                                    ref={(el) => { if (el) experienceRefs.current[index] = el; }}
                                    className={`relative flex flex-col md:flex-row items-start w-full ${
                                        isEven
                                            ? 'md:justify-start'
                                            : 'md:justify-end'
                                    }`}
                                >
                                    {/*
                                     * Connector elements — these are the visual bridge between
                                     * the center rail and the card. They are required targets for
                                     * the dot-triggered fade, so they MUST be in the DOM.
                                     *
                                     * connector-line: horizontal rule from the rail to the card
                                     * connector-dot:  small circle sitting on the rail at card level
                                     */}

                                    {/* Card layout block */}
                                    <div className={`w-full md:w-[calc(50%-2.5rem)] pl-5 md:pl-0`}>

                                        {/* Card */}
                                        <div className="card-content bg-[#111827]/60 border border-slate-800/80 rounded-2xl p-6 md:p-8 backdrop-blur-md hover:border-blue-500/50 transition-colors duration-300 shadow-xl">

                                            {/* Header row */}
                                            <div className="flex flex-row justify-between gap-2">
                                                <h3
                                                    style={{ fontFamily: 'var(--Instrument-Serif, serif)', fontStyle: 'italic' }}
                                                    className="text-lg md:text-2xl font-normal text-white"
                                                >
                                                    {experience.position}
                                                </h3>
                                                <span className="text-xs md:text-sm text-slate-400 py-2 self-start shrink-0">
                                                    {experience.period}
                                                </span>
                                            </div>

                                            <h4
                                                className="text-sm xl:text-base text-blue-400 font-medium tracking-wide mb-1"
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

                                            {experience.highlights && (
                                                <ul className="space-y-2 mb-5 text-xs text-slate-400 list-disc list-inside font-light pl-1">
                                                    {experience.highlights.map((highlight, hIdx) => (
                                                        <li key={hIdx} className="leading-relaxed">
                                                            <span className="text-slate-300 font-normal">
                                                                {highlight.split(':')[0]}:
                                                            </span>
                                                            {highlight.split(':').slice(1).join(':')}
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}

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