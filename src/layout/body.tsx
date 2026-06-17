
import About from '../components/ui/about';
import NavBar from '../components/ui/nav-bar';
import WorkExperience from '../components/ui/work-experience';
import Contact from '../components/ui/contact';
import Projects from '../components/ui/project';
import Home from '../components/ui/home';
import TechStackCarousel from '../components/ui/techstack-carousel';

interface BodyProps {
    toggleDarkMode: () => void
    isDarkMode: boolean
}

export default function Body({ toggleDarkMode, isDarkMode }: BodyProps) {
    
    return (
        <>
            <NavBar toggleDarkMode={toggleDarkMode} isDarkMode={isDarkMode} />

            <Home />
            <TechStackCarousel />
            <About />
            <WorkExperience />
            <Projects />
            <Contact />
        </>
    )
}