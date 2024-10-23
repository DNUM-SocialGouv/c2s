import { COMMON, MODERATOR_ESTABLISHMENTS } from '../../../wording.ts';

type ToggleEstablishmentTypeProps = {
  establishmentType: string;
  updateEstablishmentType: (newOption: string) => void;
};

export const ToggleEstablishmentType = ({
  establishmentType,
  updateEstablishmentType,
}: ToggleEstablishmentTypeProps) => {
  const handleOptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedOption = e.target.value;
    updateEstablishmentType(selectedOption);
  };

  return (
    <fieldset
      className="fr-fieldset lg:w-[40%]"
      id="radio-hint"
      aria-labelledby="radio-hint-legend radio-hint-messages"
    >
      <legend
        className="fr-fieldset__legend--regular fr-fieldset__legend"
        id="radio-hint-legend"
      >
        <span className="font-normal">
          {MODERATOR_ESTABLISHMENTS.establishmentType}
        </span>
      </legend>
      <div className="fr-fieldset__element">
        <div className="fr-radio-group">
          <input
            type="radio"
            id="radio-hint-1"
            name="radio-hint"
            value="oc"
            checked={establishmentType === 'oc'}
            onChange={handleOptionChange}
          />
          <label className="fr-label" htmlFor="radio-hint-1">
            {COMMON.oc}
          </label>
        </div>
      </div>
      <div className="fr-fieldset__element">
        <div className="fr-radio-group">
          <input
            type="radio"
            id="radio-hint-2"
            name="radio-hint"
            value="pa"
            checked={establishmentType === 'pa'}
            onChange={handleOptionChange}
          />
          <label className="fr-label" htmlFor="radio-hint-2">
            {COMMON.pa}
          </label>
        </div>
      </div>
      <div
        className="fr-messages-group"
        id="radio-hint-messages"
        aria-live="assertive"
      ></div>
    </fieldset>
  );
};
