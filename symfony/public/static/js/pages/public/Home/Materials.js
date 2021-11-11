import React, { useState, useCallback } from 'react';
import classnames from 'classnames';
import { useTranslation } from '../../../../../node_modules/i18next/dist/esm/i18next';

import presentationEN from '../../../static/documents/presentation-en.pdf';
import presentationKK from '../../../static/documents/presentation-kk.pdf';
import presentationMN from '../../../static/documents/presentation-mn.pdf';
import presentationRU from '../../../static/documents/presentation-ru.pdf';
import brandBook from '../../../static/documents/brand-book-stars.pdf';
import starsPic from '../../../static/images/home/stars-pic.jpg';

function Materials() {
  const [open, setOpen] = useState(false);
  const { t } = useTranslation('common');

  const handleToggleDropdown = useCallback(
    () => setOpen(!open),
    [open, setOpen],
  );

  return (
    <section
      id="materials"
      className="useful-materials"
      data-aos="fade-left"
      data-aos-duration="800"
    >
      <h2 className="useful-materials__title">
        {t('mainPage.sections.materials.mainTitle')}
      </h2>
      <div className="useful-materials__flex">
        <div className="useful-materials__btn-wrap">
          <div className="btn-line">
            <div
              className={classnames('useful-materials__dropdown-wrap', {
                open: open,
              })}
            >
              <button
                className="button button--violet useful-materials__dropdown-trigger"
                onClick={handleToggleDropdown}
              >
                {t('mainPage.sections.materials.links.download')}
              </button>
              <div className="useful-materials__dropdown">
                <ul className="useful-materials__dropdown-list">
                  <li className="useful-materials__dropdown-list-item">
                    <a
                      href={presentationEN}
                      download="Start Presentation EN"
                      className="useful-materials__dropdown-link"
                      onClick={() => setOpen(false)}
                    >
                      English
                    </a>
                  </li>

                  <li className="useful-materials__dropdown-list-item">
                    <a
                      href={presentationRU}
                      download="Start Presentation RU"
                      className="useful-materials__dropdown-link"
                      onClick={() => setOpen(false)}
                    >
                      Русский
                    </a>
                  </li>

                  <li className="useful-materials__dropdown-list-item">
                    <a
                      href={presentationKK}
                      download="Start Presentation KZ"
                      className="useful-materials__dropdown-link"
                      onClick={() => setOpen(false)}
                    >
                      Қазақша
                    </a>
                  </li>

                  <li className="useful-materials__dropdown-list-item">
                    <a
                      href={presentationMN}
                      download="Start Presentation MN"
                      className="useful-materials__dropdown-link"
                      onClick={() => setOpen(false)}
                    >
                      Монгол
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div>
              <a
                className="button button--violet"
                download="Stars Brand Book"
                href={brandBook}
              >
                Скачать Брендбук
              </a>
            </div>
          </div>
          <a
            className="useful-materials__btn-watch button button--svg-evlipses"
            href="https://www.youtube.com/watch?v=Y5d4xq0QEdM&t=4s"
            rel="noreferrer"
            target="_blank"
          >
            <span> {t('mainPage.sections.materials.links.watch')}</span>
            <svg
              className="button__svg-eclipses"
              width="92"
              height="93"
              viewBox="0 0 92 93"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="46" cy="46.9619" r="30" fill="white" />
              <circle opacity="0.3" cx="46" cy="46.9619" r="46" fill="white" />
              <path
                d="M42 39.9619V53.9619L53 46.9619L42 39.9619Z"
                fill="#11032C"
              />
            </svg>
          </a>
        </div>
        <div className="useful-materials__img-wrap">
          <img src={starsPic} alt="" className="useful-materials__img" />
        </div>
      </div>
    </section>
  );
}

export default Materials;
