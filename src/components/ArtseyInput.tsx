import randomWords from "random-words";
import styled from "styled-components";
import React, { FC, useEffect, useRef, useState } from 'react';
import { faSync } from '@fortawesome/free-solid-svg-icons';

import IconButton from './IconButton';
import useKeyMapper from '../effects/KeyMapperEffect';
import { KeyMapDefinition } from '../model/KeyMapDefinition';
import StatsDisplay from './StatsDisplay';
import VisualKeyboard from './VisualKeyboard';

interface ArtseyInputComponentProps {
    keymap: KeyMapDefinition;
    keyTimeout: number;
}

export const ArtseyInput: FC<ArtseyInputComponentProps> = (props: ArtseyInputComponentProps) => {
    const wordDivRef = useRef<HTMLDivElement>(null);

    const [isFocused, setFocused] = useState(false);
    const [keyQueue, setKeyQueue] = useState<Array<React.KeyboardEvent<HTMLInputElement>>>([]);
    const [activeKeys, setActiveKeys] = useState<Set<string>>(new Set());

    const [caretPos, setCaretPos] = useState(0);
    const [wordList, setWordList] = useState<Array<string>>(randomWords(25));
    const [enteredKeys, setEnteredKeys] = useState<Array<string>>([]);
    
    // Statistics
    const [wordsTyped, setWordsTyped] = useState(0);
    const [correctWords, setCorrectWords] = useState(0);
    const [currentStreak, setCurrentStreak] = useState(0);
    
    const getArtseyValue = useKeyMapper(props.keymap);

    useEffect(() => reset(), []);        
    useEffect(() => {
        const interval = setInterval(() => {
            if(keyQueue.length !== 0) {
                let joinedWordList = wordList.join(" ");
                let artsyKey = getArtseyValue(keyQueue);

                if(artsyKey === "Backspace" && enteredKeys.length > 0) {
                    setEnteredKeys(prev => [...prev.slice(0, prev.length - 1)]);
                    setCaretPos(caretPos - 1);
                }
                else if(
                    artsyKey !== undefined && artsyKey !== "Backspace"
                    && ((joinedWordList.split("")[caretPos] === " " && artsyKey === "Space") || joinedWordList.split("")[caretPos] !== " ")
                ) {
                        setEnteredKeys(prev => [...prev, artsyKey as string]);
                        setCaretPos(caretPos + 1);
                        
                        // Check if word is complete
                        if (artsyKey === "Space" || joinedWordList.split("")[caretPos + 1] === " " || caretPos + 1 >= joinedWordList.length) {
                            checkWordCompletion();
                        }
                }                
                setKeyQueue([]);
                setActiveKeys(new Set());
            }
        }, props.keyTimeout);
        return () => clearInterval(interval);
    }, [keyQueue, enteredKeys, caretPos, getArtseyValue, wordList, props.keyTimeout]);

    const checkWordCompletion = () => {
        let joinedWordList = wordList.join(" ");
        let wordStart = joinedWordList.lastIndexOf(" ", caretPos - 1) + 1;
        let wordEnd = caretPos;
        let targetWord = joinedWordList.substring(wordStart, wordEnd).trim();
        let typedWord = enteredKeys.slice(wordStart, wordEnd).join("").trim();
        
        if (targetWord.length > 0 && typedWord.length > 0) {
            setWordsTyped(prev => prev + 1);
            if (targetWord === typedWord) {
                setCorrectWords(prev => prev + 1);
                setCurrentStreak(prev => prev + 1);
            } else {
                setCurrentStreak(0);
            }
        }
    };

    const reset = () => {
        setEnteredKeys([]);
        setKeyQueue([]);
        setCaretPos(0);
        setWordList(randomWords(25));
        setWordsTyped(0);
        setCorrectWords(0);
        setCurrentStreak(0);
        setActiveKeys(new Set());
        wordDivRef.current?.focus();
    }

    const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        setActiveKeys(prev => new Set(Array.from(prev).concat(e.key)));
    }

    const onKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
        setKeyQueue(oldArray => [...oldArray, e]);
        e.preventDefault();
    }

    const generateWordListElements = (): Array<JSX.Element> => {
        let pos = 0;
        let caretDiv = <div id="caret" key="caret"></div>;
        let words = wordList.map((w, idxw) => {
            let wordDiv = <div className="word" key={ idxw }>
                { w.split("").map((c, idxc) => {
                    let caret = pos === caretPos ? caretDiv : undefined;
                    let ele = enteredKeys.length - 1 >= pos
                        ? <div className={ enteredKeys[pos] === c ? "letter correct" : "letter wrong" } key={ idxc }>{c}</div>
                        : <div className="letter" key={ idxc }>{c}</div>;
                    pos++;
                    return caret !== undefined ? [caret, ele] : [ele];
                })}
                { pos === caretPos && caretDiv }
                <div className="space"></div>
            </div>
            pos++;
            return wordDiv;
        });
        return words;
    }

    return (
        <StyledArtseyInput>
            <VisualKeyboard keymap={props.keymap} activeKeys={activeKeys} />
            <StatsDisplay 
                wordsTyped={wordsTyped}
                correctWords={correctWords}
                totalWords={wordList.length}
                currentStreak={currentStreak}
            />
            <div id="word-list" tabIndex={0} onFocus={ () => setFocused(true) } onBlur={ () => setFocused(false) } onKeyDown={ onKeyDown } onKeyUp={ onKeyUp } ref={ wordDivRef }>
                { !isFocused && <div id="focus-message"><p>Click here to start typing</p></div> }
                { generateWordListElements() }
            </div>
            <BottomBar>
                <small id="keycode-monitor">Last: { enteredKeys.length !== 0 ? enteredKeys[enteredKeys.length - 1] : "NONE" }</small>
                <IconButton icon={faSync} onClick={ reset } tooltip="Reset test" />
            </BottomBar>
        </StyledArtseyInput>
    );
}

const StyledArtseyInput = styled.div`
    display:flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    align-content: stretch;
    align-items: stretch;
    margin: 40px 0;

    #word-list {
        position: relative;
        font-size: 1.5rem;
        display: flex;
        flex-wrap: wrap;
        outline: 0;
        -webkit-user-select: none; /* Safari */        
        -moz-user-select: none; /* Firefox */
        -ms-user-select: none; /* IE10+/Edge */
        user-select: none; /* Standard */
        padding: 30px;
        background: ${p => p.theme.cardBackground};
        border-radius: 12px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        min-height: 200px;
        transition: all 0.3s ease;

        @media (max-width: 768px) {
            font-size: 1.2rem;
            padding: 20px;
            min-height: 150px;
        }

        &:focus {
            box-shadow: 0 4px 16px rgba(0, 104, 180, 0.2);
            border: 2px solid ${p => p.theme.primaryColor};
        }
    }

    #caret {
        display: block;
        width: 0px;
        border: 2px solid ${ p => p.theme.cursorColor };
        animation: blinker 1.5s linear infinite;
        margin-top: 5px;
    }

    @keyframes blinker {
        50% {
            opacity: 0;
        }
    }

    #focus-message {
        position: absolute;
        width: 100%;
        height: 100%;
        text-align: center;
        background: rgba(0, 0, 0, 0.05);
        backdrop-filter: blur(4px);
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 12px;

        p { 
            font-weight: 600;
            color: ${p => p.theme.textColor};
            font-size: 1.3rem;
        }
    }

    .word {
        display: flex;
        margin-right: 10px;
        color: ${ p => p.theme.textColorFaded };
    }

    .correct { 
        color: ${ p => p.theme.textColor };
    }
    
    .wrong { 
        color: ${ p => p.theme.colorRed };
        background: rgba(255, 74, 74, 0.1);
        border-radius: 3px;
    }
`;

const BottomBar = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 15px;
    width: 100%;

    #keycode-monitor {
        text-align: left;
        font-weight: bold;
        color: ${ p => p.theme.textColorFaded };
    }
`;

export default ArtseyInput;