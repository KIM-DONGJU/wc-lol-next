'use client';

import useGroupMembers from '@/hooks/useGroupMembers';
import type { Position } from '@/interfaces/position';
import { type GroupMember } from '@/apis/groupMembers';

import CommonInput from '@/components/common/CommonInput';
import CommonPageWrapper from '@/components/common/CommonPageWrapper';
import { POSITION_LIST } from '@/constants/position';
import CommonLoadingSpinner from '@/components/common/CommonLoadingSpinner';

interface DisplayGroupMembersProps {
  groupMembers?: GroupMember[];
  isLoading: boolean;
}
const DisplayGroupMembers = ({ groupMembers, isLoading }: DisplayGroupMembersProps) => {
  if (isLoading || !groupMembers) {
    return (
      <div className="h-full flex justify-center items-center">
        <CommonLoadingSpinner />
      </div>
    );
  }

  const getRankerClass = (member: GroupMember) => {
    if (member.prev_season_rank <= 3) {
      return 'bg-gradient-ranker';
    }

    return '';
  };

  const getPositionClass = (member: GroupMember, position: Position) => {
    if (member.mainPosition === position) return 'text-primary-100';
    if (member.subPosition === position) return 'text-secondary';
    return '';
  };

  const getRankerString = (member: GroupMember) => {
    if (member.prev_season_rank === 1) {
      return '1st';
    }

    if (member.prev_season_rank === 2) {
      return '2nd';
    }

    if (member.prev_season_rank === 3) {
      return '3rd';
    }

    return '';
  };

  return groupMembers.map((groupMember) => (
    <div
      key={groupMember.id}
      className={`w-full h-15 grid grid-cols-user-list-table text-xl text-center items-center gap-x-2 border-b border-white border-opacity-50 ${getRankerClass(groupMember)} px-6`}
    >
      <div className="flex justify-between items-center gap-x-2">
        <p className="w-8">
          {groupMember.prev_season_rank <= 3 && <span>{getRankerString(groupMember)}</span>}
        </p>
        <p>{groupMember.name}</p>
        <p className="w-8"></p>
      </div>
      <p>{groupMember.nickname}</p>
      {POSITION_LIST.map((position) => {
        const positionScore = groupMember.positionScore[position];
        return (
          <p key={position} className={getPositionClass(groupMember, position)}>
            {positionScore}
          </p>
        );
      })}
    </div>
  ));
};

export default function Home() {
  const { searchUser, setSearchUser, filteredGroupMembers, isLoading } = useGroupMembers(1);
  const userListTableHeader = ['이름', '닉네임', '탑', '정글', '미드', '원딜', '서폿'];

  return (
    <CommonPageWrapper>
      <div className="w-full flex justify-center items-center">
        <CommonInput placeholder="이름, 닉네임 검색" value={searchUser} onChange={setSearchUser} />
      </div>
      <div className="flex-1 flex flex-col mt-8">
        <header className="w-full h-15 grid grid-cols-user-list-table text-xl items-center gap-x-2 bg-white bg-opacity-5 border-b border-white px-6">
          {userListTableHeader.map((header) => (
            <p key={header} className="text-center">
              {header}
            </p>
          ))}
        </header>
        <div className="flex-1 overflow-auto">
          <DisplayGroupMembers groupMembers={filteredGroupMembers} isLoading={isLoading} />
        </div>
      </div>
    </CommonPageWrapper>
  );
}
