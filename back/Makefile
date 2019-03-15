
build:
	sudo docker-compose build

stop:
	docker-compose stop

down:
	docker-compose down

up:
	docker-compose up -d

migrate: up
	docker-compose exec fias-python python manage.py migrate

makemigrations: up
	docker-compose exec fias-python python manage.py makemigrations

run: migrate
	docker-compose logs -f
