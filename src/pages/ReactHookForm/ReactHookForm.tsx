// import { FormEvent, useRef, useState } from 'react';
// import { useLocation, useParams } from 'react-router-dom';

export function ReactHookForm() {
  // const form = useRef(null);

  // const onSubmit = (e: FormEvent) => {
  //   e.preventDefault();

  //   if (form.current) {
  //     const data = new FormData(form.current);
  //     console.log(data);
  //   }
  // };

  // const location = useLocation();
  // const [user, setUser] = useState({}); // redux user form
  // const [showModal, setShowModal] = useState(false);

  // const addBase = (base: string) => {
  //   // setPizza({ ...pizza, base });
  // };

  // const addTopping = (topping: string) => {
  // let newToppings;
  // if (!pizza.toppings.includes(topping)) {
  //   newToppings = [...pizza.toppings, topping];
  // } else {
  //   newToppings = pizza.toppings.filter((item) => item !== topping);
  // }
  // setPizza({ ...pizza, toppings: newToppings });
  // };

  return <div>React hook form</div>;
}
/* <form ref={form} action="#" className="flex flex-col gap-1 my-6 mx-auto max-w-[410px] p-5" onSubmit={onSubmit}>
      <div className="flex flex-col gap-1 mb-3">
        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
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
          block w-full p-2.5
          dark:bg-gray-700
          dark:border-gray-600
          dark:placeholder-gray-400
          dark:text-white
          dark:focus:ring-yellow-300
          dark:focus:border-yellow-300"
          placeholder="John"
          required
          name="name"
        />
      </div>
      <div className="flex flex-col gap-1 mb-3">
        <label htmlFor="age" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
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
          block w-full p-2.5
          dark:bg-gray-700
          dark:border-gray-600
          dark:placeholder-gray-400
          dark:text-white
          dark:focus:ring-yellow-300
          dark:focus:border-yellow-300"
          placeholder="18"
          required
          name="age"
        />
      </div>
      <div className="flex flex-col gap-1 mb-3">
        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Email
        </label>
        <input
          type="email"
          id="email"
          className="
          bg-gray-50
          border
          border-gray-300
          text-gray-900
          text-sm
          rounded-lg
          focus:ring-yellow-300
          focus:border-yellow-300
          block w-full p-2.5
          dark:bg-gray-700
          dark:border-gray-600
          dark:placeholder-gray-400
          dark:text-white
          dark:focus:ring-yellow-300
          dark:focus:border-yellow-300"
          placeholder="John@mail.com"
          required
          name="email"
        />
      </div>
      <div className="flex flex-col gap-1 mb-3">
        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Password
        </label>
        <input
          type="password"
          id="password"
          className="
          bg-gray-50
          border
          border-gray-300
          text-gray-900
          text-sm
          rounded-lg
          focus:ring-yellow-300
          focus:border-yellow-300
          block w-full p-2.5
          dark:bg-gray-700
          dark:border-gray-600
          dark:placeholder-gray-400
          dark:text-white
          dark:focus:ring-yellow-300
          dark:focus:border-yellow-300"
          placeholder="Password"
          required
          name="password"
        />
      </div>
      <div className="flex flex-col gap-1 mb-3">
        <label htmlFor="passwordRepeat" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Password repeat
        </label>
        <input
          type="password"
          id="passwordRepeat"
          className="
          bg-gray-50
          border
          border-gray-300
          text-gray-900
          text-sm
          rounded-lg
          focus:ring-yellow-300
          focus:border-yellow-300
          block w-full p-2.5
          dark:bg-gray-700
          dark:border-gray-600
          dark:placeholder-gray-400
          dark:text-white
          dark:focus:ring-yellow-300
          dark:focus:border-yellow-300"
          placeholder="Repeat password"
          required
          name="repeat_password"
        />
      </div>
      <div className="flex flex-row items-center gap-7 mb-3">
        <div className="flex items-center">
          <input
            defaultValue={'Male'}
            id="Male"
            type="radio"
            name="gender"
            className="
            w-4
            h-4
            text-yellow-400
            bg-gray-100
            border-gray-300
            focus:ring-yellow-300
            dark:focus:ring-yellow-400
            dark:ring-offset-gray-800
            focus:ring-2
            dark:bg-gray-700
            dark:border-gray-600
            cursor-pointer"
          />
          <label htmlFor="Male" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300 cursor-pointer">
            Male
          </label>
        </div>
        <div className="flex items-center">
          <input
            id="Female"
            type="radio"
            value="female"
            name="gender"
            className="
            w-4
            h-4
            text-yellow-400
            bg-gray-100
            border-gray-300
            focus:ring-yellow-300
            dark:focus:ring-yellow-400
            dark:ring-offset-gray-800
            focus:ring-2
            dark:bg-gray-700
            dark:border-gray-600
            cursor-pointer"
          />
          <label htmlFor="Female" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300 cursor-pointer">
            Femaile
          </label>
        </div>
      </div>
      <div className="flex flex-col gap-1 mb-3">
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
            dark:focus:ring-yellow-400
            dark:ring-offset-gray-800
            focus:ring-2
            dark:bg-gray-700
            dark:border-gray-600
            cursor-pointer"
            value="accepted"
            defaultChecked={false}
          />
          <label htmlFor="terms" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300 cursor-pointer">
            Accept terms and conditions
          </label>
        </div>
      </div>
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
          dark:text-gray-400
          focus:outline-none
          dark:bg-gray-700
          dark:border-gray-600
          dark:placeholder-gray-400"
          id="avatar"
          type="file"
          name="avatar"
        />
      </div>
      <div className="flex flex-col gap-1 mb-3">
        <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Select an country
        </label>
        <select
          id="countries"
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
          p-2.5
          dark:bg-gray-700
          dark:border-gray-600
          dark:placeholder-gray-400
          dark:text-white
          dark:focus:ring-yellow-300
          dark:focus:border-yellow-300"
          defaultValue={'US'}
          name="country"
        >
          <option value="US">United States</option>
          <option value="CA">Canada</option>
          <option value="FR">France</option>
          <option value="DE">Germany</option>
        </select>
      </div>
      <div className="flex flex-col gap-1 mb-3">
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
          py-2.5
          me-2
          mb-2
          dark:focus:ring-yellow-900"
        >
          Submit
        </button>
      </div>
    </form>
    */

export default ReactHookForm;

// name (validate for first uppercased letter)
// age (should be number, no negative values)
// email (validate for email)
// 2 passwords (should match, display the password strength: 1 number, 1 uppercased letter, 1 lowercased letter, 1 special character)
// gender (you can use radio buttons or select control)
// accept Terms and Conditions agreement (T&C, can be a checkbox)
// input control to upload picture (validate size and extension, allow png jpeg, save in redux store as base64)
// autocomplete control to select country
// (all countries should be stored in the Redux store)
// Form should contain labels, which should be connected with inputs (look at htmlFor)

// Approach with React Hook Form should implement live validation

// After submitting the form On successful form submission
// redirect user to the main route with all the previously entered data.
// Make an indication for a newly entered data on the main route
// (e.g. show border in a different color for a few seconds, or a different background color)
