import ReactDOM from 'react-dom/client'
import 'modern-normalize/modern-normalize.css'
import { createGlobalStyle } from 'styled-components'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { paths } from './constants'
import { Home, Category, ErrorPage, UserProfile, AccountAdmin } from './pages'
import { Information } from './pages/Information'
import { AuthProvider } from './context/AuthProvider'
import { font } from './styles'
import './i18n'

const GlobalStyle = createGlobalStyle`
  body {
    font-family: ${font.fontFamily};
  }
`

const router = createBrowserRouter([
  {
    path: paths.home,
    element: <Home />,
    errorElement: <ErrorPage />,
  },
  {
    path: paths.categories,
    element: <Category />,
  },
  {
    path: paths.information,
    element: <Information />,
  },
  {
    path: paths.accountAdmin,
    element: <AccountAdmin />,
  },
  {
    path: paths.profile,
    element: <UserProfile />,
  },
])

const queryClient = new QueryClient()

const rootElement = document.getElementById('root')
if (!rootElement) throw new Error('Failed to find the root element')
const root = ReactDOM.createRoot(rootElement)
root.render(
  <AuthProvider>
    <QueryClientProvider client={queryClient}>
      <GlobalStyle />
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
    </QueryClientProvider>
  </AuthProvider>
)
