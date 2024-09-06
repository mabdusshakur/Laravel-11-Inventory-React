import axios from "axios";

const SidenavLayout = ({ children }) => {

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

    function logout() {
        axios.post("/api/auth/logout");
        window.location.href = '/login';
    }

    return (
        <>
            <meta charSet="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
            <title>X-Bakery - Dashboard</title>

            <link type="image/x-icon" href="//favicon.ico" rel="icon" />
            <link href="/css/bootstrap.css" rel="stylesheet" />
            <link href="/css/animate.min.css" rel="stylesheet" />
            <link href="/css/fontawesome.css" rel="stylesheet" />
            <link href="/css/style.css" rel="stylesheet" />
            <link href="/css/toastify.min.css" rel="stylesheet" />

            <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css" rel="stylesheet" />

            <link href="/css/jquery.dataTables.min.css" rel="stylesheet" />
            <script src="/js/jquery-3.7.0.min.js"></script>
            <script src="/js/jquery.dataTables.min.js"></script>

            <script src="/js/toastify-js.js"></script>
            <script src="/js/config.js"></script>
            <script src="/js/bootstrap.bundle.js"></script>



            <div className="LoadingOverlay d-none" id="loader">
                <div className="Line-Progress">
                    <div className="indeterminate"></div>
                </div>
            </div>

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
                                <Link className="side-bar-item" onClick={logout}>
                                    <span className="side-bar-item-caption">Logout</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            <div className="side-nav-open" id="sideNavRef">

                <Link className="side-bar-item" href="/dashboard">
                    <i className="bi bi-graph-up"></i>
                    <span className="side-bar-item-caption">Dashboard</span>
                </Link>

                <Link className="side-bar-item" href="/customers">
                    <i className="bi bi-people"></i>
                    <span className="side-bar-item-caption">Customer</span>
                </Link>

                <Link className="side-bar-item" href="/category">
                    <i className="bi bi-list-nested"></i>
                    <span className="side-bar-item-caption">Category</span>
                </Link>

                <Link className="side-bar-item" href="/product">
                    <i className="bi bi-bag"></i>
                    <span className="side-bar-item-caption">Product</span>
                </Link>

                <Link className="side-bar-item" href="/sale">
                    <i className="bi bi-currency-dollar"></i>
                    <span className="side-bar-item-caption">Create Sale</span>
                </Link>

                <Link className="side-bar-item" href="/invoice">
                    <i className="bi bi-receipt"></i>
                    <span className="side-bar-item-caption">Invoice</span>
                </Link>

                <Link className="side-bar-item" href="/report">
                    <i className="bi bi-file-earmark-bar-graph"></i>
                    <span className="side-bar-item-caption">Report</span>
                </Link>

            </div>

            <div className="content" id="contentRef">
                {children}
            </div>
        </>

    );
}


export default SidenavLayout;