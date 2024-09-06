<div class="modal animated zoomIn" id="create-modal" aria-labelledby="exampleModalLabel" aria-hidden="true" tabindex="-1">
    <div class="modal-dialog modal-md modal-dialog-centered">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Create Customer</h5>
            </div>
            <div class="modal-body">
                <form id="save-form">
                    <div class="container">
                        <div class="row">
                            <div class="col-12 p-1">
                                <label class="form-label">Customer Name *</label>
                                <input class="form-control" id="customerName" type="text">
                                <label class="form-label">Customer Email *</label>
                                <input class="form-control" id="customerEmail" type="text">
                                <label class="form-label">Customer Mobile *</label>
                                <input class="form-control" id="customerMobile" type="text">
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button class="btn bg-gradient-primary" id="modal-close" data-bs-dismiss="modal" aria-label="Close">Close</button>
                <button class="btn bg-gradient-success" id="save-btn" onclick="Save()">Save</button>
            </div>
        </div>
    </div>
</div>

<script>
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
</script>
