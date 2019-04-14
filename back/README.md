# Backend of Open-FIAS

### Steps for running backend (in developer mode)
1. Copy this repository to your PC
2. Get file "settings.py" from your administrator and place it in "./src/open_fias"
3. Get file "openstreetmap.py" (only for dev-mode) from your administrator and place it in "./src/logs"
4. Create or get file ".env" and place it in "./" with fields:
 - CENT_ADMIN_PASSWORD
 - CENT_SECRET
 - CENT_ADMIN_SECRET
 - CENT_API_KEY

 - DB_NAME
 - DB_HOST
 - DB_USER
 - DB_PASSWORD
5. Run in console "make build" and then "make migrate", when you first start and "make up" after

### Additional function
1. To start tests run "make test" (doesnt work now)
2. Because now there are not automatic clear sessions, you can delete it with run "make clearsessions"
