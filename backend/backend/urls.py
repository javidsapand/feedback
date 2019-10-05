from django.conf.urls import url , include
from django.contrib import admin
from django.conf import settings
from django.conf.urls.static import static

from django.urls import path
from graphene_django.views import GraphQLView
from app.schema import schema
from django.views.decorators.csrf import csrf_exempt



urlpatterns = [
    # url('^notifications/', include(notifications.urls, namespace='notifications')),
    url(r'^admin/', admin.site.urls),
    # url(r'^', include(api_urls)),
    # url(r'^login/', obtain_jwt_token),
    path('graphql/', csrf_exempt(GraphQLView.as_view(schema=schema, graphiql=True))),
    ]


urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)