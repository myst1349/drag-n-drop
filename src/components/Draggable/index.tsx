import React, {useState, useRef, useEffect, useCallback} from 'react';
import classNames from 'classnames';

import DraggableControls from './components/DraggableControls';

import noop from '../../helpers/noop';
import {IDraggableProps} from './types/draggable';

import styles from './draggable.module.css';

const Draggable: React.FC<IDraggableProps> = (props) => {
  const {className, params, onDragStartCb = noop, onDragEndCb = noop, onSaveCb = noop} = props;
  const draggableRef = useRef<HTMLDivElement>(null);

  const [noteParams, setNoteParams] = useState(params);
  const [isDraggable, setIsDraggable] = useState(false);
  const [cursorShift, setCursorShift] = useState({top: 0, left: 0});

  useEffect(() => {
    save();
  }, [noteParams]);

  const getNewPosition = (parentElem, currentElem) => {
    const top = currentElem.top - parentElem.offsetTop - cursorShift.top;
    const left = currentElem.left - parentElem.offsetLeft - cursorShift.left;

    return {top, left};
  };

  const incrementIndex = () => {
    setNoteParams((prevState) => ({...prevState, zIndex: prevState.zIndex + 2}));
  };

  const decrementIndex = () => {
    if (noteParams.zIndex > 1) {
      setNoteParams((prevState) => ({...prevState, zIndex: prevState.zIndex - 2}));
    }
  };

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    const rect = e.target.getBoundingClientRect();
    const shiftX = e.clientX - rect.left;
    const shiftY = e.clientY - rect.top;

    setCursorShift({left: shiftX, top: shiftY});
    onDragStartCb && onDragStartCb(params.id, e);
  };

  const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
    const parentDroppableOffset = e.currentTarget.offsetParent;

    if (parentDroppableOffset) {
      const {top, left} = getNewPosition(parentDroppableOffset, {top: e.clientY, left: e.clientX});
      setNoteParams((prevState) => ({...prevState, top, left}));
      setIsDraggable(false);
    }

    onDragEndCb && onDragEndCb(e);
  };

  const handleBlur = (e) => {
    const text = e.target.innerText;

    setNoteParams((prevState) => ({...prevState, text: text}));
  };

  const save = () => {
    onSaveCb && onSaveCb(noteParams);
  };

  const draggableStyles = {
    width: `${noteParams.width}px`,
    height: `${noteParams.height}px`,
    top: `${noteParams.top}px`,
    left: `${noteParams.left}px`,
    backgroundColor: noteParams.color,
    zIndex: noteParams.zIndex,
  };

  return (
    <div
      ref={draggableRef}
      className={classNames(styles.wrapper, className)}
      style={{...draggableStyles}}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      draggable={isDraggable}>
      <DraggableControls enableDragging={setIsDraggable} bringToFront={incrementIndex} bringToBack={decrementIndex} />
      <div className={styles.content} onBlur={handleBlur} contentEditable suppressContentEditableWarning>
        {noteParams.text || 'Drag me'}
      </div>
    </div>
  );
};

export default Draggable;
