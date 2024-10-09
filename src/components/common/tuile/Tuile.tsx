import { ActiveTabContext } from '@/contexts/ActiveTabContext';
import './Tuile.css';
import { useContext } from 'react';

interface TuilesProps {
  title: string;
  detail: string;
  tabId: string;
  children: React.ReactNode;
}

export const Tuile = (props: TuilesProps) => {
  const context = useContext(ActiveTabContext);
  return (
    <div
      onClick={() => context.setActiveTab(props.tabId)}
      onKeyDown={() => context.setActiveTab(props.tabId)}
      className="fr-tile fr-tile--sm fr-tile--horizontal fr-enlarge-link tuile__body--padding tuile__body--width tuile__body--height tuile__body--hover"
      role="button"
      tabIndex={0}
    >
      {' '}
      <div className="fr-tile__body">
        {' '}
        <div className="fr-tile__content">
          {' '}
          <h3 className="fr-tile__title tuile__titre--color tuile__titre--font-size tuile__titre--line-height">
            <span className="tuile_link">{props.title}</span>
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
