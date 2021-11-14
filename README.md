# Reango

Template React front-end & Dango back-end app.

<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#back-end-installation">Back-end Installation</a></li>
        <li><a href="#front-end-installation">Front-end Installation</a></li>
      </ul>
    </li>
    <li>
      <a href="#default-setup">Default Setup</a>
      <ul>
        <li><a href="#formatting">Formatting</a></li>
        <li><a href="#preprocessing--transpiling">Preprocessing & Transpiling</a></li>
        <li><a href="#miscellaneous">Miscellaneous</a></li>
      </ul>
    </li>
  </ol>
</details>

## Getting Started

### Back-end Installation

1. Clone the repo:
   ```sh
   git clone git@github.com:njs91/reango.git
   ```
2. Create Virtual Environment (in root):
   ```sh
   python3 -m venv venv
   ```
3. Activate Virtual Environment:
   ```sh
   source venv/bin/activate
   ```
4. Install Dependencies:
   ```sh
   pip install -r requirements.txt
   ```
5. Run Project:
   ```sh
   python3 manage.py runserver
   ```
6. Make Migrations - may need to run the following:
   ```sh
   ./manage.py makemigrations
   ```
   ```sh
   ./manage.py migrate
   ```

### Front-end Installation

1. CD to front-end and install dependencies:
   ```sh
   npm install
   ```
2. Then run with:
   ```sh
   npm start
   ```

## Default Setup

### Formatting

1. Front-end formatter uses prettier
2. Python formatter uses black
3. If using VSCode, formatting is configured in .vscode/settings.json

### Preprocessing & Transpiling

1. TypeScript is transpiled into JavaScript for files with .tsx extensions (rather than .js)
2. Front-end uses SASS preprocessor with CSS modules (transpiles name.module.scss (& .sass) files to .css files)

### Miscellaneous

1. Added proxy to package.json so can fetch from /api/pages rather than http://127.0.0.1:8000/api/pages
   ```
   "proxy": "http://127.0.0.1:8000"
   ```
2. Need to run `npm run build` to generate production react files
3. To update back-end requirements.txt, run `pip3 freeze > requirements.txt`
4. To update back-end dependencies, consider using `pip-upgrader`: https://github.com/simion/pip-upgrader
5. Includes font awesome, default components, styles & variables: see /styles page
