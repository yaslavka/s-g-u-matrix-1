import React from 'react';
import { useTranslation } from 'i18next';

const advantagesList = [
  {
    title: 'title1',
    text: 'text1',
  },
  {
    title: 'title2',
    text: 'text2',
  },
  {
    title: 'title3',
    text: 'text3',
  },
  {
    title: 'title4',
    text: 'text4',
  },
  {
    title: 'title5',
    text: 'text5',
  },
  {
    title: 'title6',
    text: 'text6',
  },
];

function Advantages() {
  const { t } = useTranslation('common');
  return (
    <section id="advantages" className="our-advantages">
      <h2
        className="our-advantages__title"
        data-aos="fade-up"
        data-aos-duration="300"
      >
        {t('mainPage.sections.advantages.mainTitle')}
      </h2>
      <ul
        className="our-advantages__list"
        data-aos="zoom-in"
        data-aos-duration="300"
      >
        {advantagesList.map(({ title, text }, i) => (
          <li key={i.toString()} className="our-advantages__item">
            <p className="our-advantages__item-title">
              {t(`mainPage.sections.advantages.advantagesList.${title}`)}
            </p>
            <p className="our-advantages__item-text">
              {t(`mainPage.sections.advantages.advantagesList.${text}`)}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Advantages;
