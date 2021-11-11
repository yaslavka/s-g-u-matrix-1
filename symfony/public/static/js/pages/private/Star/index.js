import React, { useEffect, useState } from 'react';
import { Row, Col, Container } from 'reactstrap';
import { useDispatch } from 'react-redux';
import isEmpty from 'lodash/isEmpty';

import { matrixActions } from 'store/matrix/actions';
import logo from '../../../static/images/logo-text.svg';
import pdfPreview from '../../../static/images/pdfPreview/pdf-preview-stars.jpg';
import pptRU from 'static/documents/star/star_ru.pdf';
import pptMN from 'static/documents/star/star_mn.pdf';
import pptKZ from 'static/documents/star/star_kz.pdf';
import pptES from 'static/documents/star/star_es.pdf';
import pptEN from 'static/documents/star/star_en.pdf';
import styles from './Tables.module.scss';
import { api } from 'api';

import TablesElement from './TablesElement';
import NavBar from 'components/layout/Navbar';
import UserInfo from 'components/UserInfo';
import Icon from 'components/Icon';

function Tables() {
  const dispatch = useDispatch();
  const [matrixTypes, setMatrixTypes] = useState([]);

  useEffect(() => {
    api
      .getMatrixCloneStatTypes()
      .then(cloneStats => {
        api
          .getMatrixTypes()
          .then(response => {
            if (!isEmpty(cloneStats.items) && !isEmpty(response.items)) {
              const newArrayItems = response.items.map((type, index) => ({
                ...type,
                clones: cloneStats.items[index].count,
              }));

              dispatch(matrixActions.saveUserMatrices(newArrayItems));
              setMatrixTypes(newArrayItems);
            }
          })
          .catch(() => {});
      })
      .catch(() => {});
  }, [dispatch]);

  return (
    <div className={styles.Tables}>
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
                    <img src={logo} alt="Stars" />
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
                      urlPrefix="personal-table"
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
                      <a href={pptES} download>
                        <Icon iconName="download" />
                        Descargar ES
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

export default Tables;
