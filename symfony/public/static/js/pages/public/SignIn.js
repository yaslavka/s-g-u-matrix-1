import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { FormGroup, Button } from 'reactstrap';
import { useTranslation } from 'react-i18next';
import { Formik, Form, Field } from 'formik';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import * as yup from 'yup';

import { isValidUsername, isValidPassword, setAccessToken } from '../../utils';
import * as actions from '../../actions/auth.actions';
import logo from '../../static/images/logo.svg';
import routes from '../../constants/routes.constants';
import { api } from '../../api';

import Input from '../../components/Input';

const initialValues = { username: '', password: '' };

function SignIn() {
  const dispatch = useDispatch();
  const { t } = useTranslation('common');
  const [serverError, setServerError] = useState(null);
  const [clientCredentials, setClientCredentials] = useState(null);

  const validationSchema = useMemo(
    () =>
      yup.object().shape({
        username: yup
          .string()
          .required()
          .test('username', t('signInPage.inputs.username.error'), value =>
            isValidUsername(value),
          ),
        password: yup
          .string()
          .required()
          .test('password', t('signInPage.inputs.password.error'), value =>
            isValidPassword(value),
          ),
      }),
    [t],
  );

  const submitSignInForm = useCallback(
    credentials => {
      setServerError();
      api
        .signIn({ ...credentials, ...clientCredentials })
        .then(response => {
          dispatch(actions.signInSuccess());
          setAccessToken(response);

          api
            .getUserInfo()
            .then(() => {})
            .catch(() => {});
        })
        .catch(() => {
          setServerError('Неверный логин или пароль.');
        });
    },
    [dispatch, clientCredentials],
  );

  useEffect(() => {
    api
      .createClient()
      .then(response => {
        if (response && response.client_id && response.client_secret) {
          setClientCredentials(response);
          localStorage.setItem('client_id', response.client_id);
          localStorage.setItem('client_secret', response.client_secret);
        }
      })
      .catch(error => {});
  }, []);

  return (
    <div className="auth__wrapper">
      <div className="star-container"></div>
      <div className="twinkle"></div>
      <div className="auth__page">
        <div className="auth__logo">
          <Link to={routes.root}>
            <img src={logo} alt="Stars logo" />
          </Link>
        </div>
        <Formik
          validationSchema={validationSchema}
          initialValues={initialValues}
          onSubmit={submitSignInForm}
        >
          {() => (
            <Form className="auth__form">
              <div className="auth__title">
                <h2>{t('signInPage.mainTitle')}</h2>
              </div>
              <FormGroup>
                <Field
                  type="text"
                  name="username"
                  component={Input}
                  placeholder={t('signInPage.inputs.username.placeholder')}
                />
              </FormGroup>
              <FormGroup className="mb-5">
                <Field
                  type="password"
                  name="password"
                  component={Input}
                  placeholder={t('signInPage.inputs.password.placeholder')}
                />
              </FormGroup>
              <FormGroup>
                <Button type="submit" color="primary" size="lg" block>
                  {t('signInPage.buttons.signIn')}
                </Button>
              </FormGroup>
              <div className="text-center">
                <Link to={routes.resetPassword}>
                  {t('signInPage.links.forgotPassword')}
                </Link>
              </div>

              {serverError && <div className="auth__error">{serverError}</div>}
            </Form>
          )}
        </Formik>
        <div className="auth__footer">
          {t('signInPage.links.signUp.title')}{' '}
          <Link to={routes.signUp}>{t('signInPage.links.signUp.text')}</Link>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
