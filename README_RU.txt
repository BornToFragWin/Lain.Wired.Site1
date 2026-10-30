THE WIRED — Serial Experiments Lain fan archive
===============================================

Included:
- index.html: page structure
- style.css: responsive dark / CRT visual style
- app.js: gallery, search, filters and clickable detail modal
- images/: put your image files here

RUN IN TERMUX
-------------
1. Install Python if needed:
   pkg update
   pkg install python

2. Extract the ZIP, then enter the project folder:
   unzip Lain_Wired_Site.zip
   cd Lain_Wired_Site

3. Start the server:
   python -m http.server 8080 --bind 127.0.0.1

4. Open this address in your phone browser:
   http://127.0.0.1:8080

Stop the server with Ctrl+C in Termux.

ADDING IMAGES
-------------
Put your own image files in the images folder using these exact names:
  lain.jpg
  alice.jpg
  wired.jpg
  knights.jpg
  protocol.jpg
  present-day.jpg

If your files are PNG, either convert them to JPG or edit the matching filename
in app.js. Image filenames are case-sensitive on Linux.

EDITING CHARACTER INFO
----------------------
Open app.js in a text editor, for example:
  nano app.js

Each entry has title, subtitle, status, short and description fields.
Change those values to customise the cards and the detail window.

NOTES
-----
This is a static website, so Flask is not required. The Google Fonts import
uses internet access; system fallback fonts work offline too. Use artwork you
have permission to use, and avoid reposting full copyrighted episodes.
