Możesz używać dowolnych bibliotek typu `angular material`, `primeNG`, `tailwind` itd.

Style mogą być domyślne dla użytych bibliotek, RWD nie jest wymagane.
Aplikacja nie musi posiadać fancy styli - ważne by była czytelna.
Zadbaj o w miarę sensowną architekturę - podział na moduły itd.

# Zadanie
1. Ekran `Start`: 
a) powinien zawierać przycisk `dodaj klientów`, który przenosi nas na `podstronę` z ekranem z punktu 2.
b) Powinien wyświetlać listę dodanych klientów - wystarczy zwykła lista z imieniem i nazwiskiem dodanych klientów, stylowanie nie jest wymagane ;)

2. Ekran `Dodaj klientów`:
a) Powinien zawierać tabelkę z formularzem z polami:
  - Imię, nazwisko, telefon, email
  Przykładowy wygląd znajduje się w pliku `clients_form.png`
  Inputy `nie muszą` mieć placeholderów itp.
b) Każde pole powinno mieć walidację:
   - `imię` oraz `nazwisko` - powinno zawierać tylko litery, znak myślnika oraz spację
   - `telefon` - dozwolone tylko cyfry, minimalna długość 9, maksymalna 11
   - `email` - standardowa walidacja na email, brak ograniczenia długości znaków
   - by klient był poprawny wymagane są pola: `imię` && `nazwisko` && (`email` || `telefon`)
   - Gdy któreś z pól jest niepoprawne to powinno mieć czerwone obramowanie
   - `Dotyczy tylko pól imię oraz nazwisko` - Gdy użytkownik wpisał niepoprawny znak, przykładowo `@` w polu `imię` to pod inputem powinien pojawić się komunikat:
    `Usuń niedozwolony znak: [tutaj pokaż niedozwolne wpisane tagi]` tak jak w obrazkach: `wrong_char.png` oraz `wrong_char2.png`.
    Komunikat powinien wyświetlać `tylko wpisany` niedozwolony znak.

c) Pod tabelką powinien być przycisk `Zapisz`:
   - przycisk powinien być wyłączony gdy dane są niepoprawne
   - wciśnięcie go powinno dodawać klientów do listy i przenosić nas na stronę `Start` gdzie klienci powinni być wyświetleni.
d) Obok przycisku `Zapisz` powinien być przycisk `Anuluj`, który cofa nas na `Start`.
e) Gdy użytkownik zacznie pisać w którymś z pól:
  - Nawigacja powinna zostać wyłączona tj. kliknięcie na `Start` lub `Anuluj` nie powinno przenosić nas na inny ekran.
    Powinnien wyświetlić nam się `confirm modal` (może być stanardowy z przeglądarki) z tekstem: `Czy na pewno chcesz przerwać dodawanie klientów?` - kliknięcie na `Tak` powinno kontynuować nawigację i przenieść nas na docelowy ekran, kliknięcie na `Nie` powinno zostawić nas na aktualnym ekranie
e) Odświeżenie strony nie powinno powodować skasowania danych - tj. jeśli wpisałem dane dwóch klientów do tabeli i odświeżam stronę to po przeładowaniu strony dane powinny być niezmienione. Dobrze gdyby dane były zapisywane na bieżąco gdy użytkownik coś zmieni.

3. `Client api service`: 
  Ten serwis posiada dwie metody i symuluje backend:
  - metoda getClients - do pobierania klientów
  - metoda addClients - do zapisywania nowych klientów - zwraca true dla udanej akcji

