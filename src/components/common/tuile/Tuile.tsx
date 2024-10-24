import { useContext } from 'react';
import { ActiveTabContext } from '@/contexts/ActiveTabContext';
import { ArrowSvg } from '@/assets/ArrowSvg';
import './Tuile.css';

interface TuilesProps {
  title?: string;
  detail?: string;
  tabId: string;
  arrow?: boolean;
  badge?: string;
  children?: React.ReactNode;
  variant?: 'default' | 'full-width';
}

export const Tuile = ({
  title,
  detail,
  tabId,
  arrow = false,
  badge = '',
  children,
  variant = 'default',
}: TuilesProps) => {
  const context = useContext(ActiveTabContext);
  const variantClassName =
    variant !== 'default' ? `tuile__body--${variant}` : '';
  return (
    <div
      onClick={() => context.setActiveTab(tabId)}
      onKeyDown={() => context.setActiveTab(tabId)}
      className={`fr-tile fr-tile--sm fr-tile--horizontal fr-enlarge-link tuile__body--padding tuile__body--width tuile__body--height tuile__body--hover ${variantClassName}`}
      role="button"
      tabIndex={0}
    >
      {' '}
      <div className="fr-tile__body">
        {' '}
        <div className="fr-tile__content">
          {' '}
          {badge && (
            <div className="fr-tile__start mb-2">
              <p className="fr-badge fr-badge--sm fr-badge--purple-glycine">
                {badge}
              </p>
            </div>
          )}
          {title && (
            <h3 className="fr-tile__title tuile__titre--color tuile__titre--font-size tuile__titre--line-height">
              <span className="tuile_link">{title}</span>
            </h3>
          )}
          {detail && (
            <p className="fr-tile__detail tuile__detail--width tuile__detail--color tuile__detail--font-size tuile__detail--line-height tuile__detail--padding-bottom">
              {detail}
            </p>
          )}
        </div>{' '}
      </div>{' '}
      <div className="fr-tile__header tuile__picto--padding">
        {' '}
        <div className="fr-tile__pictogram"> {children && children} </div>{' '}
      </div>
      {arrow && (
        <div className="absolute bottom-7 right-7">
          <ArrowSvg />
        </div>
      )}
    </div>
  );
};
