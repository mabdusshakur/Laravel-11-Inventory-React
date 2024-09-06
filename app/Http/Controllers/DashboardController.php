<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class DashboardController extends Controller
{
    function dashboardPage()
    {
        return view('dashboard.dashboard-page');
    }

    function customerPage()
    {
        return view('dashboard.customer-page');
    }

    function categoryPage()
    {
        return view('dashboard.category-page');
    }

    function productPage()
    {
        return view('dashboard.product-page');
    }

    function salePage()
    {
        return view('dashboard.sale-page');
    }

    function invoicePage()
    {
        return view('dashboard.invoice-page');
    }

    function reportPage()
    {
        return view('dashboard.report-page');
    }

    function profilePage()
    {
        return view('dashboard.profile-page');
    }
}