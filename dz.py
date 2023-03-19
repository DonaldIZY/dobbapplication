# Static Folder Name
foldername = "finlab"

dz_array = {
    "public": {
        "favicon": f"{foldername}/images/orange_favicon.png",
        "description": "Orange Côte d'Ivoire",
        "og_title": "Orange",
        "og_description": "Orange DOBB",
        "og_image": "static/finlab/images/orange_logo.png",
        "title": "Orange | DOBB",
    },
    "global": {
        "css": [
            f"{foldername}/vendor/bootstrap-select/dist/css/bootstrap-select.min.css",
            f"{foldername}/vendor/jquery-nice-select/css/nice-select.css",
            f"{foldername}/css/style.css"
        ],

        "js": {
            "top": [
                f"{foldername}/vendor/global/global.min.js",
                f"{foldername}/vendor/jquery-nice-select/js/jquery.nice-select.min.js",
                f"{foldername}/vendor/bootstrap-select/dist/js/bootstrap-select.min.js",
            ],
            "bottom": [
                f"{foldername}/js/custom.js",
                f"{foldername}/js/dlabnav-init.js",
            ]
        },

    },
    "pagelevel": {
        "finlab": {  # AppName
            "finlab_views": {
                "css": {
                    "index": [
                        f"{foldername}/vendor/wow-master/css/libs/animate.css",
                        f"{foldername}/vendor/bootstrap-select-country/css/bootstrap-select-country.min.css",
                        f"{foldername}/vendor/datepicker/css/bootstrap-datepicker.min.css",
                        f"{foldername}/vendor/swiper/css/swiper-bundle.min.css",
                    ],
                    "index2": [
                        f"{foldername}/vendor/wow-master/css/libs/animate.css",
                        f"{foldername}/vendor/bootstrap-select-country/css/bootstrap-select-country.min.css",
                        f"{foldername}/vendor/datepicker/css/bootstrap-datepicker.min.css",
                        f"{foldername}/vendor/swiper/css/swiper-bundle.min.css",
                    ],
                    "banking": [
                        f"{foldername}/vendor/chartist/css/chartist.min.css",
                        f"{foldername}/vendor/wow-master/css/libs/animate.css",
                        f"{foldername}/vendor/bootstrap-datetimepicker/css/bootstrap-datetimepicker.min.css",
                    ],
                    "ticketing": [
                        f"{foldername}/vendor/wow-master/css/libs/animate.css",
                        f"{foldername}/vendor/swiper/css/swiper-bundle.min.css",
                    ],
                    "crypto": [
                        f"{foldername}/vendor/chartist/css/chartist.min.css",
                        f"{foldername}/vendor/wow-master/css/libs/animate.css",
                        f"{foldername}/vendor/bootstrap-datetimepicker/css/bootstrap-datetimepicker.min.css",
                        f"{foldername}/vendor/swiper/css/swiper-bundle.min.css",
                    ],
                    "invoice": [
                        f"{foldername}/vendor/chartist/css/chartist.min.css",
                        f"{foldername}/vendor/wow-master/css/libs/animate.css",
                        f"{foldername}/vendor/bootstrap-datetimepicker/css/bootstrap-datetimepicker.min.css",
                        f"{foldername}/vendor/swiper/css/swiper-bundle.min.css",
                    ],
                    "contact": [
                        f"{foldername}/vendor/wow-master/css/libs/animate.css",
                    ],
                    "kanban": [

                    ],
                    "permissions": [
                        f"{foldername}/vendor/sweetalert2/dist/sweetalert2.min.css",
                    ],

                    "users": [
                        f"{foldername}/vendor/sweetalert2/dist/sweetalert2.min.css",
                    ],
                    "add_user": [
                        f"{foldername}/vendor/bootstrap-daterangepicker/daterangepicker.css",
                        f"{foldername}/vendor/bootstrap-material-datetimepicker/css/bootstrap-material-datetimepicker.css",
                        f"{foldername}/vendor/jquery-nice-select/css/nice-select.css",
                        f"{foldername}/vendor/jquery-nice-select/css/nice-select.css",
                        f"{foldername}/vendor/select2/css/select2.min.css",
                    ],
                    "edit_user": [
                        f"{foldername}/vendor/bootstrap-daterangepicker/daterangepicker.css",
                        f"{foldername}/vendor/bootstrap-material-datetimepicker/css/bootstrap-material-datetimepicker.css",
                        f"{foldername}/vendor/jquery-nice-select/css/nice-select.css",
                        f"{foldername}/vendor/jquery-nice-select/css/nice-select.css",
                        f"{foldername}/vendor/select2/css/select2.min.css",
                    ],
                    "groups_list": [
                        f"{foldername}/vendor/sweetalert2/dist/sweetalert2.min.css",
                    ],
                    "assign_permissions_to_user": [

                        f"{foldername}/vendor/bootstrap-duallistbox/ajax/libs/prettify/r298/prettify.min.css",
                        f"{foldername}/vendor/bootstrap-duallistbox/src/bootstrap-duallistbox.css",
                        f"{foldername}/vendor/bootstrap-duallistbox/dist/bootstrap-duallistbox.css",
                    ],

                    "group_add": [
                        f"{foldername}/vendor/bootstrap-duallistbox/ajax/libs/prettify/r298/prettify.min.css",
                        f"{foldername}/vendor/bootstrap-duallistbox/src/bootstrap-duallistbox.css",
                        f"{foldername}/vendor/bootstrap-duallistbox/dist/bootstrap-duallistbox.css",
                    ],

                    "group_edit": [
                        f"{foldername}/vendor/bootstrap-duallistbox/ajax/libs/prettify/r298/prettify.min.css",
                        f"{foldername}/vendor/bootstrap-duallistbox/src/bootstrap-duallistbox.css",
                        f"{foldername}/vendor/bootstrap-duallistbox/dist/bootstrap-duallistbox.css",
                    ],

                    "file_manager": [
                        f"{foldername}/vendor/chartist/css/chartist.min.css",
                        f"{foldername}/vendor/wow-master/css/libs/animate.css",
                        f"{foldername}/vendor/bootstrap-datetimepicker/css/bootstrap-datetimepicker.min.css",
                        f"{foldername}/vendor/swiper/css/swiper-bundle.min.css",
                    ],
                    "user": [
                        f"{foldername}/vendor/bootstrap-datetimepicker/css/bootstrap-datetimepicker.min.css",
                        f"{foldername}/vendor/swiper/css/swiper-bundle.min.css",
                        f"{foldername}/vendor/wow-master/css/libs/animate.css",
                    ],
                    "calendar": [
                        f"{foldername}/vendor/fullcalendar-5.11.0/lib/main.css",
                        f"{foldername}/vendor/bootstrap-datetimepicker/css/bootstrap-datetimepicker.min.css",
                    ],
                    "to_do_list": [
                        f"{foldername}/vendor/chartist/css/chartist.min.css",
                        f"{foldername}/vendor/wow-master/css/libs/animate.css",
                        f"{foldername}/vendor/bootstrap-datetimepicker/css/bootstrap-datetimepicker.min.css",
                        f"{foldername}/vendor/swiper/css/swiper-bundle.min.css",
                    ],
                    "chat": [
                        f"{foldername}/vendor/chartist/css/chartist.min.css",
                        f"{foldername}/vendor/wow-master/css/libs/animate.css",
                        f"{foldername}/vendor/bootstrap-datetimepicker/css/bootstrap-datetimepicker.min.css",
                        f"{foldername}/vendor/swiper/css/swiper-bundle.min.css",
                    ],
                    "activity": [
                        f"{foldername}/vendor/chartist/css/chartist.min.css",
                        f"{foldername}/vendor/wow-master/css/libs/animate.css",
                    ],
                    "app_profile": [
                        f"{foldername}/vendor/lightgallery/css/lightgallery.min.css"
                    ],
                    "post_details": [
                        f"{foldername}/vendor/lightgallery/css/lightgallery.min.css"
                    ],
                    "email_compose": [
                        f"{foldername}/vendor/dropzone/dist/dropzone.css",
                    ],
                    "email_inbox": [
                        f"{foldername}/vendor/chartist/css/chartist.min.css",
                        f"{foldername}/vendor/wow-master/css/libs/animate.css",
                        f"{foldername}/vendor/bootstrap-datetimepicker/css/bootstrap-datetimepicker.min.css",
                    ],
                    "email_read": [

                    ],
                    "app_calendar": [
                        f"{foldername}/vendor/fullcalendar-5.11.0/lib/main.css",
                    ],
                    "ecom_checkout": [

                    ],
                    "ecom_customers": [

                    ],
                    "ecom_invoice": [

                    ],
                    "ecom_product_detail": [
                        f"{foldername}/vendor/star-rating/star-rating-svg.css",
                    ],
                    "ecom_product_grid": [

                    ],
                    "ecom_product_list": [
                        f"{foldername}/vendor/star-rating/star-rating-svg.css"
                    ],
                    "ecom_product_order": [

                    ],
                    "chart_chartist": [
                        f"{foldername}/vendor/chartist/css/chartist.min.css",
                    ],
                    "chart_chartjs": [

                    ],
                    "chart_flot": [

                    ],
                    "chart_morris": [

                    ],
                    "chart_peity": [

                    ],
                    "chart_sparkline": [

                    ],

                    "uc_select2": [
                        f"{foldername}/vendor/select2/css/select2.min.css",
                    ],
                    "uc_nestable": [
                        f"{foldername}/vendor/nestable2/css/jquery.nestable.min.css"
                    ],
                    "uc_noui_slider": [
                        f"{foldername}/vendor/nouislider/nouislider.min.css"
                    ],
                    "uc_sweetalert": [
                        f"{foldername}/vendor/sweetalert2/dist/sweetalert2.min.css"
                    ],
                    "uc_toastr": [
                        f"{foldername}/vendor/toastr/css/toastr.min.css"
                    ],
                    "map_jqvmap": [
                        f"{foldername}/vendor/jqvmap/css/jqvmap.min.css"
                    ],
                    "uc_lightgallery": [
                        f"{foldername}/vendor/lightgallery/css/lightgallery.min.css"
                    ],

                    "widget_card": [
                        f"{foldername}/vendor/chartist/css/chartist.min.css"
                    ],

                    "widget_chart": [
                        f"{foldername}/vendor/chartist/css/chartist.min.css",
                    ],
                    "widget_list": [

                    ],
                    "form_element": [],
                    "form_wizard": [
                        f"{foldername}/vendor/jquery-smartwizard/dist/css/smart_wizard.min.css"
                    ],
                    "form_ckeditor": [],
                    "form_pickers": [
                        f"{foldername}/vendor/bootstrap-daterangepicker/daterangepicker.css",
                        f"{foldername}/vendor/clockpicker/css/bootstrap-clockpicker.min.css",
                        f"{foldername}/vendor/jquery-asColorPicker/css/asColorPicker.min.css",
                        f"{foldername}/vendor/bootstrap-material-datetimepicker/css/bootstrap-material-datetimepicker.css",
                        f"{foldername}/vendor/pickadate/themes/default.css",
                        f"{foldername}/vendor/pickadate/themes/default.date.css",
                    ],
                    "form_validation": [],
                    "table_bootstrap_basic": [],
                    "table_datatable_basic": [
                        f"{foldername}/vendor/datatables/css/jquery.dataTables.min.css",
                    ],

                },
                "js": {
                    "index": [
                        f"{foldername}/vendor/chart.js/Chart.bundle.min.js",
                        f"{foldername}/vendor/apexchart/apexchart.js",
                        f"{foldername}/vendor/peity/jquery.peity.min.js",
                        f"{foldername}/vendor/swiper/js/swiper-bundle.min.js",
                        f"{foldername}/js/dashboard/dashboard-1.js",
                        f"{foldername}/vendor/wow-master/dist/wow.min.js",
                        f"{foldername}/vendor/bootstrap-datetimepicker/js/moment.js",
                        f"{foldername}/vendor/datepicker/js/bootstrap-datepicker.min.js",
                        f"{foldername}/vendor/bootstrap-select-country/js/bootstrap-select-country.min.js",
                    ],
                    "index2": [
                        f"{foldername}/vendor/chart.js/Chart.bundle.min.js",
                        f"{foldername}/vendor/apexchart/apexchart.js",
                        f"{foldername}/vendor/peity/jquery.peity.min.js",
                        f"{foldername}/vendor/swiper/js/swiper-bundle.min.js",
                        f"{foldername}/js/dashboard/dashboard-1.js",
                        f"{foldername}/vendor/wow-master/dist/wow.min.js",
                        f"{foldername}/vendor/bootstrap-datetimepicker/js/moment.js",
                        f"{foldername}/vendor/datepicker/js/bootstrap-datepicker.min.js",
                        f"{foldername}/vendor/bootstrap-select-country/js/bootstrap-select-country.min.js",

                    ],
                    "banking": [
                        f"{foldername}/vendor/chart.js/Chart.bundle.min.js",
                        f"{foldername}/vendor/owl-carousel/owl.carousel.js",
                        f"{foldername}/vendor/apexchart/apexchart.js",
                        f"{foldername}/vendor/peity/jquery.peity.min.js",
                        f"{foldername}/js/dashboard/banking.js",
                        f"{foldername}/vendor/bootstrap-datetimepicker/js/moment.js",
                        f"{foldername}/vendor/bootstrap-datetimepicker/js/bootstrap-datetimepicker.min.js",
                        f"{foldername}/vendor/wow-master/dist/wow.min.js",

                    ],
                    "ticketing": [
                        f"{foldername}/vendor/swiper/js/swiper-bundle.min.js",
                        f"{foldername}/vendor/wow-master/dist/wow.min.js",
                    ],
                    "crypto": [
                        f"{foldername}/vendor/chart.js/Chart.bundle.min.js",
                        f"{foldername}/vendor/datatables/js/jquery.dataTables.min.js",
                        f"{foldername}/vendor/apexchart/apexchart.js",
                        f"{foldername}/vendor/peity/jquery.peity.min.js",
                        f"{foldername}/vendor/swiper/js/swiper-bundle.min.js",
                        f"{foldername}/vendor/wow-master/dist/wow.min.js",
                        f"{foldername}/js/dashboard/crypto.js",
                    ],
                    "invoice": [
                        f"{foldername}/vendor/chart.js/Chart.bundle.min.js",
                        f"{foldername}/vendor/datatables/js/jquery.dataTables.min.js",
                        f"{foldername}/js/plugins-init/datatables.init.js",
                        f"{foldername}/vendor/apexchart/apexchart.js",
                        f"{foldername}/vendor/peity/jquery.peity.min.js",
                        f"{foldername}/vendor/swiper/js/swiper-bundle.min.js",
                        f"{foldername}/vendor/wow-master/dist/wow.min.js",
                    ],
                    "contact": [
                        f"{foldername}/vendor/swiper/js/swiper-bundle.min.js",
                        f"{foldername}/vendor/wow-master/dist/wow.min.js",

                    ],
                    "kanban": [
                        f"{foldername}/vendor/peity/jquery.peity.min.js",
                        f"{foldername}/vendor//draggable/draggable.js",
                        f"{foldername}/vendor/wow-master/dist/wow.min.js",
                    ],

                    "permissions": [
                        f"{foldername}/vendor/sweetalert2/dist/sweetalert2.min.js",
                    ],
                    "users": [
                        f"{foldername}/vendor/sweetalert2/dist/sweetalert2.min.js",

                    ],
                    "add_user": [
                        f"{foldername}/vendor/jquery-nice-select/js/jquery.nice-select.min.js",
                        f"{foldername}/vendor/moment/moment.min.js",
                        f"{foldername}/vendor/bootstrap-material-datetimepicker/js/bootstrap-material-datetimepicker.js",
                        f"{foldername}/js/plugins-init/material-date-picker-init.js",

                        f"{foldername}/vendor/select2/js/select2.full.min.js",
                        f"{foldername}/js/plugins-init/select2-init.js"
                    ],
                    "edit_user": [
                        f"{foldername}/vendor/jquery-nice-select/js/jquery.nice-select.min.js",
                        f"{foldername}/vendor/moment/moment.min.js",
                        f"{foldername}/vendor/bootstrap-material-datetimepicker/js/bootstrap-material-datetimepicker.js",
                        f"{foldername}/js/plugins-init/material-date-picker-init.js",

                        f"{foldername}/vendor/select2/js/select2.full.min.js",
                        f"{foldername}/js/plugins-init/select2-init.js"
                    ],
                    "groups_list": [
                        f"{foldername}/vendor/sweetalert2/dist/sweetalert2.min.js",
                    ],
                    "assign_permissions_to_user": [
                        f"{foldername}/vendor/bootstrap-duallistbox/ajax/libs/popper.js/1.12.9/umd/popper.min.js",
                        f"{foldername}/vendor/bootstrap-duallistbox/ajax/libs/prettify/r298/run_prettify.js",
                        f"{foldername}/vendor/bootstrap-duallistbox/dist/jquery.bootstrap-duallistbox.js",
                    ],
                    "group_add": [
                        f"{foldername}/vendor/bootstrap-duallistbox/ajax/libs/popper.js/1.12.9/umd/popper.min.js",
                        f"{foldername}/vendor/bootstrap-duallistbox/ajax/libs/prettify/r298/run_prettify.js",
                        f"{foldername}/vendor/bootstrap-duallistbox/dist/jquery.bootstrap-duallistbox.js",
                    ],

                    "group_edit": [
                        f"{foldername}/vendor/bootstrap-duallistbox/ajax/libs/popper.js/1.12.9/umd/popper.min.js",
                        f"{foldername}/vendor/bootstrap-duallistbox/ajax/libs/prettify/r298/run_prettify.js",
                        f"{foldername}/vendor/bootstrap-duallistbox/dist/jquery.bootstrap-duallistbox.js",
                    ],

                    "file_manager": [
                        f"{foldername}/vendor/datatables/js/jquery.dataTables.min.js",
                        f"{foldername}/vendor/apexchart/apexchart.js",
                        f"{foldername}/vendor/chart.js/Chart.bundle.min.js",
                        f"{foldername}/vendor/peity/jquery.peity.min.js",
                        f"{foldername}/vendor/swiper/js/swiper-bundle.min.js",
                        f"{foldername}/vendor/wow-master/dist/wow.min.js",
                    ],
                    "user": [
                        f"{foldername}/vendor/chart.js/Chart.bundle.min.js",
                        f"{foldername}/vendor/peity/jquery.peity.min.js",
                        f"{foldername}/js/user.js",
                        f"{foldername}/vendor/wow-master/dist/wow.min.js",

                    ],
                    "calendar": [
                        f"{foldername}/vendor/chart.js/Chart.bundle.min.js",
                        f"{foldername}/vendor/fullcalendar-5.11.0/lib/main.js",
                        f"{foldername}/vendor/peity/jquery.peity.min.js",
                        f"{foldername}/vendor/wow-master/dist/wow.min.js",
                        f"{foldername}/js/calendar-2.js",
                    ],
                    "to_do_list": [
                        f"{foldername}/vendor/chart.js/Chart.bundle.min.js",
                        f"{foldername}/vendor/wow-master/dist/wow.min.js",
                        f"{foldername}/vendor/datatables/js/jquery.dataTables.min.js",
                        f"{foldername}/vendor/apexchart/apexchart.js",
                        f"{foldername}/vendor/chart.js/Chart.bundle.min.js",
                        f"{foldername}/vendor/peity/jquery.peity.min.js",
                        f"{foldername}/vendor/swiper/js/swiper-bundle.min.js",
                    ],
                    "chat": [
                        f"{foldername}/vendor/chart.js/Chart.bundle.min.js",
                        f"{foldername}/vendor/datatables/js/jquery.dataTables.min.js",
                        f"{foldername}/vendor/apexchart/apexchart.js",
                        f"{foldername}/vendor/peity/jquery.peity.min.js",
                        f"{foldername}/vendor/swiper/js/swiper-bundle.min.js",
                        f"{foldername}/vendor/wow-master/dist/wow.min.js",
                    ],
                    "activity": [
                        f"{foldername}/vendor/peity/jquery.peity.min.js",
                        f"{foldername}/vendor/wow-master/dist/wow.min.js",
                    ],
                    "app_profile": [
                        f"{foldername}/vendor/chart.js/Chart.bundle.min.js",
                        f"{foldername}/vendor/lightgallery/js/lightgallery-all.min.js",
                    ],
                    "post_details": [
                        f"{foldername}/vendor/chart.js/Chart.bundle.min.js",
                        f"{foldername}/vendor/lightgallery/js/lightgallery-all.min.js"
                    ],
                    "email_compose": [
                        f"{foldername}/vendor/dropzone/dist/dropzone.js"
                    ],
                    "email_inbox": [
                        f"{foldername}/vendor/chart.js/Chart.bundle.min.js",
                        f"{foldername}/vendor/datatables/js/jquery.dataTables.min.js",
                        f"{foldername}/vendor/apexchart/apexchart.js",
                        f"{foldername}/vendor/peity/jquery.peity.min.js",
                        f"{foldername}/vendor/swiper/js/swiper-bundle.min.js",
                        f"{foldername}/vendor/wow-master/dist/wow.min.js",
                    ],
                    "email_read": [

                    ],
                    "app_calendar": [
                        f"{foldername}/vendor/moment/moment.min.js",
                        f"{foldername}/vendor/fullcalendar-5.11.0/lib/main.js",
                        f"{foldername}/js/calendar.js",
                    ],
                    "ecom_checkout": [

                    ],
                    "ecom_customers": [

                    ],
                    "ecom_invoice": [

                    ],
                    "ecom_product_detail": [
                        f"{foldername}/vendor/star-rating/jquery.star-rating-svg.js",
                    ],
                    "ecom_product_grid": [

                    ],
                    "ecom_product_list": [
                        f"{foldername}/vendor/star-rating/jquery.star-rating-svg.js",
                    ],
                    "ecom_product_order": [

                    ],
                    "chart_chartist": [
                        f"{foldername}/vendor/chart.js/Chart.bundle.min.js",
                        f"{foldername}/vendor/apexchart/apexchart.js",
                        f"{foldername}/vendor/chartist/js/chartist.min.js",
                        f"{foldername}/vendor/chartist-plugin-tooltips/js/chartist-plugin-tooltip.min.js",
                        f"{foldername}/js/plugins-init/chartist-init.js",
                    ],
                    "chart_chartjs": [
                        f"{foldername}/vendor/chart.js/Chart.bundle.min.js",
                        f"{foldername}/vendor/apexchart/apexchart.js",
                        f"{foldername}/js/plugins-init/chartjs-init.js",
                    ],
                    "chart_flot": [
                        f"{foldername}/vendor/chart.js/Chart.bundle.min.js",
                        f"{foldername}/vendor/apexchart/apexchart.js",
                        f"{foldername}/vendor/peity/jquery.peity.min.js",
                        f"{foldername}/vendor/flot/jquery.flot.js",
                        f"{foldername}/vendor/flot/jquery.flot.pie.js",
                        f"{foldername}/vendor/flot/jquery.flot.resize.js",
                        f"{foldername}/vendor/flot-spline/jquery.flot.spline.min.js",
                        f"{foldername}/js/plugins-init/flot-init.js",
                    ],
                    "chart_morris": [
                        f"{foldername}/vendor/chart.js/Chart.bundle.min.js",
                        f"{foldername}/vendor/apexchart/apexchart.js",
                        f"{foldername}/vendor/raphael/raphael.min.js",
                        f"{foldername}/vendor/morris/morris.min.js",
                        f"{foldername}/js/plugins-init/morris-init.js",
                    ],
                    "chart_peity": [
                        f"{foldername}/vendor/chart.js/Chart.bundle.min.js",
                        f"{foldername}/vendor/peity/jquery.peity.min.js",
                        f"{foldername}/js/plugins-init/piety-init.js",
                    ],
                    "chart_sparkline": [
                        f"{foldername}/vendor/chart.js/Chart.bundle.min.js",
                        f"{foldername}/vendor/apexchart/apexchart.js",
                        f"{foldername}/vendor/jquery-sparkline/jquery.sparkline.min.js",
                        f"{foldername}/js/plugins-init/sparkline-init.js",
                        f"{foldername}/vendor/svganimation/vivus.min.js",
                        f"{foldername}/vendor/svganimation/svg.animation.js",
                    ],
                    "ui_accordion": [
                        f"{foldername}/js/highlight.min.js",
                    ],
                    "ui_alert": [
                        f"{foldername}/js/highlight.min.js",
                    ],
                    "ui_badge": [
                        f"{foldername}/js/highlight.min.js",
                    ],
                    "ui_button_group": [
                        f"{foldername}/js/highlight.min.js",
                    ],

                    "ui_button": [
                        f"{foldername}/js/highlight.min.js",
                    ],
                    "ui_card": [
                        f"{foldername}/js/highlight.min.js",
                    ],
                    "ui_carousel": [
                        f"{foldername}/js/highlight.min.js",
                    ],
                    "ui_dropdown": [
                        f"{foldername}/js/highlight.min.js",
                    ],

                    "ui_grid": [
                        f"{foldername}/js/highlight.min.js",
                    ],

                    "ui_list_group": [
                        f"{foldername}/js/highlight.min.js",
                    ],

                    "ui_pagination": [
                        f"{foldername}/js/highlight.min.js",
                    ],
                    "ui_progressbar": [
                        f"{foldername}/js/highlight.min.js",
                    ],
                    "ui_tab": [
                        f"{foldername}/js/highlight.min.js",
                    ],
                    "uc_select2": [
                        f"{foldername}/vendor/select2/js/select2.full.min.js",
                        f"{foldername}/js/plugins-init/select2-init.js"
                    ],
                    "uc_nestable": [
                        f"{foldername}/vendor/nestable2/js/jquery.nestable.min.js",
                        f"{foldername}/js/plugins-init/nestable-init.js"

                    ],
                    "uc_noui_slider": [
                        f"{foldername}/vendor/nouislider/nouislider.min.js",
                        f"{foldername}/vendor/wnumb/wNumb.js",
                        f"{foldername}/js/plugins-init/nouislider-init.js"
                    ],
                    "uc_sweetalert": [
                        f"{foldername}/vendor/sweetalert2/dist/sweetalert2.min.js",
                        f"{foldername}/js/plugins-init/sweetalert.init.js",

                    ],
                    "uc_toastr": [
                        f"{foldername}/vendor/toastr/js/toastr.min.js",
                        f"{foldername}/js/plugins-init/toastr-init.js"
                    ],
                    "map_jqvmap": [
                        f"{foldername}/vendor/jqvmap/js/jquery.vmap.min.js",
                        f"{foldername}/vendor/jqvmap/js/jquery.vmap.world.js",
                        f"{foldername}/vendor/jqvmap/js/jquery.vmap.usa.js",
                        f"{foldername}/js/plugins-init/jqvmap-init.js",

                    ],
                    "uc_lightgallery": [
                        f"{foldername}/vendor/lightgallery/js/lightgallery-all.min.js",

                    ],
                    "widget_card": [

                    ],
                    "widget_chart": [
                        f"{foldername}/vendor/chart.js/Chart.bundle.min.js",
                        f"{foldername}/vendor/apexchart/apexchart.js",
                        f"{foldername}/vendor/chartist/js/chartist.min.js",
                        f"{foldername}/vendor/chartist-plugin-tooltips/js/chartist-plugin-tooltip.min.js",
                        f"{foldername}/vendor/flot/jquery.flot.js",
                        f"{foldername}/vendor/flot/jquery.flot.pie.js",
                        f"{foldername}/vendor/flot/jquery.flot.resize.js",
                        f"{foldername}/vendor/flot-spline/jquery.flot.spline.min.js",
                        f"{foldername}/vendor/jquery-sparkline/jquery.sparkline.min.js",
                        f"{foldername}/js/plugins-init/sparkline-init.js",
                        f"{foldername}/vendor/peity/jquery.peity.min.js",
                        f"{foldername}/js/plugins-init/piety-init.js",
                        f"{foldername}/js/plugins-init/widgets-script-init.js",
                    ],
                    "widget_list": [

                    ],
                    "form_element": [],
                    "form_wizard": [
                        f"{foldername}/vendor/jquery-steps/build/jquery.steps.min.js",
                        f"{foldername}/vendor/jquery-validation/jquery.validate.min.js",
                        f"{foldername}/js/plugins-init/jquery.validate-init.js",
                        f"{foldername}/vendor/jquery-smartwizard/dist/js/jquery.smartWizard.js",
                    ],
                    "form_ckeditor": [
                        f"{foldername}/vendor/ckeditor/ckeditor.js"
                    ],
                    "form_pickers": [
                        f"{foldername}/vendor/bootstrap-select/dist/js/bootstrap-select.min.js",
                        f"{foldername}/vendor/chart.js/Chart.bundle.min.js",
                        f"{foldername}/vendor/apexchart/apexchart.js",
                        f"{foldername}/vendor/moment/moment.min.js",
                        f"{foldername}/vendor/bootstrap-daterangepicker/daterangepicker.js",
                        f"{foldername}/vendor/clockpicker/js/bootstrap-clockpicker.min.js",
                        f"{foldername}/vendor/jquery-asColor/jquery-asColor.min.js",
                        f"{foldername}/vendor/jquery-asGradient/jquery-asGradient.min.js",
                        f"{foldername}/vendor/jquery-asColorPicker/js/jquery-asColorPicker.min.js",
                        f"{foldername}/vendor/bootstrap-material-datetimepicker/js/bootstrap-material-datetimepicker.js",
                        f"{foldername}/vendor/pickadate/picker.js",
                        f"{foldername}/vendor/pickadate/picker.time.js",
                        f"{foldername}/vendor/pickadate/picker.date.js",
                        f"{foldername}/js/plugins-init/bs-daterange-picker-init.js",
                        f"{foldername}/js/plugins-init/clock-picker-init.js",
                        f"{foldername}/js/plugins-init/jquery-asColorPicker.init.js",
                        f"{foldername}/js/plugins-init/material-date-picker-init.js",
                        f"{foldername}/js/plugins-init/pickadate-init.js",
                    ],
                    "form_validation": [],
                    "table_bootstrap_basic": [],
                    "table_datatable_basic": [
                        f"{foldername}/vendor/chart.js/Chart.bundle.min.js",
                        f"{foldername}/vendor/apexchart/apexchart.js",
                        f"{foldername}/vendor/datatables/js/jquery.dataTables.min.js",
                        f"{foldername}/js/plugins-init/datatables.init.js",
                    ],

                },
            }
        }
    }
}
