import { CustomTable } from '../../components/ui/CustomTable';
import { dateFormatter } from '../../helpers/util';
import { useNavigate } from 'react-router-dom';
import { useState, useMemo } from 'react';
import { useuser } from '../../hooks/useUsers';
import { PageLayout } from '../../components/layout/PageLayout';

export default function UsersPage() {

  const { data = [], isLoading } = useuser();
  const navigate = useNavigate();
  const [search, setSearch] = useState('');

  const columns = [
    { id: 'email', label: 'Email' },
    { id: 'role', label: 'Role' },
    {
      id: 'userSince',
      label: 'User Since',
      render: (row: any) => dateFormatter(row.createdAt),
    },
  ];

  const filteredRows = useMemo(() => {
    return data.filter((user: any) =>
      user.email.toLowerCase().includes(search.toLowerCase()),
    );
  }, [data, search]);

  if (isLoading) return <div>Loading...</div>;

  return (
    <PageLayout
      title="Users"
      backTo="/dashboard"
    >
      <CustomTable
        columns={columns}
        rows={filteredRows}
        getRowId={(row: any) => row.id}
        searchValue={search}
        onSearchChange={setSearch}
        onCreateClick={() => console.log('Open create incident modal')}
        onRowClick={(row: any) => navigate(`/user/${row.id}`)}
      />
    </PageLayout>

  );
}
