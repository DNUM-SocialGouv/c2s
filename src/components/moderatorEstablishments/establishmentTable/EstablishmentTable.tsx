import { Table } from '@/components/common/table/Table';

export const EstablishmentTable = () => {
  const mockHeaders = ['th0', 'th1', 'th2', 'th3'];
  const mockRows = [
    [
      'Lorem [...] elit ut.',
      'Lorem [...] elit ut.',
      'Lorem [...] elit ut.',
      'Lorem [...] elit ut.',
    ],
    [
      'Lorem [...] elit ut.',
      'Lorem [...] elit ut.',
      'Lorem [...] elit ut.',
      'Lorem [...] elit ut.',
    ],
    [
      'Lorem [...] elit ut.',
      'Lorem [...] elit ut.',
      'Lorem [...] elit ut.',
      'Lorem [...] elit ut.',
    ],
    [
      'Lorem [...] elit ut.',
      'Lorem [...] elit ut.',
      'Lorem [...] elit ut.',
      'Lorem [...] elit ut.',
    ],
  ];

  return (
    <div className="fr-container--fluid">
      <h1>Table test</h1>
      <Table headers={mockHeaders} rows={mockRows} />
    </div>
  );
};
