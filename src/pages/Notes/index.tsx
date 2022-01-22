import React, {useEffect, useState} from 'react';

import Droppable from '../../components/Droppable';
import Draggable from '../../components/Draggable';

import {IDraggableParams} from '../../components/Draggable/types/draggable';

import styles from './notes.module.css';
import CreateNoteForm from './components/CreateNoteForm';

const Notes: React.FC = () => {
  const initialNoteParams = {
    id: 1,
    width: 200,
    height: 150,
    color: '#ffef8e',
    top: 10,
    left: 10,
    text: '',
    zIndex: 1,
  };

  const [draggables, setDraggables] = useState<Array<IDraggableParams> | any[]>([]);
  const [newNoteParams, setNewNoteParams] = useState(initialNoteParams);
  const [draggingElementId, setDraggingElementId] = useState(null);

  useEffect(() => {
    const restoredDraggables = JSON.parse(localStorage.getItem('draggables'));
    setDraggables(restoredDraggables);
  }, []);

  useEffect(() => {
    let autoSave = setInterval(() => {
      localStorage.setItem('draggables', JSON.stringify(draggables));
    }, 3000);

    // Cleanup on Unmount
    return () => {
      localStorage.setItem('draggables', JSON.stringify(draggables));
      clearInterval(autoSave);
    };
  }, [draggables]);

  const addDraggable = () => {
    const maxId = draggables.reduce(
      (prev: number, current: IDraggableParams) => (+current.id > prev ? +current.id : prev),
      0,
    );

    setDraggables([...draggables, {...newNoteParams, id: maxId + 1}]);
  };

  const deleteDraggable = () => {
    setDraggables((prevState) => prevState.filter((item) => item.id !== draggingElementId));
  };

  const updateDraggables = (updatedItem) => {
    const updatedDraggables = draggables.map((item) => (item.id === updatedItem.id ? updatedItem : item));

    setDraggables([...updatedDraggables]);
  };

  const handleInputChange = (name: string, value: string) => {
    setNewNoteParams((prevState) => ({...prevState, [name]: value}));
  };

  const handleSubmit = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    addDraggable();
  };

  const renderDraggables = () => {
    return draggables.map((draggable) => (
      <Draggable
        key={draggable.id}
        className={styles.draggable}
        params={draggable}
        onDragStartCb={(id) => {
          setDraggingElementId(id);
        }}
        onDragEndCb={() => {
          setDraggingElementId(null);
        }}
        onSaveCb={(item) => {
          updateDraggables(item);
        }}
      />
    ));
  };

  return (
    <>
      <CreateNoteForm onChangeCb={handleInputChange} onSubmitCb={handleSubmit} />
      <div className={styles.droppableWrapper}>
        <Droppable className={styles.droppable}>{renderDraggables()}</Droppable>
        <Droppable className={styles.trashBin} onDropCb={deleteDraggable}>
          <span>Move Here To Delete</span>
        </Droppable>
      </div>
    </>
  );
};

export default Notes;
