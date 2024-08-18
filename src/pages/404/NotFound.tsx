import { useNavigate } from 'react-router-dom';

function NotFound() {
  const navigate = useNavigate();

  const goBack = () => {
    navigate('./');
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-[500px] gap-3" data-testid="not-found-page">
      <h1>The page is not found</h1>
      <p>Oops, you can go back</p>
      <button
        type="button"
        onClick={goBack}
        className="
        text-gray-900
        bg-white border
        border-gray-300
        focus:outline-none
      hover:bg-gray-100
        focus:ring-4 f
        ocus:ring-gray-100
        font-medium
        rounded-lg
        text-sm
        px-5
        py-2.5
      dark:bg-gray-800
      dark:text-white
      dark:border-gray-600
      dark:hover:bg-gray-700
      dark:hover:border-gray-600
      dark:focus:ring-gray-700"
      >
        Go back!
      </button>
    </div>
  );
}

export default NotFound;
