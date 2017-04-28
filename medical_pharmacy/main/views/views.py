from django.http import HttpResponse
from django.template import loader


def index(request):
    TEMPLATE_PATH = 'main/main-view/mainView.html'

    context = {}
    template = loader.get_template(TEMPLATE_PATH)
    return HttpResponse(template.render(context, request))


def authentication_page(request):
    TEMPLATE_PATH = 'main/user-authorization/authentication_page.html'

    context = {}
    template = loader.get_template(TEMPLATE_PATH)
    return HttpResponse(template.render(context, request))
