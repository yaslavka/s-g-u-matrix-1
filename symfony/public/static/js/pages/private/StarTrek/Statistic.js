import React, { useEffect, useMemo } from 'react';
import { Row, Col, Container, Card, CardBody } from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux';

import * as actions from 'actions/startrek.actions';
import NavBar from 'components/layout/Navbar';
import UserInfo from 'components/UserInfo';
import Spinner from 'components/Spinner';
import Table from 'components/Table';

const Statistic = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(state => state.startrek.loadings.table);
  const list = useSelector(state => state.startrek.table);
  const statistic = useSelector(state => state.startrek.statistic);

  const arrayList = useMemo(
    () => list.map(el => ({ ...el, level: `Уровень ${el.level}` })),
    [list],
  );

  const columns = useMemo(
    () => ({
      level: 'Уровни',
      matrix: '№ последней бонусной планеты',
    }),
    [],
  );

  useEffect(() => {
    dispatch(actions.startrekStatistic());
  }, [dispatch]);

  return (
    <Container className="root-page">
      <Row>
        <Col xl={3} className="d-none d-xl-block">
          <UserInfo />
          <NavBar />
        </Col>
        <Col xl={9}>
          <h1 className="root-page-title">Статистика</h1>
          <Row>
            <Col lg={6}>
              <Card>
                <CardBody className="text-center">
                  <h4>С положительным балансом</h4>
                  <h2>{statistic.active}</h2>
                </CardBody>
              </Card>
            </Col>
            <Col lg={6}>
              <Card>
                <CardBody className="text-center">
                  <h4>С отрицательным балансом</h4>
                  <h2>{statistic.inactive}</h2>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Spinner isLoading={isLoading}>
            <Table columns={columns} data={arrayList} withoutPaginate />
          </Spinner>
        </Col>
      </Row>
    </Container>
  );
};

export default Statistic;
