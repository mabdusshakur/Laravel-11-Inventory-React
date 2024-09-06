<?php

namespace App\Http\Controllers\Api\V1;

use App\Models\Customer;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreCustomerRequest;
use App\Http\Requests\UpdateCustomerRequest;
use App\Http\Resources\CustomerResource;

class CustomerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $customers = Customer::where('user_id', $this->getUserId(request()))->get();
            return $this->sendSuccess("Customer list", CustomerResource::collection($customers));
        } catch (\Throwable $th) {
            return $this->sendError("Failed to get Customer list", 200, $th->getMessage());
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
    public function store(StoreCustomerRequest $request)
    {
        try {
            $customer = Customer::create([
                'name' => $request->name,
                'email' => $request->email,
                'mobile' => $request->mobile,
                'user_id' => $this->getUserId($request),
            ]);
            return $this->sendSuccess("Customer Created", new CustomerResource($customer), 201);
        } catch (\Throwable $th) {
            return $this->sendError("Failed to Create Customer", 200, $th->getMessage());
        }
    }

    /**
     * Display the specified resource.
     */
    public function show($customer)
    {
        try {
            $customer = Customer::where('user_id', $this->getUserId(request()))->findOrFail($customer);
            return $this->sendSuccess("Customer Details", $customer);
        } catch (\Throwable $th) {
            return $this->sendError("Failed to get Customer Details", 200, $th->getMessage());
        }
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Customer $customer)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCustomerRequest $request, $customer)
    {
        try {
            $user_id = $this->getUserId($request);
            $customer = Customer::where('user_id', $user_id)->findOrFail($customer)->update([
                'name' => $request->name,
                'email' => $request->email,
                'mobile' => $request->mobile,
                'user_id' => $user_id,
            ]);
            return $this->sendSuccess("Customer Updated", $customer);
        } catch (\Throwable $th) {
            return $this->sendError("Failed to Update Customer", 200, $th->getMessage());
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($customer)
    {
        try {
            $customer = Customer::where('user_id', $this->getUserId(request()))->findOrFail($customer);
            $customer->delete();
            return $this->sendSuccess("Customer Deleted", []);
        } catch (\Throwable $th) {
            return $this->sendError("Failed to Delete Customer", 200, $th->getMessage());
        }
    }
}