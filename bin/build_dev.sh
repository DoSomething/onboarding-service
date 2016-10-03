node-sass --output-style compressed ./scss/main.scss --watch ./scss -o ./public/css/
./node_modules/.bin/babel ./js/main.js --watch --source-maps --out-file ./public/js/main.js
./node_modules/.bin/babel ./js/components --watch --source-maps --out-file ./public/js/components.js
