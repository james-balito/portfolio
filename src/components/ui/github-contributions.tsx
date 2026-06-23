"use client"

import { useEffect, useRef } from 'react';
import { GitHubCalendar, type Activity } from 'react-github-calendar';
import { FaGithub } from 'react-icons/fa6';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function GitHubContributions() {
    const username = "james-balito";
    const wrapperRef = useRef<HTMLDivElement>(null);
    // const [isDarkMode, setIsDarkMode] = useState(false);

    // ✅ Dark mode detection
    // useEffect(() => {
    //     const checkDarkMode = () => {
    //         const hasDarkClass = document.documentElement.classList.contains('dark');
    //         setIsDarkMode(hasDarkClass);
    //     };

    //     checkDarkMode();

    //     const observer = new MutationObserver(checkDarkMode);
    //     observer.observe(document.documentElement, {
    //         attributes: true,
    //         attributeFilter: ['class'],
    //     });

    //     return () => observer.disconnect();
    // }, []);

    // ✅ Filter to show only last 6 months
    const selectLastSixMonths = (contributions: Activity[]) => {
        const today = new Date();
        const sixMonthsAgo = new Date();
        sixMonthsAgo.setMonth(today.getMonth() - 6);

        return contributions.filter((activity) => {
            const activityDate = new Date(activity.date);
            return activityDate >= sixMonthsAgo && activityDate <= today;
        });
    };

    // ✅ Hide scrollbar
    useEffect(() => {
        const hideScrollbars = () => {
            const wrapper = wrapperRef.current;
            if (!wrapper) return;

            wrapper.style.setProperty('overflow-x', 'auto', 'important');
            wrapper.style.setProperty('-ms-overflow-style', 'none', 'important');
            wrapper.style.setProperty('scrollbar-width', 'none', 'important');

            const styleId = 'github-calendar-scrollbar-fix';
            if (!document.getElementById(styleId)) {
                const style = document.createElement('style');
                style.id = styleId;
                style.textContent = `
                    .github-calendar-wrapper,
                    .github-calendar-wrapper * {
                        -ms-overflow-style: none !important;
                        scrollbar-width: none !important;
                    }
                    .github-calendar-wrapper::-webkit-scrollbar,
                    .github-calendar-wrapper *::-webkit-scrollbar {
                        width: 0 !important;
                        height: 0 !important;
                        display: none !important;
                        background: transparent !important;
                    }
                `;
                document.head.appendChild(style);
            }
        };

        hideScrollbars();
        const timer = setTimeout(hideScrollbars, 500);
        return () => clearTimeout(timer);
    }, [username]);

    // GSAP Animations
    gsap.registerPlugin(ScrollTrigger);

    useGSAP(() => {
        gsap.from(wrapperRef.current, {
            opacity: 0,
            x: 30,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: wrapperRef.current,
                start: 'top 75%',
            },
        });

        gsap.to(wrapperRef.current, {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: wrapperRef.current,
                start: 'top 75%',
            },
        })
    });

    return (
        <section id="github" className="flex flex-col items-center justify-center py-20">
            <div className="w-full max-w-4xl">
                <div ref={wrapperRef} className="p-4 rounded-xl shadow-lg border border-[var(--border-color)] bg-white dark:bg-gray-900 transition-colors duration-300">
                    <span
                        className="text-base mb-2 -mt-1 flex text-gray-900 flex justify-center items-center dark:text-white"
                        style={{
                            fontFamily: 'var(--Instrument-Serif)',
                        }}
                    >
                        <FaGithub /> &nbsp; Github Contributions
                    </span>

                    <div className="github-calendar-wrapper">
                        <GitHubCalendar
                            username={username}
                            blockSize={14}
                            blockMargin={4}
                            year="last"
                            transformData={selectLastSixMonths}
                            labels={{
                                totalCount: `{{count}} contributions in the last 6 months`,
                            }}
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}