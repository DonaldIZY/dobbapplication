import imp
from django.urls import path, include
from finlab import finlab_views

app_name = 'finlab'
urlpatterns = [
    # Users
    path('users/', include("users.urls")),

    path('', finlab_views.index, name="index"),
    path('index/', finlab_views.index, name="index"),
    path('index-2/', finlab_views.index2, name="index-2"),
    path('banking/', finlab_views.banking, name="banking"),
    path('ticketing/', finlab_views.ticketing, name="ticketing"),
    path('crypto/', finlab_views.crypto, name="crypto"),
    path('invoice/', finlab_views.invoice, name="invoice"),
    path('contact/', finlab_views.contact, name="contact"),
    path('kanban/', finlab_views.kanban, name="kanban"),
    path('file-manager/', finlab_views.file_manager, name="file-manager"),
    path('user/', finlab_views.user, name="user"),
    path('calendar/', finlab_views.calendar, name="calendar"),
    path('to-do-list/', finlab_views.to_do_list, name="to-do-list"),
    path('chat/', finlab_views.chat, name="chat"),
    path('activity/', finlab_views.activity, name="activity"),
    path('app-profile/', finlab_views.app_profile, name="app-profile"),
    path('post-details/', finlab_views.post_details, name="post-details"),
    path('email-compose/', finlab_views.email_compose, name="email-compose"),
    path('email-inbox/', finlab_views.email_inbox, name="email-inbox"),
    path('email-read/', finlab_views.email_read, name="email-read"),
    path('app-calendar/', finlab_views.app_calendar, name="app-calendar"),

    path('ecom-checkout/', finlab_views.ecom_checkout, name="ecom-checkout"),
    path('ecom-customers/', finlab_views.ecom_customers, name="ecom-customers"),
    path('ecom-invoice/', finlab_views.ecom_invoice, name="ecom-invoice"),
    path('ecom-product-detail/', finlab_views.ecom_product_detail, name="ecom-product-detail"),
    path('ecom-product-grid/', finlab_views.ecom_product_grid, name="ecom-product-grid"),
    path('ecom-product-list/', finlab_views.ecom_product_list, name="ecom-product-list"),
    path('ecom-product-order/', finlab_views.ecom_product_order, name="ecom-product-order"),

    path('chart-chartist/', finlab_views.chart_chartist, name="chart-chartist"),
    path('chart-chartjs/', finlab_views.chart_chartjs, name="chart-chartjs"),
    path('chart-flot/', finlab_views.chart_flot, name="chart-flot"),
    path('chart-morris/', finlab_views.chart_morris, name="chart-morris"),
    path('chart-peity/', finlab_views.chart_peity, name="chart-peity"),
    path('chart-sparkline/', finlab_views.chart_sparkline, name="chart-sparkline"),

    path('ui-accordion/', finlab_views.ui_accordion, name="ui-accordion"),
    path('ui-alert/', finlab_views.ui_alert, name="ui-alert"),
    path('ui-badge/', finlab_views.ui_badge, name="ui-badge"),
    path('ui-button/', finlab_views.ui_button, name="ui-button"),
    path('ui-modal/', finlab_views.ui_modal, name="ui-modal"),
    path('ui-button-group/', finlab_views.ui_button_group, name="ui-button-group"),
    path('ui-list-group/', finlab_views.ui_list_group, name="ui-list-group"),
    path('ui-media-object/', finlab_views.ui_media_object, name="ui-media-object"),
    path('ui-card/', finlab_views.ui_card, name="ui-card"),
    path('ui-carousel/', finlab_views.ui_carousel, name="ui-carousel"),
    path('ui-dropdown/', finlab_views.ui_dropdown, name="ui-dropdown"),
    path('ui-popover/', finlab_views.ui_popover, name="ui-popover"),
    path('ui-progressbar/', finlab_views.ui_progressbar, name="ui-progressbar"),
    path('ui-tab/', finlab_views.ui_tab, name="ui-tab"),
    path('ui-typography/', finlab_views.ui_typography, name="ui-typography"),
    path('ui-pagination/', finlab_views.ui_pagination, name="ui-pagination"),
    path('ui-grid/', finlab_views.ui_grid, name="ui-grid"),

    path('uc-select2/', finlab_views.uc_select2, name="uc-select2"),
    path('uc-nestable/', finlab_views.uc_nestable, name="uc-nestable"),
    path('uc-noui-slider/', finlab_views.uc_noui_slider, name="uc-noui-slider"),
    path('uc-sweetalert/', finlab_views.uc_sweetalert, name="uc-sweetalert"),
    path('uc-toastr/', finlab_views.uc_toastr, name="uc-toastr"),
    path('map-jqvmap/', finlab_views.map_jqvmap, name="map-jqvmap"),
    path('uc-lightgallery/', finlab_views.uc_lightgallery, name="uc-lightgallery"),
    path('uc-lightgallery/', finlab_views.uc_lightgallery, name="uc-lightgallery"),

    path('widget-card/', finlab_views.widget_card, name="widget-card"),
    path('widget-chart/', finlab_views.widget_chart, name="widget-chart"),
    path('widget-list/', finlab_views.widget_list, name="widget-list"),

    path('form-element/', finlab_views.form_element, name="form-element"),
    path('form-wizard/', finlab_views.form_wizard, name="form-wizard"),
    path('form-ckeditor/', finlab_views.form_ckeditor, name="form-ckeditor"),
    path('form-pickers/', finlab_views.form_pickers, name="form-pickers"),
    path('form-validation/', finlab_views.form_validation, name="form-validation"),

    path('form-validation/', finlab_views.form_validation, name="form-validation"),
    path('form-validation/', finlab_views.form_validation, name="form-validation"),

    path('table-bootstrap-basic/', finlab_views.table_bootstrap_basic, name="table-bootstrap-basic"),
    path('table-datatable-basic/', finlab_views.table_datatable_basic, name="table-datatable-basic"),

    # path('page-login/',finlab_views.page_login,name="page-login"),
    # path('page-register/',finlab_views.page_register,name="page-register"),

    path('page-lock-screen/', finlab_views.page_lock_screen, name="page-lock-screen"),
    path('page-forgot-password/', finlab_views.page_forgot_password, name="page-forgot-password"),
    path('page-error-400/', finlab_views.page_error_400, name="page-error-400"),
    path('page-error-403/', finlab_views.page_error_403, name="page-error-403"),
    path('page-error-404/', finlab_views.page_error_404, name="page-error-404"),
    path('page-error-500/', finlab_views.page_error_500, name="page-error-500"),
    path('page-error-503/', finlab_views.page_error_503, name="page-error-503"),
    path('empty-page/', finlab_views.empty_page, name="empty-page"),

]
