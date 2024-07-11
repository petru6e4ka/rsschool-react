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
    <button onClick={onThrow} type="button">
      Bug!
    </button>
  );
}

export default BugButton;
