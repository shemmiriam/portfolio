import React, { useEffect, useRef, useState } from 'react';
import { FiGrid, FiBriefcase, FiCpu, FiUser, FiAward, FiMessageSquare } from 'react-icons/fi';
import { navLinks } from '../../constants/constants';
import { Nav, NavItem } from './BottomNavStyles';

const icons = {
  Projects: FiGrid,
  Experience: FiBriefcase,
  Skills: FiCpu,
  About: FiUser,
  Certifications: FiAward,
  Reviews: FiMessageSquare,
};

// Shorter labels so six tabs fit on small phones
const shortLabels = { Certifications: 'Certs' };

const BottomNav = () => {
  const [active, setActive] = useState('');
  // After a tap, trust the tapped tab until the smooth scroll has finished
  const lockUntil = useRef(0);

  useEffect(() => {
    const sections = navLinks
      .map((l) => document.getElementById(l.href.slice(1)))
      .filter(Boolean);
    if (!('IntersectionObserver' in window)) return undefined;
    // The last section is short, so at the very bottom of the page it can never reach the
    // middle band: treat "scrolled to the end" as being on the last section.
    const atBottom = () =>
      window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 40;

    // Highlight the section crossing the middle band of the viewport
    const observer = new IntersectionObserver(
      (entries) => {
        if (Date.now() < lockUntil.current || atBottom()) return;
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: '-45% 0px -50% 0px' }
    );
    sections.forEach((s) => observer.observe(s));

    const onScroll = () => {
      if (Date.now() < lockUntil.current || !sections.length) return;
      if (atBottom()) setActive(sections[sections.length - 1].id);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <Nav aria-label="Primary">
      {navLinks.map((link) => {
        const Icon = icons[link.label];
        const id = link.href.slice(1);
        return (
          <NavItem
            key={link.label}
            href={link.href}
            aria-label={link.label}
            $active={active === id}
            aria-current={active === id ? 'true' : undefined}
            onClick={(e) => {
              // Scroll without writing #hash into the URL, so reloads start at the top
              const target = document.getElementById(id);
              if (!target) return;
              e.preventDefault();
              target.scrollIntoView({ behavior: 'smooth' });
              lockUntil.current = Date.now() + 1200;
              setActive(id);
            }}
          >
            {Icon && <Icon size="2.2rem" aria-hidden="true" />}
            <span>{shortLabels[link.label] || link.label}</span>
          </NavItem>
        );
      })}
    </Nav>
  );
};

export default BottomNav;
