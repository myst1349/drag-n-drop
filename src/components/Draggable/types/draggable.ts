import React from 'react';

export interface IDraggableParams {
  id: number;
  width: number;
  height: number;
  top: number;
  left: number;
  color: string;
  text: string;
  zIndex: number;
}

export interface IDraggableProps {
  className: string;
  params: IDraggableParams;
  onDragStartCb?: (id: number) => void;
  onDragEndCb?: (e: React.DragEvent) => void;
  onSaveCb?: (draggable: IDraggableParams) => void;
}
