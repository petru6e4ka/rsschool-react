import { User } from '../../types/form';
import { UserCard } from './UserCard';

type Props = {
  list: User[];
};

export function UserList({ list }: Props) {
  return (
    <div className="flex flex-col gap-4 justify-center">
      {list.map((elem, i, arr) => {
        if (i === arr.length - 1) {
          return <UserCard key={elem.id} user={elem} isActive />;
        }
        return <UserCard key={elem.id} user={elem} />;
      })}
    </div>
  );
}

export default UserList;
