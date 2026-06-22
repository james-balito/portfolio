import { useRef, useState, useMemo } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import GitHubContributions from './github-contributions';

// ✅ Tech stack data
interface TechStack {
    id: number;
    label: string;
    img: string;
    category: 'frontend' | 'backend' | 'database' | 'devops' | 'tools';
}

const techStacks: TechStack[] = [

    // Frontend
    { id: 1, img: '/tech-stacks/react.png', label: 'React', category: 'frontend' },
    // { id: 2, img: '/tech-stacks/nextjs.png', label: 'Next.js', category: 'frontend' },
    { id: 3, img: '/tech-stacks/typescript.png', label: 'TypeScript', category: 'frontend' },
    { id: 4, img: '/tech-stacks/tailwindcss.png', label: 'Tailwind', category: 'frontend' },
    { id: 5, img: '/tech-stacks/bootstrap.png', label: 'Bootstrap', category: 'frontend' },
    { id: 6, img: '/tech-stacks/gsap.png', label: 'GSAP', category: 'frontend' },
    { id: 7, img: '/tech-stacks/html5.png', label: 'HTML5', category: 'frontend' },
    { id: 8, img: '/tech-stacks/css3.png', label: 'CSS3', category: 'frontend' },
    { id: 9, img: '/tech-stacks/javascript.png', label: 'JavaScript', category: 'frontend' },

    // Backend
    // { id: 8, img: '/tech-stacks/nodejs.png', label: 'Node.js', category: 'backend' },
    { id: 10, img: '/tech-stacks/laravel.png', label: 'Laravel', category: 'backend' },
    { id: 11, img: '/tech-stacks/php.png', label: 'PHP', category: 'backend' },
    // { id: 11, img: '/tech-stacks/restapi.png', label: 'REST APIs', category: 'backend' },
    // { id: 12, img: '/tech-stacks/graphql.png', label: 'GraphQL', category: 'backend' },

    // Database
    { id: 13, img: '/tech-stacks/mysql.png', label: 'MySQL', category: 'database' },
    // { id: 14, img: '/tech-stacks/postgresql.png', label: 'PostgreSQL', category: 'database' },
    // { id: 15, img: '/tech-stacks/mongodb.png', label: 'MongoDB', category: 'database' },

    // DevOps
    { id: 16, img: '/tech-stacks/git.png', label: 'Git', category: 'devops' },
    { id: 17, img: '/tech-stacks/github.png', label: 'GitHub', category: 'devops' },
    // { id: 18, img: '/tech-stacks/docker.png', label: 'Docker', category: 'devops' },

    // Tools
    { id: 19, img: '/tech-stacks/vsc.png', label: 'VS Code', category: 'tools' },
    { id: 20, img: '/tech-stacks/figma.png', label: 'Figma', category: 'tools' },


];

export default function About() {
    const sectionRef = useRef<HTMLElement>(null);
    const imgRef = useRef<HTMLImageElement>(null);
    const aboutheaderRef = useRef<HTMLHeadingElement>(null);
    const headerRef = useRef<HTMLHeadingElement>(null);
    const paragraphRef = useRef<HTMLParagraphElement>(null);
    const captionRef = useRef<HTMLDivElement>(null);
    const techSectionRef = useRef<HTMLDivElement>(null);
    const techBadgesRef = useRef<HTMLDivElement>(null);

    // ✅ Filter state
    const [activeFilter, setActiveFilter] = useState<string>('all');

    gsap.registerPlugin(ScrollTrigger);

    useGSAP(() => {
        // ✅ Select all word elements directly
        const wordElements = paragraphRef.current?.querySelectorAll('.word');
        const techBadges = techBadgesRef.current?.querySelectorAll('.tech-badge');

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
                x: -10,
                rotation: 0,
            });
        }

        // ✅ Set initial state for tech badges
        if (techBadges && techBadges.length > 0) {
            gsap.set(techBadges, {
                opacity: 0,
                y: 15,
                scale: 0.9,
            });
        }

        // Create main timeline
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 70%",
                end: "bottom 20%",
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

        // ✅ Animate each word with stagger
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

        // ✅ Animate tech badges with stagger
        if (techBadges && techBadges.length > 0) {
            tl.to(techBadges, {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.4,
                ease: "back.out(1.4)",
                stagger: {
                    each: 0.04,
                    from: "start",
                    ease: "power2.out"
                }
            }, "-=0.2");
        }

    }, []);

    // ✅ GSAP animation for filter changes
    useGSAP(() => {
        const techBadges = techBadgesRef.current?.querySelectorAll('.tech-badge');

        if (techBadges && techBadges.length > 0) {
            gsap.fromTo(techBadges, {
                opacity: 0,
                y: 10,
                scale: 0.9,
            }, {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.3,
                ease: "back.out(1.4)",
                stagger: {
                    each: 0.03,
                    from: "random",
                }
            });
        }
    }, [activeFilter]);

    // ✅ Split text into words for animation
    const aboutText = `I specialize in both frontend and backend development, focusing on transforming complex ideas into efficient, scalable digital processes. Guided by a strong foundation in system analysis, I take full ownership of the development process, ensuring a smooth lifecycle to build secure, high-performance web applications from the ground up.`;

    const renderAnimatedText = (text: string) => {
        return text.split(' ').map((word, index) => (
            <span
                key={index}
                className="word inline-block"
                aria-hidden="true"
            >
                <span className="word-inner inline-block text-sm xl:text-base">
                    {word}
                </span>
                {index < text.split(' ').length - 1 && '\u00A0'}
            </span>
        ));
    };

    // ✅ Filter categories with "All" option
    const categories = [
        { key: 'all', label: 'All' },
        { key: 'frontend', label: 'Frontend' },
        { key: 'backend', label: 'Backend' },
        { key: 'database', label: 'Database' },
        { key: 'devops', label: 'DevOps' },
        { key: 'tools', label: 'Tools' },
    ];

    // ✅ Filtered tech stacks based on active filter
    const filteredTechStacks = useMemo(() => {
        if (activeFilter === 'all') return techStacks;
        return techStacks.filter(tech => tech.category === activeFilter);
    }, [activeFilter]);

    // ✅ Count for each category
    const getCount = (category: string) => {
        if (category === 'all') return techStacks.length;
        return techStacks.filter(t => t.category === category).length;
    };

    return (
        <section ref={sectionRef} id="about" className="overflow-hidden">
            <h1
                style={{
                    fontFamily: 'var(--Instrument-Serif)',
                    fontStyle: 'italic',
                    fontWeight: 'normal'
                }}
                className='text-2xl md:text-2xl lg:text-3xl xl:text-3xl flex justify-center mt-20 md:mt-30 lg:mt-4 xl:mt-40'
                ref={aboutheaderRef}
            >
                About Me
            </h1>

            <div className='flex justify-between pt-15 grid grid-cols-1 xl:grid-cols-12'>
                <img
                    src="/about-me.jpg"
                    alt="James Balito"
                    className='place-self-center rounded-xl w-[266px] h-[300px] md:w-[360px] md:h-[400px] lg:w-[400px] lg:h-[450px] xl:w-[416px] xl:h-[450px] xl:mx-10 xl:col-start-1 xl:col-span-5'
                    ref={imgRef}
                />

                <div className='items-center my-10 mx-5 xl:col-start-8 xl:col-span-5 xl:mt-3'>
                    <div ref={headerRef}>
                        <h1
                            className="flex justify-start items-right text-xs xl:text-sm font-base"
                            style={{ fontFamily: 'var(--Inter)' }}
                        >
                            Hi! My name is
                        </h1>
                        <span style={{ fontFamily: 'var(--Archivo-Black)' }} className="text-3xl xl:text-4xl -ml-3">
                            &nbsp;JAMES
                        </span>
                        <span style={{ fontFamily: 'var(--Archivo-Black)' }} className="text-3xl xl:text-4xl text-[var(--secondary-color)]">
                            &nbsp;BALITO
                        </span>
                    </div>

                    {/* Animated paragraph */}
                    <p
                        ref={paragraphRef}
                        className='description text-[var(--text-color)] text-base leading-relaxed mt-2 -mb-15'
                    >
                        {renderAnimatedText(aboutText)}
                    </p>

                    <GitHubContributions />
                </div>
            </div>

            {/* ✅ Technologies and Tools Section */}
            <div ref={techSectionRef} className='xl:mt-20 mb-10'>
                <h2
                    style={{
                        fontFamily: 'var(--Instrument-Serif)',
                        fontStyle: 'italic',
                        fontWeight: 'normal'
                    }}
                    className='text-2xl md:text-2xl lg:text-3xl xl:text-3xl flex justify-center mb-10'
                >
                    Technologies & Tools
                </h2>

                {/* ✅ Filter buttons */}
                <div className='flex flex-wrap justify-center gap-3 mb-8'>
                    {categories.map((category) => (
                        <button
                            key={category.key}
                            onClick={() => setActiveFilter(category.key)}
                            className={`relative text-xs rounded-full px-4 py-1.5 transition-all duration-300 ${activeFilter === category.key
                                ? 'bg-[var(--secondary-color)]/20 text-[var(--secondary-color)] border border-[var(--secondary-color)]/50'
                                : 'text-[var(--text-color)]/60 border border-[var(--border-color)] hover:border-[var(--secondary-color)]/30 hover:text-[var(--text-color)]/80'
                                }`}
                            style={{ fontFamily: 'var(--Jetbrains-Mono)' }}
                        >
                            {category.label}
                            <span className={`ml-1.5 text-[10px] ${activeFilter === category.key
                                ? 'text-[var(--secondary-color)]/70'
                                : 'text-[var(--text-color)]/40'
                                }`}>
                                {getCount(category.key)}
                            </span>
                        </button>
                    ))}
                </div>

                {/* ✅ Filtered tech badges */}
                <div
                    ref={techBadgesRef}
                    className='flex flex-wrap justify-center gap-3 max-w-4xl mx-auto'
                    key={activeFilter}
                >
                    {filteredTechStacks.map((tech) => (
                        <span
                            key={tech.id}
                            className='tech-badge inline-flex items-center gap-2 border border-[var(--secondary-color)]/30 bg-[var(--secondary-color)]/10 hover:bg-[var(--secondary-color)]/20 hover:border-[var(--secondary-color)]/50 rounded-full px-4 py-2 text-xs text-[var(--text-color)] transition-all duration-300 cursor-default hover:scale-105'
                            style={{ fontFamily: 'var(--Jetbrains-Mono)' }}
                        >
                            <img
                                src={tech.img}
                                alt={tech.label}
                                className="w-4 h-4 object-contain"
                            />
                            {tech.label}
                        </span>
                    ))}

                    {/* Empty state */}
                    {filteredTechStacks.length === 0 && (
                        <p className='text-sm text-[var(--text-color)]/40 py-8'>
                            No technologies found
                        </p>
                    )}
                </div>

                {/* Category legend */}
                <div className='flex flex-wrap justify-center gap-6 mt-8'>
                    {categories.filter(c => c.key !== 'all').map((category) => {
                        const count = techStacks.filter(t => t.category === category.key).length;
                        return (
                            <div key={category.key} className='flex items-center gap-2'>
                                <span className={`w-2 h-2 rounded-full ${category.key === 'frontend' ? 'bg-blue-400' :
                                    category.key === 'backend' ? 'bg-green-400' :
                                        category.key === 'database' ? 'bg-yellow-400' :
                                            category.key === 'devops' ? 'bg-purple-400' :
                                                'bg-pink-400'
                                    }`} />
                                <span className='text-xs text-[var(--text-color)]/50'>
                                    {category.label} ({count})
                                </span>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    )
}