import React, { useState } from 'react';
import DiceRoller from './DiceRoller';
import Wheel from './Wheel';
import ScoreManager from './ScoreManager';
import RandomDraw from './RandomDraw';

function App() {
  const [activeTab, setActiveTab] = useState('dice');

  return (
    <div className="container">
      <h1 className="title">Random Tools</h1>
      <div className="tab-buttons">
        <button
          className={`tab-button ${activeTab === 'dice' ? 'active' : ''}`}
          onClick={() => setActiveTab('dice')}
        >
          Tung Xúc Xắc
        </button>
        <button
          className={`tab-button ${activeTab === 'wheel' ? 'active' : ''}`}
          onClick={() => setActiveTab('wheel')}
        >
          Vòng Quay
        </button>
        <button
          className={`tab-button ${activeTab === 'score' ? 'active' : ''}`}
          onClick={() => setActiveTab('score')}
        >
          Tính Điểm
        </button>
        <button
          className={`tab-button ${activeTab === 'random' ? 'active' : ''}`}
          onClick={() => setActiveTab('random')}
        >
          Bóc Thăm
        </button>
      </div>
      {activeTab === 'dice' && <DiceRoller />}
      {activeTab === 'wheel' && <Wheel />}
      {activeTab === 'score' && <ScoreManager />}
      {activeTab === 'random' && <RandomDraw />}
    </div>
  );
}

export default App;