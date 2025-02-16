import classNames from 'classnames';
import styles from './Collapse.module.scss';

type CollapseProps = {
  open: boolean;
  children: React.ReactNode;
};

export const Collapse: React.FC<CollapseProps> = ({ open, children }) => {
  return (
    <div
      className={classNames(styles.collapse, {
        [styles['collapse--open']]: open,
      })}
      style={{ maxHeight: open ? '1000000px' : '0px' }}
    >
      {children}
    </div>
  );
};
