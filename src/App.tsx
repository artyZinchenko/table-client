import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { AuthContextProvider } from './contexts/AuthContext';
import { Route, Routes, BrowserRouter, Navigate } from 'react-router-dom';
import ProtectedRoutes from './components/ProtectedRoute';
import Root from './components/AuthPage/Root';
import Table from './components/Table/UserTable';

const App = () => {
    const queryClient = new QueryClient();
    return (
        <AuthContextProvider>
            <BrowserRouter>
                <QueryClientProvider client={queryClient}>
                    <Routes>
                        <Route
                            path='*'
                            element={<Navigate to='/table' replace />}
                        />
                        <Route path='/authentication' element={<Root />} />

                        <Route element={<ProtectedRoutes />}>
                            <Route path='/table' element={<Table />} />
                        </Route>
                    </Routes>
                    <ReactQueryDevtools initialIsOpen={false} />
                </QueryClientProvider>
            </BrowserRouter>
        </AuthContextProvider>
    );
};

export default App;
