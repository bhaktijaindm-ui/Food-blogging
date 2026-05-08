# FryCuisine static homepage

This project is a plain HTML/CSS/JavaScript website. You do **not** need a build step.

## Fastest way to view

### Windows

If the local server URL is not opening, use the direct launcher first:

```bat
open-home.bat
```

You can double-click `open-home.bat`; it opens `home.html` directly in your browser and does not require Python or a running server.

For a local server preview, double-click `start-site.bat`, or open Command Prompt in this folder and run:

```bat
start-site.bat
```

Keep that Command Prompt window open, then open:

```text
http://127.0.0.1:4173/home.html
```

### macOS / Linux / Git Bash

From this folder, run:

```bash
./start-site.sh
```

Keep that terminal open, then open:

```text
http://127.0.0.1:4173/home.html
```

## Manual server option

If the script is not available, run:

```bash
python3 -m http.server 4173
```

Then open either URL:

```text
http://127.0.0.1:4173/index.html
http://127.0.0.1:4173/home.html
```

## Direct file option

You can also double-click `open-home.bat`, `index.html`, or `home.html`. This is the safest option when `127.0.0.1` shows a connection error.


## If you see “This site can’t be reached”

`ERR_CONNECTION_REFUSED` means the local server is not running, or it was started on a different port. If you only want to view the page on Windows, double-click `open-home.bat` instead. For a server preview, start the server first with `start-site.bat` on Windows or `./start-site.sh` on macOS/Linux, keep the terminal window open, and then reload the page.

If port `4173` is already in use, choose another port:

```bat
start-site.bat 8080
```

Then open:

```text
http://127.0.0.1:8080/home.html
```
