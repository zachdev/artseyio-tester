import styled from "styled-components";
import { FC } from 'react';

interface StatsDisplayProps {
    wordsTyped: number;
    correctWords: number;
    totalWords: number;
    currentStreak: number;
}

export const StatsDisplay: FC<StatsDisplayProps> = ({ wordsTyped, correctWords, totalWords, currentStreak }) => {
    const accuracy = wordsTyped > 0 ? Math.round((correctWords / wordsTyped) * 100) : 0;
    const progress = totalWords > 0 ? Math.round((wordsTyped / totalWords) * 100) : 0;

    return (
        <StyledStats>
            <StatItem>
                <StatLabel>Progress</StatLabel>
                <StatValue>{wordsTyped}/{totalWords}</StatValue>
                <ProgressBar>
                    <ProgressFill style={{ width: `${progress}%` }} />
                </ProgressBar>
            </StatItem>
            <StatItem>
                <StatLabel>Accuracy</StatLabel>
                <StatValue className={accuracy >= 90 ? 'good' : accuracy >= 70 ? 'medium' : 'low'}>
                    {accuracy}%
                </StatValue>
            </StatItem>
            <StatItem>
                <StatLabel>Correct</StatLabel>
                <StatValue className="good">{correctWords}</StatValue>
            </StatItem>
            <StatItem>
                <StatLabel>Streak</StatLabel>
                <StatValue className={currentStreak > 0 ? 'good' : ''}>{currentStreak}</StatValue>
            </StatItem>
        </StyledStats>
    );
};

const StyledStats = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
    gap: 15px;
    padding: 20px;
    background: ${p => p.theme.cardBackground};
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    margin: 20px 0;

    @media (max-width: 768px) {
        grid-template-columns: repeat(2, 1fr);
        gap: 10px;
        padding: 15px;
    }
`;

const StatItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 5px;
`;

const StatLabel = styled.div`
    font-size: 0.85rem;
    color: ${p => p.theme.textColorFaded};
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.5px;
`;

const StatValue = styled.div`
    font-size: 1.8rem;
    font-weight: bold;
    color: ${p => p.theme.textColor};

    &.good {
        color: ${p => p.theme.colorGreen};
    }

    &.medium {
        color: ${p => p.theme.colorBlue};
    }

    &.low {
        color: ${p => p.theme.colorRed};
    }
`;

const ProgressBar = styled.div`
    width: 100%;
    height: 6px;
    background: ${p => p.theme.borderColor};
    border-radius: 3px;
    overflow: hidden;
    margin-top: 5px;
`;

const ProgressFill = styled.div`
    height: 100%;
    background: linear-gradient(90deg, ${p => p.theme.primaryColor}, ${p => p.theme.secondaryColor});
    transition: width 0.3s ease;
    border-radius: 3px;
`;

export default StatsDisplay;
