# -*- coding: utf-8 -*-
import json
from django.http import JsonResponse
from django.views.generic.base import TemplateView
from ..models import Medicine, User, Order
from django.core.mail import send_mail


class MakeOrder(TemplateView):
    def post(self, request):
        data = json.loads(request.body)
        userId = data['userId']
        email = data['email']
        firstName = data['firstName']
        lastName = data['lastName']
        price = data['price']
        isTransfer = data['isTransfer']
        medicinesObjects = data['medicines']
        address = data['address']
        document = data['document']
        user = User.objects.get(id=userId)
        allMedicines = []
        if isTransfer:
            payType = 'Przelew'
        else:
            payType = 'Gotówka'

        if document == 'invoice':
            document = 'Faktura VAT'
        else:
            document = 'Paragon fiskalny'

        for element in medicinesObjects:
            print element
            medicine = Medicine.objects.get(id=element['medicine']['id'])
            medicine.quantityInPackage -= element['quantity']
            medicine.save()
            allMedicines.append(medicine)

        order = Order(
            document=document,
            payType=payType,
            price=price,
            address=address,
            purchaser=user
        )
        order.save()
        order.medicines.add(*allMedicines)

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
                      'Serdecznie pozdrawiamy i zachęcamy do zakupów u nas ponownie' \
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
                      'Serdecznie pozdrawiamy i zachęcamy do zakupów u nas ponownie.' \
                .format(firstName, lastName, price)

        send_mail(
            'Zamówienie z medical pharmacy',
            message,
            'naszaApteka@.com',
            [email],
            fail_silently=False,
        )
        return JsonResponse({});
