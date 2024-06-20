import { fireEvent, render, screen } from '@testing-library/react';
import { OcTabProvider, OcTabContext } from '@/contexts/OcTabContext';
import { useContext } from 'react';

describe('OcTabContext', () => {
  it('should render the children components', () => {
    render(
      <OcTabProvider>
        <div>Child Component</div>
      </OcTabProvider>
    );

    expect(screen.getByText('Child Component')).toBeInTheDocument();
  });

  it('should provide the tab value and setTab function', () => {
    const TestComponent = () => {
      const { tab, setTab } = useContext(OcTabContext);

      return (
        <div>
          <span data-testid="tab-value">{tab}</span>
          <button onClick={() => setTab('3')}>Set Tab</button>
        </div>
      );
    };

    render(
      <OcTabProvider>
        <TestComponent />
      </OcTabProvider>
    );

    const tabValue = screen.getByTestId('tab-value');
    const setTabButton = screen.getByText('Set Tab');

    expect(tabValue.textContent).toBe('2');

    fireEvent.click(setTabButton);

    expect(tabValue.textContent).toBe('2');
  });
});
