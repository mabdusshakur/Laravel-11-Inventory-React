@extends('layout.sidenav-layout')
@section('content')
    @include('components.category.category-list')
    @include('components.category.category-delete')
    @include('components.category.category-create')
    @include('components.category.category-update')
@endsection
