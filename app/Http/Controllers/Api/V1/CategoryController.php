<?php

namespace App\Http\Controllers\Api\V1;

use App\Models\Category;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreCategoryRequest;
use App\Http\Requests\UpdateCategoryRequest;
use App\Http\Resources\CategoryResource;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $category = Category::where('user_id', $this->getUserId(request()))->get();
            return $this->sendSuccess("Category list", CategoryResource::collection($category));
        } catch (\Throwable $th) {
            return $this->sendError("Failed to get Category list", 200, $th->getMessage());
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
    public function store(StoreCategoryRequest $request)
    {
        try {
            $category = Category::create([
                'name' => $request->name,
                'user_id' => $this->getUserId($request),
            ]);
            return $this->sendSuccess("Category Created", new CategoryResource($category), 201);
        } catch (\Throwable $th) {
            return $this->sendError("Failed to Create Category", 200, $th->getMessage());
        }
    }

    /**
     * Display the specified resource.
     */
    public function show($category)
    {
        try {
            $category = Category::where('user_id', $this->getUserId(request()))->findOrFail($category);
            return $this->sendSuccess("Category Details", $category);
        } catch (\Throwable $th) {
            return $this->sendError("Failed to get Category Details", 200, $th->getMessage());
        }
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Category $category)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCategoryRequest $request, $category)
    {
        try {
            $category = Category::where('user_id', $this->getUserId($request))->findOrFail($category)->update([
                'name' => $request->name,
            ]);
            if (!$category) {
                return $this->sendError("Category not found", 404);
            }
            return $this->sendSuccess("Category Updated", []);
        } catch (\Throwable $th) {
            return $this->sendError("Failed to Update Category", 200, $th->getMessage());
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($category)
    {
        try {
            $category = Category::where('user_id', $this->getUserId(request()))->findOrFail($category);
            $category->delete();
            return $this->sendSuccess("Category Deleted", []);
        } catch (\Throwable $th) {
            return $this->sendError("Failed to Delete Category", 200, $th->getMessage());
        }
    }
}