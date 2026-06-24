"use client";

import { useEffect, useRef, useState } from 'react';
import { GitHubCalendar, type Activity } from 'react-github-calendar';
import { FaGithub } from 'react-icons/fa6';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function GitHubContributions() {
    const username = "james-balito";
    const wrapperRef = useRef<HTMLDivElement>(null);
    const [blockSize, setBlockSize] = useState(14);
    const [blockMargin, setBlockMargin] = useState(4);

    // Responsive block sizing
    useEffect(() => {
        const el = wrapperRef.current;
        if (!el) return;
        const observer = new ResizeObserver(() => {
            const width = el.offsetWidth;
            if (width < 400) {
                setBlockSize(8.2);
                setBlockMargin(2);
            } else if (width < 640) {
                setBlockSize(12);
                setBlockMargin(5);
            } else {
                setBlockSize(14);
                setBlockMargin(4);
            }
        });
        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    const selectLastSixMonths = (contributions: Activity[]) => {
        const today = new Date();
        const sixMonthsAgo = new Date();
        sixMonthsAgo.setMonth(today.getMonth() - 6);
        return contributions.filter((activity) => {
            const activityDate = new Date(activity.date);
            return activityDate >= sixMonthsAgo && activityDate <= today;
        });
    };

    useEffect(() => {
        const styleId = 'github-calendar-custom-styles';
        if (!document.getElementById(styleId)) {
            const style = document.createElement('style');
            style.id = styleId;
            style.textContent = `
            /* Hide scrollbars */
            .github-calendar-wrapper,
            .github-calendar-wrapper * {
                -ms-overflow-style: none !important;
                scrollbar-width: none !important;
            }
            .github-calendar-wrapper::-webkit-scrollbar,
            .github-calendar-wrapper *::-webkit-scrollbar {
                display: none !important;
            }

            /* Make SVG responsive */
            .github-calendar-wrapper svg {
                width: 100% !important;
                height: auto !important;
            }

            /* Custom font for SVG text (months, days) */
            .github-calendar-wrapper svg text {
                font-family: var(--Instrument-Serif), serif !important;
                font-size: 11px !important;
            }

            /* ============================================ */
            /* LEGEND STYLING - The key part!              */
            /* ============================================ */
            
            /* Legend container */
            .github-calendar-wrapper .react-activity-calendar__legend,
            .github-calendar-wrapper div[style*="display: flex"] {
                font-family: var(--Inter), serif !important;
            }

            /* Legend text (Less/More labels) */
            .github-calendar-wrapper .react-activity-calendar__legend span,
            .github-calendar-wrapper div[style*="display: flex"] > span {
                font-family: var(--Inter), serif !important;
                font-size: 12px !important;
                color: inherit !important;
            }

            /* Legend color blocks */
            .github-calendar-wrapper .react-activity-calendar__legend svg {
                border-radius: 2px !important;
            }

            /* Total count text */
            .github-calendar-wrapper .react-activity-calendar__count,
            .github-calendar-wrapper div[style*="text-align"] {
                font-family: var(--Instrument-Serif), serif !important;
                font-size: 13px !important;
                margin-bottom: 8px !important;
            }
        `;
            document.head.appendChild(style);
        }
    }, []);

    useGSAP(() => {
        if (!wrapperRef.current) return;
        gsap.fromTo(wrapperRef.current,
            { opacity: 0, x: 30 },
            {
                opacity: 1, x: 0, duration: 0.8, ease: 'power3.out',
                scrollTrigger: { trigger: wrapperRef.current, start: 'top 75%' }
            }
        );
    }, []);

    return (
        <section id="github" className="flex flex-col items-center justify-center py-20">
            <div className="w-full max-w-4xl">
                <div ref={wrapperRef} className="p-4 rounded-xl shadow-lg border border-[var(--border-color)] bg-white dark:bg-gray-900 transition-colors duration-300">
                    <span className="text-base mb-2 -mt-1 flex items-center justify-center text-gray-900 dark:text-white"
                        style={{ fontFamily: 'var(--Instrument-Serif)' }}>
                        <FaGithub /> &nbsp; GitHub Contributions
                    </span>
                    <div className="github-calendar-wrapper">
                        <GitHubCalendar
                            username={username}
                            blockSize={blockSize}
                            blockMargin={blockMargin}
                            year="last"
                            transformData={selectLastSixMonths}
                            labels={{
                                totalCount: `Contributions`,
                            }}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}