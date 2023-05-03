<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>@yield('title') - Dashboard</title>
    <link rel="stylesheet" href="{{asset('/css/dashboard.css')}}">
    
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Lato:wght@100;300;400;700;900&family=Poppins&display=swap" rel="stylesheet">
  
    <meta name="csrf-token" content="{{ csrf_token() }}">
    
</head>
<body id="body" class="">
    @include('dashboard.header')
    <div id="content">
    </div>
    @include('dashboard.footer')
 </body>
 <script src='{{asset("/js/spa.js")}}'></script>
</html>

@yield('footer')