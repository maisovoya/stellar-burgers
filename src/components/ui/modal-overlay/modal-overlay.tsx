import styles from './modal-overlay.module.css';
import { FC, HTMLAttributes } from 'react';

export const ModalOverlayUI = ({ onClick }: { onClick: () => void }) => (
  <div className={styles.overlay} onClick={onClick} />
);

type ModalOverlayUIProps = {
  onClick: () => void;
} & HTMLAttributes<HTMLDivElement>;
