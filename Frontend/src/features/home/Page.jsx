import { RequireCustomer } from '../../components/require-permission'
import HomeView from './_components/home-view'

const HomePage = () => (
  <RequireCustomer adminHref="/admin">
    <HomeView />
  </RequireCustomer>
)

export default HomePage
