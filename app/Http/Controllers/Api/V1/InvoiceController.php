<?php

namespace App\Http\Controllers\Api\V1;

use App\Models\Invoice;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreInvoiceRequest;
use App\Http\Requests\UpdateInvoiceRequest;
use App\Models\InvoiceProduct;
use App\Models\Product;

class InvoiceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $invoices = Invoice::where('user_id', $this->getUserId(request()))->with('customer')->get();
            return $this->sendSuccess("Invoices fetched successfully", $invoices, 200);
        } catch (\Throwable $th) {
            return $this->sendError("Failed to fetch Invoices", 200, $th->getMessage());
        }
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreInvoiceRequest $request)
    {
        try {
            $invoice = Invoice::create([
                'total' => 0,
                'discount' => $request->discount,
                'vat' => $request->vat,
                'payable' => 0,
                'user_id' => $this->getUserId($request),
                'customer_id' => $request->customer_id,
            ]);

            $totalPrice = 0;
            foreach ($request->products as $product) {
                $productPrice = Product::where('id', $product['product_id'])->first()->price;
                InvoiceProduct::create([
                    'quantity' => $product['quantity'],
                    'sale_price' => $product['quantity'] * $productPrice,
                    'product_id' => $product['product_id'],
                    'invoice_id' => $invoice->id,
                    'user_id' => $invoice->user_id,
                ]);
                $totalPrice += $product['quantity'] * $productPrice;
            }

            $invoice->total = $totalPrice;
            $invoice->payable = ($totalPrice - $request->discount) + $request->vat;
            $invoice->save();

            return $this->sendSuccess("Invoice created successfully", $invoice, 201);

        } catch (\Throwable $th) {
            return $this->sendError("Failed to create Invoice", 200, $th->getMessage());
        }
    }

    /**
     * Display the specified resource.
     */
    public function show($invoice)
    {
        try {
            $invoice = Invoice::where('user_id', $this->getUserId(request()))->with(['customer', 'invoiceProducts.product'])->where('id', $invoice)->first();
            return $this->sendSuccess("Invoice fetched successfully", $invoice, 200);
        } catch (\Throwable $th) {
            return $this->sendError("Failed to fetch Invoice", 200, $th->getMessage());
        }
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Invoice $invoice)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateInvoiceRequest $request, Invoice $invoice)
    {
        // invoice no need to update just delete, and create a new one
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($invoice)
    {
        try {
            InvoiceProduct::where('invoice_id', $invoice)->delete();
            Invoice::where('user_id', $this->getUserId(request()))->where('id', $invoice)->delete();
            return $this->sendSuccess("Invoice deleted successfully", null, 200);
        } catch (\Throwable $th) {
            return $this->sendError("Failed to delete Invoice", 200, $th->getMessage());
        }
    }
}