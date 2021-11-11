import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Formik, Form, Field } from '/@symfony/stimulus-bridge/controllers.json';
import styles from './Avatar.module.scss';
import avatar from '../../static/images/placeholder.svg';
import { api } from '/api';
import * as actions from '../../actions/app.actions';
import { isValidImageType } from '/utils';

const AutoSubmit = ({ initialValues, values, submitForm }) => {
  useEffect(() => {
    if (initialValues !== values) {
      submitForm();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values]);
  return null;
};

export default function Avatar({ url, className }) {
  const dispatch = useDispatch();

  const submitAvatarForm = ({ avatar }) => {
    api
      .updateAvatar(avatar)
      .then(() => {
        api
          .getUserInfo()
          .then(response => {
            dispatch(actions.userInfoSuccess(response));
          })
          .catch(() => {});
      })
      .catch(() => {});
  };

  return (
    <div className={`${styles.Avatar} ${className}`}>
      <Formik
        initialValues={{
          avatar: null,
        }}
        validate={({ avatar }) => {
          const errors = {};

          if (avatar.size / 1024 / 1024 >= 10) {
            errors.avatar = 'Размер изображения превышает 10Mb';
          }

          if (!isValidImageType(avatar.type)) {
            errors.avatar = 'Неверный формат изображения';
          }

          return errors;
        }}
        onSubmit={submitAvatarForm}
      >
        {props => (
          <Form>
            <Field>
              {({ form }) => (
                <div className={styles.inputWrapper}>
                  <input
                    type="file"
                    accept="image/png, image/jpeg, image/jpg"
                    onChange={({ target: { files } }) => {
                      if (files && files[0]) {
                        const image = files[0];
                        form.setFieldValue('avatar', image);
                      }
                    }}
                  />
                  <img src={url || avatar} alt="аватар пользователя" />
                </div>
              )}
            </Field>
            {props.errors && (
              <p className={styles.errorMessage}>{props.errors.avatar}</p>
            )}
            <AutoSubmit {...props} />
          </Form>
        )}
      </Formik>
      <span className={styles.circle}></span>
    </div>
  );
}
