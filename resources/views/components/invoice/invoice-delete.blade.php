<div class="modal animated zoomIn" id="delete-modal">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
            <div class="modal-body text-center">
                <h3 class="text-warning mt-3">Delete !</h3>
                <p class="mb-3">Once delete, you can't get it back.</p>
                <input class="d-none" id="deleteID" />
            </div>
            <div class="modal-footer justify-content-end">
                <div>
                    <button class="btn bg-gradient-success" id="delete-modal-close" data-bs-dismiss="modal" type="button">Cancel</button>
                    <button class="btn bg-gradient-danger" id="confirmDelete" type="button" onclick="itemDelete()">Delete</button>
                </div>
            </div>
        </div>
    </div>
</div>

<script>
    async function itemDelete() {
        let id = document.getElementById('deleteID').value;
        document.getElementById('delete-modal-close').click();
        showLoader();
        let res = await axios.delete(`/api/invoices/${id}`);
        console.log(res);

        hideLoader();
        if (res.data['success'] === true) {
            successToast(res.data['message']);
            await getList();
        } else {
            errorToast(res.data['message']);
        }
    }
</script>
