import { Redirect } from 'react-router-dom';

import r from 'constants/routes.constants';

import Home from 'pages/public/Home';
import SignIn from 'pages/public/SignIn';
import SignUp from 'pages/public/SignUp';
import ResetPassword from 'pages/public/ResetPassword';

import Leader from 'pages/private/Leader';
import Dashboard from 'pages/private/Dashboard';
import Finances from 'pages/private/Finances';
import Team from 'pages/private/Team';
import AboutUs from 'pages/private/AboutUs';
import Settings from 'pages/private/Settings';
import Education from 'pages/private/Education';
import News from 'pages/private/News';
// Stars
import Tables from 'pages/private/Star';
import Table from 'pages/private/Star/Table';
import TableQueue from 'pages/private/Star/TableQueue';
// Premium Stars
import PremiumStars from 'pages/private/AutoStars';
import PremiumStarsTable from 'pages/private/AutoStars/Table';
import SuperStars from 'pages/private/SuperStars';
import SuperStarsTable from 'pages/private/SuperStars/SuperStarTable';
import Casino from 'pages/private/Casino';
import CasinoDraw from 'pages/private/Casino/CasinoDraw';

import CasinoActive from 'pages/private/Casino/CasinoActive';
import CasinoEnded from 'pages/private/Casino/CasinoEnded';
import StarTrek from 'pages/private/StarTrek';
import StarTrekPlanets from 'pages/private/StarTrek/MyPlanets';
import StarTrekStatistic from 'pages/private/StarTrek/Statistic';
import StarTrekFirstLinePlanets from 'pages/private/StarTrek/FirstLinePlanets';

import StarsUp from 'pages/private/StarsUp';
import PlaceList from 'pages/private/StarsUp/components/PlaceList';
import StarsUpTable from 'pages/private/StarsUp/StarsUpTable';
import StarsUpQueue from 'pages/private/StarsUp/StarsUpQueue';
import StarsUpBonuses from 'pages/private/StarsUp/StarsUpBonuses';

export let publicRouteConfig, panelRouteConfig;
publicRouteConfig = [
  {
    id: '6bd16003-a02d-43d6-97d5-b94433055e27',
    path: r.root,
    component: Home,
    exact: true,
  },
  {
    id: '8bcb9969-6c40-44ed-910f-b2e41e29308b',
    path: r.signIn,
    component: SignIn,
    exact: true,
  },
  {
    id: '0aa2a683-6840-4a97-a258-b5247f20ac52',
    path: r.signUp,
    component: SignUp,
    exact: true,
  },
  {
    id: 'c007b79a-ee31-4bbb-9282-91937f96e341',
    path: r.resetPassword,
    component: ResetPassword,
    exact: true,
  },
];
panelRouteConfig = [
  {
    id: '6705c818-7c9f-4757-bf1f-0d20e2b0700a',
    path: r.dashboard,
    component: Dashboard,
    exact: true,
  },
  {
    id: 'dbfec38e-c96d-4c50-8cec-43d775bb38b8',
    path: r.leader,
    component: Leader,
    exact: true,
  },
  {
    id: '5a02e43a-028e-4a64-9de7-a8495c4a289f',
    path: r.tables,
    component: Tables,
    exact: true,
  },
  {
    id: '470c1df2-4bf9-4c41-897a-b7267e53aa68',
    path: [r.personalTable, r.table],
    component: Table,
    exact: true,
  },
  {
    id: 'fa4bc3a7-6bea-47ae-bb00-9bba1f1f3349',
    path: [r.personalTableQueue, r.tableQueue],
    component: TableQueue,
    exact: true,
  },
  {
    id: '3fd9cbab-e44e-4cc7-82c5-da52238f7f44',
    path: r.finances,
    component: Finances,
    exact: true,
  },
  {
    id: 'fd8a91bc-d70f-4918-a510-5510cd7a81c8',
    path: r.team,
    component: Team,
    exact: true,
  },
  {
    id: '1987f95f-f16c-4388-b878-8b7726b1c248',
    path: `${r.team}/:userId`,
    component: Team,
    exact: true,
  },
  {
    id: 'f748dad1-b173-4df0-bce4-6cb87e576637',
    path: [r.news, r.newsItem],
    component: News,
    exact: true,
  },
  {
    id: '1dcd587d-a25f-466b-aaa9-b8f943874d05',
    path: r.aboutUs,
    component: AboutUs,
    exact: true,
  },
  {
    id: '0ea39de5-795b-45a8-b40e-a66b75f5e514',
    path: r.settings,
    component: Settings,
    exact: true,
  },
  {
    id: '357f592b-1be8-41d5-a8a3-b62fc8d718d5',
    path: r.premiumStars,
    component: PremiumStars,
    exact: true,
  },
  {
    id: '0d949aa4-725e-4cad-a58f-a1b843e27515',
    path: [r.premiumTable, r.personalPremiumTable],
    component: PremiumStarsTable,
    exact: true,
  },
  {
    id: '109425a8-752d-42a5-83f2-98167f22d9cb',
    path: r.superStars,
    component: SuperStars,
    exact: true,
  },
  {
    id: '1c2cb6b0-4bf1-466a-bf84-bc9e71e40dda',
    path: [r.personalSSTable, r.ssTable],
    component: SuperStarsTable,
    exact: true,
  },
  {
    id: 'ee525287-cb86-430a-bfec-0b0816ceb709',
    path: r.casinoDraw,
    component: CasinoDraw,
    exact: true,
  },
  {
    id: 'a682cca2-82df-4daa-81ed-70cc6868d3e2',
    path: r.starTrek,
    component: StarTrek,
    exact: true,
  },
  {
    id: '3c6eb283-5d8c-4775-b9d0-43c640c3d6ab',
    path: r.starTrekPlanets,
    component: StarTrekPlanets,
    exact: true,
  },
  {
    id: '3c6eb283-5d8c-4775-b9d0-43c640c3d6ab',
    path: r.starTrekFirstLinePlanets,
    component: StarTrekFirstLinePlanets,
    exact: true,
  },
  {
    id: 'ef10ab44-2bc9-4498-a8e8-b89d31060a10',
    path: r.starTrekStatistic,
    component: StarTrekStatistic,
    exact: true,
  },
  {
    id: 'b611f7bb-58bf-4230-826d-ec4174e454af',
    path: r.casino,
    component: Casino,
    routes: [
      {
        id: 'a0c10036-0a77-43e2-984c-6779f985e849',
        path: r.casino,
        component: () => <Redirect to={r.casinoActive}/>,
        exact: true,
      },
      {
        id: '95e18993-3c49-41ac-9046-dad7df4d0362',
        path: r.casinoActive,
        component: CasinoActive,
        exact: true,
      },
      {
        id: 'ed214f44-76fd-4b82-a45b-bed9d5c7e96a',
        path: r.casinoEnded,
        component: CasinoEnded,
        exact: true,
      },
    ],
  },
  {
    id: 'bb41be1a-b5a0-4502-a06b-a338ea47904d',
    path: r.starsUp,
    component: StarsUp,
    exact: true,
  },
  {
    id: 'd321bf61-e67a-4809-9dd9-d8a425917178',
    path: r.starsUpList,
    component: PlaceList,
    exact: true,
  },
  {
    id: '4c6f55cb-7d08-492e-8cfd-b00aa59c12f1',
    path: [r.starsUpTable, r.starsUpPersonTable],
    component: StarsUpTable,
    exact: true,
  },
  {
    id: '59685cd3-4c77-426f-9bae-17cd3a94ddae',
    path: [r.starsUpPersonTableQueue],
    component: StarsUpQueue,
    exact: true,
  },
  {
    id: '59685cd3-4c77-426f-9bae-17cd3a94ddae',
    path: [r.starsUpPersonBonuses],
    component: StarsUpBonuses,
    exact: true,
  },
  {
    id: '0a51ed92-9f9f-4d95-9bf3-fb47eb36289f',
    path: [r.education, r.educationComment, r.educationForm],
    component: Education,
    exact: true,
  },
];
