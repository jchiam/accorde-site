STAGING=staging
PRODUCTION=default

prebuild:
	yarn

build:
	node_modules/.bin/webpack --config webpack.prod.config.js --progress -p

deploy-staging:
	firebase use $(STAGING)
	firebase deploy --token "$(TOKEN)"

deploy-production:
	firebase use $(PRODUCTION)
	firebase deploy --token "$(TOKEN)"
