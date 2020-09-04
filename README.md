# Run-for-the-Bachelor
## Inhaltsverzeichnis
1. [Allgemeine Information](#allgemeine-information)
2. [Technologien](#technologien)
3. [Known Bugs](#known-bugs)
4. [Browserkompatibilität](#browserkompatibilität)
5. [Lizenzen](#lizenzen)
6. [Teilleistungen](#teilleistungen)
7. [Systemvoraussetzungen](#systemvoraussetzungen)
8. [FAQs](#faqs)


### Allgemeine Information
***
Das Spiel **RUN FOR THE BACHELOR (RFTB)** wurde von folgenden Autoren entwickelt:
* Aksoy, Erdem
* Boehlke, Dustin
* Bosbach, André
* Härtel, Philip
* Kaluza, Alexander

Spielgeschichte:
Der Student/in befindet sich am Anfang seines Bachelor-Marathons. Er/Sie muss viele Hindernisse überwinden und Gegenstände sammeln, um sein/ihr Endziel, das Bachelor Zertifikat zu erreichen. In jedem Level wartet ein/e Dozent/in darauf, bedingt der Leistung des Studenten eine Note zu vergeben. Zudem bekommt der Student ein kleines Feedback. Bist du bereit, für den größten Marathon deines Lebens zu laufen? ;)

Levelziel:
Es gibt insgesamt 3 Level und in jedem einzelnen sind maximal 60 CP zu erreichen. Diese setzen sich wie folgt zusammen:
* 5 x 3 CP durch Einsammeln von Münzen
* 45 CP durch Überwindung von allen Hindernissen

Levelanleitung:
Der Student hat insgesamt 3 Leben in einem Level. Wenn er alle 3 Leben verliert, wird das Level von neu gestartet.
Am Anfang jedes Levels werden auf dem Whiteboard die Gegenstände angezeigt, die für eine bessere Note eingesammelt werden sollten.


## Technologien
***
Eine Liste von Technologien die innerhalb dieses Projektes verwendet wurden:
Musik:
* [Chrome Music Lab - Song Maker](https://musiclab.chromeexperiments.com/Song-Maker): Version 12.3 
* [Audacity](https://www.audacity.de/): Version 2.4.2

Design/Animation:
* [GIMP](https://www.gimp.org/): Version 2.10.20

Adobe Creative Cloud:
* [Illustrator](https://www.adobe.com/de/products/illustrator.html)
* [After Effects](https://www.adobe.com/de/products/aftereffects.html)
* [Photoshop](https://www.adobe.com/de/products/photoshop.html)
* [Premiere Pro](https://www.adobe.com/de/products/photoshop-premiere-elements.html)

Coding:
* [Visual Studio Code](https://code.visualstudio.com/)

Fonts:
* [Google Fonts Bangers](https://fonts.google.com/specimen/Bangers?query=bangers)


## Known Bugs
***
* Backgroundmusik startet nicht automatisch (wird von Browser blockiert)
* Objekte verschieben sich beim Laufen gegen das linke Ende (multibles Klicken der linken Pfeiltaste)
* Sammelobjekte/Münzen können nur durch ausführen Sprung + links/rechts eingesammelt werden


## Browserkompatibilität
***
* Google Chrome 
* Firefox
* Opera
* Microsoft Edge
* Internet Explorer (nicht funktionsfähig)


## Lizenzen
***
* [Creative Commons](https://creativecommons.org/licenses/by-nd/4.0/)
* Menümusik inspiriert von [Miitheme-Nintendo](https://www.nintendo.com/)


## Teilleistungen
***
André

Programmatisch:
* Charakter-/Hintergrundbewegung
* Charakteranimation
* Sprungfunktion
* Start/Ende
* GameState Status verwendet -> Pause, Game Over, Ziel
* Runterfallen bei "hole"-Hindernissen
* Collectables/Creditpoints (Klasse Items)
	- Implementation
	- Animation
* Loading Screen implementiert
* CP-Counter einsammeln von Münzen
* Zusammmenfassen von Intervallen (Performance)
* Implementieren von Checkpoints
* Dozentenanimationen

***

Philip

Programmatisch:
* Implementieren von Hindernissen
* Ermittlung von Kollisionen
* verschiedene GameState Status implementiert
* Creditpoint Counter durch laufen
* Hintergrundmusik implementiert
* Plattformfunktionalität
	- Bewegung
	- Begehbarkeit
* Funktionalität Ingame Buttons
	- Continue
	- Restart
	- Exit
	- Mute / Unmute
* Lebensfunktion
* Charaktergrößenanpassung

***

Erdem

Programmatisch:

Visuelle Implementierung:
* Creditpointcounter
* Lebensanzeige
* Ingame Pausenmenübutton
* Mute / Unmute
* Menüfenster
* Innermenu Buttons
  - Menüfenster
  - Gameoverfenster
  - Finishfenster
* Schriftart: Google Font - Bangers 

Funktionelle Implementierung:
* Pausenmenübutton (Open + Close)
* Continuebutton
* Menüfenster

Schriftliches:
* Pitchslide
* README
* Projektstrukturplan

***

Dustin

Programmatisch:

* Menüfunktionalität
	- Buttons
		- nächste HTML
		- Mute / Unmute
		- Lizensierung 
	- Popup Fenster
	- Charakterauswahl (Sessionstorage)
 	- Size-Alert
	- Namenseingabe
	- Zusammenfassung von mehreren auf eine HTML
		- Start
		- Charakterauswahl
		- Namenseingabe
* Ausrichtung Level 1 & 2
* Mouseover für Buttons
* Sound hinzugefügt

Design:

* Sounddesign
* Sammelobjekte
	- Collectables
	- Coins
* 1 & 3 Level
	- Hintergrund
	- Hindernisse
		- box / hole
	- Plattformen
* Ingame Icons
* Charaktergifs
* Loading Screen Gif

***

Alex

Programmatisch:

* Menüfunktionalität
	- Buttons
		- nächste HTML
		- Mute / Unmute
		- Lizensierung 
	- Popup Fenster
	- Charakterauswahl (Sessionstorage)
 	- Size-Alert
	- Namenseingabe
	- Zusammenfassung von mehreren auf eine HTML
		- Start
		- Charakterauswahl
		- Namenseingabe
* Ausrichtung Level 2 & 3
* Implementation Images
	- Charaktere / Dozenten
	- Level
	- Objekte

Design:
* Sounddesign
* 2 Level
	- Hintergrund
	- Hindernisse
		- box / hole
	- Plattformen
* Charaktere ( Entworfen/Animationen)
	- Player
		- Gehen
		- Springen
		- Stehen
	- Dozenten
		- Gehen
		- Stehen
* Objekte animiert 
* Sprechblasen
* Steuerungssheet
* Menübuttons
* Bachelor Zertifikat
* Menüschriftzüge
* Game-Logo


## Systemvoraussetzungen
***
* ein geeigneter Webbrowser: Google Chrome, Firefox, Microsoft Edge, Opera
* Browser Fenstergröße: min. 1250 x 800


## FAQs
***
Eine Liste von häufig gestellten Fragen
1. **Welcher Webbrowser ist am geeignetsten?**
Wir empfehlen Google Chrome oder Microsoft Edge.
2. __Wurden Design-Templates verwendet?__ 
Nein, alle Elemente im Spiel wurden von uns zu 100% selber designed.
3. **Wurde die Spielmusik selbst komponiert?**
Alles bis auf die Menümusik wurde selbst komponiert. Bei der Erstellung der Menümusik haben wir uns von Miitheme-Nintendo inspirieren lassen.
