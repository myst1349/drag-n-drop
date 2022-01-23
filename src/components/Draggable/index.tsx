import React, {useState, useEffect} from 'react';
import classNames from 'classnames';

import DraggableControls from './components/DraggableControls';

import noop from '../../helpers/noop';
import {IDraggableProps} from './types/draggable.types';

import styles from './draggable.module.css';

const Draggable: React.FC<IDraggableProps> = (props) => {
  const {className, params, onDragStartCb = noop, onDragEndCb = noop, onSaveCb = noop} = props;

  const [elParams, setElParams] = useState(params);
  const [isDraggable, setIsDraggable] = useState(false);
  const [cursorShift, setCursorShift] = useState({top: 0, left: 0});

  useEffect(() => {
    save();
  }, [elParams]);

  const incrementIndex = () => {
    setElParams((prevState) => ({...prevState, zIndex: prevState.zIndex + 2}));
  };

  const decrementIndex = () => {
    if (elParams.zIndex > 1) {
      setElParams((prevState) => ({...prevState, zIndex: prevState.zIndex - 2}));
    }
  };

  const getNewPosition = (parentElem, currentElem) => {
    const top = currentElem.top - parentElem.offsetTop - cursorShift.top;
    const left = currentElem.left - parentElem.offsetLeft - cursorShift.left;

    return {top, left};
  };

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    const rect = e.target.getBoundingClientRect();
    const shiftX = e.clientX - rect.left;
    const shiftY = e.clientY - rect.top;

    setCursorShift({left: shiftX, top: shiftY});
    onDragStartCb && onDragStartCb(elParams.id);
  };

  const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
    const parentDroppableOffset = e.currentTarget.offsetParent;

    if (parentDroppableOffset) {
      const {top, left} = getNewPosition(parentDroppableOffset, {top: e.clientY, left: e.clientX});
      setElParams((prevState) => ({...prevState, top, left}));
    }

    setIsDraggable(false);
    onDragEndCb && onDragEndCb(e);
  };

  const handleBlur = (e) => {
    const text = e.target.innerText;

    setElParams((prevState) => ({...prevState, text: text}));
  };

  const handleMouseUp = (e) => {
    const size = {
      width: elParams.width,
      height: elParams.height,
    };
    const newSize = {
      width: e.target.offsetWidth,
      height: e.target.offsetHeight,
    };
    const sizeChanged = JSON.stringify(size) !== JSON.stringify(newSize);

    if (sizeChanged) {
      setElParams((prevState) => ({...prevState, width: newSize.width, height: newSize.height}));
    }
  };

  const save = () => {
    onSaveCb && onSaveCb(elParams);
  };

  const draggableStyles = {
    width: `${elParams.width}px`,
    height: `${elParams.height}px`,
    top: `${elParams.top}px`,
    left: `${elParams.left}px`,
    backgroundColor: elParams.color,
    zIndex: elParams.zIndex,
  };

  return (
    <div
      className={classNames(styles.wrapper, className)}
      style={{...draggableStyles}}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onMouseUp={handleMouseUp}
      draggable={isDraggable}>
      <DraggableControls enableDragging={setIsDraggable} bringToFront={incrementIndex} bringToBack={decrementIndex} />
      <div
        className={styles.content}
        onBlur={handleBlur}
        onMouseUp={(e) => {
          e.stopPropagation();
        }}
        contentEditable
        suppressContentEditableWarning>
        {elParams.text || 'Type your text here'}
      </div>
    </div>
  );
};

export default Draggable;
