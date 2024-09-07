import { Inertia } from "@inertiajs/inertia";

function ReportCreate() {

    function SalesReport() {
        let FormDate = document.getElementById('FormDate').value;
        let ToDate = document.getElementById('ToDate').value;
        if (FormDate.length === 0 || ToDate.length === 0) {
            errorToast("Date Range Required !")
        } else {
            Inertia.visit('/api/sales-report/' + FormDate + '/' + ToDate);
        }
    }

    return (<>
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-4">
                    <div className="card">
                        <div className="card-body">
                            <h4>Sales Report</h4>
                            <label className="form-label mt-2">Date From</label>
                            <input className="form-control" id="FormDate" type="date" />
                            <label className="form-label mt-2">Date To</label>
                            <input className="form-control" id="ToDate" type="date" />
                            <button className="btn bg-gradient-primary mt-3" onClick={SalesReport}>Download</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>);
}

export default ReportCreate;