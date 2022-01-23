import React, {useEffect, useState} from 'react';

import CreateNoteForm from './components/CreateNoteForm';
import Droppable from '../../components/Droppable';
import Draggable from '../../components/Draggable';

import {defaultNoteParams} from './constants/notes.constants';
import {IDraggableParams} from '../../components/Draggable/types/draggable.types';

import styles from './notes.module.css';

const Notes: React.FC = () => {
  const [draggables, setDraggables] = useState<Array<IDraggableParams> | any[]>([]);
  const [newNoteParams, setNewNoteParams] = useState(defaultNoteParams);
  const [draggingElementId, setDraggingElementId] = useState(null);

  useEffect(() => {
    const restoredDraggables = JSON.parse(localStorage.getItem('draggables'));

    setDraggables(restoredDraggables);
  }, []);

  useEffect(() => {
    localStorage.setItem('draggables', JSON.stringify(draggables));
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
