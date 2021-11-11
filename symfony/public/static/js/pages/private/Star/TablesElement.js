import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import classnames from 'classnames';

import { matrixActions } from 'store/matrix/actions';

function TablesElement({ matrix, transform, urlPrefix }) {

  const dispatch = useDispatch();
  const pointClass = classnames('circle__point', {
    'circle__point--active': matrix.isActive,
  });

  const saveMatrixInfo = useCallback(
    matrixInfo => {
      dispatch(matrixActions.saveCurrentMatrix(matrixInfo));
    },
    [dispatch],
  );

  return (
    <Link
      style={{ transform }}
      className={pointClass}
      to={`/${urlPrefix}/${matrix.id}`}
      onClick={() => saveMatrixInfo(matrix)}
    >
      <div className="circle__star">
        <svg viewBox="0 0 34 32">
          <path d="M16.266 0.485c0.187-0.483 0.871-0.483 1.058 0l3.998 10.317c0.081 0.208 0.275 0.349 0.497 0.361l11.047 0.615c0.517 0.029 0.728 0.679 0.327 1.006l-8.576 6.991c-0.173 0.141-0.247 0.369-0.19 0.585l2.829 10.697c0.132 0.501-0.42 0.903-0.856 0.622l-9.299-5.996c-0.187-0.121-0.428-0.121-0.615 0l-9.299 5.996c-0.435 0.281-0.988-0.121-0.856-0.622l2.829-10.697c0.057-0.215-0.017-0.444-0.19-0.585l-8.576-6.991c-0.402-0.327-0.19-0.977 0.327-1.006l11.047-0.615c0.222-0.012 0.417-0.154 0.497-0.361l3.998-10.317z"></path>
        </svg>
      </div>
      <span className="circle__point-number">{matrix.id}</span>
      {!!Number(matrix.count) && (
        <span className="circle__point-count">{matrix.count}</span>
      )}
      {!!Number(matrix.clones) && (
        <span className="circle__point-clones">{matrix.clones}</span>
      )}
    </Link>
  );
}

export default TablesElement;
