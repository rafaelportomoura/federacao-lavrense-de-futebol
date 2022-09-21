import { Outlet } from "react-router-dom";
import FLFNavBar from "./FLFNavBar/FLFNavBar";

const Layout = () => {
    return (
        <main className="App">
            <FLFNavBar/>
            <Outlet/>
        </main>
    )
}

export default Layout;