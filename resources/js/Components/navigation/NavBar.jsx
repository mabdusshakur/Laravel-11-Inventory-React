import { Inertia } from "@inertiajs/inertia";
import { useAuth } from "../../AuthContext";

function NavBar() {
    const { logout } = useAuth();

    function MenuBarClickHandler() {
        let sideNav = document.getElementById('sideNavRef');
        let content = document.getElementById('contentRef');
        if (sideNav.classList.contains("side-nav-open")) {
            sideNav.classList.add("side-nav-close");
            sideNav.classList.remove("side-nav-open");
            content.classList.add("content-expand");
            content.classList.remove("content");
        } else {
            sideNav.classList.remove("side-nav-close");
            sideNav.classList.add("side-nav-open");
            content.classList.remove("content-expand");
            content.classList.add("content");
        }
    }

    function logoutRequest() {
        axios.post("/api/auth/logout").then(response => {
            if (response.status === 200) {
                logout();
                Inertia.visit('/login-page');
            }
        }).catch(error => {
            console.log(error);
        });
    }

    return (<>
        <nav className="navbar fixed-top bg-white px-0 shadow-sm">
            <div className="container-fluid">

                <Link className="navbar-brand" href="#">
                    <span className="icon-nav h5 m-0" onClick={MenuBarClickHandler}>
                        <img className="nav-logo-sm mx-2" src="/images/menu.svg" alt="logo" />
                    </span>
                    <img className="nav-logo mx-2" src="/images/logo.png" alt="logo" />
                </Link>

                <div className="d-flex float-right h-auto">
                    <div className="user-dropdown">
                        <img className="icon-nav-img" src="/images/user.webp" alt="" />
                        <div className="user-dropdown-content">
                            <div className="mt-4 text-center">
                                <img className="icon-nav-img" src="/images/user.webp" alt="" />
                                <h6>User Name</h6>
                                <hr className="user-dropdown-divider p-0" />
                            </div>
                            <Link className="side-bar-item" href="/profile">
                                <span className="side-bar-item-caption">Profile</span>
                            </Link>
                            <Link className="side-bar-item" onClick={logoutRequest}>
                                <span className="side-bar-item-caption">Logout</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    </>);
}

export default NavBar;