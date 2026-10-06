import React, { useEffect, useState } from 'react';
import { FiGrid, FiBriefcase, FiCpu, FiUser, FiAward } from 'react-icons/fi';
import { navLinks } from '../../constants/constants';
import { Nav, NavItem } from './BottomNavStyles';

const icons = {
  Projects: FiGrid,
  Experience: FiBriefcase,
  Skills: FiCpu,
  About: FiUser,
  Certifications: FiAward,
};

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
            $active={active === id}
            aria-current={active === id ? 'true' : undefined}
          >
            {Icon && <Icon size="2.2rem" aria-hidden="true" />}
            <span>{link.label}</span>
          </NavItem>
        );
      })}
    </Nav>
  );
};

export default BottomNav;
