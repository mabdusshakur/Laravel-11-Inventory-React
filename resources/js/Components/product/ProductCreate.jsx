function ProductCreate({ getList }) {

    FillCategoryDropDown();

    async function FillCategoryDropDown() {
        let res = await axios.get("/api/categories")
        res = res.data[0];
        $("#productCategory").empty();
        $("#productCategory").append(`<option value="">Select Category</option>`);
        res.forEach(function (item, i) {
            let option = `<option value="${item['id']}">${item['name']}</option>`
            $("#productCategory").append(option);
        })
    }


    async function Save() {

        let productCategory = document.getElementById('productCategory').value;
        let productName = document.getElementById('productName').value;
        let productPrice = document.getElementById('productPrice').value;
        let productUnit = document.getElementById('productUnit').value;
        let productImg = document.getElementById('productImg').files[0];

        if (productCategory.length === 0) {
            errorToast("Product Category Required !")
        } else if (productName.length === 0) {
            errorToast("Product Name Required !")
        } else if (productPrice.length === 0) {
            errorToast("Product Price Required !")
        } else if (productUnit.length === 0) {
            errorToast("Product Unit Required !")
        } else if (!productImg) {
            errorToast("Product Image Required !")
        } else {

            document.getElementById('modal-close').click();

            let formData = new FormData();
            formData.append('image', productImg)
            formData.append('name', productName)
            formData.append('price', productPrice)
            formData.append('unit', productUnit)
            formData.append('category_id', productCategory)

            const config = {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            }

            showLoader();
            let res = await axios.post("/api/products", formData, config)
            hideLoader();

            if (res.status === 201) {
                successToast(res.data['message']);
                document.getElementById("save-form").reset();
                await getList();
            } else {
                errorToast(res.data['message'])
            }
        }
    }

    const handleImageInput = (event) => {
        const file = event.target.files[0];
        if (file) {
            const imgElement = document.getElementById('newImg');
            imgElement.src = window.URL.createObjectURL(file);
        }
    };

    return (<>
        <div className="modal animated zoomIn" id="create-modal" aria-labelledby="exampleModalLabel" aria-hidden="true" tabIndex="-1">
            <div className="modal-dialog modal-lg modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Create Product</h5>
                    </div>
                    <div className="modal-body">
                        <form id="save-form">
                            <div className="container">
                                <div className="row">
                                    <div className="col-12 p-1">

                                        <label className="form-label">Category</label>
                                        <select className="form-control form-select" id="productCategory" type="text">
                                            <option value="">Select Category</option>
                                        </select>

                                        <label className="form-label mt-2">Name</label>
                                        <input className="form-control" id="productName" type="text" />

                                        <label className="form-label mt-2">Price</label>
                                        <input className="form-control" id="productPrice" type="text" />

                                        <label className="form-label mt-2">Unit</label>
                                        <input className="form-control" id="productUnit" type="text" />

                                        <br />
                                        <img className="w-15" id="newImg" src="images/default.jpg" />
                                        <br />

                                        <label className="form-label">Image</label>
                                        <input className="form-control" id="productImg" type="file" onInput={handleImageInput} />

                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button className="btn bg-gradient-primary mx-2" id="modal-close" data-bs-dismiss="modal" aria-label="Close">Close</button>
                        <button className="btn bg-gradient-success" id="save-btn" onClick={Save}>Save</button>
                    </div>
                </div>
            </div>
        </div>
    </>);
}

export default ProductCreate;