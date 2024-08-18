import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import { Forms, User } from '../../types/form';
import { useActions } from '../../hooks/useActions';
import { useUserSelector } from '../../store/form';
import { AdditionalForm } from '../../components/UncontrolledForms/AdditionalForm/AdditionalForm';
import { GeneralForm } from '../../components/UncontrolledForms/GeneralForm/GeneralForm';
import { AuthForm } from '../../components/UncontrolledForms/AuthForm/AuthForm';
import Stepper from '../../components/Stepper/Stepper';
import { Modal } from '../../components/Modal/Modal';
import { AuthFormSuggestion } from '../../components/Modal/Content/AuthFormSuggestion';
import { GeneralFormSuggestion } from '../../components/Modal/Content/GeneralFormSuggestion';

const steps = ['Auth information', 'General information', 'Additional information'];

enum ModalType {
  AuthFail,
  GeneralFail,
}

export function UncontrolledForm() {
  const { formParams } = useParams();
  const navigate = useNavigate();
  const {
    addEmail, addPassword, addRepeatPassword, addName, addAge, addGender, addCountry, addAvatar, addTerms,
  } = useActions();
  const user = useUserSelector();

  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<ModalType | null>(null);

  const addAuthInfo = ({ email, password, passwordRepeat }: Partial<User>) => {
    addEmail(email);
    addPassword(password);
    addRepeatPassword(passwordRepeat);
    setShowModal(false);
    setModalType(null);
  };

  const addGeneralInfo = ({
    name, age, gender, country,
  }: Partial<User>) => {
    addName(name);
    addAge(age);
    addGender(gender);
    addCountry(country);
    setShowModal(false);
    setModalType(null);
  };

  const addAdditionalInfo = ({ avatar, terms }: Partial<User>) => {
    addAvatar(avatar);
    addTerms(terms);

    if (!user?.email || !user?.password || !user?.passwordRepeat) {
      setModalType(ModalType.AuthFail);
      setShowModal(true);
      return;
    }

    if (!user?.name || !user?.age || !user?.country || !user?.gender) {
      setModalType(ModalType.GeneralFail);
      setShowModal(true);
      return;
    }

    navigate('/');
    // push a user to the redux history
    // remove prev user
  };

  switch (formParams) {
    case Forms.additionalinfo:
      return (
        <>
          <div className="my-6 mx-auto max-w-[600px] w-full p-5">
            <Stepper steps={steps} active={steps[2]} />
          </div>
          <AdditionalForm onSubmit={addAdditionalInfo} />
          {showModal && modalType === ModalType.AuthFail && (
            <Modal
              onSuccessText="Fill form"
              onCancelText="Cancel"
              onSuccess={() => navigate(`./${Forms.authinfo}`)}
              onClose={() => setShowModal(false)}
            >
              <AuthFormSuggestion />
            </Modal>
          )}
          {showModal && modalType === ModalType.GeneralFail && (
            <Modal
              onSuccessText="Fill form"
              onCancelText="Cancel"
              onSuccess={() => navigate(`./${Forms.generalinfo}`)}
              onClose={() => setShowModal(false)}
            >
              <GeneralFormSuggestion />
            </Modal>
          )}
        </>
      );
    case Forms.generalinfo:
      return (
        <>
          <div className="my-6 mx-auto max-w-[600px] w-full p-5">
            <Stepper steps={steps} active={steps[1]} />
          </div>
          <GeneralForm
            values={{
              name: user?.name,
              age: user?.age,
              gender: user?.gender,
              country: user?.country,
            }}
            onSubmit={addGeneralInfo}
          />
        </>
      );
    default:
      return (
        <>
          <div className="my-6 mx-auto max-w-[600px] w-full p-5">
            <Stepper steps={steps} active={steps[0]} />
          </div>
          <AuthForm values={{ email: user?.email, password: user?.password, passwordRepeat: user?.passwordRepeat }} onSubmit={addAuthInfo} />
        </>
      );
  }
}

export default UncontrolledForm;

// After submitting the form On successful form submission
// redirect user to the main route with all the previously entered data.
// Make an indication for a newly entered data on the main route
// (e.g. show border in a different color for a few seconds, or a different background color)
