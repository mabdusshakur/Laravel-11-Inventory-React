import { useEffect } from 'react';
function ProfileCreate() {

    useEffect(() => {
        getProfile();
    }, []);

    async function getProfile() {
        showLoader();
        let res = await axios.get("/api/user/profile");
        hideLoader();
        if (res.data['success'] === true) {
            res = res.data[0];
            document.getElementById('email').value = res['email'];
            document.getElementById('firstName').value = res['firstName'];
            document.getElementById('lastName').value = res['lastName'];
            document.getElementById('mobile').value = res['mobile'];
        } else {
            errorToast(res['message'])
        }

    }

    async function onUpdate() {


        let firstName = document.getElementById('firstName').value;
        let lastName = document.getElementById('lastName').value;
        let mobile = document.getElementById('mobile').value;

        if (firstName.length === 0) {
            errorToast('First Name is required')
        } else if (lastName.length === 0) {
            errorToast('Last Name is required')
        } else if (mobile.length === 0) {
            errorToast('Mobile is required')
        } else {
            showLoader();
            let res = await axios.put(`/api/user/profile`, {
                firstName: firstName,
                lastName: lastName,
                mobile: mobile
            })

            hideLoader();
            if (res.data['success'] === true) {
                successToast(res.data['message']);

                res = res.data[0];
                document.getElementById('email').value = res['email'];
                document.getElementById('firstName').value = res['firstName'];
                document.getElementById('lastName').value = res['lastName'];
                document.getElementById('mobile').value = res['mobile'];

            } else {
                errorToast(res.data['message'])
            }
        }
    }

    return (<>
        <div className="container">
            <div className="row">
                <div className="col-md-12 col-lg-12">
                    <div className="card animated fadeIn w-100 p-3">
                        <div className="card-body">
                            <h4>User Profile</h4>
                            <hr />
                            <div className="container-fluid m-0 p-0">
                                <div className="row m-0 p-0">
                                    <div className="col-md-4 p-2">
                                        <label>Email Address</label>
                                        <input className="form-control" id="email" type="email" readonly placeholder="User Email" />
                                    </div>
                                    <div className="col-md-4 p-2">
                                        <label>First Name</label>
                                        <input className="form-control" id="firstName" type="text" placeholder="First Name" />
                                    </div>
                                    <div className="col-md-4 p-2">
                                        <label>Last Name</label>
                                        <input className="form-control" id="lastName" type="text" placeholder="Last Name" />
                                    </div>
                                    <div className="col-md-4 p-2">
                                        <label>Mobile Number</label>
                                        <input className="form-control" id="mobile" type="mobile" placeholder="Mobile" />
                                    </div>
                                </div>
                                <div className="row m-0 p-0">
                                    <div className="col-md-4 p-2">
                                        <button className="btn w-100 bg-gradient-primary mt-3" onClick={onUpdate}>Update</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>);
}

export default ProfileCreate;