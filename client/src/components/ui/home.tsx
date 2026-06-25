import { useState, useEffect, useRef } from 'react';
import { FaGithub } from 'react-icons/fa';
import { FaLinkedin } from "react-icons/fa6";
import { Button } from '../button';

// GSAP
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';

export default function Home() {

    const [text, setText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);
    const [charIndex, setCharIndex] = useState(0);
    const [wordIndex, setWordIndex] = useState(0);
    const [startTyping, setStartTyping] = useState(false);
    const homeTextRef = useRef<HTMLParagraphElement>(null);

    const fullText = ['Full-Stack Developer', 'Front-End Developer', 'Back-end Developer', 'Web Developer'];

    const currentFullText = fullText[wordIndex];

    // Typing Animation
    useEffect(() => {
        if (!startTyping) return;

        const timeout = setTimeout(() => {
            if (!isDeleting) {
                if (charIndex < currentFullText.length) {
                    setText(currentFullText.slice(0, charIndex + 1));
                    setCharIndex(prev => prev + 1);
                } else {
                    setTimeout(() => setIsDeleting(true), 2000);
                }
            } else {
                if (charIndex > 0) {
                    setText(currentFullText.slice(0, charIndex - 1));
                    setCharIndex(prev => prev - 1);
                } else {
                    setIsDeleting(false);
                    setWordIndex(prev => (prev + 1) % fullText.length);
                }
            }
        }, isDeleting ? 50 : 100);

        return () => clearTimeout(timeout);
    }, [charIndex, isDeleting, currentFullText, startTyping, fullText.length, wordIndex]);

    const handleDownloadCV = () => {
        const link = document.createElement('a');
        link.href = '/resume.pdf';
        link.download = 'James_Balito_CV.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    // GSAP Animations
    useGSAP(() => {

        gsap.set(['#intro', '.typing-text', '.nav', '.social-links', '.buttons-row', '.profile-image'], {
            opacity: 0,
            y: 30
        });

        const tl = gsap.timeline({
            defaults: {
                ease: 'power3.out',
                duration: 0.7,
            },
            delay: 1.5
        });

        tl.to('.nav', {
            opacity: 1,
            y: 0,
        });

        tl.to('#intro', {
            opacity: 1,
            y: 0,
        })
            .to('.typing-text', {
                opacity: 1,
                y: 0,
                duration: 0.2,
                onStart: () => setStartTyping(true)
            }, "-=0.4");

        // ✅ Animate each word with stagger
        if (homeTextRef.current) {
            const wordElements = homeTextRef.current.querySelectorAll('.word');

            if (wordElements.length > 0) {
                // Set initial state for each word
                gsap.set(wordElements, {
                    opacity: 0,
                    y: 15,
                });

                // Stagger animate each word
                tl.to(wordElements, {
                    opacity: 1,
                    y: 0,
                    duration: 0.4,
                    ease: "power3.out",
                    stagger: {
                        each: 0.03,
                        from: "start",
                        ease: "power2.out"
                    }
                }, "-=0.2");
            }
        }

        tl.to('.social-links', {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.1,
        }, "-=0.4")
            .to('.buttons-row', {
                opacity: 1,
                y: 0,
                duration: 0.5,
                stagger: 0.1,
            }, "-=0.2")
            .to('.profile-image', {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.5,
                ease: 'back.out(1.7)',
            }, "-=0.5");
    }, []);

    const homeText = "Crafting premium digital experiences through modern web technologies, scalable architecture, and user-centered design. Let's build applications that are intuitive, performance, and engineered to grow.";

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
                {index < text.split(' ').length - 1 && '\u00A0'}
            </span>
        ));
    };

    return (
        <section id = "home" className='flex justify-center xl:justify-between items-center grid md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 md:py-20 lg:py-30 xl:py-30 xl:mx-4'>
            <div className='text-center order-2 md:text-left lg:text-left xl:order-2 xl:text-left'>
                <h1 id="intro" className="text-sm md:text-xl lg:text-xl xl:text-xl font-medium">
                    Hi! I'm
                    <span style={{ fontFamily: 'var(--Playfair-Display)' }} className="text-lg md:text-xl lg:text-2xl xl:text-2xl">
                        &nbsp;James
                    </span>
                    <span style={{ fontFamily: 'var(--Playfair-Display)' }} className="text-lg md:text-xl lg:text-2xl xl:text-2xl">
                        &nbsp;Balito
                    </span>
                    <span className="text-2xl xl:text-3xl">
                        👋🏼
                    </span>
                </h1>

                <p
                    style={{
                        fontFamily: 'var(--Archivo-Black)',
                        borderRight: '3px solid var(--secondary-color)',
                        animation: 'blink 1s step-end infinite'
                    }}
                    className="typing-text text-3xl md:text-5xl xl:text-5xl inline-block text-[var(--secondary-color)]"
                >
                    {text}
                    <style>{`
                        @keyframes blink {
                            0%, 100% { border-color: var(--secondary-color); }
                            50% { border-color: transparent; }
                        }
                    `}</style>
                </p>

                <br /><br />

                <p
                    ref={homeTextRef}
                    className="para text-[var(--text-color)] text-base md:text-xl lg:text-xl xl:text-xl font-thin"
                    style={{ fontFamily: 'var(--Jetbrains-Mono)' }}
                >
                    {renderAnimatedText(homeText)}
                </p>

                <div className='social-links flex justify-center md:justify-start lg:justify-start xl:justify-start'>
                    <div className='border border-[var(--secondary-color)]/70 hover:border-[var(--secondary-color)]/90 w-fit h-fit rounded-full p-0.5 mt-5'>
                        <a
                            target="_blank"
                            rel="noopener noreferrer"
                            href="https://github.com/james-balito"
                        >
                            <FaGithub className="text-[var(--secondary-color)]/70 hover:text-[var(--secondary-color)]/90 hover:cursor-pointer w-6 h-6" size={30} />
                        </a>
                    </div>
                    <div className='border border-[var(--secondary-color)]/70 hover:border-[var(--secondary-color)]/90 w-fit h-fit rounded-md xl:rounded-lg p-0.5 mt-5 ml-5'>
                        <a target="_blank"
                            rel="noopener noreferrer"
                            href="https://www.linkedin.com/in/jamesbalito/"
                        >
                            <FaLinkedin className="text-[var(--secondary-color)]/70 hover:text-[var(--secondary-color)]/90 hover:cursor-pointer w-6 h-6" size={30} />
                        </a>
                    </div>
                </div>

                <div className='buttons-row flex mt-8 gap-5 flex justify-center my-20 md:justify-start lg:justify-start xl:justify-start '>
                    <Button
                        onClick={handleDownloadCV}
                        variant="outline"
                        className='px-4 py-4.5 md:px-6 md:py-5.5 lg:px-6 lg:py-5.5 xl:px-6 xl:py-5.5 rounded-xl border border-[var(--secondary-color)]/60 bg-[var(--secondary-color)]/70 text-[var(--Inter)] text-[var(--cv-text-color)]/90 hover:bg-[var(--secondary-color)]/90 hover:text-[var(--cv-text-color)] hover:shadow-md/10 cursor-pointer'
                        style={{ fontFamily: 'var(--Poppins)' }}
                    >
                        View CV
                    </Button>
                    <Button
                        variant="outline"
                        className='px-4 py-4.5 md:px-6 md:py-5.5 lg:px-6 lg:py-5.5 xl:px-6 xl:py-5.5 rounded-xl border border-[var(--secondary-color)]/60 hover:border-[var(--secondary-color)]/90 text-[var(--secondary-color)]/70 hover:text-[var(--secondary-color)]/90 hover:cursor-pointer hover:shadow-md/10'
                        style={{ fontFamily: 'var(--Poppins)' }}
                    >
                        <a href="#projects"> View My Works</a>
                    </Button>
                </div>
            </div>

            <div className="profile-image flex justify-center xl:justify-end items-center order-1 py-5 xl:order-2 xl:-mt-20 xl:py-20">
                <img src="/body-image.png" alt="James Balito" className="w-[200px] h-[200px] md:w-[100px] md:h-[150px] lg:w-[500px] lg:h-[450px] xl:w-[500px] xl:h-[450px]" />
            </div>
        </section>
    )
}