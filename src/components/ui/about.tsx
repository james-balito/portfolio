import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default function About() {
    const sectionRef = useRef<HTMLElement>(null);
    const imgRef = useRef<HTMLImageElement>(null);
    const aboutheaderRef = useRef<HTMLHeadingElement>(null);
    const headerRef = useRef<HTMLHeadingElement>(null);
    const paragraphRef = useRef<HTMLParagraphElement>(null);
    const techStack1Ref = useRef<HTMLDivElement>(null);
    const techStack2Ref = useRef<HTMLDivElement>(null);
    const captionRef = useRef<HTMLDivElement>(null);

    const primaryTechStack = [
        { id: 1, label: 'Laravel' },
        { id: 2, label: 'PHP' },
        { id: 3, label: 'React.js' },
        { id: 4, label: 'Inertia.js' },
    ];

    const secondaryTechStack = [
        { id: 5, label: 'JavaScript' },
        { id: 6, label: 'HTML5' },
        { id: 7, label: 'CSS3' },
        { id: 8, label: 'TailwindCSS' },
    ]

    gsap.registerPlugin(ScrollTrigger);

    useGSAP(() => {
        // ✅ Store in variables with type assertion
        const wordWrappers = paragraphRef.current?.querySelectorAll('.word-wrapper');
        const techBadges1 = techStack1Ref.current?.querySelectorAll('.tech-badge1');
        const techBadges2 = techStack2Ref.current?.querySelectorAll('.tech-badge2');

        // Set initial states for ALL elements
        gsap.set([aboutheaderRef.current, imgRef.current], {
            opacity: 0,
            y: 30
        });

        gsap.set(headerRef.current, {
            opacity: 0,
            x: -30
        });

        gsap.set(paragraphRef.current, {
            opacity: 0,
            y: 20
        });

        gsap.set(captionRef.current, {
            opacity: 0,
            y: 20
        })

        // ✅ Check before using
        if (wordWrappers && wordWrappers.length > 0) {
            gsap.set(wordWrappers, {
                opacity: 0,
                y: 15,
            });
        }

        if (techBadges1 && techBadges1.length > 0) {
            gsap.set(techBadges1, {
                opacity: 0,
                scale: 0.8,
            });
        }

        if (techBadges2 && techBadges2.length > 0) {
            gsap.set(techBadges2, {
                opacity: 0,
                scale: 0.8,
            });
        }

        // Create main timeline
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 70%",
                end: "top 20%",
                toggleActions: "play none none reverse",
            }
        });

        // Animate "About Me" header
        if (aboutheaderRef.current) {
            tl.to(aboutheaderRef.current, {
                y: 0,
                opacity: 1,
                duration: 0.6,
                ease: "back.out(1.7)"
            });
        }

        // Animate image with slight delay
        if (imgRef.current) {
            tl.to(imgRef.current, {
                x: 0,
                opacity: 1,
                duration: 0.8,
                ease: "power3.out",
            }, "-=0.3");
        }

        // Animate name header
        if (headerRef.current) {
            tl.to(headerRef.current, {
                x: 0,
                opacity: 1,
                duration: 0.5,
                ease: "power2.out"
            }, "-=0.5");
        }

        // Animate paragraph container
        if (paragraphRef.current) {
            tl.to(paragraphRef.current, {
                y: 0,
                opacity: 1,
                duration: 0.5,
                ease: "power2.out"
            }, "-=0.2");
        }

        // ✅ Animate each word with stagger - check if exists
        if (wordWrappers && wordWrappers.length > 0) {
            tl.to(wordWrappers, {
                y: 0,
                opacity: 1,
                duration: 0.4,
                stagger: {
                    each: 0.03,
                    from: "start",
                    ease: "power2.out"
                }
            }, "-=0.2");
        }

        if (captionRef.current) {
            tl.to(captionRef.current, {
                y: 0,
                opacity: 1,
                duration: 0.5,
                ease: "power2.out"
            }, "-=0.5");
        }

        // ✅ Animate tech badges 1 - check if exists
        if (techBadges1 && techBadges1.length > 0) {
            tl.to(techBadges1, {
                opacity: 1,
                scale: 1,
                duration: 0.3,
                stagger: {
                    each: 0.05,
                    from: "start",
                    ease: "back.out(1.5)"
                }
            }, "-=0.2");
        }

        // ✅ Animate tech badges 2 - check if exists
        if (techBadges2 && techBadges2.length > 0) {
            tl.to(techBadges2, {
                opacity: 1,
                scale: 1,
                duration: 0.3,
                stagger: {
                    each: 0.05,
                    from: "start",
                    ease: "back.out(1.5)"
                }
            }, "-=0.2");
        }

    }, []);

    return (
        <section ref={sectionRef} className="overflow-hidden">
            <h1
                style={{
                    fontFamily: 'var(--Instrument-Serif)',
                    fontStyle: 'italic',
                    fontWeight: 'normal'
                }}
                className='text-3xl flex justify-center mt-40'
                ref={aboutheaderRef}
            >
                About Me
            </h1>

            <div className='flex justify-between py-15 grid grid-cols-12 gap-4'>
                <img
                    src="/about-me.jpg"
                    alt="James Balito"
                    style={{
                        borderRadius: '10px',
                        height: '450px',
                        width: '416px'
                    }}
                    className='mx-10 col-start-1 col-span-4'
                    ref={imgRef}
                />

                <div className='justify-center items-center my-15 px-10 col-start-7 col-span-6'>
                    <h1
                        ref={headerRef}
                        className="flex justify-start items-right text-lg font-bold mb-4"
                        style={{ fontFamily: 'var(--Inter)' }} 
                    >
                        I'm
                        <span style={{ fontFamily: 'var(--Tienne)' }} className="text-2xl">
                            &nbsp;JAMES
                        </span>
                        <span style={{ fontFamily: 'var(--Tienne)' }} className="text-2xl">
                            &nbsp;BALITO
                        </span>
                    </h1>


                    <p ref={paragraphRef} className='description text-[var(--text-color)]/80 text-base leading-relaxed'>
                        {`I specialize in both frontend and backend development, focusing on transforming complex ideas into efficient, scalable digital processes. Guided by a strong foundation in system analysis, I take full ownership of the development process, ensuring a smooth lifecycle to build secure, high-performance web applications from the ground up.`
                            .split(/(\s+)/)
                            .map((fragment, index) => {
                                if (fragment.match(/^\s+$/)) {
                                    return ' ';
                                }
                                return (
                                    <span
                                        key={index}
                                        className="word-wrapper inline-block"
                                        aria-hidden="true"
                                    >
                                        <span className="word inline-block">
                                            {fragment}
                                        </span>
                                    </span>
                                );
                            })
                        }
                    </p>

                    <div ref={captionRef} className='py-4 -mb-6'>
                        <span className='text-slate-400 text-sm'>Primary working on:</span>
                    </div>

                    <div ref={techStack1Ref} className='flex flex-wrap mt-5'>
                        {primaryTechStack.map((techStack) => (
                            <span
                                key={techStack.id}
                                className='tech-badge1 border border-[var(--secondary-color)] bg-[var(--secondary-color)]/30 rounded-full px-3 py-1 mr-4 text-xs font-semibold text-[var(--text-color)] transition-all duration-300 w-fit'
                            >
                                {techStack.label}
                            </span>
                        ))}
                    </div>

                    <div ref={techStack2Ref} className='flex flex-wrap'>
                        {secondaryTechStack.map((techStack) => (
                            <span
                                key={techStack.id}
                                className='tech-badge2 border border-[var(--secondary-color)] bg-[var(--secondary-color)]/30 rounded-full px-3 py-1 mt-2 mr-4 text-xs font-semibold text-[var(--text-color)] transition-all duration-300 w-fit'
                            >
                                {techStack.label}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </section >
    )
}