import React,{ Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import {
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import i18n from '../i18n';
import { I18nextProvider } from 'react-i18next';
import "./Assets/css/style.css";
import { routes } from './Routes/Routes';
import { ThemeProvider } from './Context/ContextApi/ThemeProvider';
import WelcomePage from './Features/WelcomePage';
import { ModalProvider } from './Components/UIElements/Feedback/Modal/hook';

const router = createBrowserRouter(routes, {
  basename: `/TRC`,
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find the root element');
const root = ReactDOM.createRoot(rootElement);

root.render(
  <I18nextProvider i18n={i18n}>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider>
            <ModalProvider>
                  <Suspense fallback={<WelcomePage/>}>
                        <RouterProvider router={router} />
                    {/* <ReactQueryDevtools initialIsOpen={false} /> */}
                  </Suspense>
            </ModalProvider>
          </ThemeProvider>
        </QueryClientProvider>
  </I18nextProvider>,
);
