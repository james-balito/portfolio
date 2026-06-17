import { Moon, Sun } from "lucide-react"
import { useState, useEffect, useRef } from "react"
import gsap from 'gsap'

interface DarkModeProps {
    toggleDarkMode: () => void
    isDarkMode: boolean
}

export default function NavBar({ toggleDarkMode, isDarkMode }: DarkModeProps) {
    const [scrolled, setScrolled] = useState(false)
    const navRef = useRef(null)
    const animationRef = useRef<gsap.core.Tween | null>(null)

    useEffect(() => {
        const handleScroll = () => {
            const isScrolled = window.scrollY > 0
            setScrolled(isScrolled)

            // Animate the top offset smoothly
            if (animationRef.current) {
                animationRef.current.kill()
            }

            animationRef.current = gsap.to(navRef.current, {
                top: isScrolled ? '8px' : '0px', // 8px ≈ top-2
                duration: 0.3,
                ease: 'power2.out'
            })
        }

        window.addEventListener("scroll", handleScroll)
        return () => {
            window.removeEventListener("scroll", handleScroll)
            if (animationRef.current) {
                animationRef.current.kill()
            }
        }
    }, [])

    return (
        <nav
            ref={navRef}
            id="nav"
            className={`nav sticky z-50 top-0 ${scrolled ? 'scrolled' : ''}`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-4">
                <div className="flex justify-between items-center h-14">
                    {/* Logo */}
                    <a href="#home" className="text-2xl">
                        <span className="text-[var(--logo-symbol-color)]">&lt;</span>
                        <span className="font-mono font-bold text-[var(--logo-color)]">JB</span>
                        <span className="text-[var(--logo-symbol-color)]">/&gt;</span>
                    </a>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-10">
                        <a
                            href="#home"
                            className="text-[var(--text-color)] text-sm font-thin hover:text-[var(--secondary-color)] transition-colors"
                            style={{
                                fontFamily: 'var(--Poppins)',
                                fontWeight: 100
                            }}
                        >
                            Home
                        </a>
                        <a
                            href="#about"
                            className="text-[var(--text-color)] text-sm font-thin hover:text-[var(--secondary-color)] transition-colors"
                            style={{
                                fontFamily: 'var(--Poppins)',
                                fontWeight: 100
                            }}
                        >
                            About
                        </a>
                        <a
                            href="#projects"
                            className="text-[var(--text-color)] text-sm font-thin hover:text-[var(--secondary-color)] transition-colors"
                            style={{
                                fontFamily: 'var(--Poppins)',
                                fontWeight: 100
                            }}
                        >
                            Projects
                        </a>
                        <a
                            href="#contact"
                            className="text-[var(--text-color)] text-sm font-thin hover:text-[var(--secondary-color)] transition-colors"
                            style={{
                                fontFamily: 'var(--Poppins)',
                                fontWeight: 100
                            }}
                        >
                            Contact
                        </a>

                        <div className="h-9 flex items-center justify-center px-4 border border-[var(--secondary-color)]/50 bg-transparent rounded-xl text-[var(--secondary-color)] font-medium transition-all duration-300 hover:bg-[var(--secondary-color)] hover:text-white cursor-pointer">
                            <a href="#contact" className = "text-sm hover:font-medium" style = {{fontFamily: 'var(--Poppins)'}}>Book a Call</a>
                        </div>

                        <button onClick={toggleDarkMode} className="transition-all duration-300">
                            {isDarkMode ? (
                                <Sun className="w-5 h-5 text-[var(--secondary-color)] hover:text-[var(--secondary-color)]/70 hover:cursor-pointer" />
                            ) : (
                                <Moon className="w-5 h-5 text-[var(--secondary-color)] hover:text-[var(--secondary-color)]/70 hover:cursor-pointer" />
                            )}
                        </button>
                    </div>

                    {/* Mobile Menu Button */}
                    <button className="md:hidden p-2 hover:bg-[var(--border-color)] rounded-lg">
                        <svg className="w-6 h-6 text-[var(--text-color)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                </div>
            </div>
        </nav>
    )
}