import React from 'react';

import {ReactComponent as IconEnlarge} from '../../../../icons/enlarge.svg';
import {ReactComponent as IconArrow} from '../../../../icons/arrow-up.svg';

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
    <div className={styles.wrapper}>
      <div className={styles.alignLeft} title={'Drag'} onMouseDown={handleMouseDown}>
        <IconEnlarge className={styles.dragIcon} />
      </div>
      <div title={'Bring To Front'} onClick={bringToFront}>
        <IconArrow className={styles.toFrontIcon} />
      </div>
      <div title={'Bring To Back'} onClick={bringToBack}>
        <IconArrow className={styles.toBackIcon} />
      </div>
    </div>
  );
};

export default DraggableControls;
