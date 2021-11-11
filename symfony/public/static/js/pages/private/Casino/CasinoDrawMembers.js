import React, { useMemo, useState } from 'react';
import {
  Modal,
  ModalHeader,
  ModalBody,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';
import { useSelector } from 'react-redux';
import isEmpty from 'lodash-es/isEmpty';
import classnames from 'classnames';

function CasinoDrawMembers({ draw, memberVisible, toggleMemberModal }) {
  const [memberSearch, setMemberSearch] = useState('');
  const [activeTab, setActiveTab] = useState('members');
  const userId = useSelector(state => state.app.user?.id);

  const toggle = tab => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  const members = useMemo(() => {
    let arrayUsers = [];
    const persons =
      activeTab === 'members'
        ? (draw && draw.members) || []
        : (draw && draw.winners) || [];

    if (draw) {
      arrayUsers = persons.filter(member =>
        member.userName.toLowerCase().includes(memberSearch.toLowerCase()),
      );
    }
    return arrayUsers;
  }, [draw, activeTab, memberSearch]);

  const handleOnChangeSearch = event => setMemberSearch(event.target.value);

  return (
    <Modal
      size="lg"
      keyboard={false}
      backdrop="static"
      isOpen={memberVisible}
      toggle={toggleMemberModal}
    >
      <ModalHeader toggle={toggleMemberModal}>Участники розыгрыша</ModalHeader>
      <ModalBody>
        <Nav pills>
          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === 'members' })}
              onClick={() => toggle('members')}
            >
              Участники
            </NavLink>
          </NavItem>
          {draw && draw.dateEnd && (
            <NavItem>
              <NavLink
                className={classnames({ active: activeTab === 'winners' })}
                onClick={() => toggle('winners')}
              >
                Победители
              </NavLink>
            </NavItem>
          )}
        </Nav>
        <br />
        <div className="casino-draw-members">
          <div className="casino-draw-members__search">
            <input
              type="text"
              autoComplete="off"
              onChange={handleOnChangeSearch}
              placeholder={`Поиск ${
                activeTab === 'members' ? 'участника' : 'победителя'
              } по логину`}
            />
          </div>
          {!isEmpty(members) ? (
            <ul className="casino-draw-members__list">
              {members.map(member => (
                <li key={member.id}>
                  <figure className="casino-draw-members__element">
                    <div
                      className="circle"
                      style={{
                        boxShadow: `0 0 25px 5px ${
                          member.userId === userId ? '#df56fb' : '#00c3e1'
                        }`,
                      }}
                    >
                      <div className="picture">
                        {member.photo && (
                          <img
                            className="avatar"
                            alt={member.userName}
                            src={`${process.env.REACT_APP_BASE_URL}${member.photo}`}
                          />
                        )}
                      </div>
                    </div>
                    <figcaption>
                      <div className="name">{member.userName}</div>
                    </figcaption>
                  </figure>
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-center h5">Не найдено ни одного участника</div>
          )}
        </div>
      </ModalBody>
    </Modal>
  );
}

export default CasinoDrawMembers;
