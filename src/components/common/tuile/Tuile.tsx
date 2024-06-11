import './Tuile.css';

interface TuilesProps {
  title: string;
  detail: string;
  children: React.ReactNode;
}

export const Tuile = (props: TuilesProps) => {
  return (
    <div className="fr-tile fr-tile--sm fr-tile--horizontal fr-enlarge-link tuile__body--padding tuile__body--width tuile__body--height">
      {' '}
      <div className="fr-tile__body">
        {' '}
        <div className="fr-tile__content">
          {' '}
          <h3 className="fr-tile__title tuile__titre--color tuile__titre--font-size tuile__titre--line-height">
            <a href="#" className="tuile_link">
              {props.title}
            </a>
          </h3>{' '}
          <p className="fr-tile__detail tuile__detail--width tuile__detail--color tuile__detail--font-size tuile__detail--line-height tuile__detail--padding-bottom">
            {props.detail}
          </p>{' '}
        </div>{' '}
      </div>{' '}
      <div className="fr-tile__header tuile__picto--padding">
        {' '}
        <div className="fr-tile__pictogram"> {props.children} </div>{' '}
      </div>
    </div>
  );
};
