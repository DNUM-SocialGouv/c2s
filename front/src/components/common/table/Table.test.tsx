import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { axe, toHaveNoViolations } from 'jest-axe';
import { Table } from './Table.tsx';

expect.extend(toHaveNoViolations);

const headers = ['Header 1', 'Header 2', 'Header 3', 'Header 4'];
const rows = [
  ['Row 1 Cell 1', 'Row 1 Cell 2', 'Row 1 Cell 3', 'Row 1 Cell 4'],
  ['Row 2 Cell 1', 'Row 2 Cell 2', 'Row 2 Cell 3', 'Row 2 Cell 4'],
  ['Row 3 Cell 1', 'Row 3 Cell 2', 'Row 3 Cell 3', 'Row 3 Cell 4'],
  ['Row 4 Cell 1', 'Row 4 Cell 2', 'Row 4 Cell 3', 'Row 4 Cell 4'],
];

describe('Table', () => {
  const setup = (options?: {
    title?: string;
    sortableColumns?: string[];
    onSort?: (field: string) => void;
    sortField?: string;
    sortOrder?: 'asc' | 'desc';
  }) => {
    const {
      title = '',
      sortableColumns = [],
      onSort = () => {},
      sortField = '',
      sortOrder = 'asc',
    } = options ?? {};

    render(
      <Table
        title={title}
        headers={headers}
        rows={rows}
        sortableColumns={sortableColumns}
        onSort={onSort}
        sortField={sortField}
        sortOrder={sortOrder}
      />
    );
  };

  it('should render the component without accessibility violations', async () => {
    setup({ title: 'Test Table Title' });

    const table = screen.getByRole('table');
    expect(await axe(table)).toHaveNoViolations();
  });

  it('should render the table with the correct title', () => {
    setup({ title: 'Test Table Title' });

    expect(screen.getByText('Test Table Title')).toBeInTheDocument();
  });

  it('should render the table headers correctly', () => {
    setup();

    headers.forEach((header) => {
      expect(screen.getByText(header)).toBeInTheDocument();
    });
  });

  it('should render the table rows and cells correctly', () => {
    setup();

    rows.forEach((row) => {
      row.forEach((cell) => {
        expect(screen.getByText(cell)).toBeInTheDocument();
      });
    });
  });

  it('should apply the correct number of columns class to the table', () => {
    setup();

    const tableElement = screen.getByRole('table');
    expect(
      tableElement.parentElement?.parentElement?.parentElement?.parentElement
    ).toHaveClass('table-cols-4');
  });

  it('should sort rows in ascending order when a sortable column header is clicked', () => {
    const onSortMock = jest.fn();
    setup({ sortableColumns: ['Header 1'], onSort: onSortMock });

    const firstHeader = screen.getByText('Header 1');
    fireEvent.click(firstHeader);

    expect(onSortMock).toHaveBeenCalledWith('Header 1');
  });

  it('should sort rows in descending order when a sortable column header is clicked twice', () => {
    const onSortMock = jest.fn();
    setup({
      sortableColumns: ['Header 1'],
      onSort: onSortMock,
      sortField: 'Header 1',
      sortOrder: 'asc',
    });

    const firstHeader = screen.getByText('Header 1');
    fireEvent.click(firstHeader);
    fireEvent.click(firstHeader);

    expect(onSortMock).toHaveBeenCalledWith('Header 1');
  });

  it('should display the correct sorting indicator for the sorted column', () => {
    setup({
      sortableColumns: ['Header 1'],
      sortField: 'Header 1',
      sortOrder: 'asc',
    });

    const firstHeader = screen.getByText('Header 1');
    expect(firstHeader).toHaveClass('table-th--active asc');
    expect(
      firstHeader.querySelector('.fr-icon-arrow-down-s-fill')
    ).toBeInTheDocument();
  });

  it('should not sort rows if the column is not in the sortableColumns list', () => {
    const onSortMock = jest.fn();
    setup({ sortableColumns: [], onSort: onSortMock });

    const firstHeader = screen.getByText('Header 1');
    fireEvent.click(firstHeader);

    expect(onSortMock).not.toHaveBeenCalled();
  });
});
