<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    function dashboardPage()
    {
        return Inertia::render('DashboardPage');
    }

    function customerPage()
    {
        return Inertia::render('CustomerPage');
    }

    function categoryPage()
    {
        return Inertia::render('CategoryPage');
    }

    function productPage()
    {
        return Inertia::render('ProductPage');
    }

    function salePage()
    {
        return Inertia::render('SalePage');
    }

    function invoicePage()
    {
        return Inertia::render('InvoicePage');
    }

    function reportPage()
    {
        return Inertia::render('ReportPage');
    }

    function profilePage()
    {
        return Inertia::render('ProfilePage');
    }
}