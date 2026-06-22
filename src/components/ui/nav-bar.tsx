import { Menu, X } from "lucide-react"
import { useState, useEffect, useRef } from "react"
import gsap from 'gsap'

export default function NavBar() {
    const [scrolled, setScrolled] = useState(false)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const navRef = useRef<HTMLElement | null>(null)
    const mobileMenuRef = useRef<HTMLDivElement | null>(null)
    const animationRef = useRef<gsap.core.Tween | null>(null)
    const mobileMenuAnimationRef = useRef<gsap.core.Tween | null>(null)

    // Scroll animation effect
    useEffect(() => {
        const handleScroll = () => {
            const isScrolled = window.scrollY > 10
            setScrolled(isScrolled)

            // Animate the top offset smoothly
            if (animationRef.current) {
                animationRef.current.kill()
            }

            animationRef.current = gsap.to(navRef.current, {
                top: isScrolled ? '8px' : '0px',
                duration: 0.3,
                ease: "power2.out"
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

    // Mobile menu animation
    useEffect(() => {
        if (mobileMenuRef.current) {
            if (mobileMenuAnimationRef.current) {
                mobileMenuAnimationRef.current.kill()
            }

            if (mobileMenuOpen) {
                // Animate menu opening
                mobileMenuAnimationRef.current = gsap.fromTo(mobileMenuRef.current,
                    {
                        height: 0,
                        opacity: 0,
                        display: 'none'
                    },
                    {
                        height: 'auto',
                        opacity: 1,
                        display: 'block',
                        duration: 0.4,
                        ease: "power2.inOut"
                    }
                )
            } else {
                // Animate menu closing
                mobileMenuAnimationRef.current = gsap.to(mobileMenuRef.current, {
                    height: 0,
                    opacity: 0,
                    duration: 0.3,
                    ease: "power2.inOut",
                    onComplete: () => {
                        if (mobileMenuRef.current) {
                            mobileMenuRef.current.style.display = 'none'
                        }
                    }
                })
            }
        }

        return () => {
            if (mobileMenuAnimationRef.current) {
                mobileMenuAnimationRef.current.kill()
            }
        }
    }, [mobileMenuOpen])

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen)
    }

    const closeMobileMenu = () => {
        setMobileMenuOpen(false)
    }

    return (
        <nav
            ref={navRef}
            id="nav"
            className={`nav sticky z-50 top-0 ${scrolled ? 'scrolled' : ''}`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-4">
                <div className="flex justify-between items-center h-14">
                    {/* Logo */}
                    <a href="#home" className="text-lg">
                        <span className="text-lg text-[var(--logo-symbol-color)]">&lt;</span>
                        <span className="font-semibold text-[var(--logo-color)]" style={{ fontFamily: 'var(--Jetbrains-Mono)' }}>JB</span>
                        <span className="text-lg text-[var(--logo-symbol-color)]">/&gt;</span>
                    </a>

                    {/* Desktop Navigation - Hidden on mobile */}
                    <div className="hidden md:flex items-center gap-10">
                        <a
                            href="#about"
                            className="text-[var(--text-color)] text-sm font-thin hover:text-[var(--secondary-color)] transition-colors"
                            style={{ fontFamily: 'var(--Poppins)', fontWeight: 100 }}
                        >
                            About
                        </a>
                            <a
                            href="#certifications"
                            className="text-[var(--text-color)] text-sm font-thin hover:text-[var(--secondary-color)] transition-colors"
                            style={{ fontFamily: 'var(--Poppins)', fontWeight: 100 }}
                        >
                            Certificate
                        </a>
                        <a
                            href="#experience"
                            className="text-[var(--text-color)] text-sm font-thin hover:text-[var(--secondary-color)] transition-colors"
                            style={{ fontFamily: 'var(--Poppins)', fontWeight: 100 }}
                        >
                            Experience
                        </a>
                        <a
                            href="#projects"
                            className="text-[var(--text-color)] text-sm font-thin hover:text-[var(--secondary-color)] transition-colors"
                            style={{ fontFamily: 'var(--Poppins)', fontWeight: 100 }}
                        >
                            Projects
                        </a>
                        <a
                            href="#contact"
                            className="h-9 flex items-center justify-center px-4 border border-[var(--secondary-color)]/50 bg-transparent rounded-xl text-[var(--secondary-color)] font-medium transition-all duration-300 hover:bg-[var(--secondary-color)] hover:text-white cursor-pointer text-sm hover:font-medium"
                            style={{ fontFamily: 'var(--Poppins)' }}
                        >
                            Book a Call
                        </a>
                    </div>

                    {/* Mobile Menu Button - Visible only on mobile */}
                    <button
                        onClick={toggleMobileMenu}
                        className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                        aria-label="Toggle mobile menu"
                    >
                        {mobileMenuOpen ? (
                            <X className="w-6 h-6 text-[var(--text-color)]" />
                        ) : (
                            <Menu className="w-6 h-6 text-[var(--text-color)]" />
                        )}
                    </button>
                </div>
            </div>

            {/* Mobile Navigation Menu - Separate container */}
            <div
                ref={mobileMenuRef}
                className="md:hidden overflow-hidden bg-[var(--nav-bg)] border-t border-[var(--border-color)]"
                style={{ display: 'none' }}
            >
                <div className="px-4 py-4 space-y-3">
                    <a
                        href="#about"
                        onClick={closeMobileMenu}
                        className="block py-2 text-[var(--text-color)] text-sm font-thin hover:text-[var(--secondary-color)] transition-colors border-b border-transparent hover:border-[var(--secondary-color)]"
                        style={{ fontFamily: 'var(--Poppins)', fontWeight: 100 }}
                    >
                        About
                    </a>
                    <a
                        href="#experience"
                        onClick={closeMobileMenu}
                        className="block py-2 text-[var(--text-color)] text-sm font-thin hover:text-[var(--secondary-color)] transition-colors border-b border-transparent hover:border-[var(--secondary-color)]"
                        style={{ fontFamily: 'var(--Poppins)', fontWeight: 100 }}
                    >
                        Experience
                    </a>
                    <a
                        href="#projects"
                        onClick={closeMobileMenu}
                        className="block py-2 text-[var(--text-color)] text-sm font-thin hover:text-[var(--secondary-color)] transition-colors border-b border-transparent hover:border-[var(--secondary-color)]"
                        style={{ fontFamily: 'var(--Poppins)', fontWeight: 100 }}
                    >
                        Projects
                    </a>
                    <a
                        href="#contact"
                        onClick={closeMobileMenu}
                        className="block w-full text-center py-3 mt-2 px-4 border border-[var(--secondary-color)]/50 bg-transparent rounded-xl text-[var(--secondary-color)] font-medium transition-all duration-300 hover:bg-[var(--secondary-color)] hover:text-white cursor-pointer text-sm"
                        style={{ fontFamily: 'var(--Poppins)' }}
                    >
                        Book a Call
                    </a>
                </div>
            </div>
        </nav>
    )
}