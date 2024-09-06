function LoginForm() {

    async function SubmitLogin() {
        let email = document.getElementById('email').value;
        let password = document.getElementById('password').value;

        if (email.length === 0) {
            errorToast("Email is required");
        } else if (password.length === 0) {
            errorToast("Password is required");
        } else {
            showLoader();
            let res = await axios.post("/api/auth/login", {
                email: email,
                password: password
            });
            hideLoader()
            if (res.status === 200 && res.data['success'] === true) {
                // setLoggedIn();
                Inertia.visit('/dashboard');
            } else {
                errorToast(res.data['message']);
            }
        }
    }
    return (<>
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-7 animated fadeIn col-lg-6 center-screen">
                    <div className="card w-90 p-4">
                        <div className="card-body">
                            <h4>SIGN IN</h4>
                            <br />
                            <input className="form-control" id="email" type="email" placeholder="User Email" />
                            <br />
                            <input className="form-control" id="password" type="password" placeholder="User Password" />
                            <br />
                            <button className="btn w-100 bg-gradient-primary" onClick={SubmitLogin}>Next</button>
                            <hr />
                            <div className="float-end mt-3">
                                <span>
                                    <Link className="h6 ms-3 text-center" href="/register-page">Sign Up </Link>
                                    <span className="ms-1">|</span>
                                    <Link className="h6 ms-3 text-center" href="/send-otp-page">Forget Password</Link>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>);
}

export default LoginForm;