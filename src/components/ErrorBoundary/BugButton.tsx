import { useEffect, useState } from 'react';

function BugButton() {
  const [error, setError] = useState(false);

  const onThrow = () => {
    setError(true);
  };

  useEffect(() => {
    if (error) {
      throw new Error('TEST ERROR!');
    }
  }, [error]);

  return (
    <button
      onClick={onThrow}
      type="button"
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
      Bug!
    </button>
  );
}

export default BugButton;
