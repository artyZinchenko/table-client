import { Box, Button } from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';
import { useAuthContext } from '../../../contexts/AuthContext';
import useBlock from '../../../hooks.ts/useBlock';
import useDelete from '../../../hooks.ts/useDelete';
import useUnblock from '../../../hooks.ts/useUnblock';

interface Props {
    selectedIds: number[];
}

const UserTools = ({ selectedIds }: Props) => {
    const queryClient = useQueryClient();
    const authContext = useAuthContext();
    const disabled = selectedIds.length > 0 ? false : true;
    const blocking = useBlock(authContext, queryClient, selectedIds);
    const unblocking = useUnblock(authContext, queryClient, selectedIds);
    const deletion = useDelete(authContext, queryClient, selectedIds);

    return (
        <Box sx={{ display: 'flex', gap: '1em' }}>
            <Button
                variant='contained'
                disabled={disabled}
                size='small'
                onClick={() => blocking.mutate()}
            >
                block
            </Button>
            <Button
                variant='contained'
                disabled={disabled}
                size='small'
                onClick={() => unblocking.mutate()}
            >
                unblock
            </Button>
            <Button
                variant='contained'
                disabled={disabled}
                size='small'
                onClick={() => deletion.mutate()}
            >
                delete
            </Button>
        </Box>
    );
};
export default UserTools;
