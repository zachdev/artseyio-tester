import styled from "styled-components";
import { FC } from 'react';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface ThemeToggleProps {
    isDark: boolean;
    onToggle: () => void;
}

export const ThemeToggle: FC<ThemeToggleProps> = ({ isDark, onToggle }) => {
    return (
        <StyledToggle onClick={onToggle} title={isDark ? "Switch to light mode" : "Switch to dark mode"}>
            <FontAwesomeIcon icon={isDark ? faSun : faMoon} />
        </StyledToggle>
    );
};

const StyledToggle = styled.button`
    position: fixed;
    top: 20px;
    right: 20px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    border: 2px solid ${p => p.theme.borderColor};
    background: ${p => p.theme.cardBackground};
    color: ${p => p.theme.textColor};
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;
    transition: all 0.3s ease;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    z-index: 1000;

    &:hover {
        transform: scale(1.1);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    }

    &:active {
        transform: scale(0.95);
    }
`;

export default ThemeToggle;
