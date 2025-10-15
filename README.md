```bash
git clone https://github.com/<your-username>/Qentry.git
cd Qentry
```

```bash
docker compose build
docker compose up
```


## (optional) Load example data
```bash
docker compose exec backend python manage.py loaddata accounts.json
docker compose exec backend python manage.py loaddata events.json
docker compose exec backend python manage.py loaddata tokens.json

```