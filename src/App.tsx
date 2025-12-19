import { useState } from "react";
import styled from "styled-components";

import logo from './assets/logo.png';
import ArtseyInput from './components/ArtseyInput';
import KeyMapper from "./components/KeyMapper";
import ThemeToggle from "./components/ThemeToggle";
import { DefaultKeyMaps, KeyMapDefinition } from "./model/KeyMapDefinition";

interface AppProps {
    isDark: boolean;
    onThemeToggle: () => void;
}

function App({ isDark, onThemeToggle }: AppProps) {    
    const [keymap, setKeyMap] = useState<KeyMapDefinition>(DefaultKeyMaps[0]);
    const [keyTimeout, setKeyTimeout] = useState(25);

    return (
        <StyledApp>
            <ThemeToggle isDark={isDark} onToggle={onThemeToggle} />
            <Header>
                <img src={logo} alt="ARTSEY logo" id="logo" />
                <h1>ARTSEY Tester</h1>
                <Subtitle>Practice and master the ARTSEY keyboard layout</Subtitle>
            </Header>
            
            <InfoSection>
                <InfoCard>
                    <p>
                        Test the innovative ARTSEY layout without a dedicated keyboard. 
                        This tester supports all alpha key combos, space, and backspace. 
                        Learn more at the <a href="https://artsey.io" title="ARTSEY Website" target="_blank" rel="noreferrer">official website</a>.
                    </p>
                    <LinkBar>
                        <a href="https://raw.githubusercontent.com/artseyio/artsey/main/layout%20diagrams/current.jpg" title="ARTSEY Cheatsheet" target="_blank" rel="noreferrer">📊 Cheatsheet</a>
                        <span>•</span>
                        <a href="Learning_Artsey.pdf" title="Learn ARTSEY Book" target="_blank" rel="noreferrer">📚 Learn ARTSEY</a>
                    </LinkBar>
                </InfoCard>
            </InfoSection>

            <ArtseyInput keymap={ keymap } keyTimeout={ keyTimeout }></ArtseyInput>
            
            <ConfigSection>
                <SectionTitle>⚙️ Configuration</SectionTitle>
                <KeyMapper onMappingChanged={ setKeyMap } onKeyTimeoutChanged={ setKeyTimeout }></KeyMapper>
            </ConfigSection>

            <Footer>
                <p>Made with ❤️ for the ARTSEY community</p>
            </Footer>
        </StyledApp>
    );
}

const StyledApp = styled.div`
    display:flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    
    max-width: 900px;
    margin: 0 auto;
    padding: 25px;
    min-height: 100vh;

    @media (max-width: 768px) {
        padding: 15px;
    }

    #logo {
        width: 120px;
        margin-bottom: 20px;
        filter: drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1));

        @media (max-width: 768px) {
            width: 80px;
        }
    }
`;

const Header = styled.header`
    text-align: center;
    margin-bottom: 30px;

    h1 {
        font-size: 3rem;
        font-weight: 700;
        background: linear-gradient(135deg, ${p => p.theme.primaryColor}, ${p => p.theme.secondaryColor});
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        margin-bottom: 10px;

        @media (max-width: 768px) {
            font-size: 2rem;
        }
    }
`;

const Subtitle = styled.p`
    font-size: 1.2rem;
    color: ${p => p.theme.textColorFaded};
    margin: 0;
    font-weight: 400;
`;

const InfoSection = styled.section`
    width: 100%;
    margin-bottom: 20px;
`;

const InfoCard = styled.div`
    background: ${p => p.theme.cardBackground};
    padding: 25px;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

    p {
        margin: 0 0 15px 0;
        text-align: center;
        line-height: 1.6;
    }

    a {
        color: ${p => p.theme.primaryColor};
        text-decoration: none;
        font-weight: 600;
        transition: all 0.2s ease;

        &:hover {
            color: ${p => p.theme.secondaryColor};
        }
    }
`;

const LinkBar = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 15px;
    font-size: 1rem;

    span {
        color: ${p => p.theme.textColorFaded};
    }

    a {
        color: ${p => p.theme.primaryColor};
        text-decoration: none;
        font-weight: 600;
        transition: all 0.2s ease;

        &:hover {
            color: ${p => p.theme.secondaryColor};
            transform: translateY(-2px);
        }
    }
`;

const ConfigSection = styled.section`
    width: 100%;
    margin-top: 40px;
`;

const SectionTitle = styled.h2`
    font-size: 1.8rem;
    font-weight: 600;
    text-align: center;
    margin-bottom: 20px;
    color: ${p => p.theme.textColor};
`;

const Footer = styled.footer`
    margin-top: 50px;
    text-align: center;
    padding: 20px;
    color: ${p => p.theme.textColorFaded};
    font-size: 0.9rem;

    p {
        margin: 0;
    }
`;

export default App;
