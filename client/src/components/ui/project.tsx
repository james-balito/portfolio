import { useRef } from 'react';
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
            name: "Payroll Management System",
            description: "A system that allows a company to import data from biometric attendance devices and automate excel sheets converting it to generate payrolls to each employees. Managing employee payrolls, deductions, and incentives and can print payroll reports.",
            roles: [
                { name: "Front-End Developer" }
            ],
            techStack: [
                { name: "Laravel" },
                { name: "React" },
                { name: "TailwindCSS" },
            ],
            images: [
                { src: "/projects/warlen.png", alt: "Project 1 - Image 1" },
            ],
            link: ""
        },
        {
            id: 1,
            name: "Web-Based Veterinary Appointments & Pet Product Shopping System",
            description: "A Capstone Project System that allows users to book veterinary appointments and shop for pet products. This capstone project also published internationally by the ijcsmc in May 2026.",
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
            name: "Secure Profiling System with Role-Based Access Control and Automated Announcements",
            description: "A Mini-Capstone Project System that we developed to help users to secure their profiles in their barangay that they can also access the announcements from the barangay.",
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
        }, {
            id: 3,
            name: "Hardware Inventory & Point of Sales System",
            description: "System designed for the small business owners customized in hardware business that can generate sales, tracks sales and inventories and real-time.",
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
                start: "top 50%",
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
            <section ref={sectionRef} id="projects" className="flex flex-col items-center justify-center py-15">
                <h1
                    ref={titleRef}
                    className="text-3xl mt-10 mb-20 xl:mb-30"
                    style={{
                        fontFamily: 'var(--Instrument-Serif)',
                        fontStyle: 'italic',
                        fontWeight: 'normal'
                    }}
                >
                    Projects
                </h1>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-10 mx-4 md:mx-10 lg:mx-20 xl:mx-20'>
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
                                    <h2 className='font-500 text-lg xl:text-xl text-[var(--text-color)] text-center -mt-2 mb-2'
                                        style={{ fontFamily: 'var(--Instrument-Serif)' }}
                                    >{project.name}</h2>
                                    <span>
                                        <span className='text-xs fomt-semibold text-slate-500'>Role: &nbsp;</span>
                                        {project.roles.map((role, index) => (
                                            <span
                                                key={index}
                                                className='text-xs text-[var(--text-color)]/80 mr-2 border border-[var(--border-color)] bg-[var(--secondary-color)]/20 rounded-xl px-2 py-1'
                                            >
                                                {role.name}
                                            </span>
                                        ))}
                                    </span>
                                    <p
                                        className='text-sm xl:text-sm font-light text-[var(--text-color)]/80 text-center my-2'
                                        style={{
                                            fontFamily: 'var(--Inter)',
                                            fontWeight: 300
                                        }}
                                    >
                                        {project.description}
                                    </p>
                                    <span>
                                        <span className='text-xs fomt-semibold text-slate-500'>Tech Stack: <br /></span>
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
            </section>
        </>
    )
}