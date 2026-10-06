import React, { useEffect, useState } from 'react';
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

  useEffect(() => {
    const sections = navLinks
      .map((l) => document.getElementById(l.href.slice(1)))
      .filter(Boolean);
    if (!('IntersectionObserver' in window)) return undefined;
    // Highlight the section crossing the middle band of the viewport
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: '-45% 0px -50% 0px' }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
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
