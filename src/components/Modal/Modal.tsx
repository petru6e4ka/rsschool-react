import { ReactNode } from 'react';

type Props = {
  title?: string;
  onSuccessText: string;
  onCancelText: string;
  children: ReactNode;
  onSuccess: () => void;
  onClose: () => void;
};

export function Modal({
  title = '', onSuccessText, onCancelText, children, onSuccess, onClose,
}: Props) {
  return (
    <div
      className="
        flex
        bg-gray-900/80
        overflow-y-auto
        overflow-x-hidden
        fixed
        top-0
        right-0
        left-0
        z-50
        justify-center
        items-center
        w-full
        md:inset-0
        max-h-full"
    >
      <div className="relative p-4 w-full max-w-2xl max-h-full">
        <div className="relative bg-white rounded-lg shadow">
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
            <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
            <button
              type="button"
              className="
              text-gray-400
              bg-transparent
              hover:bg-gray-200
              hover:text-gray-900
              rounded-lg
              text-sm
              w-8
              h-8
              ms-auto
              inline-flex
              justify-center
              items-center"
              onClick={onClose}
            >
              <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          <div className="p-4 md:p-5 space-y-4">
            {children}
          </div>
          <div className="flex justify-center gap-4 items-center p-4 md:p-5 border-t border-gray-200 rounded-b">
            <button
              type="button"
              className="
              focus:outline-none
            text-white
            bg-yellow-400
            hover:bg-yellow-500
              focus:ring-4
            focus:ring-yellow-300
              font-medium
              rounded-full
              text-sm
              px-5
              py-2.5"
              onClick={onSuccess}
            >
              {onSuccessText}
            </button>
            <button
              type="button"
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
              text-center"
              onClick={onClose}
            >
              {onCancelText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
