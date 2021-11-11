import React, { useState, useEffect } from 'react';
import { useTranslation } from '../../../../../node_modules/i18next/dist/esm/i18next';

import blur from '../../../static/images/home/star-blur.png';
import { api } from 'api';

function Star() {
  const [info, setInfo] = useState(null);
  const { t } = useTranslation('common');

  useEffect(() => {
    api
      .getLandingInfo()
      .then((response) => setInfo(response))
      .catch(() => {});
  }, []);
  return (
    <section className="star">
      {info && (
        <div className="star__flex">
          <div
            className="star__item"
            data-aos="fade-up"
            data-aos-duration="400"
          >
            <div className="star__wrap">
              <p className="strars__counter">{info.all}</p>
              <p className="star__text">
                {t('mainPage.sections.star.starList.all')}
              </p>
            </div>
            <img
              src={blur}
              alt="Всего человек"
              className="strars__img-blur"
              data-aos-duration="600"
              data-aos="zoom-in"
            />
          </div>
          <div
            className="star__item"
            data-aos="fade-up"
            data-aos-duration="600"
          >
            <div className="star__wrap">
              <p className="strars__counter">{info.new}</p>
              <p className="star__text">
                {t('mainPage.sections.star.starList.new')}
              </p>
            </div>
            <img
              src={blur}
              alt="Новых за сутки"
              className="strars__img-blur"
              data-aos-duration="800"
              data-aos="zoom-in"
            />
          </div>
          <div
            className="star__item"
            data-aos="fade-up"
            data-aos-duration="1000"
          >
            <div className="star__wrap">
              <p className="strars__counter">{info.active}</p>
              <p className="star__text">
                {t('mainPage.sections.star.starList.active')}
              </p>
            </div>
            <img
              src={blur}
              alt="Активации"
              className="strars__img-blur"
              data-aos-duration="1200"
              data-aos="zoom-in"
            />
          </div>
        </div>
      )}
    </section>
  );
}

export default Star;
