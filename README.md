# ZastosowaniaInfWMedycynie
Projekt apteki lekarskiej

Aby przystąpić do prac nad projektem należy:

1. Aktywować witualne środowisko ( source AptekaMedyczna/venv/bin/activate )

Ustalenia:
	1. Aplikacja webowa
	2. Funkcjonalności
	a) Rejestracja oraz Logowanie
	• Jako pracownik posiadam wszystkie uprawnienia klienta oraz więcej
	• Jako pracownik apteki mam możliwość potwierdzenia roli "pracownika" 
	• Potwierdzenie roli przez innego pracownika zostaje zweryfikowane (kto, kogo zaakceptował) - Django
	• Jako klient mam możliwość zarejestrowania się oraz zalogowania
	b) Jako pracownik (aptekarz)
	• Mam możliwość przejrzenia stanu apteki, filtrowanie po nazwie oraz składnikach
	• Mam możliwość złożenia zamówienia leków na receptę
	• Mam możliwość znalezienia zamiennika leku
	• Mam możliwość zamówienia leku do apteki z hurtowni - idzie mejl z prośbą o leki
	• Dostaje komunikat o tym, że jest mało leków (5 leków) albo ich brak 
	• Dostaje zawiadomienie o skończonej dacie ważności leków
	c) Jako klient 
	• Mam możliwość znalezienia zamiennika leku bez recepty
	• Mam możliwość przejrzenia stanu apteki, filtrowanie po nazwie oraz składnikach
	• Mam możliwość zamówienia leku poprzez kuriera (oprócz tych na receptę) oraz do apteki  
	
UWAGI:
	• Leki mają wyszczególnione zastosowanie, składniki, typ, opis, sposób użycia, cena, zdjęcie, data ważności

Items:
	• Wyszukiwarka leków
	• Wyszukiwarka zamienników

