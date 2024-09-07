function CategoryCreate({ getList }) {

    async function Save() {
        let categoryName = document.getElementById('categoryName').value;
        if (categoryName.length === 0) {
            errorToast("Category Required !")
        } else {
            document.getElementById('modal-close').click();
            showLoader();
            let res = await await axios.post("/api/categories", {
                name: categoryName
            })
            hideLoader();
            if (res.status === 201) {
                successToast('Request completed');
                document.getElementById("save-form").reset();
                await getList();
            } else {
                errorToast("Request fail !")
            }
        }
    }

    return (<>
        <div className="modal animated zoomIn" id="create-modal" aria-labelledby="exampleModalLabel" aria-hidden="true" tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered modal-md">
                <div className="modal-content">
                    <div className="modal-header">
                        <h6 className="modal-title" id="exampleModalLabel">Create Category</h6>
                    </div>
                    <div className="modal-body">
                        <form id="save-form">
                            <div className="container">
                                <div className="row">
                                    <div className="col-12 p-1">
                                        <label className="form-label">Category Name *</label>
                                        <input className="form-control" id="categoryName" type="text" />
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

export default CategoryCreate;