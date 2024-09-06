<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Resources\ProductResource;
use App\Models\Product;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreProductRequest;
use App\Http\Requests\UpdateProductRequest;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $products = Product::where('user_id', $this->getUserId(request()))->get();
            return $this->sendSuccess("Product list", ProductResource::collection($products));
        } catch (\Throwable $th) {
            return $this->sendError("Failed to get Product list", 200, $th->getMessage());
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
    public function store(StoreProductRequest $request)
    {
        try {
            $img_url = '';
            if ($request->file('image')) {
                $image = $request->file('image');
                $image_name = time() . '.' . $image->extension();
                $image->move(public_path('uploads/images'), $image_name);
                $img_url = "uploads/images/" . $image_name;
            }

            $product = Product::create([
                'name' => $request->name,
                'price' => $request->price,
                'unit' => $request->unit,
                'img_url' => $img_url,
                'category_id' => $request->category_id,
                'user_id' => $this->getUserId($request),
            ]);
            if (!$product) {
                return $this->sendError("Failed to Create Product", 200);
                if ($img_url) {
                    unlink($img_url);
                }
            }
            return $this->sendSuccess("Product Created", new ProductResource($product), 201);
        } catch (\Throwable $th) {
            return $this->sendError("Failed to Create Product", 200, $th->getMessage());
        }
    }

    /**
     * Display the specified resource.
     */
    public function show($product)
    {
        try {
            $product = Product::where('user_id', $this->getUserId(request()))->findOrFail($product);
            return $this->sendSuccess("Product Details", $product);
        } catch (\Throwable $th) {
            return $this->sendError("Failed to get Product Details", 200, $th->getMessage());
        }
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Product $product)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProductRequest $request, $product)
    {
        try {
            $product = Product::where('user_id', $this->getUserId(request()))->findOrFail($product);
            $product->name = $request->name;
            $product->price = $request->price;
            $product->unit = $request->unit;
            $product->category_id = $request->category_id;
            $product->user_id = $this->getUserId($request);


            // if new image is uploaded, delete the old image and save the new image url on db column
            $new_img_url = null;
            if ($request->file('image')) {
                $image = $request->file('image');
                $image_name = time() . '.' . $image->extension();
                $image->move(public_path('uploads/images'), $image_name);
                $new_img_url = "uploads/images/" . $image_name;
                unlink($product->img_url);
            }

            $product->img_url = $new_img_url ? $new_img_url : $product->img_url;
            $product->save();

            if (!$product) {
                return $this->sendError("Failed to Update Product", 200);
            }
            return $this->sendSuccess("Product Updated", new ProductResource($product));
        } catch (\Throwable $th) {
            return $this->sendError("Failed to Update Product", 200, $th->getMessage());
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($product)
    {
        try {
            $product = Product::where('user_id', $this->getUserId(request()))->findOrFail($product);
            if ($product->img_url) {
                unlink($product->img_url);
            }
            if (!$product->delete()) {
                return $this->sendError("Failed to Delete Product", 200);
            }
            return $this->sendSuccess("Product Deleted", []);
        } catch (\Throwable $th) {
            return $this->sendError("Failed to Delete Product", 200, $th->getMessage());
        }
    }
}