import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useAuthContext } from '../../../contexts/AuthContext';
import { Box, Button } from '@mui/material';
import UserTools from '../UserTools/UserTools';

interface Props {
  selectedIds: number[];
}

const UserToolbar = ({ selectedIds }: Props) => {
  const authContext = useAuthContext();
  return (
    <Toolbar
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        gap: '1em',
        flexWrap: 'wrap',
      }}
    >
      <Box>
        <Typography variant='h5'>{authContext.user?.username}</Typography>
        <Typography variant='h5'>{authContext.user?.email}</Typography>
      </Box>
      <UserTools selectedIds={selectedIds} />
      <Button onClick={() => authContext.logout()}>logout</Button>
    </Toolbar>
  );
};

export default UserToolbar;
