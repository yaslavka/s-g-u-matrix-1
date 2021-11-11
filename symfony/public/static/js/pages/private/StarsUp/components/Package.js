import React, { useState } from 'react';
import confirm from 'reactstrap-confirm';
import { useSelector, useDispatch } from 'react-redux';
import isEmpty from 'lodash-es/isEmpty';
import { declOfNum } from 'utils';

import * as actions from 'actions/starsup.actions';
import avatarFallback from 'static/images/placeholder.svg';
import Button from 'components/Button';

const Package = ({
  packPlace,
  packName,
  packDescription,
  packPrice,
  packLogo,
  packTops,
}) => {
  const dispatch = useDispatch();
  const [visibleTop, setVisibleTop] = useState(false);
  const isBuyLoading = useSelector(state => state.starsup.loadings.buy);

  const handleBuyPack = async (count, packName, places) => {
    let result = await confirm({
      title: `Приобретение ${packName} тарифа`,
      message: `Вы действительно хотите приобрести тариф ${packName} на сумму ${places}?`,
      confirmText: 'Подтвердить',
      confirmColor: 'primary',
      cancelText: 'Отмена',
      cancelColor: 'link text-muted',
    });

    if (result) {
      dispatch(actions.starsupBuy({ count: count }, { packName, places }));
    }
  };

  return (
    <figure className="starsup__package">
      <button
        type="button"
        onClick={() => setVisibleTop(!visibleTop)}
        className="starsup__package-toggle"
      >
        top
      </button>
      <div className="starsup__package-image">
        <img src={packLogo} alt={packName} />
      </div>
      <h3>{packName}</h3>
      <div className="starsup__package-places">{packPlace} места</div>
      <figcaption>{packDescription}</figcaption>
      <div className="starsup__package-buy">
        <Button
          color="primary"
          disabled={isBuyLoading}
          onClick={() => handleBuyPack(packPlace, packName, packPrice)}
        >
          Приобрести
        </Button>
      </div>
      <div className="starsup__package-price">{packPrice}</div>

      {visibleTop && (
        <div className="starsup__package-top">
          <div className="starsup__package-top-heading">
            <div className="starsup__package-top-heading-title">top</div>
            <div className="starsup__package-top-heading-name">{packName}</div>
            <button
              type="button"
              onClick={() => setVisibleTop(!visibleTop)}
              className="starsup__package-top-heading-close"
            />
          </div>
          <div className="starsup__package-top-container">
            {!isEmpty(packTops) ? (
              <ul>
                {packTops.map(({ id, username, avatar, total }) => (
                  <li key={id}>
                    <div className="starsup__package-top-element">
                      <div
                        className="starsup__package-top-image"
                        style={{
                          backgroundImage: `url(${
                            avatar
                              ? `${process.env.REACT_APP_BASE_URL}/getFile/avatar/${avatar}`
                              : avatarFallback
                          })`,
                        }}
                      />
                      <div className="starsup__package-top-info">
                        <div className="starsup__package-top-name">
                          {username}
                        </div>
                        <small>
                          {total} {declOfNum(total, ['место', 'места', 'мест'])}
                        </small>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="text-center">В данный момент нет лидеров</div>
            )}
          </div>
        </div>
      )}
    </figure>
  );
};

export default Package;
