import React from 'react';

import Input from '../../../../components/Input';
import noop from '../../../../helpers/noop';

import styles from './createNoteForm.module.css';

interface ICreateNoteForm {
  onChangeCb: (name: string, value: string) => void;
  onSubmitCb: (e: React.MouseEvent<HTMLElement>) => void;
}

const CreateNoteForm: React.FC<ICreateNoteForm> = (props) => {
  const {onChangeCb = noop, onSubmitCb = noop} = props;

  return (
    <form className={styles.wrapper}>
      <Input
        name={'width'}
        label={'Width(px)'}
        value={'200'}
        placeholder={'enter width in pixels'}
        onChangeCb={onChangeCb}
      />
      <Input
        name={'height'}
        label={'Height(px)'}
        value={'150'}
        placeholder={'enter height in pixels'}
        onChangeCb={onChangeCb}
      />
      <Input htmlType={'color'} name={'color'} label={'Color'} value={'#ffef8e'} onChangeCb={onChangeCb} />
      <button className={styles.button} onClick={onSubmitCb}>
        Create note
      </button>
    </form>
  );
};

export default CreateNoteForm;
