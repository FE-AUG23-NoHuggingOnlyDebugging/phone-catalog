import { Member } from '../../types/Member';
import { LinksButton } from '../LinksButton/LinksButton';
import style from './TeamMember.module.scss';
import React from 'react';

type Props = {
  member: Member;
};

export const TeamMember: React.FC<Props> = ({ member }) => {
  return (
    <div className={style.TeamMember}>
      <div className={style.TeamMember__info}>
        <img src={member.image} alt="" className={style.TeamMember__avatar} />
        <div className={style.TeamMember__description}>
          <h2 className={style.TeamMember__name}>{member.name}</h2>
          <p className={style.TeamMember__speciality}>{member.speciality}</p>
        </div>
      </div>
      <LinksButton member={member} />
    </div>
  );
};
