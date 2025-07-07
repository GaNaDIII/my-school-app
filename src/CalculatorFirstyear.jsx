import jStat from 'jstat';

function CalculatorFirstyear({mean, std}) {
    const min = 0;
    const max = 100;

    const phi = (x) => jStat.normal.cdf(x, 0, 1);
    const inversePhi = (p) => jStat.normal.inv(p, 0, 1);

    const alpha = (min - mean) / std;
    const beta = (max - mean) / std;

    const firstRating = 0.90;
    const secondRating = 0.80;
    const thirdRating = 0.70;

    const clamp = (val) => Math.max(0, Math.min(1, val));

    const Z = phi(beta) - phi(alpha);

    const adjstedFirst = clamp(phi(alpha) + firstRating*Z);
    const adjstedSecond = clamp(phi(alpha) + secondRating*Z);
    const adjstedThird = clamp(phi(alpha) + thirdRating*Z);

    const firstZ = inversePhi(adjstedFirst, 0, 1);
    const secondZ = inversePhi(adjstedSecond, 0, 1);
    const thirdZ = inversePhi(adjstedThird, 0, 1);

    const firstScore = mean + firstZ*std;
    const secondScore = mean + secondZ*std;
    const thirdScore = mean + thirdZ*std;

    if (!mean || !std || isNaN(mean) || isNaN(std) || std === 0) {
        return <p>유효한 평균과 표준편차를 입력해주세요.</p>;
    }

    return (
        <div>
            <p>1등급: {firstScore.toFixed(2)}</p>
            <p>2등급: {secondScore.toFixed(2)}</p>
            <p>3등급: {thirdScore.toFixed(2)}</p>
        </div>
    )
}


export default CalculatorFirstyear;