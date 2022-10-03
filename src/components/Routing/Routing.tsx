import { BrowserRouter, Route, Routes } from "react-router-dom"
import { useSigninCheck } from "reactfire"
import { About } from "../About"
import { Unauthorized } from "../Authorization/Unauthorized"
import { Contact } from "../Contact"
import { Dashboard } from "../Dashboard"
import { ErrorPage } from "../ErrorPage"
import { Home } from "../Home"
import { Layout } from "../Layout"

export const Routing = ()=>{
    const {status, data:signInCheckResult} = useSigninCheck();
    return(
        <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout/>} errorElement={<ErrorPage/>}>
            <Route path='/' element={<Home/>}/>
            <Route path='/about' element={<About/>}/>
            <Route path='/contact' element={<Contact/>}/>
            <Route 
                path='/dashboard' 
                element={
                    (status!=='loading' && signInCheckResult.signedIn) ? <Dashboard/> : <Unauthorized/>
                }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    )
}