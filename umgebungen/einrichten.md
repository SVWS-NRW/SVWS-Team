# Testplatz einrichten

Für den persönlichen Windows-Testplatz benötigst Du SVWS-Server mit MariaDB, SchILD-NRW 3 und eine Testdatenbank. Ergänze weitere Werkzeuge nach Deinem Beratungsbedarf.

## Aufbau wählen {#aufbau-waehlen}

| Ausgangslage | Weg |
| --- | --- |
| Eigener Windows-PC mit Administrationsrechten | SVWS-Server und SchILD-NRW 3 lokal installieren |
| Vorhandener betreuter Testserver | Testschema abstimmen und SchILD-NRW 3 am Arbeitsplatz verbinden |
| Wiederholbare getrennte Serverstände benötigt | Server in einer vorbereiteten VM betreiben; SchILD-NRW 3 auf Windows |

Für den ersten eigenen Testplatz führt die folgende Reihenfolge durch die lokale Windows-Installation. Ein zweites Schema teilt Serverversion und Wartung mit den übrigen Schemata. Tests anderer Serverversionen brauchen eine getrennte Instanz.

## 1. Server installieren

Folge der [Windows-Installationsanleitung](https://doku.svws-nrw.de/deployment/Windows-Installer/). Prüfe vorab Systemvoraussetzungen, Rechte und vorhandene Dienste. Notiere HTTPS-Adresse, MariaDB-Adresse, Ports und Versionen.

**Prüfung** – Der Dienst läuft und die Anmeldung am AdminClient gelingt.

## 2. Testdaten importieren

Wähle einen [Testbestand nach Schulform](/Datenbanken/testdaten/) und [importiere ihn in ein eigenes Schema](./testdaten.md).

**Prüfung** – Der SVWS-Client zeigt die erwartete Schule und den richtigen Abschnitt.

## 3. SchILD-NRW 3 verbinden

Installiere SchILD-NRW 3 und erstelle mit SchILD_DBConfig die passende Verbindungsdatei. Die [SchILD-Anleitung](https://doku.svws-nrw.de/deployment/Schild-NRW3/) beschreibt die Verbindung. SchILD-NRW 3 benötigt neben HTTPS auch direkten MariaDB-Zugriff.

**Prüfung** – SchILD-NRW 3 öffnet denselben Bestand wie der Browser.

## 4. Ausgangsstand sichern

Bearbeite eine typische Aufgabe. Sichere den Bestand und stelle ihn in einem entbehrlichen Testschema wieder her. Bewahre Verbindungsangaben und Zugangsdaten passend geschützt auf.

## Ergänzungen

- [SchILD2 und Migrationstool](./schild2.md) für die Untersuchung von Ausgangsbeständen.
- [DBeaver und Access](./dbeaver.md) für Datenanalyse und geeignete MDB-Aufgaben.
- [Wartung und Rücksetzen](./wartung.md) für den laufenden Testplatz.
- [Installationsbilder im Archiv](/Fachberatung_Fortbildungen/Installation_Fachberatung_Moderation_offline/) als ergänzende ältere Bildfolgen.
- [Schulungsraum einrichten](/Fachberatung_Anleitungen/Test-_und_Schulungsserver/) für mehrere Teilnehmende.
