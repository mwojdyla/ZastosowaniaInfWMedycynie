# -*- coding: utf-8 -*-
import json
from django.http import JsonResponse
from django.views.generic.base import TemplateView
from django.core.mail import send_mail


class SendOrderEmail(TemplateView):
    def post(self, request):
        print request.body
        data = json.loads(request.body)
        email = data['email']
        firstName = data['firstName']
        lastName = data['lastName']
        price = data['price']
        isTransfer = data['isTransfer']

        if (isTransfer):
            message = 'Witaj {0} {1}\n' \
                      'Bardzo dziękujemy za zakupy w naszej aptece. W celu dokonania potwierdzenia zamówienia' \
                      ' prosimy o dokonanie płatności na następujące dane:\n' \
                      'TYTUŁ PRZELEWU: Zamówienie 1x234x12\n' \
                      'NUMER KONTA: 123123123123123123\n' \
                      'Kwota: {2} PLN\n\n' \
                      'Adres naszej apteki:\n' \
                      '53-151 Wrocław\n' \
                      'ul. Skłodowskiej 9\n' \
                      'kontakt: 666901257\n\n' \
                      'Serdecznie pozdrawiamy i zachęcamy do zakupów u nas ponownie'\
                .format(firstName, lastName, price)
        else:
            message = 'Witaj {0} {1}\n' \
                      'Bardzo dziękujemy za zakupy w naszej aptece. Leki będą dostępne ' \
                      'w ciągu dwóch dni.\n' \
                      'Koszt zamówienia: {2} PLN\n\n' \
                      'Adres naszej apteki:\n' \
                      '53-151 Wrocław\n' \
                      'ul. Skłodowskiej 9\n' \
                      'kontakt: 666901257\n\n' \
                      'Serdecznie pozdrawiamy i zachęcamy do zakupów u nas ponownie.'\
                .format(firstName, lastName, price)

        send_mail(
            'Zamówienie z medical pharmacy',
            message,
            'naszaApteka@.com',
            [email],
            fail_silently=False,

        )
        return JsonResponse({});
