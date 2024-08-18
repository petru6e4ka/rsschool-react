import { useRef, FormEvent, useState } from 'react';
import { User } from '../../../types/form';
import { AdditionalSchema } from '../../../configs/yup';

type Props = {
  onSubmit: ({ avatar, terms }: Partial<User>) => void;
};

export function AdditionalForm({ onSubmit }: Props) {
  const form = useRef(null);

  const [errors, setErrors] = useState<Array<Record<string, string>>>([]);

  const addAdditionalInfo = async (e: FormEvent) => {
    e.preventDefault();

    if (form.current) {
      const data = new FormData(form.current);

      const avatar = data.get('avatar') as File;
      const terms = Boolean(data.get('terms') as string);

      await AdditionalSchema.validate({
        terms,
        avatar,
      })
        .then(() => {
          setErrors([]);
          const reader = new FileReader();
          reader.readAsDataURL(avatar);
          reader.onload = () => {
            onSubmit({
              terms,
              avatar: reader.result as string,
            });
          };
          reader.onerror = () => {
            setErrors([{ avatar: 'Can not process the file' }]);
          };
        })
        .catch((res) => {
          setErrors(res.errors);
        });
    }
  };

  return (
    <form ref={form} action="#" className="flex-1 flex flex-col gap-1 my-6 mx-auto max-w-[300px] w-full p-5" onSubmit={addAdditionalInfo} noValidate>
      <div className="flex flex-col gap-1 mb-3">
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="avatar">
          Upload Avatar
        </label>
        <input
          className="
          w-full
          block
          text-sm
        text-gray-900
          border
        border-gray-300
          rounded-lg
          cursor-pointer
        bg-gray-50
          focus:outline-none"
          id="avatar"
          type="file"
          name="avatar"
        />
        <p className="h-[1rem] text-xs text-gray-500">{errors[0]?.avatar ? errors[0].avatar : ''}</p>
      </div>
      <div className="flex flex-col gap-1 mb-7">
        <div className="flex items-center">
          <input
            id="terms"
            type="checkbox"
            name="terms"
            className="
            w-4
            h-4
          text-yellow-400
          bg-gray-100
          border-gray-300
            rounded
          focus:ring-yellow-300
            cursor-pointer"
            value="true"
            defaultChecked={false}
          />
          <label htmlFor="terms" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300 cursor-pointer">
            Accept terms and conditions
          </label>
        </div>
        <p className="h-[1rem] text-xs text-gray-500 w-full">{errors[0]?.terms ? errors[0].terms : ''}</p>
      </div>
      <div className="flex flex-col gap-1">
        <button
          type="submit"
          className="
          w-full
          focus:outline-none
        text-white
        bg-yellow-400
        hover:bg-yellow-500
          focus:ring-4
        focus:ring-yellow-300
          font-medium
          rounded-lg
          text-sm
          px-5
          py-2.5"
        >
          Submit
        </button>
      </div>
    </form>
  );
}

export default AdditionalForm;
