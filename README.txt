SPRE Platform — Clean Flat Deploy
Built: 2025-08-09

Deploy steps (Git or Drag-and-drop):
1) Ensure these files live at the ROOT of your publish dir:
   - index.html, library.html, tech.html, assistant.html, nodes.html, admin.html, spre-dashboard.html
   - netlify.toml, _redirects
   - netlify/functions/chat.js
   - package.json (if using Git/CI so Netlify installs dependencies for functions)

2) In Netlify Site settings → Environment variables, add:
   OPENAI_API_KEY = <your key>

3) Deploy. In the Deploy summary you should see:
   - Redirect rules processed
   - 1 Functions deployed (chat)

4) Test assistant at /assistant.html. It calls /api/chat which maps to the function.

Notes:
- Library and book content are referenced (e.g., /Book_01_Backup.zip). Replace or add more as needed.
- This build avoids duplicate netlify.toml and index.html files in subfolders to prevent homepage loss.
