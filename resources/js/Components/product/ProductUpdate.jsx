import React, { forwardRef, useImperativeHandle } from 'react';

const ProductUpdate = forwardRef((props, ref) => {
    useImperativeHandle(ref, () => ({
        FillUpUpdateForm
    }));

    async function UpdateFillCategoryDropDown() {
        let res = await axios.get("/api/categories")
        res = res.data[0];
        res.forEach(function (item, i) {
            let option = `<option value="${item['id']}">${item['name']}</option>`
            $("#productCategoryUpdate").append(option);
        })
    }


    async function FillUpUpdateForm(id) {

        document.getElementById('updateID').value = id;

        showLoader();
        await UpdateFillCategoryDropDown();
        let res = await axios.get(`/api/products/${id}`);
        res = res.data[0];
        hideLoader();

        document.getElementById('filePath').value = res['img_url'];
        document.getElementById('oldImg').src = res['img_url'];
        console.log(res);

        document.getElementById('productNameUpdate').value = res['name'];
        document.getElementById('productPriceUpdate').value = res['price'];
        document.getElementById('productUnitUpdate').value = res['unit'];
        document.getElementById('productCategoryUpdate').value = res['category_id'];

    }



    async function update() {

        let productCategoryUpdate = document.getElementById('productCategoryUpdate').value;
        let productNameUpdate = document.getElementById('productNameUpdate').value;
        let productPriceUpdate = document.getElementById('productPriceUpdate').value;
        let productUnitUpdate = document.getElementById('productUnitUpdate').value;
        let updateID = document.getElementById('updateID').value;
        let filePath = document.getElementById('filePath').value;
        let productImgUpdate = document.getElementById('productImgUpdate').files[0];


        if (productCategoryUpdate.length === 0) {
            errorToast("Product Category Required !")
        } else if (productNameUpdate.length === 0) {
            errorToast("Product Name Required !")
        } else if (productPriceUpdate.length === 0) {
            errorToast("Product Price Required !")
        } else if (productUnitUpdate.length === 0) {
            errorToast("Product Unit Required !")
        } else {

            document.getElementById('update-modal-close').click();

            let formData = new FormData();
            if (productImgUpdate) {
                formData.append('image', productImgUpdate)
            }
            formData.append('name', productNameUpdate)
            formData.append('price', productPriceUpdate)
            formData.append('unit', productUnitUpdate)
            formData.append('category_id', productCategoryUpdate)
            const config = {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            }
            showLoader();

            let res = await axios.post(`/api/products/${updateID}`, formData, config)
            console.log(res);

            hideLoader();

            if (res.status === 200 && res.data['success'] === true) {
                successToast(res.data['message']);
                document.getElementById("update-form").reset();
                await props.getList();
            } else {
                errorToast(res.data['message'])
            }
        }
    }


    const handleImageInput = (event) => {
        const file = event.target.files[0];
        if (file) {
            console.log(file);
            const imgElement = document.getElementById('oldImg');
            imgElement.src = window.URL.createObjectURL(file);
        }
    };

    return (<>
        <div className="modal animated zoomIn" id="update-modal" aria-labelledby="exampleModalLabel" aria-hidden="true" tabIndex="-1">
            <div className="modal-dialog modal-lg modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Update Product</h5>
                    </div>
                    <div className="modal-body">
                        <form id="update-form">
                            <div className="container">
                                <div className="row">
                                    <div className="col-12 p-1">

                                        <label className="form-label">Category</label>
                                        <select className="form-control form-select" id="productCategoryUpdate" type="text">
                                            <option value="">Select Category</option>
                                        </select>

                                        <label className="form-label mt-2">Name</label>
                                        <input className="form-control" id="productNameUpdate" type="text" />

                                        <label className="form-label mt-2">Price</label>
                                        <input className="form-control" id="productPriceUpdate" type="text" />

                                        <label className="form-label mt-2">Unit</label>
                                        <input className="form-control" id="productUnitUpdate" type="text" />
                                        <br />
                                        <img className="w-15" id="oldImg" src="images/default.jpg" />
                                        <br />
                                        <label className="form-label mt-2">Image</label>
                                        <input className="form-control" id="productImgUpdate" type="file" onInput={handleImageInput} />

                                        <input className="d-none" id="updateID" type="text" />
                                        <input className="d-none" id="filePath" type="text" />

                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>

                    <div className="modal-footer">
                        <button className="btn bg-gradient-primary" id="update-modal-close" data-bs-dismiss="modal" aria-label="Close">Close</button>
                        <button className="btn bg-gradient-success" id="update-btn" onClick={update}>Update</button>
                    </div>

                </div>
            </div>
        </div>
    </>);
});

export default ProductUpdate;