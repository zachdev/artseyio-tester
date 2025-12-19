import styled from "styled-components";
import { FC } from 'react';
import { ArtsyCode, KeyMapDefinition } from '../model/KeyMapDefinition';

interface VisualKeyboardProps {
    keymap: KeyMapDefinition;
    activeKeys?: Set<string>;
}

export const VisualKeyboard: FC<VisualKeyboardProps> = ({ keymap, activeKeys = new Set() }) => {
    const isKeyActive = (code: ArtsyCode) => {
        return activeKeys.has(keymap.keys[code].fromKey);
    };

    return (
        <StyledKeyboard>
            <div className="keyboard-title">ARTSEY Layout</div>
            <div className="keyboard-grid">
                <KeyCap className={isKeyActive(ArtsyCode.A) ? 'active' : ''}>
                    <div className="artsey-key">A</div>
                    <div className="mapped-key">{keymap.keys[ArtsyCode.A].fromKey}</div>
                </KeyCap>
                <KeyCap className={isKeyActive(ArtsyCode.R) ? 'active' : ''}>
                    <div className="artsey-key">R</div>
                    <div className="mapped-key">{keymap.keys[ArtsyCode.R].fromKey}</div>
                </KeyCap>
                <KeyCap className={isKeyActive(ArtsyCode.T) ? 'active' : ''}>
                    <div className="artsey-key">T</div>
                    <div className="mapped-key">{keymap.keys[ArtsyCode.T].fromKey}</div>
                </KeyCap>
                <KeyCap className={isKeyActive(ArtsyCode.S) ? 'active' : ''}>
                    <div className="artsey-key">S</div>
                    <div className="mapped-key">{keymap.keys[ArtsyCode.S].fromKey}</div>
                </KeyCap>
            </div>
            <div className="keyboard-grid">
                <KeyCap className={isKeyActive(ArtsyCode.E) ? 'active' : ''}>
                    <div className="artsey-key">E</div>
                    <div className="mapped-key">{keymap.keys[ArtsyCode.E].fromKey}</div>
                </KeyCap>
                <KeyCap className={isKeyActive(ArtsyCode.Y) ? 'active' : ''}>
                    <div className="artsey-key">Y</div>
                    <div className="mapped-key">{keymap.keys[ArtsyCode.Y].fromKey}</div>
                </KeyCap>
                <KeyCap className={isKeyActive(ArtsyCode.I) ? 'active' : ''}>
                    <div className="artsey-key">I</div>
                    <div className="mapped-key">{keymap.keys[ArtsyCode.I].fromKey}</div>
                </KeyCap>
                <KeyCap className={isKeyActive(ArtsyCode.O) ? 'active' : ''}>
                    <div className="artsey-key">O</div>
                    <div className="mapped-key">{keymap.keys[ArtsyCode.O].fromKey}</div>
                </KeyCap>
            </div>
        </StyledKeyboard>
    );
};

const StyledKeyboard = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    padding: 20px;
    background: ${p => p.theme.cardBackground};
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    margin: 20px 0;

    .keyboard-title {
        font-size: 1.2rem;
        font-weight: 600;
        color: ${p => p.theme.textColor};
        margin-bottom: 10px;
    }

    .keyboard-grid {
        display: flex;
        gap: 8px;
    }
`;

const KeyCap = styled.div`
    width: 60px;
    height: 60px;
    border: 2px solid ${p => p.theme.borderColor};
    border-radius: 8px;
    background: ${p => p.theme.keyBackground};
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    transition: all 0.2s ease;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

    &.active {
        background: ${p => p.theme.primaryColor};
        border-color: ${p => p.theme.primaryColor};
        color: white;
        transform: translateY(2px);
        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
    }

    .artsey-key {
        font-size: 1.2rem;
        font-weight: bold;
        color: ${p => p.theme.textColor};
    }

    .mapped-key {
        font-size: 0.7rem;
        color: ${p => p.theme.textColorFaded};
        margin-top: 2px;
        text-transform: uppercase;
    }

    &.active .artsey-key,
    &.active .mapped-key {
        color: white;
    }
`;

export default VisualKeyboard;
