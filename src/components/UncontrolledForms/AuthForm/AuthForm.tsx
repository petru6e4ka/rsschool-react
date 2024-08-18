import { FormEvent, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Forms, User } from '../../../types/form';
import { AuthSchema } from '../../../configs/yup';

type PartialUser = {
  email?: string;
  password?: string;
  passwordRepeat?: string;
};

type Props = {
  values: PartialUser;
  onSubmit: ({ email, password, passwordRepeat }: Partial<User>) => void;
};

export function AuthForm({ values, onSubmit }: Props) {
  const form = useRef(null);

  const [errors, setErrors] = useState<Array<Record<string, string>>>([]);

  const navigate = useNavigate();

  const addAuthInfo = async (e: FormEvent) => {
    e.preventDefault();

    if (form.current) {
      const data = new FormData(form.current);

      const email = data.get('email') as string;
      const password = data.get('password') as string;
      const passwordRepeat = data.get('passwordRepeat') as string;

      await AuthSchema.validate({ email, password, passwordRepeat })
        .then(() => {
          onSubmit({ email, password, passwordRepeat });
          navigate(`./${Forms.generalinfo}`);
        })
        .catch((res) => {
          setErrors(res.errors);
        });
    }
  };

  return (
    <form ref={form} action="#" className="flex-1 flex flex-col gap-1 my-6 mx-auto max-w-[300px] w-full p-5" onSubmit={addAuthInfo} noValidate>
      <div className="flex flex-col gap-1 mb-3">
        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Email
        </label>
        <input
          type="email"
          id="email"
          defaultValue={values.email}
          className="
        bg-gray-50
          border
        border-gray-300
        text-gray-900
          text-sm
          rounded-lg
        focus:ring-yellow-300
        focus:border-yellow-300
          block
          w-full
          p-2.5"
          placeholder="John@mail.com"
          name="email"
          autoComplete="off"
        />
        <p className="h-[1rem] text-xs text-gray-500">{errors[0]?.email ? errors[0].email : ''}</p>
      </div>
      <div className="flex flex-col gap-1 mb-3">
        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Password
        </label>
        <input
          type="password"
          id="password"
          defaultValue={values.password}
          className="
        bg-gray-50
          border
        border-gray-300
        text-gray-900
          text-sm
          rounded-lg
        focus:ring-yellow-300
        focus:border-yellow-300
          block
          w-full
          p-2.5"
          placeholder="Password"
          name="password"
          autoComplete="off"
        />
        <p className="h-[1rem] text-xs text-gray-500">{errors[0]?.password ? errors[0].password : ''}</p>
      </div>
      <div className="flex flex-col gap-1 mb-7">
        <label htmlFor="passwordRepeat" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Password repeat
        </label>
        <input
          type="password"
          id="passwordRepeat"
          defaultValue={values.passwordRepeat}
          className="
        bg-gray-50
          border
        border-gray-300
        text-gray-900
          text-sm
          rounded-lg
        focus:ring-yellow-300
        focus:border-yellow-300
          block
          w-full
          p-2.5"
          placeholder="Repeat password"
          name="passwordRepeat"
          autoComplete="off"
        />
        <p className="h-[1rem] text-xs text-gray-500">{errors[0]?.passwordRepeat ? errors[0].passwordRepeat : ''}</p>
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
          Next
        </button>
      </div>
    </form>
  );
}

export default AuthForm;
