import React, { useState, useEffect } from 'react';

function ScoreManager() {
  const [players, setPlayers] = useState([]);
  const [scoreInputs, setScoreInputs] = useState({});

  useEffect(() => {
    const savedPlayers = localStorage.getItem('players');
    if (savedPlayers) setPlayers(JSON.parse(savedPlayers));
  }, []);

  const addPlayer = () => {
    const newPlayer = { id: players.length + 1, name: `Người ${players.length + 1}`, score: 0 };
    const updatedPlayers = [...players, newPlayer];
    setPlayers(updatedPlayers);
    localStorage.setItem('players', JSON.stringify(updatedPlayers));
  };

  const updateScore = (id, delta) => {
    const updatedPlayers = players.map(player =>
      player.id === id ? { ...player, score: player.score + delta } : player
    );
    setPlayers(updatedPlayers);
    localStorage.setItem('players', JSON.stringify(updatedPlayers));
  };

  const handleScoreInput = (id, value) => {
    setScoreInputs({ ...scoreInputs, [id]: value });
  };

  const applyScoreUpdate = (id) => {
    const delta = parseInt(scoreInputs[id]) || 0;
    if (delta !== 0) {
      updateScore(id, delta);
      setScoreInputs({ ...scoreInputs, [id]: '' });
    }
  };

  return (
    <div className="card">
      <h2 className="card-title">Tính Điểm</h2>
      <button
        onClick={addPlayer}
        className="button button-green full-width"
      >
        Thêm Người Chơi
      </button>
      {players.map(player => (
        <div key={player.id} className="player-row">
          <span>{player.name}: {player.score}</span>
          <div className="flex-container">
            <input
              type="number"
              value={scoreInputs[player.id] || ''}
              onChange={(e) => handleScoreInput(player.id, e.target.value)}
              placeholder="Điểm"
              className="score-input"
            />
            <button
              onClick={() => applyScoreUpdate(player.id)}
              className="button button-blue"
            >
              Cập nhật
            </button>
            <button
              onClick={() => updateScore(player.id, 1)}
              className="button button-blue"
            >
              +1
            </button>
            <button
              onClick={() => updateScore(player.id, -1)}
              className="button button-red"
            >
              -1
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ScoreManager;