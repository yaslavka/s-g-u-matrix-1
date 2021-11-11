import React, { useEffect, useMemo, useState, useRef } from 'react';
import { useParams, useHistory, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useDebouncedCallback } from 'use-debounce';
import isEmpty from 'lodash-es/isEmpty';
import {
  Button,
  Container,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';
import Tree from 'react-d3-tree';

import * as actions from 'actions/starsup.actions';
import InstallPartners from 'components/Modals/StarsUp/InstallPartners';
import ArrangeClones from 'components/Modals/StarsUp/ArrangeClones';
import SearchUser from 'components/Modals/StarsUp/SearchUser';
import MatrixNode from './components/MatrixNode';
import Spinner from 'components/Spinner';
import Icon from 'components/Icon';

import { useCenteredTree } from '../../../hooks/useCenteredTree';

const nodeSize = { x: 100, y: 115 };
const foreignObjectProps = {
  width: nodeSize.x,
  height: nodeSize.y,
  x: -50,
  y: -50,
};

const defaultTreeOptions = {
  translate: { x: 0, y: 0 },
  zoom: 1,
};

const StarsUpTable = ({ location: { state = {}, pathname } }) => {
  const tree = useRef();
  const history = useHistory();
  const dispatch = useDispatch();
  const { level, matrixId } = useParams();
  const [translate, containerRef] = useCenteredTree();
  const [treeOptions, setTreeOptions] = useState(defaultTreeOptions);
  const isLoading = useSelector(state => state.starsupTable.loadings.structure);
  const structureLevel = useSelector(state => state.starsupTable.level);
  const structure = useSelector(state => state.starsupTable.structure);

  const structureObj = useMemo(
    () =>
      (level && { level: Number(level) }) ||
      (matrixId && { matrixId: Number(matrixId) }),
    [level, matrixId],
  );

  const onUpdateDebounced = useDebouncedCallback(({ zoom, translate }) => {
    if (
      treeOptions.zoom !== zoom ||
      treeOptions.translate.x !== translate.x ||
      treeOptions.translate.y !== translate.y
    ) {
      setTreeOptions({ zoom, translate });
    }
  }, 800);

  const handleUpStructure = useMemo(() => {
    const handleOnClick = () => {
      if (!isEmpty(state) && state.query && state.meta) {
        history.push(`/starsup/person/${structureLevel}/queue`, {
          query: state.query,
          meta: state.meta,
        });
      } else if (matrixId) {
        history.goBack();
      } else {
        history.push('/starsup');
      }
    };
    return matrixId ? (
      <Button color="primary" onClick={handleOnClick}>
        Наверх
      </Button>
    ) : (
      <Button
        className="root-page-header__back"
        onClick={handleOnClick}
        disabled={isLoading}
        color="link"
        size="lg"
      >
        <Icon iconName="back" />
      </Button>
    );
  }, [history, isLoading, structureLevel, matrixId, state]);

  const handleArrangeClone = () =>
    dispatch(actions.toggleStarsUpArrangeClonesModal());

  const handleSearchUser = () =>
    dispatch(actions.toggleStarsUpSearchUserModal());

  useEffect(() => {
    if (Object.values(treeOptions.translate).join('') === '00') {
      setTreeOptions({ zoom: window.innerWidth < 900 ? 0.5 : 1, translate });
    }
  }, [translate, treeOptions]);

  useEffect(() => {
    dispatch(actions.starsupStructure(structureObj));
  }, [dispatch, structureObj]);

  return (
    <div className="root-page--starsup">
      <Container className="root-page">
        <div className="root-page-header">
          <div className="root-page-header__left">{handleUpStructure}</div>
          <h1 className="root-page-title">StarsUp LVL {structureLevel}</h1>
          <div className="root-page-header__right">
            <UncontrolledDropdown>
              <DropdownToggle color="link" className="settings-link" caret>
                <Icon iconName="settings" />
              </DropdownToggle>
              <DropdownMenu right>
                {level && (
                  <>
                    <DropdownItem onClick={handleSearchUser}>
                      Поиск по логину
                    </DropdownItem>
                    <DropdownItem onClick={handleArrangeClone}>
                      Расставить клонов
                    </DropdownItem>
                    <DropdownItem
                      tag={Link}
                      to={`/starsup/person/${level}/queue`}
                    >
                      Очередь
                    </DropdownItem>
                    <DropdownItem divider />
                  </>
                )}
                <DropdownItem
                  onClick={() => setTreeOptions(defaultTreeOptions)}
                >
                  Сбросить вид
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </div>
        </div>
      </Container>
      <Spinner isLoading={isLoading}>
        <div ref={containerRef} className="starsup__graph">
          {!isEmpty(structure) && (
            <Tree
              ref={tree}
              pathFunc="step"
              data={structure}
              // initialDepth={3}
              nodeSize={nodeSize}
              orientation="vertical"
              leafNodeClassName="graph-leaf-node"
              rootNodeClassName="graph-root-node"
              branchNodeClassName="graph-branch-node"
              translate={treeOptions.translate}
              zoom={treeOptions.zoom}
              separation={{ siblings: 1.2, nonSiblings: 1.2 }}
              scaleExtent={{ min: 0.3, max: 1 }}
              onUpdate={onUpdateDebounced}
              renderCustomNodeElement={rd3tProps => (
                <MatrixNode
                  {...rd3tProps}
                  foreignObjectProps={foreignObjectProps}
                  structureObj={structureObj}
                />
              )}
            />
          )}
        </div>
      </Spinner>
      <InstallPartners structureObj={structureObj} />
      <SearchUser />
      <ArrangeClones />
    </div>
  );
};

export default StarsUpTable;
