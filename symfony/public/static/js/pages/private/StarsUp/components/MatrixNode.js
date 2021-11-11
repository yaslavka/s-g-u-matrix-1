import React, { useMemo, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import confirm from 'reactstrap-confirm';
import { toast } from 'react-toastify';
import classnames from 'classnames';
import { declOfNum } from 'utils';
import noop from 'lodash-es/noop';

import * as actions from 'actions/starsup.actions';
import avatarFallback from 'static/images/placeholder.svg';
import Icon from 'components/Icon';

const MatrixNode = ({
  nodeDatum,
  toggleNode,
  hierarchyPointNode,
  foreignObjectProps,
  structureObj,
}) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const clones = useSelector(state => state.starsupTable.clones);

  const attributes = useMemo(() => nodeDatum.attributes, [nodeDatum]);

  const handleInstallUser = ({ place }, { parent }) => {
    const ancestor = parent.data.attributes.id;
    if (ancestor) {
      dispatch(
        actions.toggleStarsUpUsersForInstallModal(true, { ancestor, place }),
      );
    }
  };

  const handleInstallClone = useCallback(
    async ({ place }, { parent }) => {
      const ancestor = parent.data.attributes.id;
      if (clones > 0) {
        let result = await confirm({
          title: 'Установка клона',
          message: (
            <div>
              <p>Вы действительно хотите установить клона в эту ячейку?</p> У
              вас <b>{clones}</b>{' '}
              {declOfNum(clones, ['клон', 'клона', 'клонов'])}
            </div>
          ),
          confirmText: 'Подтвердить',
          confirmColor: 'primary',
          cancelText: 'Отмена',
          cancelColor: 'link text-muted',
        });

        if (result && clones && ancestor && structureObj) {
          dispatch(
            actions.starsupInstallClone({ ancestor, place }, structureObj),
          );
        }
      } else {
        toast.error('У вас недостаточное количество клонов');
      }
    },
    [clones, dispatch, structureObj],
  );

  const handleRedirectToMatrix = useCallback(() => {
    const matrixId = attributes.id;
    if (matrixId) {
      history.push(`/starsup/table/${matrixId}`);
    } else {
      noop();
    }
  }, [attributes, history]);

  const graphImageClass = useMemo(
    () =>
      classnames('graph-image', {
        'graph-image--interactive': Boolean(attributes.id),
      }),
    [attributes],
  );

  const renderNodeAvatar = useMemo(() => {
    const baseUrl = `${process.env.REACT_APP_BASE_URL}/getFile/avatar`;
    const {
      name,
      attributes: { avatar = null },
    } = nodeDatum;
    return (
      <img src={avatar ? `${baseUrl}/${avatar}` : avatarFallback} alt={name} />
    );
  }, [nodeDatum]);

  return (
    <foreignObject {...foreignObjectProps}>
      <div className="graph-box">
        <div onClick={handleRedirectToMatrix} className={graphImageClass}>
          {renderNodeAvatar}
        </div>
        <div className="graph-header">
          {Boolean(attributes.count) && (
            <div className="graph-count">{attributes.count}</div>
          )}
        </div>
        <div
          className="graph-container"
          title={attributes.date}
          onClick={nodeDatum.children && !attributes.last ? toggleNode : noop()}
        >
          {nodeDatum.name ? (
            <>
              <div className="graph-title">{nodeDatum.name}</div>{' '}
              {!attributes.last &&
                (!nodeDatum.__rd3t.collapsed ? (
                  <Icon iconName="chevron-down" />
                ) : (
                  <Icon iconName="chevron-left" />
                ))}
            </>
          ) : (
            <>
              <button
                type="button"
                title="Установить пользователя"
                onClick={() => handleInstallUser(nodeDatum, hierarchyPointNode)}
              >
                <Icon iconName="user-add" />
              </button>
              <button
                type="button"
                title="Установить клона"
                onClick={() =>
                  handleInstallClone(nodeDatum, hierarchyPointNode)
                }
              >
                <Icon iconName="user" />
              </button>
            </>
          )}
        </div>
      </div>
    </foreignObject>
  );
};

export default MatrixNode;
