import React from 'react';

const AppLayout = ({ children }) => {
    return (
        <>
            <meta charSet="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
            <title>X-Bakery</title>

            <link type="image/x-icon" href="/favicon.ico" rel="icon" />
            <link href="/css/bootstrap.css" rel="stylesheet" />
            <link href="/css/animate.min.css" rel="stylesheet" />
            <link href="/css/fontawesome.css" rel="stylesheet" />
            <link href="/css/style.css" rel="stylesheet" />
            <link href="/css/toastify.min.css" rel="stylesheet" />


            <script src="/js/toastify-js.js"></script>
            <script src="/js/config.js"></script>


            <div className="LoadingOverlay d-none" id="loader">
                <div className="Line-Progress">
                    <div className="indeterminate"></div>
                </div>
            </div>


            <div>
                {children}
            </div>

            <script src="/js/bootstrap.bundle.js"></script>

        </>
    );
};

export default AppLayout;