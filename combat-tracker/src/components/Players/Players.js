import React, { useState } from 'react';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { arrayMove, verticalListSortingStrategy, SortableContext, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const PlayerItem = ({ id, name, health, maxHealth, ac, handleHealthChange }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });
  const damageTaken = health < maxHealth ? maxHealth - health : 0;
  const healingReceived = health > maxHealth ? health - maxHealth : 0;

  return (
    <div
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
        display: 'flex',
        alignItems: 'center',
        padding: '8px 16px',
        background: 'white',
        borderRadius: '4px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        cursor: 'grab',
        width: '100%',
      }}
      {...attributes}
      {...listeners}
    >
      <div>
        <span>{name}</span>
        <div>
          <input
            type="number"
            min={0}
            value={health}
            onChange={(e) => handleHealthChange(id, e.target.value)}
          />
          / {maxHealth} HP{' '}
          {damageTaken > 0 && <span style={{ color: 'red' }}>(-{damageTaken})</span>}
          {healingReceived > 0 && <span style={{ color: 'green' }}>(+{healingReceived})</span>}
        </div>
        <div>AC: {ac}</div>
      </div>
    </div>
  );
};

const AddPlayerForm = ({ newPlayerName, setNewPlayerName, newPlayerMaxHealth, setNewPlayerMaxHealth, newPlayerAC, setNewPlayerAC, handleAddPlayer }) => {
  return (
    <div style={{ width: '100%', marginTop: '16px' }}>
      <input
        type="text"
        placeholder="New Player Name"
        value={newPlayerName}
        onChange={(e) => setNewPlayerName(e.target.value)}
      />
      <input
        type="number"
        min={1}
        placeholder="Max Health"
        value={newPlayerMaxHealth}
        onChange={(e) => setNewPlayerMaxHealth(e.target.value)}
      />
      <input
        type="number"
        min={1}
        placeholder="AC"
        value={newPlayerAC}
        onChange={(e) => setNewPlayerAC(e.target.value)}
      />
      <button onClick={handleAddPlayer}>Add Player</button>
    </div>
  );
};

const Player = () => {
  const [players, setPlayers] = useState([
    { id: '1', name: 'Player 1', health: 10, maxHealth: 10, ac: 16 },
    { id: '2', name: 'Player 2', health: 8, maxHealth: 10, ac: 14 },
    { id: '3', name: 'Player 3', health: 6, maxHealth: 10, ac: 18 },
  ]);
  const [newPlayerName, setNewPlayerName] = useState('');
  const [newPlayerMaxHealth, setNewPlayerMaxHealth] = useState(10);
  const [newPlayerAC, setNewPlayerAC] = useState(14);

  const handleDragEnd = ({ active, over }) => {
    if (active.id !== over.id) {
      setPlayers((players) => {
        const oldIndex = players.findIndex((item) => item.id === active.id);
        const newIndex = players.findIndex((item) => item.id === over.id);

        return arrayMove(players, oldIndex, newIndex);
      });
    }
  };

  const handleAddPlayer = () => {
    if (newPlayerName.trim()) {
      const newPlayer = {
        id: `${players.length + 1}`,
        name: newPlayerName.trim(),
        health: newPlayerMaxHealth,
        maxHealth: newPlayerMaxHealth,
        ac: newPlayerAC,
      };
      setPlayers([...players, newPlayer]);
      setNewPlayerName('');
      setNewPlayerMaxHealth(10);
      setNewPlayerAC(14);
    }
  };

  const handleHealthChange = (id, newHealth) => {
    setPlayers((players) =>
      players.map((player) =>
        player.id === id ? { ...player, health: Number(newHealth) } : player
      )
    );
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'flex-start', maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ maxWidth: '600px', width: '100%' }}>
        <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={players.map((player) => player.id)} strategy={verticalListSortingStrategy}>
            {players.map((player) => (
              <PlayerItem
                key={player.id}
                id={player.id}
                name={player.name}
                health={player.health}
                maxHealth={player.maxHealth}
                ac={player.ac}
                handleHealthChange={handleHealthChange}
              />
            ))}
          </SortableContext>
        </DndContext>
        <AddPlayerForm
          newPlayerName={newPlayerName}
          setNewPlayerName={setNewPlayerName}
          newPlayerMaxHealth={newPlayerMaxHealth}
          setNewPlayerMaxHealth={setNewPlayerMaxHealth}
          newPlayerAC={newPlayerAC}
          setNewPlayerAC={setNewPlayerAC}
          handleAddPlayer={handleAddPlayer}
        />
      </div>
    </div>
  );
};

export default Player;