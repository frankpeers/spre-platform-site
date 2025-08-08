SAFE Deploy (no conflicts)
--------------------------
Upload these to your repo root:
- /spre-dashboard.html
- /spre-cs-assets/spre-coldstart.css
- /spre-cs-assets/spre-coldstart.js
- /spre-cs-data/coldstart/latest.json

Then visit: https://<your-domain>/spre-dashboard.html

Why this is safe:
- Unique paths (/spre-cs-assets, /spre-cs-data) so nothing overwrites your existing /assets or /data.
- CSS classes are namespaced (.spre-*) to avoid clashing with your site styles.

Updating after each drill:
- Overwrite /spre-cs-data/coldstart/latest.json with new results.