from django.urls import path
from users import users_views

urlpatterns = [
    path('', users_views.users, name="users"),
    path('user-details/<int:id>/', users_views.user_details, name="user-details"),
    path('add-user/', users_views.add_user, name="add-user"),
    path('edit-user/<int:id>/', users_views.edit_user, name="edit-user"),
    path('delete-user/<int:id>/', users_views.delete_user, name="delete-user"),
    path('delete-multiple-user/', users_views.delete_multiple_user, name="delete-multiple-user"),
    path('login/', users_views.login_user, name="login"),
    path('logout/', users_views.logout_user, name="logout"),
    path('groups/', users_views.groups_list, name="groups"),
    path('group-edit/<int:id>/', users_views.group_edit, name="group-edit"),
    path('group-delete/<int:id>/', users_views.group_delete, name="group-delete"),
    path('group-add/', users_views.group_add, name="group-add"),
    path('permissions/', users_views.permissions, name="permissions"),
    path('edit-permissions/<int:id>/', users_views.edit_permissions, name="edit-permissions"),
    path('delete-permissions/<int:id>/', users_views.delete_permissions, name="delete-permissions"),
    path('assign-permissions-to-user/<int:id>/', users_views.assign_permissions_to_user,
         name="assign-permissions-to-user"),
    path('signup/', users_views.signup, name="signup"),
    path('activate/<uidb64>/<token>/', users_views.activate, name='activate'),
]
