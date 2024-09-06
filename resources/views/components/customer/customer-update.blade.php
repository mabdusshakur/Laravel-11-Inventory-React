<div class="modal animated zoomIn" id="update-modal" aria-labelledby="exampleModalLabel" aria-hidden="true" tabindex="-1">
    <div class="modal-dialog modal-md modal-dialog-centered">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Update Customer</h5>
            </div>
            <div class="modal-body">
                <form id="update-form">
                    <div class="container">
                        <div class="row">
                            <div class="col-12 p-1">
                                <label class="form-label">Customer Name *</label>
                                <input class="form-control" id="customerNameUpdate" type="text">

                                <label class="form-label mt-3">Customer Email *</label>
                                <input class="form-control" id="customerEmailUpdate" type="text">

                                <label class="form-label mt-3">Customer Mobile *</label>
                                <input class="form-control" id="customerMobileUpdate" type="text">

                                <input class="d-none" id="updateID" type="text">
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button class="btn bg-gradient-primary" id="update-modal-close" data-bs-dismiss="modal" aria-label="Close">Close</button>
                <button class="btn bg-gradient-success" id="update-btn" onclick="Update()">Update</button>
            </div>
        </div>
    </div>
</div>

<script>
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

            document.getElementById('update-modal-close').click();

            showLoader();

            let res = await axios.patch(`/api/customers/${updateID}`, {
                name: customerName,
                email: customerEmail,
                mobile: customerMobile,
            })
            hideLoader();

            if (res.status === 200 && res.data['success'] === true) {

                successToast('Request completed');

                document.getElementById("update-form").reset();

                await getList();
            } else {
                errorToast("Request fail !")
            }
        }
    }
</script>
