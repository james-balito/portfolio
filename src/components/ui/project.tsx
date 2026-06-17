import { useRef } from 'react';
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default function Projects() {
    // ✅ Section ref for the scroll trigger
    const sectionRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    
    // ✅ Array of refs - one for each project card
    const projectRefs = [
        useRef<HTMLAnchorElement>(null),
        useRef<HTMLAnchorElement>(null),
        useRef<HTMLAnchorElement>(null),
        useRef<HTMLAnchorElement>(null),
    ];

    const projects = [
        {
            id: 1,
            name: "Project 1",
            description: "Description 1",
            image: "/tech-stacks/react.png",
            alt: "Project 1",
            link: "https://example.com/project1"
        },
        {
            id: 2,
            name: "Project 2",
            description: "Description 2",
            image: "/tech-stacks/react.png",
            alt: "Project 2",
            link: "https://example.com/project2"
        },
        {
            id: 3,
            name: "Project 3",
            description: "Description 3",
            image: "/tech-stacks/react.png",
            alt: "Project 3",
            link: "https://example.com/project3"
        },
        {
            id: 4,
            name: "Project 4",
            description: "Description 4",
            image: "/tech-stacks/react.png",
            alt: "Project 4",
            link: "https://example.com/project4"
        }
    ]

    useGSAP(() => {
        gsap.registerPlugin(ScrollTrigger);

        // ✅ Set initial states for title and all project cards
        gsap.set(titleRef.current, {
            opacity: 0,
            y: 30
        });
        
        // Set each project card to hidden
        projectRefs.forEach(ref => {
            gsap.set(ref.current, {
                opacity: 0,
                y: 50,
                scale: 0.95
            });
        });

        // ✅ Create timeline with scroll trigger on the section
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 70%",
                end: "bottom 80%",
                toggleActions: "play none none reverse",
                // markers: true, // Uncomment to debug
            }
        });

        // Animate title first
        tl.to(titleRef.current, {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: "back.out(1.5)"
        })
        // ✅ Animate ALL project cards with stagger
        .to(projectRefs.map(ref => ref.current), {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            stagger: {
                each: 0.15,  // ✅ 0.15s delay between each card
                from: "start",
                ease: "power2.out"
            },
            ease: "power2.out"
        }, "-=0.2"); // Slight overlap with title animation

    }, []);

    return (
        <div ref={sectionRef} className="flex flex-col items-center justify-center py-20">
            <h1
                ref={titleRef}
                className="text-3xl mt-10 mb-30"
                style={{
                    fontFamily: 'var(--Instrument-Serif)',
                    fontStyle: 'italic',
                    fontWeight: 'normal'
                }}
            >
                Projects
            </h1>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10'>
                {projects.map((project, index) => (
                    <a 
                        href={project.link} 
                        key={project.id} 
                        ref={projectRefs[index]} // ✅ Use individual ref
                    >
                        <div className='project border border-gray-300 rounded-2xl shadow-md overflow-hidden group cursor-pointer transition-shadow duration-300 hover:shadow-lg'>
                            {/* Image container with overflow hidden */}
                            <div className='overflow-hidden rounded-t-2xl'>
                                <img
                                    src={project.image}
                                    alt={project.alt}
                                    height={200}
                                    width={280}
                                    className='object-cover transition-transform duration-500 ease-in-out group-hover:scale-110'
                                />
                            </div>
                            <div className='flex flex-col items-center border-t py-4 px-4 bg-white dark:bg-[var(--bg-color)]'>
                                <h2 className='font-semibold text-lg text-[var(--text-color)]'>{project.name}</h2>
                                <p className='text-sm text-gray-500 text-center my-2'>{project.description}</p>
                                <span className='text-[var(--text-color)] group group-hover:text-[var(--secondary-color)] font-sm text-xs transition-all duration-300'>
                                    Tap to view project
                                </span>
                            </div>
                        </div>
                    </a>
                ))}
            </div>
        </div>
    )
}