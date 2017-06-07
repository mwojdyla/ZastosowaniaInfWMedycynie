from django.conf.urls import include, url
from django.contrib import admin
from rest_framework.documentation import include_docs_urls

from api.views import UserView, SubstanceView, MedicineView, MedicineFormView, MedicineApplicationView, \
    OrderView, PackageQuantityView, WarehouseView


urlpatterns = [
    #API documentation
    url(r'^docs/', include_docs_urls(title='Medicine Pharmacy')),

    #Authentication view
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework')),

    #List & Create views
    url('^users/', UserView.UserListCreate.as_view()),
    url('^substances/', SubstanceView.SubstanceListCreate.as_view()),
    url('^medicines/', MedicineView.MedicineListCreate.as_view()),
    url('^medicine_forms/', MedicineFormView.MedicineFormListCreate.as_view()),
    url('^medicine_applications/', MedicineApplicationView.MedicineApplicationListCreate.as_view()),
    url('^orders/', OrderView.OrderListCreate.as_view()),
    url('^package_quantities/', PackageQuantityView.PackageQuantityListCreate.as_view()),
    # url('^properties/', PropertiesView.PropertiesListCreate.as_view()),
    url('^warehouses/', WarehouseView.WarehouseListCreate.as_view()),

    #Retrieve, Update & Destroy views
    url(r'^users/(?P<pk>[0-9]+)/$', UserView.UserUpdateDelete.as_view()),
    url('^substances/(?P<pk>[0-9]+)/$', SubstanceView.SubstanceUpdateDelete.as_view()),
    url('^medicines/(?P<pk>[0-9]+)/$', MedicineView.MedicineUpdateDelete.as_view()),
    url('^medicine_forms/(?P<pk>[0-9]+)/$', MedicineFormView.MedicineFormUpdateDelete.as_view()),
    url('^medicine_applications/(?P<pk>[0-9]+)/$', MedicineApplicationView.MedicineApplicationUpdateDelete.as_view()),
    url('^orders/(?P<pk>[0-9]+)/$', OrderView.OrderUpdateDelete.as_view()),
    url('^package_quantities/(?P<pk>[0-9]+)/$', PackageQuantityView.PackageQuantityUpdateDelete.as_view()),
    # url('^properties/(?P<pk>[0-9]+)/$', PropertiesView.PropertiesUpdateDelete.as_view()),
    url('^warehouses/(?P<pk>[0-9]+)/$', WarehouseView.WarehouseUpdateDelete.as_view()),

    #Filters

    url('^medicine_details/(?P<pk>[0-9]+)/$', MedicineView.MedicineRetrieve.as_view()),
    # url('^medicine/(?P<pk>[0-9]+)/$', MedicineView.MedicineFilter.as_view(), name='medicine_filter'),

]