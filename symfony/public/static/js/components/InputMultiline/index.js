import { FormText } from 'reactstrap';
import styles from './Input.module.scss';

function InputMultiline({ className, field, form, ...props }) {
  const isInvalid =
    form && form.errors && form.touched[field.name] && form.errors[field.name];

  return (
    <div
      className={`${styles.Input} ${
        isInvalid ? styles.invalid : ''
      } ${className}`}
    >
      <textarea {...field} {...props} />
      {props.placeholder && (
        <span className={styles.placeholder}>{props.placeholder}</span>
      )}
      {isInvalid && <FormText color="danger">{isInvalid}</FormText>}
    </div>
  );
}

export default InputMultiline;
