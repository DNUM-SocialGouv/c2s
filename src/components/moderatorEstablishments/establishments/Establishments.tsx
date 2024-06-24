import { useModeratorEstablishmentsContext } from '@/contexts/ModeratorEstablishmentsContext';

export const Establishments = () => {
  const { establishements } = useModeratorEstablishmentsContext();

  return (
    <div>
      Establishments:{' '}
      {establishements.length &&
        establishements.map((establishment) => establishment.name)}
    </div>
  );
};
