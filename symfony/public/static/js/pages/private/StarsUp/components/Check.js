import React, { useCallback, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { resizeFreeInformationImage } from 'utils';
import * as htmlToImage from 'html-to-image';
import { Button } from 'reactstrap';
import { saveAs } from 'file-saver';
import Raven from 'raven-js';

import avatar from 'static/images/placeholder.svg';
import inImage from 'static/images/in-image.svg';
import vkImage from 'static/images/vk-image.svg';
import tgImage from 'static/images/tg-image.svg';

import { formatterNumber } from 'utils';
import * as actions from 'actions/app.actions';

import Icon from 'components/Icon';

const Check = () => {
  const dispatch = useDispatch();
  const info = useSelector(state => state.starsup.info);
  const userInfo = useSelector(state => state.app.user);
  const isLoadingPublish = useSelector(state => state.app.loadings.publish);
  const [freeInfoAvatar, setFreeInfoAvatar] = useState(null);

  useEffect(() => {
    async function fetchImage() {
      if (userInfo?.avatar) {
        const load = await fetch(
          `${process.env.REACT_APP_BASE_URL}${userInfo.avatar}`,
        );
        const blob = await load.blob();
        const resizeImage = await resizeFreeInformationImage(blob);
        setFreeInfoAvatar(resizeImage);
      } else {
        setFreeInfoAvatar(avatar);
      }
    }
    fetchImage();
  }, [userInfo]);

  const downloadSummary = useCallback(async () => {
    dispatch(actions.publishSummaryToTelegram());
    try {
      const imgData = await htmlToImage.toBlob(
        document.getElementById('user_summary'),
        {
          style: { backgroundColor: '#130132' },
          cacheBust: true,
          pixelRatio: 1,
        },
      );

      if (imgData && info?.income && userInfo?.avatar) {
        // Send to Telegram
        dispatch(actions.publishSummaryToTelegramUpload(imgData));
      } else if (imgData && userInfo) {
        const filename = userInfo.firstName.trim()
          ? `stars-up-${userInfo.firstName.trim()}`
          : 'stars-up';

        saveAs(imgData, `${filename}.jpeg`);
      }
    } catch (error) {
      Raven.captureException(error);
    }
  }, [dispatch, info, userInfo]);

  return userInfo && info && (
    <div className="free-information">
      <Button
        disabled={isLoadingPublish}
        className="free-information__download"
        onClick={downloadSummary}
        color="link"
      >
        <Icon iconName="download" />
      </Button>
      <div className="free-information__render" id="user_summary">
        <figure className="free-information__avatar">
          <img
            src={freeInfoAvatar || avatar}
            alt={`${userInfo.firstName} ${userInfo.lastName}`}
          />
        </figure>
        <div className="free-information__name">
          <div>{userInfo.firstName}</div>
          <div>{userInfo.lastName}</div>
        </div>
        <ul className="free-information__social">
          <li>
            {userInfo.myInstagram ? (
              <a
                href={`https://www.instagram.com/${userInfo.myInstagram}`}
                rel="noreferrer"
                target="_blank"
              >
                <img
                  className="free-information__social--image"
                  src={inImage}
                  alt={userInfo.myInstagram}
                />
                {userInfo.myInstagram}
              </a>
            ) : (
              '-'
            )}
          </li>
          <li>
            {userInfo.myTg ? (
              <a
                href={`https://t.me/${userInfo.myTg}`}
                rel="noreferrer"
                target="_blank"
              >
                <img
                  className="free-information__social--image"
                  src={tgImage}
                  alt={userInfo.myTg}
                />
                {userInfo.myTg}
              </a>
            ) : (
              '-'
            )}
          </li>
          <li>
            {userInfo.myVk ? (
              <a
                href={`https://vk.com/${userInfo.myVk}`}
                rel="noreferrer"
                target="_blank"
              >
                <img
                  className="free-information__social--image"
                  src={vkImage}
                  alt={userInfo.myVk}
                />
                {userInfo.myVk}
              </a>
            ) : (
              '-'
            )}
          </li>
        </ul>
        <div className="free-information__total">
          <div>Общий чек Stars Up</div>
          <strong>
            {formatterNumber.format(info.income || 0).replace('₽', 'ST')}
          </strong>
        </div>
      </div>
    </div>
  );
};

export default Check;
