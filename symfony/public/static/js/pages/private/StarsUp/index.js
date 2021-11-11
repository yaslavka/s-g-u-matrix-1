import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, Container } from 'reactstrap';
import { Link } from 'react-router-dom';
import isEmpty from 'lodash-es/isEmpty';

import * as actions from 'actions/starsup.actions';
import starsupLogo from 'static/images/starsup/starsup-logo.svg';
import starsupPackOne from 'static/images/starsup/starsup-pack-one.svg';
import starsupPackTwo from 'static/images/starsup/starsup-pack-two.svg';
import starsupPackThree from 'static/images/starsup/starsup-pack-three.svg';
import PackageBuySuccessModal from 'components/Modals/StarsUp/PackageBuySuccess';
import PlaceBuyModal from 'components/Modals/StarsUp/PlaceBuy';
import NavBar from 'components/layout/Navbar';

import UserInfo from 'components/UserInfo';
import Spinner from 'components/Spinner';
import Button from 'components/Button';

import Documents from './components/Documents';
import Package from './components/Package';
import Check from './components/Check';
import StarsList from './StarsUpList';

const StarsUp = () => {
  const dispatch = useDispatch();
  const info = useSelector(state => state.starsup.info);
  const isLoading = useSelector(state => state.starsup.loadings.info);
  const bonuses = useSelector(state => state.starsup.bonuses);

  useEffect(() => {
    dispatch(actions.starsupInfo());
  }, [dispatch]);
  return (
    <Container className="root-page">
      <Row>
        <Col xl={3} className="d-none d-xl-block">
          <UserInfo />
          <NavBar />
        </Col>
        <Col xl={9}>
          <Spinner isLoading={isLoading}>
            <>
              <div className="starsup__container">
                <div className="starsup__heading">
                  <div className="starsup__heading-logo">
                    <img src={starsupLogo} alt="Stars Up" />
                  </div>
                  <div className="starsup__heading-content">
                    <StarsList />
                    {info && (
                      <div className="starsup__heading-info">
                        <div className="starsup__heading-count">
                          <strong>{info.all}</strong>
                          <span>Всего мест</span>
                        </div>
                        <div className="starsup__heading-count">
                          <strong>{info.my}</strong>
                          <span>Мои места <br /> (Активные)</span>
                        </div>
                        <div className="starsup__heading-buy">
                          <Button
                            onClick={() =>
                              dispatch(actions.toggleStarsUpPlaceBuyModal())
                            }
                            color="primary"
                          >
                            Приобрести места
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                {info && (
                  <div className="starsup__packages">
                    <Row>
                      <Col sm={4}>
                        <Package
                          packPlace={32}
                          packName="Basic"
                          packDescription="Тариф для партнёров среднего звена. Позволяет быстро
                  получить выплаты, обеспечить переливами свою команду при
                  умеренном темпе работы."
                          packPrice="6 400 ST"
                          packLogo={starsupPackOne}
                          packTops={info.firstTop}
                        />
                      </Col>
                      <Col sm={4}>
                        <Package
                          packPlace={63}
                          packName="Standart"
                          packDescription="Тариф для партнёров высшего звена. Позволяет быстро выйти на
                  высокий уровень дохода, а также обеспечить стабильную
                  динамику развития структуры вне зависимости от программы за
                  счет больших переливов."
                          packPrice="12 600 ST"
                          packLogo={starsupPackTwo}
                          packTops={info.secondTop}
                        />
                      </Col>
                      <Col sm={4}>
                        <Package
                          packPlace={127}
                          packName="Premium"
                          packDescription="Тариф для топ-лидеров. Позволяет обеспечить всю команду
                  высоким доходом на длительный срок, а также глобально влиять
                  на развитие структуры и компании в целом."
                          packPrice="25 400 ST"
                          packLogo={starsupPackThree}
                          packTops={info.thirdTop}
                        />
                      </Col>
                    </Row>
                  </div>
                )}
                {!isEmpty(bonuses) && (
                  <div className="starsup__bonus-list">
                    <Button
                      tag={Link}
                      to="/starsup/bonuses"
                      color="success"
                      block
                    >
                      Super Bonus
                    </Button>
                  </div>
                )}
                {info && (
                  <div className="starsup__users">
                    <div className="starsup__users-line">
                      <div className="starsup__users-content">
                        <div className="starsup__users-count">
                          {info.firstLine}
                        </div>
                        <div className="starsup__users-text">
                          Места в первой линии
                        </div>
                      </div>
                      <div className="starsup__users-actions">
                        <Button
                          tag={Link}
                          to="/starsup/users/1"
                          color="primary"
                          outline
                        >
                          Просмотреть
                        </Button>
                      </div>
                    </div>
                    <div className="starsup__users-line">
                      <div className="starsup__users-content">
                        <div className="starsup__users-count">
                          {info.secondLine}
                        </div>
                        <div className="starsup__users-text">
                          Места во второй линии
                        </div>
                      </div>
                      <div className="starsup__users-actions">
                        <Button
                          tag={Link}
                          to="/starsup/users/2"
                          color="primary"
                          outline
                        >
                          Просмотреть
                        </Button>
                      </div>
                    </div>
                    <div className="starsup__users-line">
                      <div className="starsup__users-content">
                        <div className="starsup__users-count">
                          {info.thirdLine}
                        </div>
                        <div className="starsup__users-text">
                          Места в третьей линии
                        </div>
                      </div>
                      <div className="starsup__users-actions">
                        <Button
                          tag={Link}
                          to="/starsup/users/3"
                          color="primary"
                          outline
                        >
                          Просмотреть
                        </Button>
                      </div>
                    </div>
                    <div className="starsup__users-line">
                      <div className="starsup__users-content">
                        <div className="starsup__users-count">
                          {info.fourthLine}
                        </div>
                        <div className="starsup__users-text">
                          Места в четвертой линии
                        </div>
                      </div>
                      <div className="starsup__users-actions">
                        <Button
                          tag={Link}
                          to="/starsup/users/4"
                          color="primary"
                          outline
                        >
                          Просмотреть
                        </Button>
                      </div>
                    </div>
                    <div className="starsup__users-line">
                      <div className="starsup__users-content">
                        <div className="starsup__users-count">
                          {info.fifthLine}
                        </div>
                        <div className="starsup__users-text">
                          Места в пятой линии
                        </div>
                      </div>
                      <div className="starsup__users-actions">
                        <Button
                          tag={Link}
                          to="/starsup/users/5"
                          color="primary"
                          outline
                        >
                          Просмотреть
                        </Button>
                      </div>
                    </div>
                    <div className="starsup__users-line">
                      <div className="starsup__users-content">
                        <div className="starsup__users-count">{info.sum}</div>
                        <div className="starsup__users-text">
                          Общее количество мест
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <PlaceBuyModal />
              <PackageBuySuccessModal />
            </>
          </Spinner>
          <Documents />
          <Check />
        </Col>
      </Row>
    </Container>
  );
};

export default StarsUp;
