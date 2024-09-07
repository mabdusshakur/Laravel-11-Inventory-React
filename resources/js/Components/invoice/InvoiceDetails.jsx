import React, { forwardRef, useImperativeHandle } from 'react';

const InvoiceDetails = forwardRef((props, ref) => {
    useImperativeHandle(ref, () => ({
        loadInvoiceDetails
    }));

    async function loadInvoiceDetails(inv_id) {

        showLoader()
        let res = await axios.get(`/api/invoices/${inv_id}`);
        res = res.data[0];
        hideLoader();

        document.getElementById('CName').innerText = res['customer']['name']
        document.getElementById('CId').innerText = res['customer']['user_id']
        document.getElementById('CEmail').innerText = res['customer']['email']
        document.getElementById('total').innerText = res['total']
        document.getElementById('payable').innerText = res['payable']
        document.getElementById('vat').innerText = res['vat']
        document.getElementById('discount').innerText = res['discount']


        let invoiceList = $('#invoiceList');
        invoiceList.empty();

        res['invoice_products'].forEach(function (item, index) {
            let row = `<tr class="text-xs">
                        <td>${item['product']['name']}</td>
                        <td>${item['quantity']}</td>
                        <td>${item['sale_price']}</td>
                     </tr>`
            invoiceList.append(row)
        });

        new bootstrap.Modal(document.getElementById('details-modal')).show();
    }

    function PrintPage() {
        let printContents = document.getElementById('invoice').innerHTML;
        let originalContents = document.body.innerHTML;
        document.body.innerHTML = printContents;
        window.print();
        document.body.innerHTML = originalContents;
        setTimeout(function () {
            location.reload();
        }, 1000);
    }

    return (<>
        <div className="modal animated zoomIn" id="details-modal" aria-labelledby="exampleModalLabel" aria-hidden="true" tabIndex="-1">
            <div className="modal-dialog modal-lg modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">Invoice</h1>
                        <button className="btn-close" data-bs-dismiss="modal" type="button" aria-label="Close"></button>
                    </div>
                    <div className="modal-body p-3" id="invoice">
                        <div className="container-fluid">
                            <br />
                            <div className="row">
                                <div className="col-8">
                                    <span className="text-bold text-dark">BILLED TO </span>
                                    <p className="mx-0 my-1 text-xs">Name: <span id="CName"></span> </p>
                                    <p className="mx-0 my-1 text-xs">Email: <span id="CEmail"></span></p>
                                    <p className="mx-0 my-1 text-xs">User ID: <span id="CId"></span> </p>
                                </div>
                                <div className="col-4">
                                    <img className="w-40" src="images/logo.png" />
                                    <p className="text-bold text-dark mx-0 my-1">Invoice </p>
                                    <p className="mx-0 my-1 text-xs">Date: {new Date().toDateString()}</p>
                                </div>
                            </div>
                            <hr className="bg-secondary mx-0 my-2 p-0" />
                            <div className="row">
                                <div className="col-12">
                                    <table className="w-100 table" id="invoiceTable">
                                        <thead className="w-100">
                                            <tr className="text-bold text-xs">
                                                <td>Name</td>
                                                <td>Qty</td>
                                                <td>Total</td>
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
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button className="btn bg-gradient-primary" data-bs-dismiss="modal" type="button">Close</button>
                        <button className="btn bg-gradient-success" onClick={PrintPage}>Print</button>
                    </div>
                </div>
            </div>
        </div>

    </>);
});

export default InvoiceDetails;