import { useState, useEffect } from 'react';
import { FaGithub } from 'react-icons/fa';
import { FaLinkedin } from "react-icons/fa6";
import { Button } from '../button';

// GSAP
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
export default function Home() {

    const [text, setText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);
    const [charIndex, setCharIndex] = useState(0); // ✅ Tracks character position
    const [wordIndex, setWordIndex] = useState(0); // ✅ Tracks which word in array
    const [startTyping, setStartTyping] = useState(false);

    const fullText = ['Full-Stack Developer', 'Front-End Developer', 'Back-end Developer', 'Web Developer']; // ✅ Array of texts

    // ✅ Current full text being typed/deleted
    const currentFullText = fullText[wordIndex];

    // Typing Animation - Cycles through array
    useEffect(() => {
        if (!startTyping) return;

        const timeout = setTimeout(() => {
            if (!isDeleting) {
                // ✅ Typing forward
                if (charIndex < currentFullText.length) {
                    setText(currentFullText.slice(0, charIndex + 1));
                    setCharIndex(prev => prev + 1);
                } else {
                    // ✅ Finished typing - pause then delete
                    setTimeout(() => setIsDeleting(true), 2000);
                }
            } else {
                // ✅ Deleting
                if (charIndex > 0) {
                    setText(currentFullText.slice(0, charIndex - 1));
                    setCharIndex(prev => prev - 1);
                } else {
                    // ✅ Finished deleting - move to next word
                    setIsDeleting(false);
                    setWordIndex(prev => (prev + 1) % fullText.length); // Loop back to start
                }
            }
        }, isDeleting ? 50 : 100); // Delete slightly faster

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
        gsap.set(['#intro', '.typing-text', '.nav', '.para', '.social-links', '.buttons-row', '.profile-image'], {
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
        })

        tl.to('#intro', {
            opacity: 1,
            y: 0,
        })
            .to('.typing-text', {
                opacity: 1,
                y: 0,
                duration: 0.2,
                onStart: () => setStartTyping(true)
            }, "-=0.4")
            .to('.para', {
                opacity: 1,
                y: 0,
                duration: 0.5,
            }, "-=0.2")
            .to('.social-links', {
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
    })

    return (
        <section className='flex justify-between items-center grid grid-cols-2 py-30 mx-4'>
            <div>
                <h1 id="intro" className="text-xl font-medium">
                    Hi! I'm
                    <span style={{ fontFamily: 'var(--Playfair-Display)' }} className="text-2xl">
                        &nbsp;James
                    </span>
                    <span style={{ fontFamily: 'var(--Playfair-Display)' }} className="text-2xl">
                        &nbsp;Balito
                    </span>
                </h1>

                <p
                    style={{
                        fontFamily: 'var(--Archivo-Black)',
                        borderRight: '3px solid var(--secondary-color)',
                        animation: 'blink 1s step-end infinite'
                    }}
                    className="typing-text text-4xl inline-block text-[var(--secondary-color)]"
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
                    className="para text-[var(--text-color)] text-xl font-thin"
                    style={{ fontFamily: 'var(--Jeytbrains-Mono)' }}
                >
                    I am an Information Systems professional who combines rigorous
                    system analysis with modern frontend and backend development to
                    deliver secure, high-performance web applications built from the ground up.
                </p>

                <div className='social-links flex'>
                    <div className='border border-[var(--secondary-color)] hover:border-[var(--secondary-color)]/90 w-fit h-fit rounded-full p-0.5 mt-5'>
                        <a href="https://github.com/james-balito">
                            <FaGithub className="text-[var(--secondary-color)] hover:text-[var(--secondary-color)]/90 hover:cursor-pointer" size={30} />
                        </a>
                    </div>
                    <div className='border border-[var(--secondary-color)] hover:border-[var(--secondary-color)]/90 w-fit h-fit rounded-lg p-0.5 mt-5 ml-5'>
                        <a href="https://www.linkedin.com/in/jamesbalito/">
                            <FaLinkedin className="text-[var(--secondary-color)] hover:text-[var(--secondary-color)]/90 hover:cursor-pointer" size={30} />
                        </a>
                    </div>
                </div>

                <div className='buttons-row flex mt-8 gap-5'>
                    <Button
                        onClick={handleDownloadCV}
                        variant="outline"
                        className='px-6 py-5.5 rounded-xl border border-[var(--secondary-color)] bg-[var(--secondary-color)] text-[var(--Inter)] text-[var(--cv-text-color)]/90 hover:bg-[var(--secondary-color)]/90 hover:text-[var(--cv-text-color)] hover:shadow-md/10 cursor-pointer'
                        style={{ fontFamily: 'var(--Poppins)' }}
                    >
                        View CV
                    </Button>
                    <Button
                        variant="outline"
                        className='px-6 py-5.5 rounded-xl border border-[var(--secondary-color)]/60 hover:border-[var(--secondary-color)]/90 text-[var(--secondary-color)]/70 hover:text-[var(--secondary-color)]/90 hover:cursor-pointer hover:shadow-md/10'
                        style={{ fontFamily: 'var(--Poppins)' }}
                    >
                        <a href="#projects"> View My Works</a>
                    </Button>
                </div>
            </div>

            <div className="profile-image flex justify-end items-center">
                <img src="/public/body-image.png" alt="James Balito" height="450px" width="500px" />
            </div>
        </section>
    )
}