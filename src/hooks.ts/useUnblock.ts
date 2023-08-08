import { QueryClient, useMutation } from '@tanstack/react-query';
import { format } from '../utils/format';
import unblockServices from '../services/unblock';

const useUnblock = (
  authContext: AuthContextValue,
  queryClient: QueryClient,
  selectedIds: number[]
) => {
  const block = useMutation({
    mutationFn: () => unblockServices.unblock(authContext.token, selectedIds),
    onSuccess: (response) => {
      if (!response || !authContext.user)
        throw new Error('Error unblocking users');

      const exists = authContext.userExists(
        authContext.user.id,
        response.data.users
      );
      if (!exists) {
        authContext.logout();
      }

      queryClient.setQueryData(
        ['todos', authContext.user?.id],
        format(response.data.users)
      );
    },
  });

  return block;
};

export default useUnblock;
