import styles from './Button.module.scss';

export default function Button({
  children,
  size,
  color,
  className = '',
  ...props
}) {
  return (
    <button
      className={`${styles.Button} ${styles[size]} ${styles[color]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
