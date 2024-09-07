import React, { useState, useEffect } from 'react';
import DataTable from 'datatables.net-react';
import DT from 'datatables.net-dt';

function SaleCreate() {
    const [discount, setDiscount] = useState(0);
    const [customers, setCustomers] = useState([]);
    const [products, setProducts] = useState([]);
    const [invoiceItemList, setInvoiceItemList] = useState([]);


    useEffect(() => {
        const fetchData = async () => {
            showLoader();
            await CustomerList();
            await ProductList();
            hideLoader();
        };

        fetchData();
    }, []);

    function ShowInvoiceItem() {

        let invoiceList = $('#invoiceList');

        invoiceList.empty();

        invoiceItemList.map(function (item, index) {
            let row = `<tr class="text-xs">
                        <td>${item['product_name']}</td>
                        <td>${item['quantity']}</td>
                        <td>${item['sale_price']}</td>
                        <td><a data-index="${index}" class="btn remove text-xxs px-2 py-1  btn-sm m-0">Remove</a></td>
                    </tr>`
            invoiceList.append(row)
        })

        CalculateGrandTotal();

        $('.remove').on('click', async function () {
            let index = $(this).data('index');
            removeItem(index);
        })

    }


    function removeItem(index) {
        invoiceItemList.splice(index, 1);
        ShowInvoiceItem()
    }

    const handleDiscountChange = (event) => {
        setDiscount(event.target.value);
        CalculateGrandTotal();
    };

    function CalculateGrandTotal() {
        let Total = 0;
        let Vat = 0;
        let Payable = 0;
        let Discount = 0;
        let discountPercentage = parseFloat(document.getElementById('discountP').value);

        invoiceItemList.forEach((item, index) => {
            Total = Total + parseFloat(item['sale_price'])
        })

        if (discountPercentage === 0) {
            Vat = ((Total * 5) / 100).toFixed(2);
        } else {
            Discount = ((Total * discountPercentage) / 100).toFixed(2);
            Total = (Total - ((Total * discountPercentage) / 100)).toFixed(2);
            Vat = ((Total * 5) / 100).toFixed(2);
        }

        Payable = (parseFloat(Total) + parseFloat(Vat)).toFixed(2);

        console.log(Total, Payable, Vat, Discount);

        document.getElementById('total').innerText = Total;
        document.getElementById('payable').innerText = Payable;
        document.getElementById('vat').innerText = Vat;
        document.getElementById('discount').innerText = Discount;
    }


    function add() {
        let PId = document.getElementById('PId').value;
        let PName = document.getElementById('PName').value;
        let PPrice = document.getElementById('PPrice').value;
        let PQty = document.getElementById('PQty').value;
        let PTotalPrice = (parseFloat(PPrice) * parseFloat(PQty)).toFixed(2);
        if (PId.length === 0) {
            errorToast("Product ID Required");
        } else if (PName.length === 0) {
            errorToast("Product Name Required");
        } else if (PPrice.length === 0) {
            errorToast("Product Price Required");
        } else if (PQty.length === 0) {
            errorToast("Product Quantity Required");
        } else {
            let item = {
                product_name: PName,
                product_id: PId,
                quantity: PQty,
                sale_price: PTotalPrice
            };

            invoiceItemList.push(item);
            console.log(invoiceItemList);
            // new bootstrap.Modal(document.getElementById('add-modal')).show();
            $("#add-modal").hide();
            ShowInvoiceItem();
        }
    }




    function addModal(id, name, price) {
        document.getElementById('PId').value = id
        document.getElementById('PName').value = name
        document.getElementById('PPrice').value = price
        // new bootstrap.Modal(document.getElementById('add-modal')).show();
        $("#add-modal").show();
    }


    async function CustomerList() {
        let res = await axios.get("/api/customers");
        res = res.data[0];

        let customerList = $("#customerList");
        let customerTable = $("#customerTable");
        customerTable.DataTable().destroy();
        customerList.empty();

        res.forEach(function (item, index) {
            let row = `<tr class="text-xs">
                        <td><i class="bi bi-person"></i> ${item['name']}</td>
                        <td><a data-name="${item['name']}" data-email="${item['email']}" data-id="${item['id']}" class="btn btn-outline-dark addCustomer  text-xxs px-2 py-1  btn-sm m-0">Add</a></td>
                    </tr>`
            customerList.append(row)
        })


        $('.addCustomer').on('click', async function () {

            let CName = $(this).data('name');
            let CEmail = $(this).data('email');
            let CId = $(this).data('id');

            $("#CName").text(CName)
            $("#CEmail").text(CEmail)
            $("#CId").text(CId)

        })

        DataTable.use(DT);
    }


    async function ProductList() {
        let res = await axios.get("/api/products");
        res = res.data[0];
        let productList = $("#productList");
        let productTable = $("#productTable");
        productTable.DataTable().destroy();
        productList.empty();

        res.forEach(function (item, index) {
            let row = `<tr class="text-xs">
                        <td> <img class="w-10" src="${item['img_url']}" /> ${item['name']} ($ ${item['price']})</td>
                        <td><a data-name="${item['name']}" data-price="${item['price']}" data-id="${item['id']}" class="btn btn-outline-dark text-xxs px-2 py-1 addProduct  btn-sm m-0">Add</a></td>
                    </tr>`
            productList.append(row)
        })


        $('.addProduct').on('click', async function () {
            let PName = $(this).data('name');
            let PPrice = $(this).data('price');
            let PId = $(this).data('id');
            addModal(PId, PName, PPrice)
        })

        DataTable.use(DT);
    }

    async function createInvoice() {
        let total = document.getElementById('total').innerText;
        let discount = document.getElementById('discount').innerText
        let vat = document.getElementById('vat').innerText
        let payable = document.getElementById('payable').innerText
        let CId = document.getElementById('CId').innerText;

        let products = invoiceItemList.map((item) => {
            return {
                product_id: item['product_id'],
                quantity: item['quantity'],
            }
        });

        let Data = {
            "discount": discount,
            "vat": vat,
            "customer_id": CId,
            "products": products
        }

        if (CId.length === 0) {
            errorToast("Customer Required !")
        } else if (invoiceItemList.length === 0) {
            errorToast("Product Required !")
        } else {

            showLoader();
            let res = await axios.post("/api/invoices", Data);
            console.log(res);
            hideLoader();
            if (res.data['success'] === true) {
                Inertia.visit('/invoice')
                successToast("Invoice Created");
            } else {
                errorToast("Something Went Wrong")
            }
        }

    }

    return (<>

        <div className="container-fluid">
            <div className="row">
                <div className="col-md-4 col-lg-4 p-2">
                    <div className="h-100 rounded-3 bg-white p-3 shadow-sm">
                        <div className="row">
                            <div className="col-8">
                                <span className="text-bold text-dark">BILLED TO </span>
                                <p className="mx-0 my-1 text-xs">Name: <span id="CName"></span> </p>
                                <p className="mx-0 my-1 text-xs">Email: <span id="CEmail"></span></p>
                                <p className="mx-0 my-1 text-xs">User ID: <span id="CId"></span> </p>
                            </div>
                            <div className="col-4">
                                <img className="w-50" src="/images/logo.png" />
                                <p className="text-bold text-dark mx-0 my-1">Invoice </p>
                                <p className="mx-0 my-1 text-xs">Date: {new Date().toDateString()} </p>
                            </div>
                        </div>
                        <hr className="bg-secondary mx-0 my-2 p-0" />
                        <div className="row">
                            <div className="col-12">
                                <table className="w-100 table" id="invoiceTable">
                                    <thead className="w-100">
                                        <tr className="text-xs">
                                            <td>Name</td>
                                            <td>Qty</td>
                                            <td>Total</td>
                                            <td>Remove</td>
                                        </tr>
                                    </thead>
                                    <tbody className="w-100" id="invoiceList">

                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <hr className="bg-secondary mx-0 my-2 p-0" />
                        <div className="row">
                            <div className="col-12">
                                <p className="text-bold text-dark my-1 text-xs"> TOTAL: <i className="bi bi-currency-dollar"></i> <span id="total"></span></p>
                                <p className="text-bold text-dark my-2 text-xs"> PAYABLE: <i className="bi bi-currency-dollar"></i> <span id="payable"></span></p>
                                <p className="text-bold text-dark my-1 text-xs"> VAT(5%): <i className="bi bi-currency-dollar"></i> <span id="vat"></span></p>
                                <p className="text-bold text-dark my-1 text-xs"> Discount: <i className="bi bi-currency-dollar"></i> <span id="discount"></span></p>
                                <span className="text-xxs">Discount(%):</span>
                                <input className="form-control w-40" id="discountP" type="number" value={discount} min="0" step="0.25" onInput={handleDiscountChange} />
                                <p>
                                    <button className="btn bg-gradient-primary my-3 w-40" onClick={createInvoice}>Confirm</button>
                                </p>
                            </div>
                            <div className="col-12 p-2">

                            </div>

                        </div>
                    </div>
                </div>

                <div className="col-md-4 col-lg-4 p-2">
                    <div className="h-100 rounded-3 bg-white p-3 shadow-sm">
                        <table className="w-100 table" id="productTable">
                            <thead className="w-100">
                                <tr className="text-bold text-xs">
                                    <td>Product</td>
                                    <td>Pick</td>
                                </tr>
                            </thead>
                            <tbody className="w-100" id="productList">

                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="col-md-4 col-lg-4 p-2">
                    <div className="h-100 rounded-3 bg-white p-3 shadow-sm">
                        <table className="table-sm w-100 table" id="customerTable">
                            <thead className="w-100">
                                <tr className="text-bold text-xs">
                                    <td>Customer</td>
                                    <td>Pick</td>
                                </tr>
                            </thead>
                            <tbody className="w-100" id="customerList">

                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </div>

        <div className="modal animated zoomIn" id="add-modal" aria-labelledby="exampleModalLabel" aria-hidden="true" tabIndex="-1">
            <div className="modal-dialog modal-md modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h6 className="modal-title" id="exampleModalLabel">Add Product</h6>
                    </div>
                    <div className="modal-body">
                        <form id="add-form">
                            <div className="container">
                                <div className="row">
                                    <div className="col-12 p-1">
                                        <label className="form-label">Product ID *</label>
                                        <input className="form-control" id="PId" type="text" />
                                        <label className="form-label mt-2">Product Name *</label>
                                        <input className="form-control" id="PName" type="text" />
                                        <label className="form-label mt-2">Product Price *</label>
                                        <input className="form-control" id="PPrice" type="text" />
                                        <label className="form-label mt-2">Product Qty *</label>
                                        <input className="form-control" id="PQty" type="text" />
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button className="btn bg-gradient-primary" id="modal-close" data-bs-dismiss="modal" aria-label="Close">Close</button>
                        <button className="btn bg-gradient-success" id="save-btn" onClick={add}>Add</button>
                    </div>
                </div>
            </div>
        </div>
    </>);
}

export default SaleCreate;