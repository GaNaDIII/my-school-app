import { useState, useEffect } from 'react';
import './RecomandationBar.css'

function RecomandationBar ({ subject }) {
    const [counts, setCounts] = useState({good: 0, bad: 0});

    const total = counts.good + counts.bad;
    const goodRatio = total === 0 ? 50 : (counts.good / total) * 100;
    const badRatio = 100 - goodRatio;

    const handleChoice = (choice) => {
        
        const newCounts = {
            ...counts,
            [choice]: counts[choice] + 1
        };
        setCounts(newCounts);
        localStorage.setItem(`recommed-${subject.title}`, JSON.stringify(newCounts))
    }

    useEffect(() => {
        const saveCount =  JSON.parse(localStorage.getItem(`recommed-${subject.title}`)) || {good : 0, bad: 0};
        setCounts(saveCount);
    }, [subject]);

    return (
        <div>
            <h2>{subject.title}</h2>
            <button onClick={() => handleChoice("good")}>추천</button>
            <p>추천 {counts.good}</p>
            <button onClick={() => handleChoice("bad")}>비추천</button>
            <p>비추천 {counts.bad}</p>
            <div className='bar-container'>
                <div 
                className='bar-good'
                style={{ width: `${goodRatio}%`}}/>
                <div 
                className='bar-bad'
                style={{ width: `${badRatio}%`}}/>
            </div>
        </div>
        
    )
}

export default RecomandationBar;