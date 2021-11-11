import styles from './Input.module.scss';

export default function Input({ className, field, form, ...props }) {
  const isInvalid =
    form && form.errors && form.touched[field.name] && form.errors[field.name];

  return (
    <div
      className={`${styles.Input} ${
        isInvalid ? styles.invalid : ''
      } ${className}`}
    >
      <input {...field} {...props} />
      {props.placeholder && (
        <span className={styles.placeholder}>{props.placeholder}</span>
      )}
      {isInvalid && <p className={styles.errorMessage}>{isInvalid}</p>}
    </div>
  );
}
