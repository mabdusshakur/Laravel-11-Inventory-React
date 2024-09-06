function SendOtpForm() {

    async function VerifyEmail() {
        let email = document.getElementById('email').value;
        if (email.length === 0) {
            window.errorToast('Please enter your email address')
        } else {
            showLoader();
            let res = await axios.post('/api/auth/send-otp', {
                email: email
            });
            hideLoader();
            if (res.status === 200 && res.data['success'] === true) {
                successToast(res.data['message'])
                sessionStorage.setItem('email', email);
                setTimeout(function () {
                    Inertia.visit('/verify-otp-page');
                }, 1000)
            } else {
                errorToast(res.data['message'])
            }
        }

    }

    return (<>
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-7 col-lg-6 center-screen">
                    <div className="card animated fadeIn w-90 p-4">
                        <div className="card-body">
                            <h4>EMAIL ADDRESS</h4>
                            <br />
                            <label>Your email address</label>
                            <input className="form-control" id="email" type="email" placeholder="User Email" />
                            <br />
                            <button className="btn w-100 float-end bg-gradient-primary" onClick={VerifyEmail}>Next</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>);
}

export default SendOtpForm;