from django.http import HttpResponse
from django.template import loader


def index(request):
    TEMPLATE_PATH = 'main/main-view/mainView.html'
    if request.user.is_authenticated():
        context = {
            'user_id': request.user.id
        }
    else:
        context = {}
    template = loader.get_template(TEMPLATE_PATH)
    return HttpResponse(template.render(context, request))
