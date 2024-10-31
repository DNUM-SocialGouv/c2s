import { ReadOnlyInput } from '../../common/input/ReadOnlyInput.tsx';
import { ReadOnlyRadioGroup } from '../../common/input/ReadOnlyRadioGroup.tsx';
// import { ReadOnlyCheckboxGroup } from '@/components/common/input/ReadOnlyCheckboxGroup';
import { COMMON } from '../../../wording.ts';
import { User } from '../../../domain/ModerateurUsers.ts';

interface UserInformationsProps {
  id: string;
  user: User;
}

const capitalize = (str: string) =>
  str.charAt(0).toUpperCase() + str.slice(1).toLocaleLowerCase();

export const UserInformations = ({ id, user }: UserInformationsProps) => {
  const capitalizedVilleOrganisation =
    user.villeOrganisation && capitalize(user.villeOrganisation);
  const adresseOrganisationFull = `${user.adresseOrganisation ?? ''} ${user.codePostalOrganisation ?? ''} ${capitalizedVilleOrganisation ?? ''}`;

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
          value={adresseOrganisationFull || ''}
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
              checked:
                user.typeOrganisation === 'ORGANISME_COMPLEMENTAIRE'
                  ? true
                  : false,
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
          value={user.emailOrganisation || ''}
        />
        <ReadOnlyInput
          label="Téléphone de l'organisation"
          id={`${id}-phone`}
          name="phone"
          value={user.telephoneOrganisation || ''}
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
