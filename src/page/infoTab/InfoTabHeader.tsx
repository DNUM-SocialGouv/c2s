import { INFORMATIONS_FORM } from '@/wording';

export const InfoTabHeader = () => {
  return (
    <div className="flex-grow mt-5">
      <h2 className="mb-0">{INFORMATIONS_FORM.title}</h2>
      <p>{INFORMATIONS_FORM.subTitle}</p>
    </div>
  );
};
