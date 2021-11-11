import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import styles from './AutoStars.module.scss';
import car from '../../../static/images/auto-stars-car.gif';
import slogan from '../../../static/images/premium-star.svg';
import pdfPreview from '../../../static/images/pdfPreview/pdf-preview-premiumstars.jpg';
import carLarge from '../../../static/images/auto-stars-car-large.gif';
import pptRU from '../../../static/documents/premiumstar/premiumstar_ru.pdf';
import pptES from '../../../static/documents/premiumstar/premiumstar_es.pdf';
import { api } from '../../../api';
import { matrixActions } from '../../../store/matrix/actions';

import UserInfo from '../../../components/UserInfo';
import NavBar from '../../../components/layout/Navbar';
import Icon from '../../../components/Icon';

export default function AutoStars() {
  const [matrixTypes, setMatrixTypes] = useState(null);
  const dispatch = useDispatch();

  const saveMatrixInfo = matrixInfo => {
    dispatch(matrixActions.saveCurrentMatrix(matrixInfo));
  };

  useEffect(() => {
    api
      .getAutoMatrixTypes()
      .then(response => {
        response.items = matrixTypes;
        if (Array.isArray(response.items)) {
          dispatch(matrixActions.saveUserMatrices(response.items));
          setMatrixTypes(response.items);
        }
      })
      .catch(() => {});
  }, [dispatch]);

  return (
    <div className={styles.AutoStars}>
      <Container>
        <Row>
          <Col className="d-none d-xl-block" xl={3}>
            <UserInfo />
            <NavBar />
          </Col>
          <Col xs={12} xl={9}>
            <h2 className={styles.mainTitle}>Auto Stars</h2>
            {matrixTypes && (
              <div className={styles.tables}>
                <div className={styles.head}>
                  <Link
                    to="/personal-premium-table/3"
                    className={styles.table}
                    onClick={() => {
                      saveMatrixInfo(matrixTypes[2]);
                    }}
                  >
                    <svg
                      className={matrixTypes[2].isActive ? styles.active : ''}
                      width="70"
                      height="66"
                      viewBox="0 0 70 66"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M33.884 1.185c.386-.995 1.794-.995 2.18 0l8.235 21.25c.166.427.567.719 1.025.744l22.755 1.266c1.065.06 1.5 1.398.673 2.072l-17.665 14.4c-.355.29-.509.761-.391 1.204l5.827 22.033c.273 1.032-.866 1.86-1.763 1.28l-19.153-12.35a1.168 1.168 0 00-1.267 0l-19.153 12.35c-.897.58-2.036-.248-1.763-1.28l5.828-22.032a1.168 1.168 0 00-.392-1.205l-17.665-14.4c-.827-.674-.392-2.012.674-2.072l22.755-1.266a1.169 1.169 0 001.024-.744l8.236-21.25z"
                        fill="#8083E6"
                      />
                    </svg>
                    <span>3</span>
                    {!!Number(matrixTypes[2].count) && (
                      <div className={styles.count}>{matrixTypes[2].count}</div>
                    )}
                  </Link>
                </div>
                <div className={styles.secondRow}>
                  <Link
                    to="/personal-premium-table/2"
                    className={styles.table}
                    onClick={() => {
                      saveMatrixInfo(matrixTypes[1]);
                    }}
                  >
                    <svg
                      className={matrixTypes[1].isActive ? styles.active : ''}
                      width="70"
                      height="66"
                      viewBox="0 0 70 66"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M33.884 1.185c.386-.995 1.794-.995 2.18 0l8.235 21.25c.166.427.567.719 1.025.744l22.755 1.266c1.065.06 1.5 1.398.673 2.072l-17.665 14.4c-.355.29-.509.761-.391 1.204l5.827 22.033c.273 1.032-.866 1.86-1.763 1.28l-19.153-12.35a1.168 1.168 0 00-1.267 0l-19.153 12.35c-.897.58-2.036-.248-1.763-1.28l5.828-22.032a1.168 1.168 0 00-.392-1.205l-17.665-14.4c-.827-.674-.392-2.012.674-2.072l22.755-1.266a1.169 1.169 0 001.024-.744l8.236-21.25z"
                        fill="#8083E6"
                      />
                    </svg>
                    <span>2</span>
                    {!!Number(matrixTypes[1].count) && (
                      <div className={styles.count}>{matrixTypes[1].count}</div>
                    )}
                  </Link>
                  <Link
                    to="/personal-premium-table/4"
                    className={styles.table}
                    onClick={() => {
                      saveMatrixInfo(matrixTypes[3]);
                    }}
                  >
                    <svg
                      className={matrixTypes[3].isActive ? styles.active : ''}
                      width="70"
                      height="66"
                      viewBox="0 0 70 66"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M33.884 1.185c.386-.995 1.794-.995 2.18 0l8.235 21.25c.166.427.567.719 1.025.744l22.755 1.266c1.065.06 1.5 1.398.673 2.072l-17.665 14.4c-.355.29-.509.761-.391 1.204l5.827 22.033c.273 1.032-.866 1.86-1.763 1.28l-19.153-12.35a1.168 1.168 0 00-1.267 0l-19.153 12.35c-.897.58-2.036-.248-1.763-1.28l5.828-22.032a1.168 1.168 0 00-.392-1.205l-17.665-14.4c-.827-.674-.392-2.012.674-2.072l22.755-1.266a1.169 1.169 0 001.024-.744l8.236-21.25z"
                        fill="#8083E6"
                      />
                    </svg>
                    <span>4</span>
                    {!!Number(matrixTypes[3].count) && (
                      <div className={styles.count}>{matrixTypes[3].count}</div>
                    )}
                  </Link>
                </div>
                <div className={styles.thirdRow}>
                  <Link
                    to="/personal-premium-table/1"
                    className={styles.table}
                    onClick={() => {
                      saveMatrixInfo(matrixTypes[0]);
                    }}
                  >
                    <svg
                      className={matrixTypes[0].isActive ? styles.active : ''}
                      width="70"
                      height="66"
                      viewBox="0 0 70 66"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M33.884 1.185c.386-.995 1.794-.995 2.18 0l8.235 21.25c.166.427.567.719 1.025.744l22.755 1.266c1.065.06 1.5 1.398.673 2.072l-17.665 14.4c-.355.29-.509.761-.391 1.204l5.827 22.033c.273 1.032-.866 1.86-1.763 1.28l-19.153-12.35a1.168 1.168 0 00-1.267 0l-19.153 12.35c-.897.58-2.036-.248-1.763-1.28l5.828-22.032a1.168 1.168 0 00-.392-1.205l-17.665-14.4c-.827-.674-.392-2.012.674-2.072l22.755-1.266a1.169 1.169 0 001.024-.744l8.236-21.25z"
                        fill="#8083E6"
                      />
                    </svg>
                    <span>1</span>
                    {!!Number(matrixTypes[0].count) && (
                      <div className={styles.count}>{matrixTypes[0].count}</div>
                    )}
                  </Link>
                  <Link
                    to="/personal-premium-table/5"
                    className={styles.table}
                    onClick={() => {
                      saveMatrixInfo(matrixTypes[4]);
                    }}
                  >
                    <svg
                      className={matrixTypes[4].isActive ? styles.active : ''}
                      width="70"
                      height="66"
                      viewBox="0 0 70 66"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M33.884 1.185c.386-.995 1.794-.995 2.18 0l8.235 21.25c.166.427.567.719 1.025.744l22.755 1.266c1.065.06 1.5 1.398.673 2.072l-17.665 14.4c-.355.29-.509.761-.391 1.204l5.827 22.033c.273 1.032-.866 1.86-1.763 1.28l-19.153-12.35a1.168 1.168 0 00-1.267 0l-19.153 12.35c-.897.58-2.036-.248-1.763-1.28l5.828-22.032a1.168 1.168 0 00-.392-1.205l-17.665-14.4c-.827-.674-.392-2.012.674-2.072l22.755-1.266a1.169 1.169 0 001.024-.744l8.236-21.25z"
                        fill="#8083E6"
                      />
                    </svg>
                    <span>5</span>
                    {!!Number(matrixTypes[4].count) && (
                      <div className={styles.count}>{matrixTypes[4].count}</div>
                    )}
                  </Link>
                </div>
              </div>
            )}
            <div className={styles.banner}>
              <img
                src={slogan}
                className={styles.autoStarsTitle}
                alt="Premium Stars"
              />
              <picture className={styles.car}>
                <source srcSet={car} media="(max-width: 1199px)" />
                <source srcSet={carLarge} media="(min-width: 1200px)" />
                <img src={car} alt="" />
              </picture>
            </div>

            <br />
            <br />
            <br />
            <br />
            <br />
            <div className="pdf-preview">
              <h2 className="pdf-preview__title">Презентации</h2>
              <div className="pdf-preview__container">
                <div className="pdf-preview__picture">
                  <img src={pdfPreview} alt="Stars" />
                </div>
                <div className="pdf-preview__download">
                  <ul>
                    <li>
                      <a href={pptRU} download>
                        <Icon iconName="download" />
                        Скачать RU
                      </a>
                    </li>
                    <li>
                      <a href={pptES} download>
                        <Icon iconName="download" />
                        Descargar ES
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
