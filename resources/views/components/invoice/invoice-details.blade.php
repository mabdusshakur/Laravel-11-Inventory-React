<!-- Modal -->
<div class="modal animated zoomIn" id="details-modal" aria-labelledby="exampleModalLabel" aria-hidden="true" tabindex="-1">
    <div class="modal-dialog modal-lg modal-dialog-centered">
        <div class="modal-content">
            <div class="modal-header">
                <h1 class="modal-title fs-5" id="exampleModalLabel">Invoice</h1>
                <button class="btn-close" data-bs-dismiss="modal" type="button" aria-label="Close"></button>
            </div>
            <div class="modal-body p-3" id="invoice">
                <div class="container-fluid">
                    <br />
                    <div class="row">
                        <div class="col-8">
                            <span class="text-bold text-dark">BILLED TO </span>
                            <p class="mx-0 my-1 text-xs">Name: <span id="CName"></span> </p>
                            <p class="mx-0 my-1 text-xs">Email: <span id="CEmail"></span></p>
                            <p class="mx-0 my-1 text-xs">User ID: <span id="CId"></span> </p>
                        </div>
                        <div class="col-4">
                            <img class="w-40" src="{{ asset('images/logo.png') }}">
                            <p class="text-bold text-dark mx-0 my-1">Invoice </p>
                            <p class="mx-0 my-1 text-xs">Date: {{ date('Y-m-d') }} </p>
                        </div>
                    </div>
                    <hr class="bg-secondary mx-0 my-2 p-0" />
                    <div class="row">
                        <div class="col-12">
                            <table class="w-100 table" id="invoiceTable">
                                <thead class="w-100">
                                    <tr class="text-bold text-xs">
                                        <td>Name</td>
                                        <td>Qty</td>
                                        <td>Total</td>
                                    </tr>
                                </thead>
                                <tbody class="w-100" id="invoiceList">

                                </tbody>
                            </table>
                        </div>
                    </div>
                    <hr class="bg-secondary mx-0 my-2 p-0" />
                    <div class="row">
                        <div class="col-12">
                            <p class="text-bold text-dark my-1 text-xs"> TOTAL: <i class="bi bi-currency-dollar"></i> <span id="total"></span></p>
                            <p class="text-bold text-dark my-2 text-xs"> PAYABLE: <i class="bi bi-currency-dollar"></i> <span id="payable"></span></p>
                            <p class="text-bold text-dark my-1 text-xs"> VAT(5%): <i class="bi bi-currency-dollar"></i> <span id="vat"></span></p>
                            <p class="text-bold text-dark my-1 text-xs"> Discount: <i class="bi bi-currency-dollar"></i> <span id="discount"></span></p>
                        </div>

                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn bg-gradient-primary" data-bs-dismiss="modal" type="button">Close</button>
                <button class="btn bg-gradient-success" onclick="PrintPage()">Print</button>
            </div>
        </div>
    </div>
</div>

<script>
    async function InvoiceDetails(cus_id, inv_id) {

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

        res['invoice_products'].forEach(function(item, index) {
            let row = `<tr class="text-xs">
                        <td>${item['product']['name']}</td>
                        <td>${item['quantity']}</td>
                        <td>${item['sale_price']}</td>
                     </tr>`
            invoiceList.append(row)
        });



        $("#details-modal").modal('show')
    }

    function PrintPage() {
        let printContents = document.getElementById('invoice').innerHTML;
        let originalContents = document.body.innerHTML;
        document.body.innerHTML = printContents;
        window.print();
        document.body.innerHTML = originalContents;
        setTimeout(function() {
            location.reload();
        }, 1000);
    }
</script>
