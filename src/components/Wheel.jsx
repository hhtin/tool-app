import React, { useState, useEffect } from 'react';

function Wheel() {
  const [names, setNames] = useState('');
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState(null);

  useEffect(() => {
    const savedNames = localStorage.getItem('wheelNames');
    if (savedNames) setNames(savedNames);
  }, []);

  const spin = () => {
    const nameList = names.split('\n').filter(name => name.trim());
    if (nameList.length === 0) return;
    setSpinning(true);
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * nameList.length);
      setResult(nameList[randomIndex]);
      setSpinning(false);
    }, 2000);
  };

  const handleNamesChange = (e) => {
    const value = e.target.value;
    setNames(value);
    localStorage.setItem('wheelNames', value);
  };

  return (
    <div className="card">
      <h2 className="card-title">Vòng Quay May Mắn</h2>
      <textarea
        value={names}
        onChange={handleNamesChange}
        placeholder="Nhập tên, mỗi dòng một tên"
        className="textarea"
        rows="5"
      />
      <button
        onClick={spin}
        disabled={spinning}
        className={`button full-width ${spinning ? 'button-gray' : 'button-blue'}`}
      >
        {spinning ? 'Đang quay...' : 'Quay'}
      </button>
      {result && (
        <div className="result">
          <h3 className="result-title">Kết quả:</h3>
          <p className="result-text">{result}</p>
        </div>
      )}
    </div>
  );
}

export default Wheel;