import React, {
  useEffect,
  useMemo,
  useState,
  useCallback,
  useRef,
} from 'react';
import { EventSourcePolyfill } from 'event-source-polyfill';
import { useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import confirm from 'reactstrap-confirm';
import isEmpty from 'lodash-es/isEmpty';
import { Container } from 'reactstrap';
import classnames from 'classnames';
import { declOfNum } from 'utils';
import Raven from 'raven-js';

import r from 'constants/routes.constants';
import * as actions from 'actions/casino.actions';
import starImage from 'static/images/draw-star.svg';
import CasinoDrawMembers from './CasinoDrawMembers';
import Spinner from 'components/Spinner';
import Button from 'components/Button';
import Icon from 'components/Icon';

const drawStatus = {
  START: 'start',
  WINNER: 'winner',
  FINISH: 'finish',
};

function CasinoDraw() {
  const socketRef = useRef();
  const history = useHistory();
  const { drawId } = useParams();
  const dispatch = useDispatch();
  const [status, setStatus] = useState(null);
  const [memberVisible, setMemberVisible] = useState(false);
  const userId = useSelector(state => state.app.user?.id);
  const isLoading = useSelector(state => state.casino.loadings.draw);
  const draw = useSelector(state => state.casino.draw);

  useEffect(() => {
    dispatch(actions.casinoDraw(drawId));
  }, [dispatch, drawId]);

  useEffect(() => {
    if (!socketRef.current) {
      socketRef.current = new EventSourcePolyfill(
        `${process.env.REACT_APP_WEBSOCKET_DOMAIN}?topic=casino`,
        {
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_WEBSOCKET_KEY}`,
          },
        },
      );
      // DEBUG
      socketRef.current.onopen = () => {
        console.log('SSE connection success');
      };

      socketRef.current.onerror = error => {
        Raven.captureException(error);
      };

      socketRef.current.onmessage = event => {
        setStatus(JSON.parse(event.data));
      };
    }
  }, []);

  const lengthMembers = useMemo(() => {
    let length = 0;
    if (!isEmpty(draw) && userId) {
      length = draw.members.filter(member => member.userId === userId).length;
    }
    return length;
  }, [draw, userId]);

  const totalMembers = useMemo(() => {
    return draw ? draw.totalMembers : null;
  }, [draw]);

  const winnerCallback = useCallback(async () => {
    if (status && status.event === drawStatus.WINNER) {
      let result = await confirm({
        title: 'Успешный розыгрыш',
        message: `Поздравляем победителя с ником ${status.userName}`,
        confirmText: 'Спасибо',
        confirmColor: 'primary',
        cancelText: 'Закрыть',
        cancelColor: 'link text-muted',
      });

      if (result) {
        history.push(r.casino);
      }
    }
  }, [status, history]);

  useEffect(() => {
    if (status) {
      switch (status.event) {
        case drawStatus.WINNER:
          dispatch(actions.casinoDraw(drawId));
          winnerCallback();
          break;

        default:
          break;
      }
    }
  }, [dispatch, drawId, winnerCallback, status]);

  const toggleMemberModal = () => setMemberVisible(!memberVisible);

  return (
    <Container className="root-page casino-draw-page">
      <Spinner isLoading={isLoading}>
        <div className="casino-draw-page__header">
          <div className="root-page-header">
            <div className="root-page-header__left">
              <Button
                className="root-page-header__back"
                onClick={() => history.goBack()}
                color="link"
                size="lg"
              >
                <Icon iconName="back" />
              </Button>
            </div>
            <h1 className="root-page-title">Розыгрыш {draw?.ownerName}</h1>
            <div className="root-page-header__right">&nbsp;</div>
          </div>
          <h3 className="casino-draw-page__title">
            У вас <strong>{lengthMembers}</strong>{' '}
            {declOfNum(lengthMembers, ['место', 'места', 'мест'])}, всего{' '}
            {declOfNum(totalMembers, ['участник', 'участника', 'участников'])}{' '}
            розыгрыша <strong>{totalMembers}</strong>
          </h3>
        </div>
        <div className="casino-draw-page__content">
          <div
            className={classnames('casino-draw-page__stars', {
              'casino-draw-page__stars--process':
                status && status.event === drawStatus.START,
            })}
          >
            <img src={starImage} alt="" />
            <img src={starImage} alt="" />
            <img src={starImage} alt="" />
          </div>
        </div>
        <div className="casino-draw-page__footer">
          <Button color="primary" onClick={toggleMemberModal}>
            Участники
          </Button>
        </div>
      </Spinner>
      <CasinoDrawMembers
        draw={draw}
        memberVisible={memberVisible}
        toggleMemberModal={toggleMemberModal}
      />
    </Container>
  );
}

export default CasinoDraw;
