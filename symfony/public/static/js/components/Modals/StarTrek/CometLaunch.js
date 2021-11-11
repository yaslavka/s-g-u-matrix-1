import React, { useCallback, useMemo } from 'react';
import {
  Label,
  FormGroup,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import confirm from 'reactstrap-confirm';
import * as yup from 'yup';

import { declOfNum } from '../../../utils';
import * as actions from '../../../actions/startrek.actions';
import Button from '../../../components/Button';
import Input from '../../../components/Input';

const CometLaunchModal = () => {
  const dispatch = useDispatch();
  const launchMy = useSelector(state => state.startrek.launchMy);
  const isVisible = useSelector(state => state.startrek.modals.launch);
  const isLoading = useSelector(state => state.startrek.loadings.launch);

  const initialValues = useMemo(() => isVisible && { amount: '' }, [isVisible]);

  const validationSchema = useMemo(
    () =>
      yup.object({
        amount: yup
          .number()
          .typeError('Сумма должна быть числом')
          .integer('Сумма должна быть целым числом')
          .positive('Сумма должна быть положительной')
          .required('Необходимо заполнить это поле'),
      }),
    [],
  );

  const handleCloseModal = useCallback(() => {
    dispatch(actions.toggleCometLaunchModal(false));
  }, [dispatch]);

  const handleOnSubmit = useCallback(
    async values => {
      const amount = Number(values.amount);
      const payload = { amount, isMy: launchMy };
      let result = await confirm({
        title: `Запустить ${declOfNum(amount, ['комету', 'кометы', 'комет'])}?`,
        message: `Вы хотите запустить ${amount} ${declOfNum(amount, [
          'комету',
          'кометы',
          'комет',
        ])}, в ${launchMy ? 'Мои планеты' : 'Структуру'}?`,
        confirmText: 'Подтвердить',
        confirmColor: 'success',
        cancelText: 'Отмена',
        cancelColor: 'link text-muted',
      });
      if (result) {
        dispatch(actions.startrekCometLaunch(payload));
      }
    },
    [dispatch, launchMy],
  );

  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleOnSubmit}
    >
      {({ isValid, dirty }) => (
        <Modal
          keyboard={false}
          backdrop="static"
          isOpen={isVisible}
          toggle={handleCloseModal}
        >
          <Form>
            <ModalHeader toggle={handleCloseModal}>
              Запустить кометы
            </ModalHeader>
            <ModalBody>
              <FormGroup>
                <Label className="text-center">
                  Введите количество комет, для запуска в "
                  {launchMy ? 'Мои планеты' : 'Структуру'}"
                </Label>
                <Field
                  type="text"
                  name="amount"
                  placeholder="Количество"
                  component={Input}
                />
              </FormGroup>
            </ModalBody>
            <ModalFooter>
              <Button
                type="submit"
                color="primary"
                disabled={!(isValid && dirty) || isLoading}
                loading={isLoading}
                block
              >
                Запустить
              </Button>
            </ModalFooter>
          </Form>
        </Modal>
      )}
    </Formik>
  );
};

export default CometLaunchModal;
