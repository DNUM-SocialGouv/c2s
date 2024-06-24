import '@testing-library/jest-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import {
  OcActiveTabProvider,
  OcActiveTabContext,
} from '@/contexts/OcActiveTabContext';
import { useContext } from 'react';

describe('OcTabContext', () => {
  it('should render the children components', () => {
    render(
      <OcActiveTabProvider>
        <div>Child Component</div>
      </OcActiveTabProvider>
    );

    expect(screen.getByText('Child Component')).toBeInTheDocument();
  });

  it('should provide the tab value and setTab function', async () => {
    const TestComponent = () => {
      const context = useContext(OcActiveTabContext);

      return (
        <div>
          <span data-testid="tab-value">{context.activeTab}</span>
          <button onClick={() => context.setActiveTab('3')}>Set Tab</button>
        </div>
      );
    };

    render(
      <OcActiveTabProvider>
        <TestComponent />
      </OcActiveTabProvider>
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
