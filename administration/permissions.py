from django.contrib.auth.models import Permission, User
from django.contrib.contenttypes.models import ContentType


content_type = ContentType.objects.get_for_model(User)
permission1 = Permission.objects.create(
    codename='can_view_manager_menu',
    name='Voir le menu manager',
    content_type=content_type,
)
permission2 = Permission.objects.create(
    codename='can_view_commercial_menu',
    name='Voir le menu commercial',
    content_type=content_type,
)
permission3 = Permission.objects.create(
    codename='can_view_director_menu',
    name='Voir le menu directeur',
    content_type=content_type,
)



