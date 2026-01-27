import { CustomTable } from '../../components/ui/CustomTable';
import { Box, DialogActions, DialogContent } from '@mui/material';
import { useIncidents } from '../../hooks/useIncidents';
import { dateFormatter } from '../../helpers/util';
import { useNavigate } from 'react-router-dom';
import { useState, useMemo, useRef } from 'react';
import PopupModal from '../../components/ui/PopupModal';
import { InputForm, type InputFormRef } from '../../components/ui/InputForm';
import { CustomButton } from '../../components/ui/CustomButton';
import { CustomizedSnackbar } from '../../components/ui/CustomizedSnackbar';
import SaveIcon from '@mui/icons-material/Save';
import { PageLayout } from '../../components/layout/PageLayout';


export default function IncidentsPage() {
  const { data = [], isLoading } = useIncidents();
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [openPopup, setOpenPopup] = useState(false);
  const inputFormRef = useRef<InputFormRef>(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const columns = [
    { id: 'title', label: 'Title' },
    { id: 'status', label: 'Status' },
    { id: 'severity', label: 'Severity' },
    {
      id: 'createdAt',
      label: 'Created At',
      render: (row: any) => dateFormatter(row.createdAt),
    },
  ];

  const filteredRows = useMemo(() => {
    return data.filter((incident: any) =>
      incident.title.toLowerCase().includes(search.toLowerCase()),
    );
  }, [data, search]);

  if (isLoading) return <div>Loading...</div>;

  const saveIncidentHandler = () => {
    inputFormRef.current?.submit()
  };

  return (
    <PageLayout
    title='Incidents List'
      backTo="/dashboard"
    >

      <CustomTable
        columns={columns}
        rows={filteredRows}
        getRowId={(row: any) => row.id}
        searchValue={search}
        onSearchChange={setSearch}
        onCreateClick={() => setOpenPopup(true)}
        onRowClick={(row: any) => navigate(`/incident/${row.id}`)}
      />
      <PopupModal openPopup={openPopup} closePopup={() => setOpenPopup(false)} title='Create Incident'>
        <DialogContent dividers>
          <InputForm
            ref={inputFormRef}
            onSuccess={(message) => {
              setOpenPopup(false);
              setOpenSnackbar(true);
              setAlertMessage(message)
            }}
          />
        </DialogContent>
        <DialogActions>
          <Box onClick={saveIncidentHandler}>
            <CustomButton isPending={false} buttonText="Save" startIcon={<SaveIcon />} />
          </Box>
        </DialogActions>
      </PopupModal>
      <CustomizedSnackbar openSnackbar={openSnackbar} alertMessage={alertMessage} closeSnackbar={() => setOpenSnackbar(false)} />


    </PageLayout>



  );
}
