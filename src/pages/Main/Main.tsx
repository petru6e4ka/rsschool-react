import { Link } from 'react-router-dom';
import { useHistorySelector } from '../../store/history';
import { UserList } from '../../components/UserList/UserList';

export function Main() {
  const history = useHistorySelector();

  return (
    <div className="flex flex-col">
      <div className="flex flex-col justify-center mx-auto py-20">
        <h1 className="mb-4 text-3xl font-extrabold leading-none tracking-tight text-gray-900">Welcome to a user creator! Let&apos;s start:</h1>
        <Link
          to="./uncontrolled_form"
          className="
        text-white
        bg-yellow-400
        hover:bg-yellow-500
          focus:outline-none
          focus:ring-4
        focus:ring-yellow-300
          font-medium
          rounded-full
          text-sm
          px-5
          py-2.5
          text-center
          mb-2"
        >
          Create a user via uncontrolled form
        </Link>
        <Link
          to="./react_hook_form"
          className="
        text-yellow-400
        hover:text-white
        border
        border-yellow-400
        hover:bg-yellow-500
        focus:ring-4
        focus:outline-none
        focus:ring-yellow-300
        font-medium
        rounded-full
        text-sm
        px-5
        py-2.5
        text-center
        mb-2"
        >
          Create a user via react hook form
        </Link>
      </div>
      <div className="px-3">
        <UserList list={history} />
      </div>
    </div>
  );
}

export default Main;
