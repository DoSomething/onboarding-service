mkdir public
mkdir public/js
npm run build
{
  # npm run build watches for changes, so this kills it after the assets has def. finished building
  sleep 5s
  echo 'Done!'
  kill $$
} &
npm run build_dev
