./node_modules/.bin/babel ./js/main.js --presets babili --out-file ./public/js/main.js
./node_modules/.bin/babel ./js/components --presets babili --out-file ./public/js/components.js
node-sass --output-style compressed ./scss/main.scss -o ./public/css/
