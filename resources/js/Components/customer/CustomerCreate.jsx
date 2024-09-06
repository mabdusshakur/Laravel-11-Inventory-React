function CustomerCreate({ getList }) {
    async function Save() {
        let customerName = document.getElementById('customerName').value;
        let customerEmail = document.getElementById('customerEmail').value;
        let customerMobile = document.getElementById('customerMobile').value;

        if (customerName.length === 0) {
            errorToast("Customer Name Required !")
        } else if (customerEmail.length === 0) {
            errorToast("Customer Email Required !")
        } else if (customerMobile.length === 0) {
            errorToast("Customer Mobile Required !")
        } else {

            document.getElementById('modal-close').click();

            showLoader();
            let res = await axios.post("/api/customers", {
                name: customerName,
                email: customerEmail,
                mobile: customerMobile
            })
            hideLoader();

            if (res.status === 201) {
                successToast(res.data['message']);
                document.getElementById("save-form").reset();
                await getList();

            } else {
                errorToast("Request fail !")
            }
        }
    }

    return (<>
        <div className="modal animated zoomIn" id="create-modal" aria-labelledby="exampleModalLabel" aria-hidden="true" tabIndex="-1">
            <div className="modal-dialog modal-md modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Create Customer</h5>
                    </div>
                    <div className="modal-body">
                        <form id="save-form">
                            <div className="container">
                                <div className="row">
                                    <div className="col-12 p-1">
                                        <label className="form-label">Customer Name *</label>
                                        <input className="form-control" id="customerName" type="text" />
                                        <label className="form-label">Customer Email *</label>
                                        <input className="form-control" id="customerEmail" type="text" />
                                        <label className="form-label">Customer Mobile *</label>
                                        <input className="form-control" id="customerMobile" type="text" />
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button className="btn bg-gradient-primary" id="modal-close" data-bs-dismiss="modal" aria-label="Close">Close</button>
                        <button className="btn bg-gradient-success" id="save-btn" onClick={Save}>Save</button>
                    </div>
                </div>
            </div>
        </div>


    </>);
}

export default CustomerCreate;