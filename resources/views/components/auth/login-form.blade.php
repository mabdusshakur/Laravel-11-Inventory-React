<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-7 animated fadeIn col-lg-6 center-screen">
            <div class="card w-90 p-4">
                <div class="card-body">
                    <h4>SIGN IN</h4>
                    <br />
                    <input class="form-control" id="email" type="email" placeholder="User Email" />
                    <br />
                    <input class="form-control" id="password" type="password" placeholder="User Password" />
                    <br />
                    <button class="btn w-100 bg-gradient-primary" onclick="SubmitLogin()">Next</button>
                    <hr />
                    <div class="float-end mt-3">
                        <span>
                            <a class="h6 ms-3 text-center" href="{{ route('web.register') }}">Sign Up </a>
                            <span class="ms-1">|</span>
                            <a class="h6 ms-3 text-center" href="{{ route('web.send-otp') }}">Forget Password</a>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<script>
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
                setLoggedIn();
                window.location.href = '{{ route('web.dashboard') }}';
            } else {
                errorToast(res.data['message']);
            }
        }
    }
</script>
