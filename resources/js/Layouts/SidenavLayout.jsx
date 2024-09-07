import NavBar from "../Components/navigation/NavBar";

const SidenavLayout = ({ children }) => {
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
            <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css" rel="stylesheet" />

            <div className="LoadingOverlay d-none" id="loader">
                <div className="Line-Progress">
                    <div className="indeterminate"></div>
                </div>
            </div>

            <NavBar />

            <div className="side-nav-open" id="sideNavRef">

                <Link className="side-bar-item" href="/dashboard">
                    <i className="bi bi-graph-up"></i>
                    <span className="side-bar-item-caption">Dashboard</span>
                </Link>

                <Link className="side-bar-item" href="/customer">
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