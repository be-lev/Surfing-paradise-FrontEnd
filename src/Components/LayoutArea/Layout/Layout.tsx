import "./Layout.css";
import { BrowserRouter } from 'react-router-dom';
import Header from "../Header/Header";
import Menu from "../Menu/Menu";
import Routing from "../Routing/Routing";
import CopyRights from "../CopyRights/CopyRights";

function Layout(): JSX.Element {
    return (
        <BrowserRouter>
        <div className="Layout">
			<header>
            <Menu/>
                <Header/>
            </header>
            <aside>
                
            </aside>
            <main>
                <Routing/>
            </main>
            <footer>
                <CopyRights/>
            </footer>
        </div>
        </BrowserRouter>
    );
}

export default Layout;
