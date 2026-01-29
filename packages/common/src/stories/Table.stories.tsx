import type { GridColDef, GridRowsProp } from '@mui/x-data-grid';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

import { Table } from '../components/common/Table';

const sampleRows: GridRowsProp = [
  { id: 1, name: 'John Doe', email: 'john.doe@example.com', role: 'Admin' },
  { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', role: 'User' },
  {
    id: 3,
    name: 'Bob Johnson',
    email: 'bob.johnson@example.com',
    role: 'User',
  },
  {
    id: 4,
    name: 'Alice Brown',
    email: 'alice.brown@example.com',
    role: 'Admin',
  },
  {
    id: 5,
    name: 'Charlie Wilson',
    email: 'charlie.wilson@example.com',
    role: 'User',
  },
];

const sampleColumns: GridColDef[] = [
  {
    field: 'name',
    headerName: 'Name',
    flex: 1,
    minWidth: 150,
  },
  {
    field: 'email',
    headerName: 'Email',
    flex: 1,
    minWidth: 200,
  },
  {
    field: 'role',
    headerName: 'Role',
    flex: 1,
    minWidth: 100,
  },
];

type TableStoryProps = {
  rows?: GridRowsProp;
  columns?: GridColDef[];
  pageCount?: number;
  page?: number;
};

const TableStory = ({
  rows = sampleRows,
  columns = sampleColumns,
  pageCount = 0,
  page: initialPage = 0,
}: TableStoryProps) => {
  const [page, setPage] = useState(initialPage);

  return (
    <div style={{ width: 800, height: 400 }}>
      <Table
        rows={rows}
        columns={columns}
        pageCount={pageCount}
        page={page}
        onPageChange={setPage}
      />
    </div>
  );
};

TableStory.displayName = 'Table';

const meta = {
  title: 'Components/Table',
  component: TableStory,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  args: {
    rows: sampleRows,
    columns: sampleColumns,
    pageCount: 0,
    page: 0,
  },
  argTypes: {
    rows: {
      control: 'object',
      description: 'Rows config for the table',
    },
    columns: {
      control: 'object',
      description: 'Columns config for the table',
    },
    pageCount: {
      control: { type: 'number', min: 0 },
      description: 'Total number of pages',
    },
    page: {
      control: { type: 'number', min: 0 },
      description: 'Current page of the table',
    },
  },
} satisfies Meta<typeof TableStory>;

type Story = StoryObj<typeof meta>;

const Template = (args: TableStoryProps) => <TableStory {...args} />;

export const Default: Story = {
  render: Template,
};

export const WithPagination: Story = {
  args: {
    pageCount: 5,
    page: 0,
  },
  render: Template,
};

export const EmptyTable: Story = {
  args: {
    rows: [],
    columns: sampleColumns,
  },
  render: Template,
};

export default meta;
