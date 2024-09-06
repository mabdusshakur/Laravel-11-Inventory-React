<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-7 col-lg-6 center-screen">
            <div class="card animated fadeIn w-90 p-4">
                <div class="card-body">
                    <h4>SET NEW PASSWORD</h4>
                    <br />
                    <label>New Password</label>
                    <input class="form-control" id="password" type="password" placeholder="New Password" />
                    <br />
                    <label>Confirm Password</label>
                    <input class="form-control" id="cpassword" type="password" placeholder="Confirm Password" />
                    <br />
                    <button class="btn w-100 bg-gradient-primary" onclick="ResetPass()">Next</button>
                </div>
            </div>
        </div>
    </div>
</div>

<script>
    async function ResetPass() {
        let password = document.getElementById('password').value;
        let cpassword = document.getElementById('cpassword').value;

        if (password.length === 0) {
            errorToast('Password is required')
        } else if (cpassword.length === 0) {
            errorToast('Confirm Password is required')
        } else if (password !== cpassword) {
            errorToast('Password and Confirm Password must be same')
        } else {
            showLoader()
            let res = await axios.patch("/api/user/reset-password", {
                password: password
            });
            hideLoader();
            if (res.status === 200 && res.data['success'] === true) {
                successToast(res.data['message']);
                setTimeout(function() {
                    window.location.href = '{{ route('web.login') }}';
                }, 1000);
            } else {
                errorToast(res.data['message'])
            }
        }

    }
</script>
