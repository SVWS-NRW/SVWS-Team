# Migrationsfehler eingrenzen

Arbeite an einer Kopie und halte Quelle, Werkzeug, Versionen und Protokoll fest.

## Fehler zuordnen

| Ausgangslage | Nächster Schritt |
| --- | --- |
| MDB öffnet schon in SchILD-NRW 2 nicht | Verbindung, Dateiformat und Passwort prüfen; bei Dateischäden [DBeaver und Access](/umgebungen/dbeaver) |
| SchILD2-Migrationstool scheitert | [Quell- und Zielbestand vorbereiten](/umgebungen/schild2) |
| SVWS-AdminClient meldet einen Migrationsfehler | Migrationsprotokoll prüfen und [AdminClient-Anleitung](https://doku.svws-nrw.de/adminclient/anleitungen/kurzanleitung_migration.html) heranziehen |
| SQLite-Sicherung wird nicht wiederhergestellt | [Importweg](/umgebungen/testdaten), Format und Versionsverträglichkeit prüfen |
| Übernahme endet, Daten oder Funktionen fallen danach auf | Quelle und Ergebnis am betroffenen Fall vergleichen |

## Migrationswege unterscheiden

| Quelle und Ziel | Werkzeug |
| --- | --- |
| SchILD2-Bestand in einen anderen SchILD2-Bestand | SchILD2-Migrationstool |
| SchILD2-Bestand in ein SVWS-Schema | SVWS-AdminClient |
| SVWS-Sicherung in ein SVWS-Schema | SQLite-Wiederherstellung im AdminClient |

Eine Überführung in einen neuen SchILD2-Bestand kann bei bestimmten Ausgangsproblemen helfen. Prüfe den Zwischenstand in SchILD-NRW 2, bevor Du die SVWS-Migration wiederholst.

## Fehler nach der Übernahme

Bei Abschnittsproblemen helfen der [Hinweis zur Startwarnung](/Tipp_der_Woche/SchILD-Tipp_der_Woche/StartwarnungSchuljahresabschnitt) und das [SQL-Fallbeispiel](/Fachberatung_Anleitungen/DBReparatur/). Die dort verwendeten IDs beziehen sich auf den beschriebenen Bestand.

Für weitere Untersuchungen nutze die [lokale Analyse](/umgebungen/lokale-analyse). Mit der [Fallcheckliste](./anfrage-vorbereiten.md) gibst Du offene Befunde an die Landesfachberatung weiter.
