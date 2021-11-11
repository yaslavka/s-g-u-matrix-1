import React from 'react';
import { useTranslation } from '../../../../../node_modules/i18next/dist/esm/i18next';

import planet1 from '../../../static/images/home/planet-1.png';
import planet2 from '../../../static/images/home/planet-2.png';
import planet3 from '../../../static/images/home/planet-3.png';
import planet4 from '../../../static/images/home/planet-4.png';
import planet5 from '../../../static/images/home/planet-5.png';
import planet6 from '../../../static/images/home/planet-6.png';
import planet7 from '../../../static/images/home/planet-7.png';
import planet8 from '../../../static/images/home/planet-8.png';

function SolarSystem() {
  const { t } = useTranslation('common');

  return (
    <div className="page__container">
      <div className="solar-system">
        <div
          className="solar-system__orbit solar-system__orbit--1"
          data-aos="zoom-in"
        >
          <div
            className="solar-system__orbit solar-system__orbit--2"
            data-aos="zoom-in"
          >
            <div
              className="solar-system__orbit solar-system__orbit--3"
              data-aos="zoom-in"></div>
          </div>
        </div>
        <h2 className="solar-system__title">
          {t('mainPage.sections.solarSystem.mainTitle.text1')}
          <span>S-G-U-Matrix</span>
          {t('mainPage.sections.solarSystem.mainTitle.text2')}
        </h2>

        <div className="solar-system__list-of-planets">
          <div
            className="solar-system__planet-wrapper solar-system__planet-wrapper--1"
            data-aos="fade-up"
            data-aos-duration="1200"
          >
            <img
              src={planet1}
              className="solar-system__planet solar-system__planet--1"
              alt={t('mainPage.sections.solarSystem.planetsList.title1')}
            />
            <div className="solar-system__planet-info solar-system__planet-info--1">
              <p className="solar-system__planet-title">
                {t('mainPage.sections.solarSystem.planetsList.title1')}
              </p>
              <p className="solar-system__planet-description">
                {t('mainPage.sections.solarSystem.planetsList.text1')}
              </p>
            </div>
          </div>

          <div
            className="solar-system__planet-wrapper solar-system__planet-wrapper--2"
            data-aos="fade-up"
            data-aos-duration="1200"
          >
            <img
              src={planet2}
              className="solar-system__planet solar-system__planet--2"
              alt={t('mainPage.sections.solarSystem.planetsList.title2')}
            />
            <div className="solar-system__planet-info solar-system__planet-info--2">
              <p className="solar-system__planet-title">
                {t('mainPage.sections.solarSystem.planetsList.title2')}
              </p>
              <p className="solar-system__planet-description">
                {t('mainPage.sections.solarSystem.planetsList.text2')}
              </p>
            </div>
          </div>

          <div
            className="solar-system__planet-wrapper solar-system__planet-wrapper--3"
            data-aos="fade-up"
            data-aos-duration="1200"
          >
            <img
              src={planet3}
              className="solar-system__planet solar-system__planet--3"
              alt={t('mainPage.sections.solarSystem.planetsList.title3')}
            />
            <div className="solar-system__planet-info solar-system__planet-info--3">
              <p className="solar-system__planet-title">
                {t('mainPage.sections.solarSystem.planetsList.title3')}
              </p>
              <p className="solar-system__planet-description">
                {t('mainPage.sections.solarSystem.planetsList.text3')}
              </p>
            </div>
          </div>

          <div
            className="solar-system__planet-wrapper solar-system__planet-wrapper--4"
            data-aos="fade-up"
            data-aos-duration="1200"
          >
            <img
              src={planet4}
              className="solar-system__planet solar-system__planet--4"
              alt={t('mainPage.sections.solarSystem.planetsList.title4')}
            />
            <div className="solar-system__planet-info solar-system__planet-info--4">
              <p className="solar-system__planet-title">
                {t('mainPage.sections.solarSystem.planetsList.title4')}
              </p>
              <p className="solar-system__planet-description">
                {t('mainPage.sections.solarSystem.planetsList.text4')}
              </p>
            </div>
          </div>

          <div
            className="solar-system__planet-wrapper solar-system__planet-wrapper--5"
            data-aos="fade-up"
            data-aos-duration="1200"
          >
            <img
              src={planet5}
              className="solar-system__planet solar-system__planet--5"
              alt={t('mainPage.sections.solarSystem.planetsList.title5')}
            />
            <div className="solar-system__planet-info solar-system__planet-info--5">
              <p className="solar-system__planet-title">
                {t('mainPage.sections.solarSystem.planetsList.title5')}
              </p>
              <p className="solar-system__planet-description">
                {t('mainPage.sections.solarSystem.planetsList.text5')}
              </p>
            </div>
          </div>

          <div
            className="solar-system__planet-wrapper solar-system__planet-wrapper--6"
            data-aos="fade-up"
            data-aos-duration="1200"
          >
            <img
              src={planet6}
              className="solar-system__planet solar-system__planet--6"
              alt={t('mainPage.sections.solarSystem.planetsList.title6')}
            />
            <div className="solar-system__planet-info solar-system__planet-info--6">
              <p className="solar-system__planet-title">
                {t('mainPage.sections.solarSystem.planetsList.title6')}
              </p>
              <p className="solar-system__planet-description">
                {t('mainPage.sections.solarSystem.planetsList.text6')}
              </p>
            </div>
          </div>

          <div
            className="solar-system__planet-wrapper solar-system__planet-wrapper--7"
            data-aos="fade-up"
            data-aos-duration="1200"
          >
            <img
              src={planet7}
              className="solar-system__planet solar-system__planet--7"
              alt={t('mainPage.sections.solarSystem.planetsList.title7')}
            />
            <div className="solar-system__planet-info solar-system__planet-info--7">
              <p className="solar-system__planet-title">
                {t('mainPage.sections.solarSystem.planetsList.title7')}
              </p>
              <p className="solar-system__planet-description">
                {t('mainPage.sections.solarSystem.planetsList.text7')}
              </p>
            </div>
          </div>

          <div
            className="solar-system__planet-wrapper solar-system__planet-wrapper--8"
            data-aos="fade-up"
            data-aos-duration="1200"
          >
            <img
              src={planet8}
              className="solar-system__planet solar-system__planet--8"
              alt={t('mainPage.sections.solarSystem.planetsList.title8')}
            />
            <div className="solar-system__planet-info solar-system__planet-info--8">
              <p className="solar-system__planet-title">
                {t('mainPage.sections.solarSystem.planetsList.title8')}
              </p>
              <p className="solar-system__planet-description">
                {t('mainPage.sections.solarSystem.planetsList.text8')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SolarSystem;
