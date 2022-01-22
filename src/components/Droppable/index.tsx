import React from 'react';
import classNames from 'classnames';

import noop from '../../helpers/noop';

import styles from './droppable.module.css';

interface IDroppableProps {
  children: React.ReactNode;
  className?: string;
  onDragOverCb?: (e: React.DragEvent<HTMLDivElement>) => void;
  onDropCb?: (e: React.DragEvent<HTMLDivElement>) => void;
}

const Droppable: React.FC<IDroppableProps> = (props) => {
  const {className = '', onDragOverCb = noop, onDropCb = noop, children} = props;

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    onDragOverCb && onDragOverCb(e);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    onDropCb && onDropCb(e);
  };

  return (
    <div className={classNames(styles.wrapper, className)} onDragOver={handleDragOver} onDrop={handleDrop}>
      {children}
    </div>
  );
};

export default Droppable;
