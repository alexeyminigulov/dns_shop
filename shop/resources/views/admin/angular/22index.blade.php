<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Angular example DIST</title>

    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.97.5/css/materialize.min.css">
    <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" />
    <link rel="stylesheet" href="dist/css/style.css">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.3/css/select2.min.css" rel="stylesheet" />
    <!-- Angular Text-Editor -->
    <link rel="stylesheet" href="myLibs/css/textAngular.css" type="text/css">
    <!-- Angular Toaster -->
    <link rel="stylesheet" href="https://unpkg.com/angular-toastr/dist/angular-toastr.css" />
    <!--Let browser know website is optimized for mobile-->
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <meta name="csrf-token" content="{{ csrf_token() }}">
</head>

<body ng-app="myApp">

    <ms-layout>
        <div class="spinner">
            <div class="dot1"></div>
            <div class="dot2"></div>
        </div>
    </ms-layout>

    <div class="paranga"></div>

    <script src="//cdn.polyfill.io/v1/polyfill.js?features=es6"></script>
    <script type="text/javascript">
        if (window.Element && !Element.prototype.closest) {
            Element.prototype.closest = 
            function(s) {
                var matches = (this.document || this.ownerDocument).querySelectorAll(s),
                    i,
                    el = this;
                do {
                    i = matches.length;
                    while (--i >= 0 && matches.item(i) !== el) {};
                } while ((i < 0) && (el = el.parentElement)); 
                return el;
            };
        }
    </script>

    <!--Import jQuery before materialize.js-->
    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.97.5/js/materialize.min.js"></script>
    <!-- Select2 -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.3/js/select2.min.js"></script>

    <!-- Angular -->
    <script src='https://ajax.googleapis.com/ajax/libs/angularjs/1.6.0/angular.min.js'></script>
    <script src='https://cdnjs.cloudflare.com/ajax/libs/angular-ui-router/0.3.2/angular-ui-router.min.js'></script>
    <script src='https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.6.1/angular-animate.min.js'></script>
    <!-- Angular Text-Editor -->
    <script src='/myLibs/js/textAngular-rangy.min.js'></script>
    <script src='/myLibs/js/textAngular-sanitize.min.js'></script>
    <script src='/myLibs/js/textAngular.js'></script>
    <!-- Angular Toaster -->
    <script src="https://unpkg.com/angular-toastr/dist/angular-toastr.tpls.js"></script>
    <!-- Angular TypeaHead -->
    <script src="//angular-ui.github.io/bootstrap/ui-bootstrap-tpls-2.5.0.js"></script>

    <script src="dist/js/app.js"></script>
</body>
</html>