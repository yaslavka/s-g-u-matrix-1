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

import { declOfNum } from 'utils';
import * as actions from '../../../actions/startrek.actions';
import Button from '../../../components/Button';
import Input from '../../../components/Input';

const RenewalPlanetsModal = ({ myPlanets = false }) => {
  const dispatch = useDispatch();
  const selected = useSelector(state => state.startrek.selected);
  const isVisible = useSelector(state => state.startrek.modals.renewal);
  const isLoading = useSelector(state => state.startrek.loadings.update);

  const initialValues = useMemo(() => isVisible && { amount: '' }, [isVisible]);

  const validationSchema = useMemo(() => {
    return yup.object({
      amount: yup
        .number()
        .typeError('Сумма должна быть числом')
        .integer('Сумма должна быть целым числом')
        .positive('Сумма должна быть положительной')
        .required('Необходимо заполнить это поле'),
    });
  }, []);

  const handleCloseModal = useCallback(() => {
    dispatch(actions.toggleRenewalPlanetsModal(false));
  }, [dispatch]);

  const handleOnSubmit = useCallback(
    async values => {
      const planetLength = selected.length;
      const amount = planetLength * values.amount;
      let result = await confirm({
        title: 'Продление планет',
        message: `Вы хотите продлить ${planetLength} ${declOfNum(planetLength, [
          'планету',
          'планеты',
          'планет',
        ])}, на сумму ${amount} ST`,
        confirmText: 'Подтвердить',
        confirmColor: 'success',
        cancelText: 'Отмена',
        cancelColor: 'link text-muted',
      });
      if (result) {
        dispatch(actions.startrekPlanetsUpdate(myPlanets, Number(values.amount)));
      }
    },
    [dispatch, myPlanets, selected.length],
  );

  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleOnSubmit}
    >
      {({ isValid, dirty, values }) => (
        <Modal
          keyboard={false}
          backdrop="static"
          isOpen={isVisible}
          toggle={handleCloseModal}
        >
          <Form>
            <ModalHeader toggle={handleCloseModal}>
              {`Продление ${selected.length} ${declOfNum(selected.length, [
                'планету',
                'планеты',
                'планет',
              ])}`}
            </ModalHeader>
            <ModalBody>
              <FormGroup>
                <Label className="text-center">
                  Укажите сумму на которую хотели бы продлить каждую выбранную
                  планету
                </Label>
                <Field
                  type="text"
                  name="amount"
                  placeholder="Сумма"
                  component={Input}
                />
              </FormGroup>
              {values && (
                <div>
                  Сумма продления составит:{' '}
                  <strong>{Number(values.amount) * selected.length}</strong> ST
                </div>
              )}
            </ModalBody>
            <ModalFooter>
              <Button
                type="submit"
                color="primary"
                disabled={!(isValid && dirty) || isLoading}
                loading={isLoading}
                block
              >
                Продлить
              </Button>
            </ModalFooter>
          </Form>
        </Modal>
      )}
    </Formik>
  );
};

export default RenewalPlanetsModal;
