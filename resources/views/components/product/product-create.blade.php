<div class="modal animated zoomIn" id="create-modal" aria-labelledby="exampleModalLabel" aria-hidden="true" tabindex="-1">
    <div class="modal-dialog modal-lg modal-dialog-centered">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Create Product</h5>
            </div>
            <div class="modal-body">
                <form id="save-form">
                    <div class="container">
                        <div class="row">
                            <div class="col-12 p-1">

                                <label class="form-label">Category</label>
                                <select class="form-control form-select" id="productCategory" type="text">
                                    <option value="">Select Category</option>
                                </select>

                                <label class="form-label mt-2">Name</label>
                                <input class="form-control" id="productName" type="text">

                                <label class="form-label mt-2">Price</label>
                                <input class="form-control" id="productPrice" type="text">

                                <label class="form-label mt-2">Unit</label>
                                <input class="form-control" id="productUnit" type="text">

                                <br />
                                <img class="w-15" id="newImg" src="{{ asset('images/default.jpg') }}" />
                                <br />

                                <label class="form-label">Image</label>
                                <input class="form-control" id="productImg" type="file" oninput="newImg.src=window.URL.createObjectURL(this.files[0])">

                            </div>
                        </div>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button class="btn bg-gradient-primary mx-2" id="modal-close" data-bs-dismiss="modal" aria-label="Close">Close</button>
                <button class="btn bg-gradient-success" id="save-btn" onclick="Save()">Save</button>
            </div>
        </div>
    </div>
</div>

<script>
    FillCategoryDropDown();

    async function FillCategoryDropDown() {
        let res = await axios.get("/api/categories")
        res = res.data[0];
        res.forEach(function(item, i) {
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
</script>
