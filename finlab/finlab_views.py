from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required


@login_required(login_url='finlab:login')
def index(request):
    context = {
        "menu_wallet": True
    }
    return redirect('analytics:dashboard')
    # return render(request, 'finlab/dashboard/index.html', context)


@login_required(login_url='finlab:login')
def index2(request):
    context = {
        "menu_wallet": True
    }
    return render(request, 'finlab/dashboard/index-2.html', context)


@login_required(login_url='finlab:login')
def banking(request):
    context = {
        "page_title": "Dashboard"
    }
    return render(request, 'finlab/dashboard/banking.html', context)


@login_required(login_url='finlab:login')
def ticketing(request):
    context = {
        "page_title": "Dashboard"
    }
    return render(request, 'finlab/dashboard/ticketing.html', context)


@login_required(login_url='finlab:login')
def crypto(request):
    context = {
        "page_title": "Dashboard"
    }
    return render(request, 'finlab/dashboard/crypto.html', context)


@login_required(login_url='finlab:login')
def invoice(request):
    context = {
        "page_title": "Dashboard"
    }
    return render(request, 'finlab/dashboard/invoice.html', context)


@login_required(login_url='finlab:login')
def contact(request):
    context = {
        "page_title": "Dashboard"
    }
    return render(request, 'finlab/dashboard/contact.html', context)


@login_required(login_url='finlab:login')
def kanban(request):
    context = {
        "page_title": "Dashboard"
    }
    return render(request, 'finlab/dashboard/kanban.html', context)


@login_required(login_url='finlab:login')
def file_manager(request):
    context = {
        "page_title": "Dashboard"
    }
    return render(request, 'finlab/file-manager/file-manager.html', context)


@login_required(login_url='finlab:login')
def user(request):
    context = {
        "page_title": "Dashboard"
    }
    return render(request, 'finlab/file-manager/user.html', context)


@login_required(login_url='finlab:login')
def calendar(request):
    context = {
        "page_title": "Dashboard"
    }
    return render(request, 'finlab/file-manager/calendar.html', context)


@login_required(login_url='finlab:login')
def to_do_list(request):
    context = {
        "page_title": "Dashboard"
    }
    return render(request, 'finlab/file-manager/to-do-list.html', context)


@login_required(login_url='finlab:login')
def chat(request):
    context = {
        "page_title": "Dashboard"
    }
    return render(request, 'finlab/file-manager/chat.html', context)


@login_required(login_url='finlab:login')
def activity(request):
    context = {
        "page_title": "Dashboard"
    }
    return render(request, 'finlab/file-manager/activity.html', context)


@login_required(login_url='finlab:login')
def app_profile(request):
    context = {
        "page_title": "Dashboard"
    }
    return render(request, 'finlab/apps/app-profile.html', context)


@login_required(login_url='finlab:login')
def post_details(request):
    context = {
        "page_title": "Dashboard"
    }
    return render(request, 'finlab/apps/post-details.html', context)


@login_required(login_url='finlab:login')
def email_compose(request):
    context = {
        "page_title": "Dashboard"
    }
    return render(request, 'finlab/apps/email/email-compose.html', context)


@login_required(login_url='finlab:login')
def email_inbox(request):
    context = {
        "page_title": "Dashboard"
    }
    return render(request, 'finlab/apps/email/email-inbox.html', context)


@login_required(login_url='finlab:login')
def email_read(request):
    context = {
        "page_title": "Dashboard"
    }
    return render(request, 'finlab/apps/email/email-read.html', context)


@login_required(login_url='finlab:login')
def app_calendar(request):
    context = {
        "page_title": "Dashboard"
    }
    return render(request, 'finlab/apps/app-calendar.html', context)


@login_required(login_url='finlab:login')
def ecom_checkout(request):
    context = {
        "page_title": "Dashboard"
    }
    return render(request, 'finlab/apps/shop/ecom-checkout.html', context)


@login_required(login_url='finlab:login')
def ecom_customers(request):
    context = {
        "page_title": "Dashboard"
    }
    return render(request, 'finlab/apps/shop/ecom-customers.html', context)


@login_required(login_url='finlab:login')
def ecom_invoice(request):
    context = {
        "page_title": "Dashboard"
    }
    return render(request, 'finlab/apps/shop/ecom-invoice.html', context)


@login_required(login_url='finlab:login')
def ecom_product_detail(request):
    context = {
        "page_title": "Dashboard"
    }
    return render(request, 'finlab/apps/shop/ecom-product-detail.html', context)


@login_required(login_url='finlab:login')
def ecom_product_grid(request):
    context = {
        "page_title": "Dashboard"
    }
    return render(request, 'finlab/apps/shop/ecom-product-grid.html', context)


@login_required(login_url='finlab:login')
def ecom_product_list(request):
    context = {
        "page_title": "Dashboard"
    }
    return render(request, 'finlab/apps/shop/ecom-product-list.html', context)


@login_required(login_url='finlab:login')
def ecom_product_order(request):
    context = {
        "page_title": "Dashboard"
    }
    return render(request, 'finlab/apps/shop/ecom-product-order.html', context)


@login_required(login_url='finlab:login')
def chart_chartist(request):
    context = {
        "page_title": "Dashboard"
    }
    return render(request, 'finlab/charts/chart-chartist.html', context)


@login_required(login_url='finlab:login')
def chart_chartjs(request):
    context = {
        "page_title": "Dashboard"
    }
    return render(request, 'finlab/charts/chart-chartjs.html', context)


@login_required(login_url='finlab:login')
def chart_flot(request):
    context = {
        "page_title": "Dashboard"
    }
    return render(request, 'finlab/charts/chart-flot.html', context)


@login_required(login_url='finlab:login')
def chart_morris(request):
    context = {
        "page_title": "Dashboard"
    }
    return render(request, 'finlab/charts/chart-morris.html', context)


@login_required(login_url='finlab:login')
def chart_peity(request):
    context = {
        "page_title": "Dashboard"
    }
    return render(request, 'finlab/charts/chart-peity.html', context)


@login_required(login_url='finlab:login')
def chart_sparkline(request):
    context = {
        "page_title": "Dashboard"
    }
    return render(request, 'finlab/charts/chart-sparkline.html', context)


@login_required(login_url='finlab:login')
def ui_accordion(request):
    context = {
        "page_title": "Accordion"
    }
    return render(request, 'finlab/bootstrap/ui-accordion.html', context)


@login_required(login_url='finlab:login')
def ui_alert(request):
    context = {
        "page_title": "Alert"
    }
    return render(request, 'finlab/bootstrap/ui-alert.html', context)


@login_required(login_url='finlab:login')
def ui_badge(request):
    context = {
        "page_title": "Badge"
    }
    return render(request, 'finlab/bootstrap/ui-badge.html', context)


@login_required(login_url='finlab:login')
def ui_button(request):
    context = {
        "page_title": "Button"
    }
    return render(request, 'finlab/bootstrap/ui-button.html', context)


@login_required(login_url='finlab:login')
def ui_modal(request):
    context = {
        "page_title": "Modal"
    }
    return render(request, 'finlab/bootstrap/ui-modal.html', context)


@login_required(login_url='finlab:login')
def ui_button_group(request):
    context = {
        "page_title": "Button Group"
    }
    return render(request, 'finlab/bootstrap/ui-button-group.html', context)


@login_required(login_url='finlab:login')
def ui_list_group(request):
    context = {
        "page_title": "List Group"
    }
    return render(request, 'finlab/bootstrap/ui-list-group.html', context)


@login_required(login_url='finlab:login')
def ui_media_object(request):
    context = {
        "page_title": "Media Object"
    }
    return render(request, 'finlab/bootstrap/ui-media-object.html', context)


@login_required(login_url='finlab:login')
def ui_card(request):
    context = {
        "page_title": "Card"
    }
    return render(request, 'finlab/bootstrap/ui-card.html', context)


@login_required(login_url='finlab:login')
def ui_carousel(request):
    context = {
        "page_title": "Carousel"
    }
    return render(request, 'finlab/bootstrap/ui-carousel.html', context)


@login_required(login_url='finlab:login')
def ui_dropdown(request):
    context = {
        "page_title": "Dropdown"
    }
    return render(request, 'finlab/bootstrap/ui-dropdown.html', context)


@login_required(login_url='finlab:login')
def ui_popover(request):
    context = {
        "page_title": "Popover"
    }
    return render(request, 'finlab/bootstrap/ui-popover.html', context)


@login_required(login_url='finlab:login')
def ui_progressbar(request):
    context = {
        "page_title": "Progressbar"
    }
    return render(request, 'finlab/bootstrap/ui-progressbar.html', context)


@login_required(login_url='finlab:login')
def ui_tab(request):
    context = {
        "page_title": "Tab"
    }
    return render(request, 'finlab/bootstrap/ui-tab.html', context)


@login_required(login_url='finlab:login')
def ui_typography(request):
    context = {
        "page_title": "Typography"
    }
    return render(request, 'finlab/bootstrap/ui-typography.html', context)


@login_required(login_url='finlab:login')
def ui_pagination(request):
    context = {
        "page_title": "Pagination"
    }
    return render(request, 'finlab/bootstrap/ui-pagination.html', context)


@login_required(login_url='finlab:login')
def ui_grid(request):
    context = {
        "page_title": "Grid"
    }
    return render(request, 'finlab/bootstrap/ui-grid.html', context)


@login_required(login_url='finlab:login')
def uc_select2(request):
    context = {
        "page_title": "Select"
    }
    return render(request, 'finlab/plugins/uc-select2.html', context)


@login_required(login_url='finlab:login')
def uc_nestable(request):
    context = {
        "page_title": "Nestable"
    }
    return render(request, 'finlab/plugins/uc-nestable.html', context)


@login_required(login_url='finlab:login')
def uc_noui_slider(request):
    context = {
        "page_title": "UI Slider"
    }
    return render(request, 'finlab/plugins/uc-noui-slider.html', context)


@login_required(login_url='finlab:login')
def uc_sweetalert(request):
    context = {
        "page_title": "Sweet Alert"
    }
    return render(request, 'finlab/plugins/uc-sweetalert.html', context)


@login_required(login_url='finlab:login')
def uc_toastr(request):
    context = {
        "page_title": "Toastr"
    }
    return render(request, 'finlab/plugins/uc-toastr.html', context)


@login_required(login_url='finlab:login')
def map_jqvmap(request):
    context = {
        "page_title": "Jqvmap"
    }
    return render(request, 'finlab/plugins/map-jqvmap.html', context)


@login_required(login_url='finlab:login')
def uc_lightgallery(request):
    context = {
        "page_title": "LightGallery"
    }
    return render(request, 'finlab/plugins/uc-lightgallery.html', context)


@login_required(login_url='finlab:login')
def widget_card(request):
    return render(request, 'finlab/widget/widget-card.html')


@login_required(login_url='finlab:login')
def widget_chart(request):
    return render(request, 'finlab/widget/widget-chart.html')


@login_required(login_url='finlab:login')
def widget_list(request):
    return render(request, 'finlab/widget/widget-list.html')


@login_required(login_url='finlab:login')
def form_element(request):
    context = {
        "page_title": "Form Element"
    }
    return render(request, 'finlab/forms/form-element.html', context)


@login_required(login_url='finlab:login')
def form_wizard(request):
    context = {
        "page_title": "Form Wizard"
    }
    return render(request, 'finlab/forms/form-wizard.html', context)


@login_required(login_url='finlab:login')
def form_ckeditor(request):
    context = {
        "page_title": "Ckeditor"
    }
    return render(request, 'finlab/forms/form-ckeditor.html', context)


@login_required(login_url='finlab:login')
def form_pickers(request):
    context = {
        "page_title": "Pickers"
    }
    return render(request, 'finlab/forms/form-pickers.html', context)


@login_required(login_url='finlab:login')
def form_validation(request):
    context = {
        "page_title": "Form Validation"
    }
    return render(request, 'finlab/forms/form-validation.html', context)


@login_required(login_url='finlab:login')
def table_bootstrap_basic(request):
    return render(request, 'finlab/table/table-bootstrap-basic.html')


@login_required(login_url='finlab:login')
def table_datatable_basic(request):
    return render(request, 'finlab/table/table-datatable-basic.html')


# def page_login(request):
#     return render(request,'finlab/pages/page-login.html')


def page_lock_screen(request):
    return render(request, 'finlab/pages/page-lock-screen.html')


def page_forgot_password(request):
    return render(request, 'finlab/pages/page-forgot-password.html')


# def page_register(request):
#     return render(request,'finlab/pages/page-register.html')

def page_error_400(request):
    return render(request, '400.html')


def page_error_403(request):
    return render(request, '403.html')


def page_error_404(request):
    return render(request, '404.html')


def page_error_500(request):
    return render(request, '500.html')


def page_error_503(request):
    return render(request, '503.html')


def empty_page(request):
    return render(request, 'finlab/pages/empty-page.html')
