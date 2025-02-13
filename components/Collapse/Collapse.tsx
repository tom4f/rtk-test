import * as React from 'react';
import c from 'classnames';

import styles from './Collapse.module.scss';

interface CollapseProps {
  open: boolean;
  children: React.ReactNode;
}

const Collapse: React.FC<CollapseProps> = ({ open, children }) => {
  return (
    <div
      className={c({
        [styles['collapse']]: true,
        [styles['collapse--open']]: open,
      })}
      style={{ maxHeight: open ? '1000000px' : '0px' }}
    >
      {children}
    </div>
  );
};

export default React.memo(Collapse);
