import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { api } from 'api';
import logo from '../../../static/images/ss-logo-text.svg';
import pdfPreview from '../../../static/images/pdfPreview/pdf-preview-super-star.jpg';
import pptRU from 'static/documents/superstar/superstar_ru.pdf';
import pptMN from 'static/documents/superstar/superstar_mn.pdf';
import pptKZ from 'static/documents/superstar/superstar_kz.pdf';
import pptEN from 'static/documents/superstar/superstar_en.pdf';
import pptES from 'static/documents/superstar/superstar_es.pdf';
import { matrixActions } from 'store/matrix/actions';
import styles from './SuperStars.module.scss';

import TablesElement from '../Star/TablesElement';
import NavBar from 'components/layout/Navbar';
import UserInfo from 'components/UserInfo';
import Icon from 'components/Icon';

function SuperStars() {
  const dispatch = useDispatch();
  const [matrixTypes, setMatrixTypes] = useState([]);

  useEffect(() => {
    api
      .ssMatrixTypes()
      .then(response => {
        if (Array.isArray(response.items)) {
          dispatch(matrixActions.saveUserMatrices(response.items));
          setMatrixTypes(response.items);
        }
      })
      .catch(() => {});
  }, [dispatch]);
  return (
    <div className={styles.SuperStars}>
      <Container>
        <Row>
          <Col className="d-none d-xl-block" xl={3}>
            <div className={styles.userInfo}>
              <UserInfo />
            </div>
            <NavBar />
          </Col>
          <Col xl={9}>
            <div className="circle-stars__container">
              <div className="circle__container">
                <div className="circle__center">
                  <div className="circle__center-content">
                    <img src={logo} alt="Super Stars" />
                  </div>
                </div>
                {matrixTypes.map((matrix, i) => {
                  const deg = -90 + i * (360 / matrixTypes.length);
                  const deg2 = deg * -1;
                  const transform =
                    'rotate(' +
                    deg +
                    'deg) translate(15em) rotate(' +
                    deg2 +
                    'deg)';
                  return (
                    <TablesElement
                      key={i.toString()}
                      urlPrefix="personal-super-star-table"
                      transform={transform}
                      matrix={matrix}
                    />
                  );
                })}
              </div>
            </div>
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
                      <a href={pptEN} download>
                        <Icon iconName="download" />
                        Download EN
                      </a>
                    </li>
                    <li>
                      <a href={pptKZ} download>
                        <Icon iconName="download" />
                        Жүктеу KZ
                      </a>
                    </li>
                    <li>
                      <a href={pptMN} download>
                        <Icon iconName="download" />
                        Татаж авах MN
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

export default SuperStars;
