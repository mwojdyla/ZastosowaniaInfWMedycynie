from django.conf.urls import url
from django.views.decorators.csrf import csrf_exempt, csrf_protect

from .views import views
from .views.register import Register
from .views.login import Login
from .views.logout import logout_view
from .views.make_order import MakeOrder
from .views.update_users_permissions import UpdateUsersPermissions
from .views.medicines_filtering import MedicineFilter
from .views.get_substitutes_strings import GetSubstitutesStrings
from .views.add_medicine import AddMedicine

urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^register$', Register.as_view(), name='register'),
    url(r'^login$', Login.as_view(), name='login'),
    url(r'^logout$', logout_view, name='logout_view'),
    url(r'^make-order$', MakeOrder.as_view(), name='make_order'),
    url('^users/updateUsersPermissions$', UpdateUsersPermissions.as_view(), name='update_users_permissions'),
    url('^medicines_filtering$', MedicineFilter.as_view(), name='medicines_filtering'),
    url(r'^get_substitutes_strings$', GetSubstitutesStrings.as_view(), name='get_substitutes_strings'),
    url(r'^add_medicine$', csrf_exempt(AddMedicine.as_view()), name='add_medicine'),
]
