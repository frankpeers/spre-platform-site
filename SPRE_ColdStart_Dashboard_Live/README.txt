Deploy Guide (GitHub → Netlify)
--------------------------------
1) Unzip these files.
2) In your repo `spre-platform-site`, click **Add file → Upload files** and drag in:
   - /assets/coldstart-widget.css
   - /assets/coldstart-widget.js
   - /data/coldstart/latest.json
   - /dashboard.html  (ready-made page with live Cold‑Start card)
3) Commit to `main`. Netlify will auto-deploy.
4) Visit: https://<your-domain>/dashboard.html

Update after each drill:
- Overwrite /data/coldstart/latest.json with new results.