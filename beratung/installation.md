# Installation und Verbindungen

| Aufgabe | Anleitung |
| --- | --- |
| Windows-Server installieren | [Windows-Installer](https://doku.svws-nrw.de/deployment/Windows-Installer/) |
| Linux oder Docker einrichten | [Installationsverfahren](https://doku.svws-nrw.de/deployment/) |
| SchILD-NRW 3 anbinden | [SchILD-Anbindung und Verbindungsdatei](https://doku.svws-nrw.de/deployment/Schild-NRW3/) |
| SchILD2-Daten übernehmen | [AdminClient – Migration](https://doku.svws-nrw.de/adminclient/anleitungen/kurzanleitung_migration.html) |

## Verbindung eingrenzen

| Beobachtung | Prüfen |
| --- | --- |
| Serverinstallation bricht ab | Installerprotokoll, vorhandene Dienste, Rechte und Systemvoraussetzungen |
| Browser erreicht den Server nicht | Serverdienst, HTTPS-Adresse, Port und Zertifikat |
| Browser funktioniert, SchILD-NRW 3 scheitert | Programmversionen, ausgewählte Verbindungsdatei, MariaDB-Adresse, Port und Benutzerrechte |
| Anmeldung gelingt, Datenbestand weicht ab | Ausgewähltes Schema, Schulform und Schuljahresabschnitt |
| Fehler tritt nach Datenübernahme auf | [Migrationsdiagnose](./migration.md) |

Die [Systemübersicht](./systemueberblick.md) erläutert die beteiligten Komponenten. Bei einer Schulinstallation stimmen Fachberatung und zuständige Administration die Änderungen ab. IT-Dienstleister wenden sich an die Landesfachberatung.

Für den eigenen Aufbau nutze [Testplatz einrichten](/umgebungen/einrichten), für mehrere Teilnehmende [Raum einrichten](/Fachberatung_Anleitungen/Test-_und_Schulungsserver/).
