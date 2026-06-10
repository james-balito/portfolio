import { Moon, Sun } from "lucide-react"

interface DarkModeProps {
    toggleDarkMode: () => void
    isDarkMode: boolean
}

export default function NavBar({ toggleDarkMode, isDarkMode }: DarkModeProps) {
    return (
        <nav id="nav">
            <div className="max-w-7xl">
                <div className="flex justify-between items-center h-16">

                    {/* Logo */}
                    <a href="#home" className="text-2xl">
                        <span className="text-[var(--secondary-color)]">&lt;</span>
                        <span className="font-mono font-bold text-[var(--text-color)]">
                            JB
                        </span>
                        <span className="text-[var(--secondary-color)]">/&gt;</span>
                    </a>

                    {/* Navigation Links */}
                    <div className="hidden md:flex items-center gap-10">
                          <a
                            href="#home"
                            className="text-[var(--text-color)] hover:text-[var(--secondary-color)] transition-colors"
                        >
                            Home
                        </a>
                        <a
                            href="#about"
                            className="text-[var(--text-color)] hover:text-[var(--secondary-color)] transition-colors"
                        >
                            About
                        </a>

                        <a
                            href="#projects"
                            className="text-[var(--text-color)] hover:text-[var(--secondary-color)] transition-colors"
                        >
                            Projects
                        </a>

                        <a
                            href="#contact"
                            className="text-[var(--text-color)] hover:text-[var(--secondary-color)] transition-colors"
                        >
                            Contact
                        </a>

                        <div className = "h-9 w-30 flex items-center justify-center border border-[var(--secondary-color)]/50 bg-transparent rounded-xl text-[var(--secondary-color)] font-medium transition-all duration-300 hover:bg-[var(--secondary-color)] hover:text-white">
                            <a
                                href="#contact"
                            >
                                Book a Call
                            </a>
                        </div>

                        <button
                            onClick={toggleDarkMode}
                            className="hover:bg-[var(--border-color)] rounded-lg transition-all duration-300"
                        >
                            {isDarkMode ? (
                                <Sun className="w-5 h-5 text-[var(--secondary-color)]" />
                            ) : (
                                <Moon className="w-5 h-5 text-[var(--secondary-color)]" />
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