import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'i18next';
import AOS from 'aos';

import starsSvg from '../../../static/images/home/stars_svg.svg';
import legalInformation from '../../../static/images/home/legal-information.png';
import legalPDF from '../../../static/documents/legal.pdf';
import 'aos/dist/aos.css';

import Header from './Header';
import Banner from './Banner';
import Authentication from './Authentication';
import Advantages from './Advantages';
import Star from './Star';
import SolarSystem from './SolarSystem';
import Materials from './Materials';
import Roadmap from '../../../components/Roadmap';
import Footer from './Footer';
import routes from '../../../constants/routes.constants';

function Home() {
  const { t } = useTranslation('common');

  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);

  return (
    <div className="page">
      <Header />
      <Banner />
      <Authentication />
      <section id="about" className="page__container">
        <h1 className="page__title" data-aos="fade-up" data-aos-duration="400">
          <span style={{ color: '#00C3E1' }}>
            {t('mainPage.sections.about.mainTitle.mainWord')}
          </span>
          {t('mainPage.sections.about.mainTitle.text')}
        </h1>
        <p
          className="page__subtitle"
          data-aos-duration="400"
          data-aos="fade-up"
        >
          &nbsp;
        </p>
      </section>
      <Advantages />
      <Star />
      <SolarSystem />
      <section className="stars" data-aos="zoom-in" data-aos-duration="900">
        <img
          src={starsSvg}
          alt="Займи свое место во вселенной!"
          className="stars__img"
        />
        <div className="stars__wrap">
          <p className="stars__text">
            {t('mainPage.sections.stars.mainTitle')}
          </p>
          <Link
            to={routes.signUp}
            className="stars__button button button--violet"
          >
            {t('mainPage.sections.stars.links.start')}
          </Link>
        </div>
      </section>
      <section
        id="roadmap"
        className="roadmap-info"
        data-aos-duration="800"
        data-aos="fade-right"
      >
        <h2 className="roadmap-info__title">Roadmap</h2>
        <Roadmap />
      </section>
      <Materials />
      <section
        className="legal-information"
        data-aos-duration="800"
        data-aos="fade-right"
      >
        <h2 className="legal-information__title">
          {t('mainPage.sections.legalInformation.title')}
        </h2>
        <div className="legal-information__wrap">
          <div className="legal-information__picture">
            <a href={legalPDF} rel="noreferrer" target="_blank">
              <img
                src={legalInformation}
                alt={t('mainPage.sections.legalInformation.title')}
              />
            </a>
          </div>
          <div className="legal-information__description">
            <p>
              <strong>{t('mainPage.sections.legalInformation.text1')}</strong>
            </p>
            <p>{t('mainPage.sections.legalInformation.text2')}</p>
            <p>{t('mainPage.sections.legalInformation.text3')}</p>
            <br />
            <br />
            <a
              href="https://offshore.su/blog/company"
              className="button button--violet"
              rel="noreferrer"
              target="_blank"
            >
              {t('mainPage.sections.legalInformation.button')}
            </a>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default Home;
