.PHONY: copy_env
copy_env:
	@cp -n .env.template .env.development
	@cp -n .env.template .env.test

.PHONY: build
build:
	docker-compose run --rm node run build

.PHONY: terminal
terminal:
	@docker-compose run --rm --entrypoint /bin/ash node

.PHONY: console
console:
	@docker-compose run --rm --entrypoint /bin/ash node -c "npx ts-node"

.PHONY: test
test:
	@docker-compose run --rm node run test

.PHONY: lint
lint:
	@docker-compose run --rm node run lint

.PHONY: format
format:
	@docker-compose run --rm node run format

.PHONY: package
package:
	@docker-compose run --rm node run package

.PHONY: clean
clean:
	@docker-compose down
	@docker image prune -f
	@docker images -a | grep "pr-update" | awk '{print $3}' | xargs docker rmi