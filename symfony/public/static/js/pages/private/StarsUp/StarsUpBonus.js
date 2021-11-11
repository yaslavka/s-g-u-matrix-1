import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import confirm from 'reactstrap-confirm';
import compact from 'lodash-es/compact';
import { declOfNum } from 'utils';

import * as actions from 'actions/starsup.actions';
import gift from 'static/images/starsup/starsup-gift.png';
import Button from 'components/Button';

const StarsUpBonus = ({ bonus: { id, lines, canChangeLines, maxLine } }) => {
  const dispatch = useDispatch();
  const [array, setArray] = useState(
    canChangeLines ? [null, null, null, null, null] : [1, 2, null, null, null],
  );

  const handleSendBonus = async () => {
    let result = await confirm({
      title: 'Распределение Super Bonus',
      message: `Распределить Super Bonus на ${compact(array).join(
        ', ',
      )} ${declOfNum(compact(array).length, ['линия', 'линии', 'линий'])}`,
      confirmText: 'Подтвердить',
      confirmColor: 'primary',
      cancelText: 'Отмена',
      cancelColor: 'link text-muted',
    });

    if (result) {
      dispatch(actions.starsupActiveSuperBonus({ lines: compact(array), id }));
    }
  };

  return (
    <div className="starsup__bonus">
      <div className="starsup__bonus-header">
        <img className="starsup__bonus-gift" src={gift} alt="Super Bonus" />
        Поздравляем вас с получением Super Bonus.
        <br />
        Порадуйте свою команду!
      </div>
      <div className="starsup__bonus-lines">
        {lines.map((line, index) => {
          return (
            <div key={index}>
              Линия {index + 1}{' '}
              <input
                disabled={
                  (compact(array).length === maxLine && !array[index]) ||
                  !canChangeLines
                }
                type="checkbox"
                checked={array[index]}
                onChange={val => {
                  const newArray = array.map((e, i) =>
                    index === i ? (val.target.checked ? line : null) : e,
                  );
                  setArray(newArray);
                }}
              />
            </div>
          );
        })}
      </div>
      <Button
        color="primary"
        disabled={!compact(array).length}
        onClick={handleSendBonus}
      >
        Распределить
      </Button>
    </div>
  );
};

export default StarsUpBonus;
