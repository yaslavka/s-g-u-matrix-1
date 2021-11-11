import { useState } from 'react';
import { useTranslation } from '../../../../../node_modules/i18next/dist/esm/i18next';
import { Link } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import styles from './ResetPassword.module.scss';
import routes from 'constants/routes.constants';
import logo from 'static/images/logo.svg';
import { isValidEmail } from 'utils';
import { api } from 'api';

import Input from 'components/OldInput';
import Button from 'components/OldButton';

export default function ResetPassword() {
  const [resetPasswordStatus, setResetPasswordStatus] = useState(null);
  const { t } = useTranslation('common');

  const submitResetPasswordForm = ({ email }) => {
    setResetPasswordStatus('pending');
    api
      .resetPassword(email)
      .then((response) => {
        setResetPasswordStatus('successful');
      })
      .catch(() => {
        setResetPasswordStatus('failed');
      });
  };

  return (
    <div className={styles.ResetPasswordWrapper}>
      <div className="star-container"></div>
      <div className="twinkle"></div>
      <div className={styles.ResetPassword}>
        <div className={styles.logo}>
          <Link to={routes.root} className="d-block">
            <img src={logo} alt="Stars logo" />
          </Link>
        </div>
        <Container>
          <Row>
            <Col xl={{ span: 8, offset: 2 }}>
              <Formik
                initialValues={{ email: '' }}
                validate={({ email }) => {
                  const errors = {};

                  if (!isValidEmail(email)) {
                    errors.email = t('resetPasswordPage.inputs.email.error');
                  }

                  return errors;
                }}
                onSubmit={submitResetPasswordForm}
              >
                {() => (
                  <Form className={styles.form}>
                    <h2 className={styles.mainTitle}>
                      {t('resetPasswordPage.mainTitle')}
                    </h2>
                    <Field
                      className={styles.field}
                      type="email"
                      name="email"
                      placeholder={t(
                        'resetPasswordPage.inputs.email.placeholder'
                      )}
                      component={Input}
                    />
                    <Button
                      className={styles.submitButton}
                      color="perrywinkle"
                      size="medium"
                      type="submit"
                      disabled={resetPasswordStatus === 'pending'}
                    >
                      {t('resetPasswordPage.buttons.resetPassword')}
                    </Button>
                    {resetPasswordStatus === 'successful' && (
                      <p className="mt-3 text-center">
                        {t('resetPasswordPage.statusMessages.resetSuccess')}
                      </p>
                    )}
                  </Form>
                )}
              </Formik>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}
