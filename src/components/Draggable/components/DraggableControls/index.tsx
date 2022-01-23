import React from 'react';

import {ReactComponent as IconEnlarge} from '../../../../icons/enlarge.svg';
import {ReactComponent as IconArrow} from '../../../../icons/arrow-up.svg';

import {stopPropagation} from '../../../../helpers/event';

import styles from './draggableControls.module.css';

interface IDraggableControlsProps {
  enableDragging: (enable: boolean) => void;
  bringToFront: () => void;
  bringToBack: () => void;
}

const DraggableControls: React.FC<IDraggableControlsProps> = (props) => {
  const {enableDragging, bringToFront, bringToBack} = props;

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    enableDragging(true);
  };

  return (
    <div className={styles.wrapper} onMouseUp={stopPropagation}>
      <div className={styles.alignLeft} onMouseDown={handleMouseDown}>
        <IconEnlarge className={styles.dragIcon} title={'Drag'} />
      </div>
      <div onClick={bringToFront}>
        <IconArrow className={styles.toFrontIcon} title={'Bring To Front'} />
      </div>
      <div onClick={bringToBack}>
        <IconArrow className={styles.toBackIcon} title={'Bring To Back'} />
      </div>
    </div>
  );
};

export default DraggableControls;
