const reloadPage = () => {
  window.location.reload();
};

function PageError() {
  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center gap-3">
      <p>Oops! Something went wrong!</p>
      <button
        onClick={reloadPage}
        type="button"
        className="
        text-gray-900
        bg-white border
        border-gray-300
        focus:outline-none
        hover:bg-gray-100
        focus:ring-4
        focus:ring-gray-100
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
        Reload the page
      </button>
    </div>
  );
}

export default PageError;
