import '@testing-library/jest-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import { useContext } from 'react';
import { ActiveTabContext, ActiveTabProvider } from '../ActiveTabContext';

describe('OcTabContext', () => {
  it('should render the children components', () => {
    render(
      <ActiveTabProvider>
        <div>Child Component</div>
      </ActiveTabProvider>
    );

    expect(screen.getByText('Child Component')).toBeInTheDocument();
  });

  it('should provide the tab value and setTab function', async () => {
    const TestComponent = () => {
      const context = useContext(ActiveTabContext);

      return (
        <div>
          <span data-testid="tab-value">{context.activeTab}</span>
          <button onClick={() => context.setActiveTab('3')}>Set Tab</button>
        </div>
      );
    };

    render(
      <ActiveTabProvider>
        <TestComponent />
      </ActiveTabProvider>
    );

    const tabValue = screen.getByTestId('tab-value');
    const setTabButton = screen.getByText('Set Tab');

    expect(tabValue.textContent).toBe('1');

    await waitFor(() => {
      fireEvent.click(setTabButton);
    });

    expect(tabValue.textContent).toBe('3');
  });
});
