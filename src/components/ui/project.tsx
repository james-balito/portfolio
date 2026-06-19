import { useRef, useCallback } from 'react';
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// ✅ Type definitions
interface ProjectImage {
    src: string;
    alt: string;
}

interface Role {
    name: string;
}

interface TechStack {
    name: string;
}

interface Project {
    id: number;
    name: string;
    description: string;
    roles: Role[];
    techStack: TechStack[];
    images: ProjectImage[];
    link: string;
}

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

    // ✅ Properly typed projects array
    const projects: Project[] = [
        {
            id: 1,
            name: "Web-Based Veterinary Appointments & Pet Product Shopping System",
            description: "Integer vel commodo nibh. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Fusce metus risus, ultricies quis metus vel, luctus scelerisque metus. Etiam sit amet lectus non ipsum rutrum sollicitudin at dapibus lorem. In ornare quam sed mi tincidunt eleifend. Ut pharetra sollicitudin velit in tempus. Nam ultricies ex in ante scelerisque, et venenatis sem commodo. Fusce ac blandit magna, eu rutrum lectus. Mauris mollis nibh nunc, at tincidunt turpis varius a. Donec eget elit sed ante lacinia lobortis.",
            roles: [
                { name: "System Analyst" },
                { name: "Front-End Developer" }
            ],
            techStack: [
                { name: "Laravel" },
                { name: "Livewire" },
                { name: "Vue.js" },
            ],
            images: [
                { src: "/projects/capsproj.PNG", alt: "Project 1 - Image 1" },
                { src: "/projects/invpos.PNG", alt: "Project 1 - Image 2" },
                { src: "/projects/skwebsite.png", alt: "Project 1 - Image 3" },
            ],
            link: ""
        },
        {
            id: 2,
            name: "Hardware Inventory & Point of Sales System",
            description: "Integer vel commodo nibh. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Fusce metus risus, ultricies quis metus vel, luctus scelerisque metus. Etiam sit amet lectus non ipsum rutrum sollicitudin at dapibus lorem. In ornare quam sed mi tincidunt eleifend. Ut pharetra sollicitudin velit in tempus. Nam ultricies ex in ante scelerisque, et venenatis sem commodo. Fusce ac blandit magna, eu rutrum lectus. Mauris mollis nibh nunc, at tincidunt turpis varius a. Donec eget elit sed ante lacinia lobortis.",
            roles: [
                { name: "Full-Stack Developer" }
            ],
            techStack: [
                { name: "Laravel" },
                { name: "TailwindCSS" },
                { name: "HTML" },
                { name: "Filament" },
                { name: "Livewire" },
            ],
            images: [
                { src: "/projects/invpos.PNG", alt: "Project 2 - Image 1" },
                { src: "/projects/capsproj.PNG", alt: "Project 2 - Image 2" },
            ],
            link: ""
        },
        {
            id: 3,
            name: "Secure Profiling System with Role-Based Access Control and Automated Announcements",
            description: "Integer vel commodo nibh. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Fusce metus risus, ultricies quis metus vel, luctus scelerisque metus. Etiam sit amet lectus non ipsum rutrum sollicitudin at dapibus lorem. In ornare quam sed mi tincidunt eleifend. Ut pharetra sollicitudin velit in tempus. Nam ultricies ex in ante scelerisque, et venenatis sem commodo. Fusce ac blandit magna, eu rutrum lectus. Mauris mollis nibh nunc, at tincidunt turpis varius a. Donec eget elit sed ante lacinia lobortis.",
            roles: [
                { name: "Front-End Developer" }
            ],
            techStack: [
                { name: "HTML" },
                { name: "CSS" },
            ],
            images: [
                { src: "/projects/skwebsite.png", alt: "Project 3 - Image 1" },
                { src: "/projects/capsproj.PNG", alt: "Project 3 - Image 2" },
                { src: "/projects/invpos.PNG", alt: "Project 3 - Image 3" },
                { src: "/projects/skwebsite.png", alt: "Project 3 - Image 4" },
            ],
            link: ""
        },
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
                    each: 0.15,
                    from: "start",
                    ease: "power2.out"
                },
                ease: "power2.out"
            }, "-=0.2");

    }, []);


    return (
        <>
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

                <div className='grid grid-cols-1 md:grid-cols-2 gap-10 mx-20'>
                    {projects.map((project, index) => (
                        <a
                            href={project.link}
                            key={project.id}
                            ref={projectRefs[index]}
                            onClick={(e) => {
                                e.preventDefault();
                            }}
                            className="cursor-pointer"
                            aria-label={`View ${project.name} details`}
                        >
                            <div className='project border border-[var(--border-color)] rounded-2xl shadow-md overflow-hidden group cursor-pointer transition-shadow duration-300 hover:shadow-lg'>
                                {/* Image container with overflow hidden */}
                                <div className='overflow-hidden rounded-t-2xl'>
                                    <img
                                        src={project.images[0].src}
                                        alt={project.images[0].alt}
                                        className='w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110'
                                    />
                                </div>
                                <div className='flex flex-col border-t-[var(--border-color)] p-5 bg-white dark:bg-[var(--bg-color)]'>
                                    <h2 className='font-500 text-xl text-[var(--text-color)] text-center -mt-2 mb-2'
                                        style={{ fontFamily: 'var(--Instrument-Serif)' }}
                                    >{project.name}</h2>
                                    <span>
                                        <span className='text-sm text-slate-500'>Role: &nbsp;</span>
                                        {project.roles.map((role, index) => (
                                            <span
                                                key={index}
                                                className='text-xs text-[var(--text-color)]/80 mr-2 border border-[var(--border-color)] bg-[var(--secondary-color)]/20 rounded-xl px-2 py-1'
                                            >
                                                {role.name}
                                            </span>
                                        ))}
                                    </span>
                                    <p className='text-sm text-[var(--text-color)]/80 text-center my-2'>{project.description}</p>
                                    <span>
                                        {project.techStack.map((techstack, index) => (
                                            <span
                                                key={index}
                                                className='text-xs text-[var(--text-color)]/80 mr-2 border border-[var(--border-color)] bg-[var(--secondary-color)]/20 rounded-xl px-2 py-1'
                                            >
                                                {techstack.name}
                                            </span>
                                        ))}
                                    </span>
                                </div>
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </>
    )
}