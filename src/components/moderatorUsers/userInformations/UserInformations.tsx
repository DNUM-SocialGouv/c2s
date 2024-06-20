import { ReadOnlyInput } from '@/components/common/input/ReadOnlyInput';
import { ReadOnlyRadioGroup } from '@/components/common/input/ReadOnlyRadioGroup';
// import { ReadOnlyCheckboxGroup } from '@/components/common/input/ReadOnlyCheckboxGroup';
import { COMMON } from '@/wording';
import { User } from '@/domain/ModerateurUsers';

interface UserInformationsProps {
  id: string;
  user: User;
}

export const UserInformations = ({ id, user }: UserInformationsProps) => {
  return (
    <form
      aria-live="polite"
      className="px-6"
      data-testid="user-form"
      aria-label="form"
    >
      <div className="flex flex-wrap lg:flex-nowrap justify-between gap-x-16 mt-8 lg:mt-2">
        <ReadOnlyInput
          label="Société"
          id={`${id}-societe`}
          name="societe"
          value={user.societe}
        />
        <ReadOnlyInput
          label="Adresse"
          id={`${id}-addresse`}
          name="addresse"
          value={user.adresse || ''}
        />
      </div>
      <div className="flex flex-wrap lg:flex-nowrap justify-between gap-x-16 mt-8 lg:mt-2">
        <ReadOnlyInput
          label="Siren"
          id={`${id}-siren`}
          hint="9 chiffres"
          name="siren"
          value={user.sirenOrganisation || ''}
        />
        <ReadOnlyRadioGroup
          legend="Type d’organisation"
          name="radio-disabled"
          options={[
            {
              id: 'radio-oc',
              label: COMMON.oc,
              checked: user.typeOrganisation === 'OC' ? true : false,
            },
            {
              id: 'radio-caisse',
              label: COMMON.caisse,
              checked: user.typeOrganisation === 'CAISSE' ? true : false,
            },
          ]}
        />
      </div>
      <div className="flex flex-wrap lg:flex-nowrap justify-between gap-x-16 mt-8 lg:mt-2">
        <ReadOnlyInput
          label="E-mail de l'organisation"
          id={`${id}-email`}
          name="email"
          value={user.email}
        />
        <ReadOnlyInput
          label="Téléphone de l'organisation"
          id={`${id}-phone`}
          name="phone"
          value={user.telephone}
        />
      </div>
      <div className="flex flex-wrap lg:flex-nowrap justify-between gap-x-16 mt-8 lg:mt-2">
        <div className="w-full lg:w-6/12">
          <ReadOnlyInput
            label="Site web"
            id={`${id}-website`}
            name="website"
            value={user.siteWebOrganisation || ''}
          />
        </div>
        <div className="w-full lg:w-6/12 self-end mt-8 mb-2">
          {/* todo: ocAddedtoLPA ?? */}
          {/* <ReadOnlyCheckboxGroup
            name="checkbox"
            options={[
              {
                id: 'checkboxes-disabled-1',
                label: "Inclure le siège comme un point d'accueil",
                checked: true,
              },
            ]}
          /> */}
        </div>
      </div>
    </form>
  );
};
