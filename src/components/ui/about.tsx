import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import GitHubContributions from './github-contributions';

export default function About() {
    const sectionRef = useRef<HTMLElement>(null);
    const imgRef = useRef<HTMLImageElement>(null);
    const aboutheaderRef = useRef<HTMLHeadingElement>(null);
    const headerRef = useRef<HTMLHeadingElement>(null);
    const paragraphRef = useRef<HTMLParagraphElement>(null);
    const captionRef = useRef<HTMLDivElement>(null);

    gsap.registerPlugin(ScrollTrigger);

    useGSAP(() => {
        // ✅ Select all word elements directly
        const wordElements = paragraphRef.current?.querySelectorAll('.word');

        // Set initial states for ALL elements
        gsap.set([aboutheaderRef.current, imgRef.current], {
            opacity: 0,
            y: 30
        });

        gsap.set(headerRef.current, {
            opacity: 0,
            x: -30
        });

        gsap.set(captionRef.current, {
            opacity: 0,
            y: 20
        });

        // ✅ Set initial state for each word
        if (wordElements && wordElements.length > 0) {
            gsap.set(wordElements, {
                opacity: 0,
                x:-10,
                rotation: 0,
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
                y: 0,
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

        // ✅ Animate each word with stagger - smooth fade in from bottom
        if (wordElements && wordElements.length > 0) {
            tl.to(wordElements, {
                opacity: 1,
                x: 0,
                duration: 0.6,
                ease: "power3.out",
                stagger: {
                    each: 0.01,
                    from: "start",
                    ease: "power2.out"
                }
            }, "-=0.3");
        }

        if (captionRef.current) {
            tl.to(captionRef.current, {
                y: 0,
                opacity: 1,
                duration: 0.5,
                ease: "power2.out"
            }, "-=0.5");
        }

    }, []);

    // ✅ Split text into words for animation
    const aboutText = `I specialize in both frontend and backend development, focusing on transforming complex ideas into efficient, scalable digital processes. Guided by a strong foundation in system analysis, I take full ownership of the development process, ensuring a smooth lifecycle to build secure, high-performance web applications from the ground up.`;

    const renderAnimatedText = (text: string) => {
        return text.split(' ').map((word, index) => (
            <span
                key={index}
                className="word inline-block"
                aria-hidden="true"
            >
                <span className="word-inner inline-block">
                    {word}
                </span>
                {/* Add space after each word except the last */}
                {index < text.split(' ').length - 1 && '\u00A0'}
            </span>
        ));
    };

    return (
        <section ref={sectionRef} id="about" className="overflow-hidden">
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

            <div className='flex justify-between py-15 grid grid-cols-12'>
                <img
                    src="/about-me.jpg"
                    alt="James Balito"
                    style={{
                        borderRadius: '10px',
                        height: '450px',
                        width: '416px'
                    }}
                    className='mx-10 col-start-1 col-span-5'
                    ref={imgRef}
                />

                <div className='items-center col-start-8 col-span-5 mt-3'>
                    <div ref={headerRef}>
                        <h1
                            className="flex justify-start items-right text-sm font-thin"
                            style={{ fontFamily: 'var(--Inter)' }}
                        >
                            Hi! My name is
                        </h1>
                        <span style={{ fontFamily: 'var(--Archivo-Black)' }} className="text-4xl -ml-3">
                            &nbsp;JAMES
                        </span>
                        <span style={{ fontFamily: 'var(--Archivo-Black)' }} className="text-4xl text-[var(--secondary-color)]">
                            &nbsp;BALITO
                        </span>
                    </div>

                    {/* ✅ Animated paragraph with word-by-word reveal */}
                    <p 
                        ref={paragraphRef} 
                        className='description text-[var(--text-color)] text-base leading-relaxed mt-2 -mb-15'
                    >
                        {renderAnimatedText(aboutText)}
                    </p>

                    <GitHubContributions />
                </div>
            </div>

            <div>
                <h1>Technologies and Tools</h1>
            </div>
        </section>
    )
}