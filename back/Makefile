
build:
	sudo docker-compose build

stop:
	docker-compose stop

down:
	docker-compose down

up:
	docker-compose up -d
	docker-compose exec fias-python cp logs/openstreetmap.py ../../../usr/local/lib/python3.6/site-packages/social_core/backends/

migrate: up
	docker-compose exec fias-python python manage.py migrate

makemigrations: up
	docker-compose exec fias-python python manage.py makemigrations

run: migrate
	docker-compose logs -f

test: up
	docker-compose exec fias-python python manage.py test

clearsessions: up
	docker-compose exec fias-python python manage.py clearsessions

restart: 
	make down
	make up
