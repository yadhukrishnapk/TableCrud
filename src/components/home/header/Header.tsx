// src/components/Header.tsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Header.css';

interface HeaderProps {
    title: string;
    isAuthenticated: boolean;
    onLogout: () => void;
    userEmail?: string;
  }
  

  const Header = ({ title, isAuthenticated, onLogout, userEmail }: HeaderProps) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  
    const handleLogout = (): void => {
      onLogout();
    };
  
    return (
      <header className="header-container">
        <h1 className="header-title">
          <Link to="/" className="text-white text-decoration-none hover:text-gray-300">
            {title}(TypeScript)
          </Link>
        </h1>
        {isAuthenticated && (
          <Dropdown
            show={isDropdownOpen}
            onMouseEnter={() => setIsDropdownOpen(true)}
            onMouseLeave={() => setIsDropdownOpen(false)}
          >
            <Dropdown.Toggle variant="primary" className="bg-blue-600 border-none">
              <span>{userEmail ?? 'User'}</span>
            </Dropdown.Toggle>
            <Dropdown.Menu align="end" className="dropdown-menu-custom">
              <Dropdown.Item
                onClick={handleLogout}
                className="dropdown-item-custom logout-button"
              >
                Logout
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        )}
      </header>
    );
  };
  

export default Header;