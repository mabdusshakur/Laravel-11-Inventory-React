import React, { forwardRef, useImperativeHandle } from 'react';

const CategoryUpdate = forwardRef((props, ref) => {
    useImperativeHandle(ref, () => ({
        FillUpUpdateForm
    }));

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
                await props.getList();
            } else {
                errorToast("Request fail !")
            }
        }
    }

    return (<><div className="modal animated zoomIn" id="update-modal" aria-labelledby="exampleModalLabel" aria-hidden="true" tabIndex="-1">
        <div className="modal-dialog modal-md modal-dialog-centered">
            <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">Update Category</h5>
                </div>
                <div className="modal-body">
                    <form id="update-form">
                        <div className="container">
                            <div className="row">
                                <div className="col-12 p-1">
                                    <label className="form-label">Category Name *</label>
                                    <input className="form-control" id="categoryNameUpdate" type="text" />
                                    <input className="d-none" id="updateID" />
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
                <div className="modal-footer">
                    <button className="btn bg-gradient-primary" id="update-modal-close" data-bs-dismiss="modal" aria-label="Close">Close</button>
                    <button className="btn bg-gradient-success" id="update-btn" onClick={Update}>Update</button>
                </div>
            </div>
        </div>
    </div>
    </>);
});

export default CategoryUpdate;