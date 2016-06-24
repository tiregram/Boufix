from django.conf.urls import url

from . import views

urlpatterns = [

    url(r"^sub/(?P<user_name>[a-zA-Z0-9]+)/(?P<value>[0-9]+)",views.ajax_sub_credit,name="sub credit"),
    url(r"^add/(?P<user_name>[a-zA-Z0-9]+)/(?P<value>[0-9]+)",views.ajax_add_credit,name="add credit"),
    url(r"^ajax/all",views.ajax_get_all_menber,name="panel"),
    url(r"^ajax/log/(?P<user_name>[a-zA-Z0-9]+)",views.ajax_get_log_menber,name="log"),
    url(r"^ajax/product/all",views.ajax_get_all_product,name="panel"),    
    url(r"^ajax/one/(?P<user_name>[a-zA-Z0-9]+)",views.ajax_get_one_menber,name="panel"),    
    url(r"^aply/(?P<user_name>[a-zA-Z0-9]+)/(?P<product>[a-zA-Z0-9 ]+)",views.ajax_aply_product,name="aply product"),
    url(r"^show/",views.show_consomation,name="dashboard"),
    url(r"^",views.panel,name="panel"),
    
]
