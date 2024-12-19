import { useState, useEffect } from 'react';

const Navbar = () => {
  const [navbar, setNavbar] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to control menu visibility

  // Change navbar background color on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen); // Toggle menu visibility
  };

  // Smooth scroll function
  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' }); // Smooth scrolling effect
      setIsMenuOpen(false); // Close the menu after clicking
    }
  };

  return (
    <nav className={isScrolled ? 'navbar active' : 'navbar'}>
      <div className="nav-container">
        <button
          className={`hamburger ${isMenuOpen ? 'open' : ''}`}
          onClick={handleMenuToggle}
        >
          {/* Hamburger Icon */}
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </button>

        {/* Navigation Links */}
        <ul className={`navLinks ${isMenuOpen ? 'showMenu' : ''}`}>
          <li>
            <a href="/" onClick={() => scrollToSection('home')}>Home</a>
          </li>
          <li>
            <a href="#about" onClick={() => scrollToSection('about')}>About Us</a>
          </li>
          <li>
            <a href="#services" onClick={() => scrollToSection('services')}>Why Us</a>
          </li>
          <li>
            <a href="#contact" onClick={() => scrollToSection('contact')}>Contact Us</a>
          </li>
        </ul>
        <button className='connect'>Connect Now</button>
      </div>
    </nav>
  );
};

export default Navbar;
