<div class="modal animated zoomIn" id="update-modal" aria-labelledby="exampleModalLabel" aria-hidden="true" tabindex="-1">
    <div class="modal-dialog modal-md modal-dialog-centered">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Update Category</h5>
            </div>
            <div class="modal-body">
                <form id="update-form">
                    <div class="container">
                        <div class="row">
                            <div class="col-12 p-1">
                                <label class="form-label">Category Name *</label>
                                <input class="form-control" id="categoryNameUpdate" type="text">
                                <input class="d-none" id="updateID">
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
        let res = await axios.get(`/api/categories/${id}`);
        res = res.data[0];
        hideLoader();
        document.getElementById('categoryNameUpdate').value = res['name'];
    }

    async function Update() {

        let categoryName = document.getElementById('categoryNameUpdate').value;
        let updateID = document.getElementById('updateID').value;

        if (categoryName.length === 0) {
            errorToast("Category Required !")
        } else {
            document.getElementById('update-modal-close').click();
            showLoader();
            let res = await axios.patch(`/api/categories/${updateID}`, {
                name: categoryName
            })
            hideLoader();

            if (res.status === 200 && res.data['success'] === true) {
                document.getElementById("update-form").reset();
                successToast("Request success !")
                await getList();
            } else {
                errorToast("Request fail !")
            }
        }
    }
</script>
