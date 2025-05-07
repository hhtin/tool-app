import React, { useState, useEffect } from 'react';

function RandomDraw() {
  const [randomList, setRandomList] = useState('');
  const [randomResult, setRandomResult] = useState(null);
  const [originalList, setOriginalList] = useState('');

  useEffect(() => {
    const savedRandomList = localStorage.getItem('randomList');
    if (savedRandomList) {
      setRandomList(savedRandomList);
      setOriginalList(savedRandomList);
    }
  }, []);

  const drawRandom = () => {
    const items = randomList.split('\n').filter(item => item.trim());
    if (items.length === 0) return;
    const randomIndex = Math.floor(Math.random() * items.length);
    const selected = items[randomIndex];
    setRandomResult(selected);
    const newList = items.filter((_, idx) => idx !== randomIndex).join('\n');
    setRandomList(newList);
    localStorage.setItem('randomList', newList);
  };

  const resetRandom = () => {
    setRandomList(originalList);
    setRandomResult(null);
    localStorage.setItem('randomList', originalList);
  };

  const handleRandomListChange = (e) => {
    const value = e.target.value;
    setRandomList(value);
    setOriginalList(value);
    localStorage.setItem('randomList', value);
  };

  return (
    <div className="card">
      <h2 className="card-title">Bóc Thăm Ngẫu Nhiên</h2>
      <textarea
        value={randomList}
        onChange={handleRandomListChange}
        placeholder="Nhập danh sách, mỗi dòng một mục"
        className="textarea"
        rows="5"
      />
      <div className="flex-container">
        <button
          onClick={drawRandom}
          className="button button-blue"
        >
          Bóc Thăm
        </button>
        <button
          onClick={resetRandom}
          className="button button-gray"
        >
          Reset
        </button>
      </div>
      {randomResult && (
        <div className="result">
          <h3 className="result-title">Kết quả:</h3>
          <p className="result-text">{randomResult}</p>
        </div>
      )}
    </div>
  );
}

export default RandomDraw;