prebuild:
	yarn

build:
	node_modules/.bin/webpack --config webpack.prod.config.js --progress -p

deploy:
	firebase deploy --token "$(TOKEN)"
