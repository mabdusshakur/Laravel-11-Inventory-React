const CustomerDelete = (props) => {

    function closeDeleteModal() {
        document.getElementById('deleteID').value = '';
        $("#delete-modal").hide();
        $("#delete-modal-close").trigger('click');
    }
    async function itemDelete() {
        let id = document.getElementById('deleteID').value;
        closeDeleteModal();
        showLoader();
        let res = await axios.delete(`/api/customers/${id}`)
        hideLoader();
        if (res.data['success'] === true) {
            successToast("Request completed")
            await props.getList();
        } else {
            errorToast("Request fail!")
        }
    }

    return (<>
        <div className="modal animated zoomIn" id="delete-modal">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-body text-center">
                        <h3 className="text-warning mt-3">Delete !</h3>
                        <p className="mb-3">Once delete, you can't get it back.</p>
                        <input className="d-none" id="deleteID" />

                    </div>
                    <div className="modal-footer justify-content-end">
                        <div>
                            <button className="btn bg-gradient-primary mx-2" id="delete-modal-close" data-bs-dismiss="modal" type="button" onClick={closeDeleteModal}>Cancel</button>
                            <button className="btn bg-gradient-danger" id="confirmDelete" type="button" onClick={itemDelete}>Delete</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </>);
};

export default CustomerDelete;