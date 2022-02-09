import React, {useEffect, useState} from 'react';

import CreateNoteForm from './components/CreateNoteForm';
import Droppable from '../../components/Droppable';
import Draggable from '../../components/Draggable';

import {defaultNoteParams, defaultMouseCoords} from './constants/notes.constants';
import {IDraggableParams} from '../../components/Draggable/types/draggable.types';

import styles from './notes.module.css';

const Notes: React.FC = () => {
  const [draggables, setDraggables] = useState<Array<IDraggableParams> | any[]>([]);
  const [newNoteParams, setNewNoteParams] = useState(defaultNoteParams);
  const [draggingElementId, setDraggingElementId] = useState(null);
  const [mouseCoords, setMouseCoords] = useState(defaultMouseCoords);

  useEffect(() => {
    const restoredDraggables = JSON.parse(localStorage.getItem('draggables'));

    setDraggables(restoredDraggables);
  }, []);

  useEffect(() => {
    localStorage.setItem('draggables', JSON.stringify(draggables));
  }, [draggables]);

  useEffect(() => {
    if (mouseCoords.isCalculated) {
      const {width, height} = getNoteSizeFromMouseCoords();
      addDraggable({...newNoteParams, width, height, top: mouseCoords.top, left: mouseCoords.left});
    }
  }, [mouseCoords]);

  const getNoteSizeFromMouseCoords = () => {
    return {
      width: Math.abs(mouseCoords.endX - mouseCoords.startX),
      height: Math.abs(mouseCoords.endY - mouseCoords.startY),
    };
  };

  const addDraggable = (params) => {
    const maxId = draggables.reduce(
      (prev: number, current: IDraggableParams) => (+current.id > prev ? +current.id : prev),
      0,
    );

    setDraggables([...draggables, {...params, id: maxId + 1}]);
    setMouseCoords(defaultMouseCoords);
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
    addDraggable(newNoteParams);
  };

  const handleMouseDown = (e) => {
    const top = e.pageY - e.target.offsetTop;
    const left = e.pageX - e.target.offsetLeft;
    const newMouseCoords = {
      startX: e.clientX,
      startY: e.clientY,
      top,
      left,
    };

    setMouseCoords({...mouseCoords, ...newMouseCoords});
  };

  const handleMouseUp = (e) => {
    const mouseMovedInOppositeDirectionByY = mouseCoords.startY > e.clientY;
    const mouseMovedInOppositeDirectionByX = mouseCoords.startX > e.clientX;
    const newMouseCoords = {
      endX: e.clientX,
      endY: e.clientY,
      isCalculated: true,
    };

    if (mouseMovedInOppositeDirectionByY) {
      newMouseCoords.top = e.pageY - e.target.offsetTop;
    }
    if (mouseMovedInOppositeDirectionByX) {
      newMouseCoords.left = e.pageX - e.target.offsetLeft;
    }

    setMouseCoords({...mouseCoords, ...newMouseCoords});
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
        <Droppable className={styles.droppable} onMouseDownCb={handleMouseDown} onMouseUpCb={handleMouseUp}>
          {renderDraggables()}
        </Droppable>
        <Droppable className={styles.trashBin} onDropCb={deleteDraggable}>
          <span>Move Here To Delete</span>
        </Droppable>
      </div>
    </>
  );
};

export default Notes;
