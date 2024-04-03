import React, { useState } from 'react';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { arrayMove, verticalListSortingStrategy, SortableContext, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const PlayerItem = ({ id, name }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

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
      }}
      {...attributes}
      {...listeners}
    >
      {name}
    </div>
  );
};

const Player = () => {
  const [players, setPlayers] = useState([
    { id: '1', name: 'Player 1' },
    { id: '2', name: 'Player 2' },
    { id: '3', name: 'Player 3' },
  ]);

  const handleDragEnd = ({ active, over }) => {
    if (active.id !== over.id) {
      setPlayers((players) => {
        const oldIndex = players.findIndex((item) => item.id === active.id);
        const newIndex = players.findIndex((item) => item.id === over.id);

        return arrayMove(players, oldIndex, newIndex);
      });
    }
  };

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={players.map((player) => player.id)} strategy={verticalListSortingStrategy}>
        {players.map((player) => (
          <PlayerItem key={player.id} id={player.id} name={player.name} />
        ))}
      </SortableContext>
    </DndContext>
  );
};

export default Player;