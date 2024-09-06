@extends('layout.sidenav-layout')
@section('content')
    <div class="container-fluid">
        <div class="row">
            <div class="col-md-4">
                <div class="card">
                    <div class="card-body">
                        <h4>Sales Report</h4>
                        <label class="form-label mt-2">Date From</label>
                        <input class="form-control" id="FormDate" type="date" />
                        <label class="form-label mt-2">Date To</label>
                        <input class="form-control" id="ToDate" type="date" />
                        <button class="btn bg-gradient-primary mt-3" onclick="SalesReport()">Download</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection

<script>
    function SalesReport() {
        let FormDate = document.getElementById('FormDate').value;
        let ToDate = document.getElementById('ToDate').value;
        if (FormDate.length === 0 || ToDate.length === 0) {
            errorToast("Date Range Required !")
        } else {
            window.open('/api/sales-report/' + FormDate + '/' + ToDate);
        }
    }
</script>
