import React, { forwardRef, useImperativeHandle } from 'react';

const CustomerUpdate = forwardRef((props, ref) => {
    useImperativeHandle(ref, () => ({
        FillUpUpdateForm
    }));

    async function FillUpUpdateForm(id) {
        document.getElementById('updateID').value = id;
        showLoader();
        let res = await axios.get(`/api/customers/${id}`);
        res = res.data[0];

        hideLoader();
        document.getElementById('customerNameUpdate').value = res['name'];
        document.getElementById('customerEmailUpdate').value = res['email'];
        document.getElementById('customerMobileUpdate').value = res['mobile'];
    }

    function closeUpdateModal() {
        $('#update-form').trigger('reset');
        $('#update-modal-close').trigger('click');
    }
    async function Update() {

        let customerName = document.getElementById('customerNameUpdate').value;
        let customerEmail = document.getElementById('customerEmailUpdate').value;
        let customerMobile = document.getElementById('customerMobileUpdate').value;
        let updateID = document.getElementById('updateID').value;


        if (customerName.length === 0) {
            errorToast("Customer Name Required !")
        } else if (customerEmail.length === 0) {
            errorToast("Customer Email Required !")
        } else if (customerMobile.length === 0) {
            errorToast("Customer Mobile Required !")
        } else {
            showLoader();

            let res = await axios.patch(`/api/customers/${updateID}`, {
                name: customerName,
                email: customerEmail,
                mobile: customerMobile,
            })
            hideLoader();

            if (res.status === 200 && res.data['success'] === true) {
                successToast('Request completed');
                closeUpdateModal();
                await props.getList();
            } else {
                errorToast("Request fail !")
            }
        }
    }


    return (<>
        <div className="modal animated zoomIn" id="update-modal" aria-labelledby="exampleModalLabel" aria-hidden="true" tabIndex="-1">
            <div className="modal-dialog modal-md modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Update Customer</h5>
                    </div>
                    <div className="modal-body">
                        <form id="update-form">
                            <div className="container">
                                <div className="row">
                                    <div className="col-12 p-1">
                                        <label className="form-label">Customer Name *</label>
                                        <input className="form-control" id="customerNameUpdate" type="text" />

                                        <label className="form-label mt-3">Customer Email *</label>
                                        <input className="form-control" id="customerEmailUpdate" type="text" />

                                        <label className="form-label mt-3">Customer Mobile *</label>
                                        <input className="form-control" id="customerMobileUpdate" type="text" />

                                        <input className="d-none" id="updateID" type="text" />
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button className="btn bg-gradient-primary" id="update-modal-close" data-bs-dismiss="modal" aria-label="Close" onClick={closeUpdateModal}>Close</button>
                        <button className="btn bg-gradient-success" id="update-btn" onClick={Update}>Update</button>
                    </div>
                </div>
            </div>
        </div>
    </>);
});

export default CustomerUpdate;