import About from '../components/ui/about';
import NavBar from '../components/ui/nav-bar';
import WorkExperience from '../components/ui/work-experience';
import Contact from '../components/ui/contact';
import Projects from '../components/ui/project';
import Home from '../components/ui/home';
import Certifications from '../components/ui/certifications';
import TechStackCarousel from '../components/ui/techstack-carousel';
import Footer from '../components/ui/footer';

// interface BodyProps {
//     toggleDarkMode: () => void
//     isDarkMode: boolean
// }

export default function Body() {

    return (
        <>
            <div className = 'mx-30'>
                <NavBar />
                <Home />
                <TechStackCarousel />
                <About />
                <Certifications />
                <WorkExperience />
                <Projects />
                <Contact />
            </div>
            <Footer />
        </>
    )
}