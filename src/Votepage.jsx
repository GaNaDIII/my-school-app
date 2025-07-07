import RecomandationBar from "./RecomandationBar";

function Votepage () {
    const subject = [
    {id: '01', title: '미적분'},
    {id: '02', title: '확률과 통계'},
    {id: '03', title: '물리학1'},
    {id: '04', title: '화학1'},
    {id: '05', title: '생명과학1'},]

    return (
        <div>
            <h1>선택과목 투표하기</h1>
            {subject.map((subject) => (
                <div key={subject.id}>
                    <RecomandationBar subject={subject}/>
                </div>
            ))}
        </div>
    )

}

export default Votepage;