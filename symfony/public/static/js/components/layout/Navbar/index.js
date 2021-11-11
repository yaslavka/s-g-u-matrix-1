import { NavLink } from 'react-router-dom';
import styles from './NavBar.module.scss';
import routes from '../../../constants/routes.constants';
import user from '../../../static/icons/user.svg';
import news from '../../../static/icons/news.svg';
import question from '../../../static/icons/question.svg';
import money from '../../../static/icons/money-coin.svg';
import team from '../../../static/icons/team.svg';
import car from '../../../static/icons/car.svg';
import logo from '../../../static/icons/logo.svg';
import superstar from '../../../static/icons/suprestar.svg';
import luckyStar from '../../../static/icons/lucky-star.svg';
import starsUp from '../../../static/icons/starsup-logo.svg';

// import megaphone from 'static/icons/megaphone.svg';
import cap from '../../../static/icons/academic-cap.svg';
// import chat from 'static/icons/chat.svg';
// import reviews from 'static/icons/reviews.svg';
import gear from '../../../static/icons/gear.svg';
import leader from '../../../static/icons/leader.svg';

const navbarLinks = [
  {
    label: 'Мой куратор',
    route: routes.leader,
    isDisabled: false,
    icon: leader,
  },
  {
    label: 'Личный кабинет',
    route: routes.dashboard,
    isDisabled: false,
    icon: user,
  },
  {
    label: 'Новости',
    route: routes.news,
    isDisabled: false,
    icon: news,
  },
  {
    label: 'Stars',
    route: routes.tables,
    isDisabled: false,
    icon: logo,
  },
  {
    label: 'Premium Stars',
    route: routes.premiumStars,
    isDisabled: false,
    icon: car,
  },
  {
    label: 'Super Stars',
    route: routes.superStars,
    isDisabled: false,
    icon: superstar,
  },
  {
    label: 'Lucky Star',
    route: routes.casino,
    isDisabled: false,
    icon: luckyStar,
  },
  {
    label: 'Star Trek',
    route: routes.starTrek,
    isDisabled: false,
    icon: logo,
  },
  {
    label: 'Stars Up',
    route: routes.starsUp,
    isDisabled: false,
    icon: starsUp,
  },
  {
    label: 'О нас',
    route: routes.aboutUs,
    isDisabled: false,
    icon: question,
  },
  {
    label: 'Финансы',
    route: routes.finances,
    isDisabled: false,
    icon: money,
  },
  {
    label: 'Команда',
    route: routes.team,
    isDisabled: false,
    icon: team,
  },
  // {
  //   label: 'Промо',
  //   route: routes.promo,
  //   isDisabled: true,
  //   icon: megaphone,
  // },
  {
    label: 'Обучение',
    route: routes.education,
    isDisabled: false,
    icon: cap,
  },
  // {
  //   label: 'Чат участников',
  //   isDisabled: true,
  //   route: routes.chat,
  //   icon: chat,
  // },
  // {
  //   label: 'Отзывы',
  //   route: routes.reviews,
  //   isDisabled: true,
  //   icon: reviews,
  // },
  {
    label: 'Настройки',
    route: routes.settings,
    isDisabled: false,
    icon: gear,
  },
];

function NavBar() {
  return (
    <nav className={styles.NavBar}>
      {navbarLinks.map(({ label, route, icon, isDisabled }) => (
        <NavLink
          key={label}
          to={route}
          className={`${styles.navLink} ${isDisabled ? styles.disabled : ''}`}
          activeClassName={styles.active}
        >
          <img className={styles.icon} src={icon} alt="" /> {label}
        </NavLink>
      ))}
    </nav>
  );
}

export default NavBar;
