import React, { useState } from 'react';

function DiceRoller() {
  const [dices, setDices] = useState([{ id: 1, sides: 6, result: null }]);
  const [history, setHistory] = useState([]);

  const addDice = () => {
    setDices([...dices, { id: dices.length + 1, sides: 6, result: null }]);
  };

  const removeDice = (id) => {
    setDices(dices.filter(dice => dice.id !== id));
  };

  const updateSides = (id, sides) => {
    setDices(dices.map(dice => dice.id === id ? { ...dice, sides: parseInt(sides) || 6 } : dice));
  };

  const rollDice = () => {
    const results = dices.map(dice => ({
      ...dice,
      result: Math.floor(Math.random() * dice.sides) + 1
    }));
    setDices(results);
    setHistory([...history, results.map(d => d.result)]);
  };

  return (
    <div className="card">
      <h2 className="card-title">Tung Xúc Xắc</h2>
      {dices.map(dice => (
        <div key={dice.id} className="dice-row">
          <input
            type="number"
            min="2"
            value={dice.sides}
            onChange={(e) => updateSides(dice.id, e.target.value)}
            className="input-number"
          />
          <span>mặt: {dice.result || '-'}</span>
          <button
            onClick={() => removeDice(dice.id)}
            className="button button-red"
            disabled={dices.length === 1}
          >
            Xóa
          </button>
        </div>
      ))}
      <div className="flex-container">
        <button onClick={addDice} className="button button-green">
          Thêm Xúc Xắc
        </button>
        <button onClick={rollDice} className="button button-blue">
          Tung
        </button>
      </div>
      <div className="history">
        <h3 className="history-title">Lịch sử:</h3>
        <ul className="history-list">
          {history.map((result, idx) => (
            <li key={idx}>{result.join(', ')}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default DiceRoller;