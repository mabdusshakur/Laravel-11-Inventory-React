function InvoiceDelete({ getList }) {
    async function itemDelete() {
        let id = document.getElementById('deleteID').value;
        document.getElementById('delete-modal-close').click();
        showLoader();
        let res = await axios.delete(`/api/invoices/${id}`);
        hideLoader();
        if (res.data['success'] === true) {
            successToast(res.data['message']);
            await getList();
        } else {
            errorToast(res.data['message']);
        }
    }

    return (<><div className="modal animated zoomIn" id="delete-modal">
        <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
                <div className="modal-body text-center">
                    <h3 className="text-warning mt-3">Delete !</h3>
                    <p className="mb-3">Once delete, you can't get it back.</p>
                    <input className="d-none" id="deleteID" />
                </div>
                <div className="modal-footer justify-content-end">
                    <div>
                        <button className="btn bg-gradient-success" id="delete-modal-close" data-bs-dismiss="modal" type="button">Cancel</button>
                        <button className="btn bg-gradient-danger" id="confirmDelete" type="button" onClick={itemDelete}>Delete</button>
                    </div>
                </div>
            </div>
        </div>
    </div>

    </>);
}

export default InvoiceDelete;