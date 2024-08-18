import * as yup from 'yup';
import { FormErrors } from './errors';

export const AuthSchema = yup.object().shape({
  passwordRepeat: yup
    .string()
    .required({ passwordRepeat: FormErrors.required })
    .oneOf([yup.ref('password')], { passwordRepeat: FormErrors.password_match }),
  password: yup
    .string()
    .required({ password: FormErrors.required })
    .matches(/(?=.*\d)/, () => ({ password: FormErrors.password_strength.number }))
    .matches(/(?=.*[A-Z])/, () => ({ password: FormErrors.password_strength.uppercase }))
    .matches(/(?=.*[a-z])/, () => ({ password: FormErrors.password_strength.lowercase }))
    .matches(/(?=.*[-+_!@#$%^&*.,?])/, () => ({ password: FormErrors.password_strength.special })),
  email: yup.string().email({ email: FormErrors.email }).required({ email: FormErrors.required }),
});

const countries = ['USA', 'UK', 'France', 'Germany', 'Canada'];

export const GeneralSchema = yup.object().shape({
  country: yup
    .string()
    .required({ country: FormErrors.required })
    .test({
      message: () => ({ country: FormErrors.country }),
      test(value) {
        return countries.includes(value);
      },
    }),
  gender: yup.string().required({ gender: FormErrors.required }),
  age: yup
    .number()
    .required({ age: FormErrors.required })
    .min(1, () => ({ age: FormErrors.age })),
  name: yup
    .string()
    .required({ name: FormErrors.required })
    .matches(/^[A-Z]/, () => ({ name: FormErrors.name })),
});

const allowedExtensions = ['image/png', 'image/jpg', 'image/jpeg'];
const MAX_FILE_SIZE = 300000;

export const AdditionalSchema = yup.object().shape({
  terms: yup.boolean().required({ terms: FormErrors.required }).isTrue({ terms: FormErrors.terms }),
  avatar: yup
    .mixed()
    .test({
      message: () => ({ avatar: FormErrors.avatar.format }),
      test: (file) => allowedExtensions.includes((file as File)?.type),
    })
    .test({
      message: () => ({ avatar: FormErrors.avatar.size }),
      test: (file) => (file as File)?.size < MAX_FILE_SIZE,
    }),
});
