<?php

namespace App\Http\Controllers\api\v1;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Customer;
use App\Models\Invoice;
use App\Models\Product;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\Request;

class ReportController extends Controller
{
    function salesReport(Request $request)
    {
        $user_id = $this->getUserId($request);
        $fromDate = date('Y-m-d', strtotime($request->fromDate));
        $toDate = date('Y-m-d', strtotime($request->toDate));

        $total = Invoice::where('user_id', $user_id)->whereBetween('created_at', [$fromDate, $toDate])->sum('total');
        $vat = Invoice::where('user_id', $user_id)->whereBetween('created_at', [$fromDate, $toDate])->sum('vat');
        $discount = Invoice::where('user_id', $user_id)->whereBetween('created_at', [$fromDate, $toDate])->sum('discount');
        $payable = Invoice::where('user_id', $user_id)->whereBetween('created_at', [$fromDate, $toDate])->sum('payable');
        $invoices = Invoice::where('user_id', $user_id)->whereBetween('created_at', [$fromDate, $toDate])->with('customer')->get();

        $report = [
            'total' => $total,
            'vat' => $vat,
            'discount' => $discount,
            'payable' => $payable,
            'invoices' => $invoices,
            'fromDate' => $fromDate,
            'toDate' => $toDate
        ];

        $pdf = Pdf::loadView('reports.sales-report', $report);
        return $pdf->download('sales-report.pdf');

        // for buffer string
        //$pdfContent = $pdf->download('invoice.pdf')->getOriginalContent();
        //$base64Pdf = base64_encode($pdfContent);
        //return $base64Pdf;
    }


    function summary(Request $request)
    {
        $user_id = $this->getUserId($request);
        $product = Product::where('user_id', $user_id)->count();
        $Category = Category::where('user_id', $user_id)->count();
        $Customer = Customer::where('user_id', $user_id)->count();
        $Invoice = Invoice::where('user_id', $user_id)->count();
        $total = Invoice::where('user_id', $user_id)->sum('total');
        $vat = Invoice::where('user_id', $user_id)->sum('vat');
        $payable = Invoice::where('user_id', $user_id)->sum('payable');

        $summary = [
            'product' => $product,
            'category' => $Category,
            'customer' => $Customer,
            'invoice' => $Invoice,
            'total' => round($total, 2),
            'vat' => round($vat, 2),
            'payable' => round($payable, 2)
        ];

        return $this->sendSuccess("Summary Report", $summary);
    }
}