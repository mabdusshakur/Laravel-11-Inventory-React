import React, { useEffect, useRef } from 'react';
import DataTable from 'datatables.net-react';
import DT from 'datatables.net-dt';
import ProductCreate from './ProductCreate';
import ProductUpdate from './ProductUpdate';
import ProductDelete from './ProductDelete';

function ProductList() {
    const updateRef = useRef();

    getList();
    async function getList() {
        showLoader();
        let res = await axios.get("/api/products");
        res = res.data[0];
        hideLoader();

        let tableList = $("#tableList");
        let tableData = $("#tableData");

        tableData.DataTable().destroy();
        tableList.empty();

        res.forEach(function (item, index) {
            let row = `<tr>
                    <td><img class="w-10 h-auto" alt="" src="${item['img_url']}"></td>
                    <td>${item['name']}</td>
                    <td>${item['price']}</td>
                    <td>${item['unit']}</td>
                    <td>
                        <button data-id="${item['id']}" class="btn editBtn btn-sm btn-outline-success">Edit</button>
                        <button data-id="${item['id']}" class="btn deleteBtn btn-sm btn-outline-danger">Delete</button>
                    </td>
                 </tr>`
            tableList.append(row)
        })

        $('.editBtn').on('click', async function () {
            let id = $(this).data('id');
            if (updateRef.current) {
                await updateRef.current.FillUpUpdateForm(id);
            } else {
                console.error("updateRef.current is undefined");
            }
            new bootstrap.Modal(document.getElementById('update-modal')).show();
        })

        $('.deleteBtn').on('click', function () {
            let id = $(this).data('id');
            new bootstrap.Modal(document.getElementById('delete-modal')).show();
            $("#deleteID").val(id);
        })

        DataTable.use(DT);
    }

    return (<><div className="container-fluid">
        <div className="row">
            <div className="col-md-12 col-sm-12 col-lg-12">
                <div className="card px-5 py-5">
                    <div className="row justify-content-between">
                        <div className="align-items-center col">
                            <h4>Product</h4>
                        </div>
                        <div className="align-items-center col">
                            <button className="float-end btn bg-gradient-primary m-0" data-bs-toggle="modal" data-bs-target="#create-modal">Create</button>
                        </div>
                    </div>
                    <hr className="bg-dark" />
                    <table className="table" id="tableData">
                        <thead>
                            <tr className="bg-light">
                                <th>Image</th>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Unit</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody id="tableList">

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>

        <ProductCreate getList={getList} />
        <ProductUpdate ref={updateRef} getList={getList} />
        <ProductDelete getList={getList} />
    </>);
}

export default ProductList;