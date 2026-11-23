# Schulungsraum einrichten {#schulungsumgebungen}

Für einen regelmäßig genutzten Raum empfehlen wir einen zentral betreuten Server mit getrenntem Schema und Zugang je Arbeitsplatz. Eine vorhandene zuverlässig betreute Installation kann weiterverwendet werden.

## Empfohlener Aufbau

1. Eine Debian-Server-VM auf der vorhandenen Infrastruktur bereitstellen.
2. [SVWS-Server und MariaDB mit Docker Compose](./Docker_Schulungsserver/index.md) installieren und die Versionen dokumentieren. Alternativ den bereits betreuten offiziellen Linux-Installer verwenden.
3. Die [Schulungsdatenbank](/Datenbanken/schulungen/) je Arbeitsplatz in ein eigenes Schema importieren.
4. Am Teilnehmerplatz den Browser und gegebenenfalls SchILD-NRW 3 mit der passenden Verbindung einrichten.
5. Eine vollständige Aufgabe und das [Rücksetzen](./Moderatoren_Schulungsserver/Wartung.md) testen. Bei zentralem Betrieb die vorgesehenen gleichzeitigen Zugriffe erproben.

**Verbindungen** – Browser benötigen HTTPS. Für SchILD-NRW 3 kommt direkter MariaDB-Zugriff hinzu. Adressen, Ports, Zertifikate und Benutzerrechte mit der Administration abstimmen.

## Zuständigkeit und Übergabe

| Zuständig | Aufgabe |
| --- | --- |
| Stützpunktleitung | Server, Netz, Zugänge und Sicherungen bereitstellen |
| Moderation | Modul, Datenstand und Platz-/Schema-Zuordnung festlegen |
| Gemeinsam | Anmeldung, Schulungsaufgabe und Wiederherstellung am Teilnehmerplatz prüfen |

Zur Übergabe gehören Serveradresse, Programmversionen, Platzzuordnung, technische Ansprechperson und Rücksetzweg. Zugangsdaten getrennt übergeben.

## Andere Ausstattungen

| Ausstattung | Anleitung |
| --- | --- |
| Mitgebrachte Windows-Laptops ohne stabiles gemeinsames Netz | [Lokale Server-VMs](./VirtuaBox_SchulungsClient/index.md) und [VirtualBox](./VirtuaBox_SchulungsClient/Virtualbox_Installation/index.md) |
| Bereits betreuter Windows-Server oder einzelner Testrechner | [Windows-Testserver](./Windows_Testserver/index.md) |
| Vorhandener Proxmox-Host | [Proxmox-Schulungsserver](./Proxmox_Schulungsserver/index.md) und [Hostinstallation](./Proxmox_Schulungsserver/Proxmox_Installation/index.md) |
| Mac- oder Linux-Arbeitsplätze | Browser am zentralen Server; für SchILD-NRW 3 einen Windows-Arbeitsplatz bereitstellen |
| Zusätzliche Anwendungen benötigt | [SVWS-Tools ergänzen](./SVWS-Tools/index.md) |

Für einen einzelnen Beratungsarbeitsplatz nutze [Testplatz einrichten](/umgebungen/einrichten).
