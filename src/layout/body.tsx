import About from '../components/ui/about';
import NavBar from '../components/ui/nav-bar';
import WorkExperience from '../components/ui/work-experience';
import Contact from '../components/ui/contact';
import Projects from '../components/ui/project';
import Home from '../components/ui/home';
import Certifications from '../components/ui/certifications';
import TechStackCarousel from '../components/ui/techstack-carousel';

interface BodyProps {
    toggleDarkMode: () => void
    isDarkMode: boolean
}

export default function Body({ toggleDarkMode, isDarkMode }: BodyProps) {

    return (
        <>
            <NavBar toggleDarkMode={toggleDarkMode} isDarkMode={isDarkMode} />

            <section id="home">
                <Home />
                <TechStackCarousel />
            </section>

            <section id="about">
                <About />
            </section>

            <section id="experience">
                <WorkExperience />
            </section>

            <section id="certifications">
                <Certifications />
            </section>

            <section id="projects">
                <Projects />
            </section>

            <section id="contact">
                <Contact />
            </section>
        </>
    )
}