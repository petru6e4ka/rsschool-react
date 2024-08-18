import { User } from '../../types/form';

type Props = {
  user: User;
  isActive?: boolean;
};

export function UserCard({ isActive, user }: Props) {
  const styles = isActive
    ? 'flex flex-col gap-2 p-5 w-fit bg-yellow-400 text-white rounded-md mb-8'
    : 'flex flex-col gap-2 p-5 w-fit border-gray-500';

  return (
    <div className={styles}>
      <div className="max-w-[100px]">
        <img className="w-full rounded-full" src={user.avatar as string} alt={`${user.name} avatar`} />
      </div>
      <h2 className="font-bold text-lg">{user.name}</h2>
      <p>{user.gender}</p>
      <p>{user.age}</p>
      <p>{user.country}</p>
    </div>
  );
}

export default UserCard;
