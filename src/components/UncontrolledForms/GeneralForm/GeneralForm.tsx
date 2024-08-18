import { FormEvent, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Countries, Forms, Gender, User,
} from '../../../types/form';
import { GeneralSchema } from '../../../configs/yup';
import { useCountriesSelector } from '../../../store/countries';

type PartialUser = {
  name?: string;
  age?: number;
  gender?: Gender;
  country?: Countries;
};

type Props = {
  values: PartialUser;
  onSubmit: ({
    name, age, gender, country,
  }: Partial<User>) => void;
};

export function GeneralForm({ values, onSubmit }: Props) {
  const form = useRef(null);

  const [errors, setErrors] = useState<Array<Record<string, string>>>([]);

  const navigate = useNavigate();

  const countries = useCountriesSelector();

  const addGeneralInfo = async (e: FormEvent) => {
    e.preventDefault();

    if (form.current) {
      const data = new FormData(form.current);

      const name = data.get('name') as string;
      const age = Number(data.get('age') as string);
      const gender = data.get('gender') as unknown as Gender;
      const country = data.get('country') as unknown as Countries;

      await GeneralSchema.validate({
        name,
        age,
        gender,
        country,
      })
        .then(() => {
          onSubmit({
            name,
            age,
            gender,
            country,
          });
          navigate(`./${Forms.additionalinfo}`);
        })
        .catch((res) => {
          setErrors(res.errors);
        });
    }
  };

  return (
    <form ref={form} action="#" className="flex-1 flex flex-col gap-1 my-6 mx-auto max-w-[300px] w-full p-5" onSubmit={addGeneralInfo} noValidate>
      <div className="flex flex-col gap-1 mb-3">
        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">
          First name
        </label>
        <input
          type="text"
          id="name"
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
          placeholder="John"
          name="name"
          autoComplete="off"
          defaultValue={values.name}
        />
        <p className="h-[1rem] text-xs text-gray-500">{errors[0]?.name ? errors[0].name : ''}</p>
      </div>
      <div className="flex flex-col gap-1 mb-3">
        <label htmlFor="age" className="block mb-2 text-sm font-medium text-gray-900">
          Age
        </label>
        <input
          type="number"
          id="age"
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
          placeholder="18"
          name="age"
          autoComplete="off"
          defaultValue={values.age}
        />
        <p className="h-[1rem] text-xs text-gray-500">{errors[0]?.age ? errors[0].age : ''}</p>
      </div>
      <div className="flex flex-row items-center gap-1 mb-3 flex-wrap">
        <div className="flex items-center me-4">
          <input
            id="Male"
            value="Male"
            type="radio"
            name="gender"
            className="
            w-4
            h-4
          text-yellow-400
          bg-gray-100
          border-gray-300
          focus:ring-yellow-300
            focus:ring-2
            cursor-pointer"
            defaultChecked={values.gender === Gender.Male}
          />
          <label htmlFor="Male" className="ms-2 text-sm font-medium text-gray-900 cursor-pointer">
            Male
          </label>
        </div>
        <div className="flex items-center">
          <input
            id="Female"
            value="Female"
            type="radio"
            name="gender"
            className="
            w-4
            h-4
          text-yellow-400
          bg-gray-100
          border-gray-300
          focus:ring-yellow-300
            focus:ring-2
            cursor-pointer"
            defaultChecked={values.gender === Gender.Female}
          />
          <label htmlFor="Female" className="ms-2 text-sm font-medium text-gray-900 cursor-pointer">
            Femaile
          </label>
        </div>
        <p className="h-[1rem] text-xs text-gray-500 w-full">{errors[0]?.gender ? errors[0].gender : ''}</p>
      </div>
      <div className="flex flex-col gap-1 mb-7">
        <label htmlFor="country" className="block mb-2 text-sm font-medium text-gray-900">
          Select an country
        </label>
        <input
          list="countries"
          id="country"
          name="country"
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
          autoComplete="off"
          defaultValue={values.country}
        />
        <datalist id="countries" defaultValue={values.country}>
          {countries.map((elem) => (
            <option key={elem} value={elem}>
              {elem}
            </option>
          ))}
        </datalist>
        <p className="h-[1rem] text-xs text-gray-500">{errors[0]?.country ? errors[0].country : ''}</p>
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

export default GeneralForm;
