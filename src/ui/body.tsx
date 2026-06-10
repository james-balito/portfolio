// Libraries
import { useEffect, useState } from 'react'


// Components
import TechStackCarousel from "../components/techstack-carousel"

export default function Body() {

    const [text, setText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);
    const [index, setIndex] = useState(0);
    const fullText = 'Full-Stack Developer';

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

    return (
        <>
            {/* Introduction Section */}
            <section className='flex justify-between items-center grid grid-cols-2'>
                <div>
                    <h1 className="text-xl font-medium">
                        Hi! I'm James Balito
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
                </div>

                <div className="flex justify-end items-center ">
                    <img src="/public/body-image.png" alt="James Balito" height="400px" width="400px" />
                </div>

            </section>

            <TechStackCarousel />
        </>
    )
}