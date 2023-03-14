# Inlämningsuppgift - Star Wars Trivia (G/VG)

Beskrivning: Du ska med hjälp av ett API skapa en applikation där användaren kan jämföra olika Star Wars-karaktärer och deras egenskaper med varandra!

Använd följande API: https://swapi.dev

## Krav:

- Skapa en klass som du döper till Character med egenskaperna för name, gender, height, mass,hair_color, height, skinColor, eyeColor, movies samt pictureUrl.
- Användaren ska kunna välja två karaktärer (Karaktär 1 & 2) med hjälp av varsin lista.
- Listorna ska bestå av minst sex namn på karaktärer från Star Wars-universumet som finns i API:et.
- Användaren ska sedan kunna klicka på en knapp för att hämta data om karaktärerna.
- När datat har hämtats, skapa två instanser av Character-klassen, och ge egenskaperna i klassen värden utifrån det hämtade datat. OBS! API:et ger dig inga bilder - Så dessa behöver du ta fram på egen hand.
- Rendera nu ut Karaktär 1 och Karaktär 2 i DOM:en - De ska visas ut med en bild samt namn.
- Skapa en knapp med texten “Compare characters” som i sin tur skriver ut följande information om karaktärerna:

1. Hårfärg - hair_color
2. Längd - height
3. Vikt - mass
4. Kön - gender
5. Hudfärg - skin_color
6. Ögonfärg - eye_color
7. Antal filmer hen medverkat i. - films.length

- Det ska även framgå visuellt (text och/eller färg):
  Vem av karaktärerna som är längst.
  Vem som väger mest.
  Vem som medverkat i flest filmer.
  Om karaktärerna är av samma kön.
  Om karaktärerna har samma hårfärg.
  Om karaktärerna har samma hudfärg.

## VG

Utöver ovanstående ska du även göra följande:

- Skapa en meddelanderuta i DOM:en, här ska användaren kunna få reda på extra information om karaktärerna.
- I din Character-klass ska du nu även skapa följande metoder där du skriver ut resultaten i meddelanderutan.

1. Metod för att hämta vilket datum karaktären först visades på film.
2. Metod för att skriva ut namnet på filmerna som bägge valda karaktärer medverkar i.
3. Metod för att jämföra karaktärens hemplanet med en annan karaktär. Skriv ut namnen på bägge karaktärernas hemplanet, om de delar samma hemplanet ska detta skrivas ut.
4. Metod för att skriva ut namnet på karaktärens dyraste fordon (jämför både starships och vehicles, men bara ett fordon ska skrivas ut).

- Kopplar karaktärens metoder till knappar som användaren kan klicka på för att få svar på följande.
- OBS! Skriv tydliga meddelanden i meddelanderutan t.ex “Luke Skywalker first appeared in a movie 1990-05-25”, inte endast “1990-05-25”.

Deadline 16 mars 23:59. Inlämning sker i form av publikt Github-repo alternativt .zip-fil.

Lycka till! May the force be with you 🙂
/B
