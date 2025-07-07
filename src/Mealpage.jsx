import { useEffect, useState } from 'react';

function Mealpage() {

  const today = new Date().toISOString().split('T')[0];

  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDate, setSelectedDate] = useState(today);

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const getMeals = async () => {
    const response = await fetch(`https://open.neis.go.kr/hub/mealServiceDietInfo?KEY=bdb16532a0f741eea4a3c43108cbbd1c&Type=json&ATPT_OFCDC_SC_CODE=B10&SD_SCHUL_CODE=7010178&MLSV_YMD=${selectedDate.replace(/-/g, '')}`);
    const data = await response.json();
    return data;
  }

  const fetchdata = async () => {
    let fetchMeal = [];
    try {
      setLoading(true);
      fetchMeal = await getMeals();
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
      const mealList = fetchMeal?.mealServiceDietInfo?.[1]?.row || [];
      setMeals(mealList);
    }


  useEffect(() => {
    fetchdata();
  }, [selectedDate]);

  if (loading) return <p>불러오는 중...</p>;

  if (error) return <p>{error.message}</p>

  return (
    <div>
      <h1>급식 보기</h1>
      <h2>오늘의 급식</h2>

      {/* 날짜 선택 UI */}
      <label>
        날짜 선택:
        <input
          type="date"
          value={selectedDate}  // 수정된 변수 이름
          onChange={handleDateChange}
        />
      </label>

      {/* 급식메뉴출력 */}
      
      {meals.length > 0 ? (
        meals.map((meal, idx) => (
          <div key={idx}>
            <p>{meal.MMEAL_SC_NM}</p>
            <pre>{meal.DDISH_NM.replace(/<br\/>/g, '\n')}</pre>
          </div>
        ))
      ) : (
        <p>선택한 날짜의 급식이 없습니다.</p>
      )}
    </div>
  );
}

export default Mealpage;



