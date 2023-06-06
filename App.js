import './App.css';
import {Create} from "./pages/Create";
import {Route, Routes} from "react-router-dom";
import {Home} from "./pages/Home";
import {List} from "./pages/List";
import {Edit} from "./pages/Edit";
import {Search} from "./pages/Search"

function App() {
  return (
      <>
        <Routes>
          <Route path={'/home'} element={<Home/>}>
            <Route path={'/home/list'} element={<List/>}/>
            <Route path={'/home/search'} element={<Search/>}/>
            <Route path={'/home/create'} element={<Create/>}/>
            <Route path={'/home/edit/:id'} element={<Edit/>}/>
          </Route>
        </Routes>
      </>
  );
}

export default App;





// function App() {
//     const userRole = localStorage.getItem('role');
//
//     return (
//         <>
//             <Routes>
//                 {userRole === 'admin' && (
//                     <Route path={'/home'} element={<Home/>}>
//                         <Route path={'/home/list'} element={<List/>}/>
//                         <Route path={'/home/search'} element={<Search/>}/>
//                         <Route path={'/home/create'} element={<Create/>}/>
//                         <Route path={'/home/edit/:id'} element={<Edit/>}/>
//                     </Route>
//                 )}
//                 {userRole === 'user' && (
//                     <Route path={'/user'} element={<HomeUser/>}>
//                         <Route path={'/user/list'} element={<ListUser/>}/>
//                         <Route path={'/user/search'} element={<SearchUser/>}/>
//                         <Route path={'/user/create'} element={<CreateUser/>}/>
//                         <Route path={'/user/edit/:id'} element={<EditUser/>}/>
//                     </Route>
//                 )}
//                 {(userRole !== 'admin' && userRole !== 'user') && (
//                     <Route path={'/general'} element={<General/>}>
//                         <Route path={'/general/list'} element={<List/>}/>
//                     </Route>
//                 )}
//             </Routes>
//         </>
//     );
// }
