import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { Tuile } from './Tuile';
import { Avatar } from '../svg/Avatar';
import {
  ActiveTabContext,
  ActiveTabProvider,
} from '../../../contexts/ActiveTabContext';
import { axe, toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

describe('Tuile', () => {
  const setup = (
    title: string,
    detail: string,
    tabId: string,
    arrow: boolean = false,
    badge: string = '',
    children: React.ReactNode = <Avatar />,
    variant: 'default' | 'full-width' = 'default'
  ) => {
    return render(
      <ActiveTabProvider>
        <Tuile
          title={title}
          detail={detail}
          tabId={tabId}
          arrow={arrow}
          badge={badge}
          variant={variant}
        >
          {children}
        </Tuile>
      </ActiveTabProvider>
    );
  };

  it('should render component with correct title and detail', () => {
    setup('Test Title', 'Test Detail', '2');

    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test Detail')).toBeInTheDocument();
  });

  it('should call setActiveTab with the correct tabId on click', () => {
    const mockSetActiveTab = jest.fn();
    render(
      <ActiveTabContext.Provider
        value={{ activeTab: '1', setActiveTab: mockSetActiveTab }}
      >
        <Tuile title="Test Title" detail="Test Detail" tabId="2">
          <Avatar />
        </Tuile>
      </ActiveTabContext.Provider>
    );

    const tuileElement = screen.getByRole('button');
    fireEvent.click(tuileElement);

    expect(mockSetActiveTab).toHaveBeenCalledWith('2');
  });

  it('should render the badge when badge prop is provided', () => {
    setup('Test Title', 'Test Detail', '2', false, 'New Badge');

    expect(screen.getByText('New Badge')).toBeInTheDocument();
  });

  it('should not render the badge when badge prop is empty', () => {
    setup('Test Title', 'Test Detail', '2');

    expect(screen.queryByText('New Badge')).not.toBeInTheDocument();
  });

  it('should render the arrow icon when arrow prop is true', () => {
    setup('Test Title', 'Test Detail', '2', true);

    expect(screen.getByTestId('arrow-svg')).toBeInTheDocument();
  });

  it('should not render the arrow icon when arrow prop is false', () => {
    setup('Test Title', 'Test Detail', '2', false);

    expect(screen.queryByTestId('arrow-svg')).not.toBeInTheDocument();
  });

  it('should apply variant class name when variant prop is not default', () => {
    setup(
      'Test Title',
      'Test Detail',
      '2',
      false,
      '',
      <Avatar />,
      'full-width'
    );

    const tuileElement = screen.getByRole('button');
    expect(tuileElement).toHaveClass('tuile__body--full-width');
  });

  it('should not have accessibility violations', async () => {
    setup('Test Title', 'Test Detail', '2');

    const tuileElement = screen.getByRole('button');
    expect(await axe(tuileElement)).toHaveNoViolations();
  });
});
