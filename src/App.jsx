import { useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Mealpage from './Mealpage';
import Calculator from './Calculator';
import CalculatorFirstyear from './CalculatorFirstyear';
import Votepage from './Votepage';

function App() {
    const [mean, setMean] = useState("");
    const [std, setStd] = useState("");

    const [mean1, setMean1] = useState("");
    const [std1, setStd1] = useState("");
    
    const handleMeanChange = (e) => {
        const meanValue = e.target.value;
        setMean(meanValue === "" ? "" : Number(meanValue));
    }

    const handleStdChange = (e) => {
        const stdValue = e.target.value;
        setStd(stdValue === "" ? "" : Number(stdValue));
    }

    const handleMean1Change = (e) => {
        const meanValue = e.target.value;
        setMean1(meanValue === "" ? "" : Number(meanValue));
    }

    const handleStd1Change = (e) => {
        const stdValue = e.target.value;
        setStd1(stdValue === "" ? "" : Number(stdValue));
    }

    return (
    <BrowserRouter>
    <nav>
        <Link to="/">홈</Link> | <Link to="/vote">선택과목 투표하기</Link> | <Link to='/nine'>등급 계산기 바로가기(9등급제)</Link> | <Link to="/five">등급 계산기 바로가기(5등급제)</Link>
    </nav>

    <Routes>
        <Route path='/' element={
            <div>
                <Mealpage />
            </div>} />
        <Route path='/nine' element={
            <div>
                <h2>등급 계산기(9등급제 기준)</h2>
                <p>정규분포 기준, 실제 등급컷과 다를 수 있음 주의</p>
                <p>특히 수강인원이 매우 적은 과목의 경우, 등급컷이 다를 수도 있습니다</p>
                <div>
                    <input type="number" placeholder="평균" value={mean} onChange={handleMeanChange} min={1} max={100} />
                    <input type="number" placeholder="표준편차" value={std} onChange={handleStdChange} min={1} max={100}/>
                </div>
                <Calculator mean={mean} std={std}/>
            </div>}/>
        <Route path='/five' element={
            <div>
                <h2>등급 계산기(5등급제 기준)</h2>
                <p>정규분포 기준, 실제 등급컷과 다를 수 있음 주의</p>
                <p>특히 수강인원이 매우 적은 과목의 경우, 등급컷이 다를 수도 있습니다</p>
                <div>
                    <input type="number" placeholder="평균" value={mean1} onChange={handleMean1Change} min={0} max={100}/>
                    <input type="number" placeholder='표준편차' value={std1} onChange={handleStd1Change} min={0} max={100}/>
                </div>
                <CalculatorFirstyear mean={mean1} std={std1}/>
            </div>}
            />
        <Route path='/vote' element={<Votepage/>}/>
    </Routes>
    </BrowserRouter>
    )
}1                      

export default App;