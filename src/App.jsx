

import { Routes, Route } from "react-router"
import { Login, Dashboard, AddTeacher, AddSubject} from "./pages"
import Layout from "./components/Layout"

function App() {
  return (
    <>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/' element={<Layout />}>
          <Route path='/dashboard' element={<Dashboard />} />
                <Route path='/addTeacher' element={<AddTeacher />} />
                <Route path='/addSubject' element={<AddSubject />} />
          <Route path='/addStudent' element={<AddStudent />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
