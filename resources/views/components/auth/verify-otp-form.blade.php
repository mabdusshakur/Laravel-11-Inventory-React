<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-7 col-lg-6 center-screen">
            <div class="card animated fadeIn w-90 p-4">
                <div class="card-body">
                    <h4>ENTER OTP CODE</h4>
                    <br />
                    <label>4 Digit Code Here</label>
                    <input class="form-control" id="otp" type="text" placeholder="Code" />
                    <br />
                    <button class="btn w-100 float-end bg-gradient-primary" onclick="VerifyOtp()">Next</button>
                </div>
            </div>
        </div>
    </div>
</div>
<script>
    async function VerifyOtp() {
        let otp = document.getElementById('otp').value;
        if (otp.length !== 4) {
            errorToast('Invalid OTP')
        } else {
            showLoader();
            let res = await axios.post('/api/auth/verify-otp', {
                otp: otp,
                email: sessionStorage.getItem('email')
            })
            hideLoader();

            if (res.status === 200 && res.data['success'] === true) {
                successToast(res.data['message'])
                sessionStorage.clear();
                setTimeout(() => {
                    window.location.href = '{{ route('web.reset-password') }}'
                }, 1000);
            } else {
                errorToast(res.data['message'])
            }
        }
    }
</script>
