import cn from 'classnames';
import { Member } from '../../types/Member';
import { LinksButton } from '../LinksButton/LinksButton';
import style from './TeamMember.module.scss';
import React from 'react';

type Props = {
  member: Member;
  setText: (value: string[] | null) => void;
  setTitle: (value: string | null) => void;
  text: string[] | null;
};

export const TeamMember: React.FC<Props> = ({
  member,
  setText,
  setTitle,
  text,
}) => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div
      className={cn(style.TeamMember, {
        [style.activeMember]: text === member.text,
      })}
      onClick={() => {
        if (text !== member.text) {
          setText(member.text);
          setTitle(member.name);
        } else {
          setTitle(null);
          setText(null);
        }

        scrollToTop();
      }}
    >
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
