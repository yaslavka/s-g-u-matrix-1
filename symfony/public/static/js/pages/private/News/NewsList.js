import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ReactPaginate from 'react-paginate';
import { Link } from 'react-router-dom';
import { Row, Col } from 'reactstrap';
import isEmpty from 'lodash-es/isEmpty';
import styles from './News.module.scss';

import * as actions from 'actions/news.actions';
import arrowRight from 'static/icons/angle-right.svg';
import arrowLeft from 'static/icons/angle-left.svg';

function NewsList() {
  const dispatch = useDispatch();
  const list = useSelector(state => state.news.list);
  const { limit } = useSelector(state => state.news.query);
  const { total, page } = useSelector(state => state.news.meta);
  const isLoading = useSelector(state => state.news.isLoading);

  const handleOnChangePage = useCallback(
    page => {
      dispatch(actions.setNewsListPage(page));
    },
    [dispatch],
  );

  return (
    <>
      <h1 className="root-page-title">Новости</h1>
      {!isEmpty(list) ? (
        <Row>
          {list.map(({ id, image, ruTitle, ruDescription }) => (
            <Col lg={6} key={id}>
              <figure className="news__figure">
                <Link className="news__figure-image" to={`/news/${id}`}>
                  <img
                    src={`${process.env.REACT_APP_BASE_URL}${image}`}
                    alt={ruTitle}
                  />
                </Link>
                <figcaption className="news__figure-body">
                  <h3 className="news__figure-title">{ruTitle}</h3>
                  <div className="news__figure-description">
                    {ruDescription}
                  </div>
                  <Link className="news__figure-link" to={`/news/${id}`}>
                    Подробнее
                  </Link>
                </figcaption>
              </figure>
            </Col>
          ))}
        </Row>
      ) : (
        <h4 className="text-center mb-5 mt-5">
          К сожалению в данный момент новости отсутствуют
        </h4>
      )}
      {!isEmpty(list) && !isLoading && (
        <ReactPaginate
          forcePage={page}
          marginPagesDisplayed={1}
          activeClassName={styles.active}
          pageCount={Math.ceil(total / limit)}
          onPageChange={props => handleOnChangePage(props.selected)}
          containerClassName={styles.pagination}
          previousLabel={
            <img
              src={arrowLeft}
              className={styles.arrowLeft}
              alt="Arrow left"
            />
          }
          nextLabel={
            <img
              src={arrowRight}
              className={styles.arrowRight}
              alt="Arrow right"
            />
          }
        />
      )}
    </>
  );
}

export default NewsList;
