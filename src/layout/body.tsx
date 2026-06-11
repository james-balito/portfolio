// Libraries
import { useEffect, useState } from 'react'

// Icons
import { FaGithub } from 'react-icons/fa';
import { FaLinkedin } from "react-icons/fa6";


// Components
import TechStackCarousel from "../components/techstack-carousel"
import { Button } from '../components/button';

// UI
import About from '../ui/about';

export default function Body() {

    const [text, setText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);
    const [index, setIndex] = useState(0);
    const fullText = 'Full-Stack Developer';

    // Typing Animation
    useEffect(() => {
        const timeout = setTimeout(() => {
            // Typing
            if (!isDeleting && index <= fullText.length) {
                setText(fullText.slice(0, index + 1));
                setIndex(prev => prev + 1);
            }
            // Deleting
            else if (isDeleting && index > 0) {
                setText(fullText.slice(0, index - 1));
                setIndex(prev => prev - 1);
            }
            // Switch to deleting when done typing
            else if (!isDeleting && index === fullText.length + 1) {
                setTimeout(() => setIsDeleting(true), 2000); // Pause at end
            }
            // Switch to typing when done deleting
            else if (isDeleting && index === 0) {
                setIsDeleting(false);
            }
        }, isDeleting ? 50 : 50);

        return () => clearTimeout(timeout);
    }, [index, isDeleting, fullText]);
    // End

    // Download Handler Function
    const handleDownloadCV = () => {
        // Create a link element
        const link = document.createElement('a');
        link.href = '/resume.pdf';  // Path to your resume
        link.download = 'James_Balito_CV.pdf';  // Downloaded filename
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <>
            {/* Introduction Section */}
            <section className='flex justify-between items-center grid grid-cols-2 py-20'>
                <div>
                    <h1 className="text-xl font-medium">
                        Hi! I'm
                        <span
                            style={{ fontFamily: 'var(--Jetbrains-Mono)' }}
                            className="text-2xl"
                        >
                            &nbsp;James
                        </span>
                        <span
                            style={{ fontFamily: 'var(--Playfair-Display)' }}
                            className="text-2xl"
                        >
                            &nbsp;Balito
                        </span>
                    </h1>

                    <p
                        style={{
                            fontFamily: 'var(--Archivo-Black)',
                            borderRight: '3px solid var(--secondary-color)',
                            animation: 'blink 0.75s step-end infinite'
                        }}
                        className="text-4xl inline-block"
                    >
                        {text}
                        <style>{`
                            @keyframes blink {
                                0%, 100% { border-color: var(--secondary-color); }
                                50% { border-color: transparent; }
                            }
                        `}</style>
                    </p>

                    <br />
                    <br />

                    <p className="text-[var(--text-color)] text-xl font-thin">
                        I am an Information Systems professional who combines rigorous
                        system analysis with modern frontend and backend development to
                        deliver secure, high-performance web applications built from the ground up.
                    </p>

                    <div className='flex'>
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

                    <div className='flex mt-8 gap-5'>
                        <div>
                            <Button
                                onClick={handleDownloadCV}
                                variant="outline"
                                className='px-6 py-5.5 rounded-xl border border-[var(--secondary-color)] bg-[var(--secondary-color)] text-[var(--Inter)] text-[var(--cv-text-color)] hover:scale-105 cursor-pointer'
                            >
                                View CV
                            </Button>
                        </div>
                        <div>
                            <Button
                                variant="outline"
                                className='px-6 py-5.5 rounded-xl border border-[var(--secondary-color)] hover:border-[var(--secondary-color)]/90 text-[var(--button-text-color)] hover:bg-[var(--secondary-color)] text-[var(--secondary-color)]/90 hover:text-[var(--button-text-color)] hover:scale-105 hover:cursor-pointer'
                            >
                                View My Works
                            </Button>
                        </div>
                    </div>

                </div>

                <div className="flex justify-end items-center ">
                    <img src="/public/body-image.png" alt="James Balito" height="450px" width="500px" />
                </div>

            </section>

            <TechStackCarousel />

            <About />

        </>
    )
}