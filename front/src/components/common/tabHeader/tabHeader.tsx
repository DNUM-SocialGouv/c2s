interface TabHeaderProps {
  icon?: JSX.Element;
  pageTitle?: string;
  pageDetail?: string;
}

export const TabHeader: React.FC<TabHeaderProps> = ({
  icon,
  pageTitle,
  pageDetail,
}) => {
  return (
    <div className="fr-grid-row" data-testid="tabHeader">
      <header className="header header--flex pt-4">
        {icon && icon}
        <div>
          {/* FIXME: replace with h2 ? */}
          <h3 className="oc__header--font-size mb-1">
            {pageTitle && pageTitle}
          </h3>
          <p className="txt-chapo mb-0">{pageDetail && pageDetail}</p>
        </div>
      </header>
    </div>
  );
};
