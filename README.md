# Questify
## Co to jest?
Questify to aplikacja pozwalająca użytkownikom na organizację ich zadań, motywując ich do podążania za swoimi celami!
## Features
- Twórz interaktywne listy zadań
- Dodaj swoich znajomych
- Zmieniaj swój awatar za pomocą waluty z wykonywania zadań
- Podziel się swoim progresem z innymi!
- Zbieraj QuestCoins za wykonywanie zadań i zdobywanie osiągnięć!


### Spełnienie wymagań projektowych: 

1. Opis aplikacji (powyżej)
2. Opis podziału pracy: 
    * Jan Nowacki
        * Całość backendu, z wyłączeniem autoryzacji
        * Dokumentacja projektu
        * Sporządzenie diagramu bazy danych
    * Daniel Stawicki
        * Całość frontendu
        * Autoryzacja użytkownika
        * Sporządzenie diagramu bazy danych
3. Opis + diagram bazy danych 
![diagram](./docs/diagram.png)
Baza relacyjna wykonana za pomocą PostgreSQL oraz Prisma ORM. 

---

# 📊 Opis bazy danych

## 🧑‍💻 Tabela `users`

Przechowuje dane użytkowników.

| Kolumna  | Typ          |
| -------- | ------------ |
| id       | bigint       |
| username | varchar(50)  |
| email    | varchar(200) |

---

## 🔒 Tabela `passwords`

Hasze haseł użytkowników.

| Kolumna  | Typ    |
| -------- | ------ |
| user\_id | bigint |
| hash     | bigint |

Relacja: `user_id` → `users.id`

---

## 🧍‍♂️ Tabela `avatars`

Reprezentuje wygląd awatara użytkownika.

| Kolumna        | Typ    |
| -------------- | ------ |
| user\_id       | bigint |
| hat\_id        | bigint |
| glasses\_id    | bigint |
| background\_id | bigint |
| frame\_id      | bigint |

Relacje do:

* `hats.id`
* `glasses.id`
* `backgrounds.id`
* `frames.id`

---

## 🎩 Tabela `hats`

| Kolumna | Typ    |
| ------- | ------ |
| id      | bigint |
| price   | bigint |

---

## 🕶️ Tabela `glasses`

| Kolumna | Typ    |
| ------- | ------ |
| id      | bigint |
| price   | bigint |

---

## 🌄 Tabela `backgrounds`

| Kolumna | Typ    |
| ------- | ------ |
| id      | bigint |
| price   | bigint |

---

## 🖼️ Tabela `frames`

| Kolumna | Typ    |
| ------- | ------ |
| id      | bigint |
| price   | bigint |

---

## 📈 Tabela `stats`

Statystyki użytkownika.

| Kolumna         | Typ     |
| --------------- | ------- |
| user\_id        | bigint  |
| coins           | bigint  |
| exp             | bigint  |
| achievements    | boolean |
| questsCompleted | bigint  |

---

## 👥 Tabela `friends`

Relacje znajomości między użytkownikami.

| Kolumna   | Typ    |
| --------- | ------ |
| user1\_id | bigint |
| user2\_id | bigint |

Relacja: obie kolumny wskazują na `users.id`

---

## 🗂️ Tabela `users_questlists`

Tabela łącząca użytkowników z listami zadań (wiele do wielu).

| Kolumna       | Typ    |
| ------------- | ------ |
| user\_id      | bigint |
| questlist\_id | bigint |

---

## 📝 Tabela `questlists`

Listy zadań (np. kampanie, zestawy).

| Kolumna | Typ          |
| ------- | ------------ |
| id      | bigint       |
| title   | varchar(200) |

---

## 🧾 Tabela `quests`

Zadania należące do listy.

| Kolumna         | Typ    |
| --------------- | ------ |
| id              | bigint |
| quest\_list\_id | bigint |

---

## 📃 Tabela `quest_details`

Szczegóły pojedynczego zadania.

| Kolumna     | Typ    |
| ----------- | ------ |
| id          | bigint |
| description | text   |
| exp         | bigint |

---
