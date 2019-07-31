
build:
	(cd back && make build)
	(cd frontend && make build)

install: build
	(cd back && make migrate)
	(cd frontend && make up)

down:
	(cd back && make down)
	(cd frontend && make down)

up:
	(cd back && make up)
	(cd frontend && make up)
restart:
	make down
	make up
