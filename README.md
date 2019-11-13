# TV Hunt
TV Hunt is a daily top chart for videos. Anyone can simply share a cool video that they found today.
- No sign-ups are required for guest users
- Your voting data is stored on your own [Gaia](https://github.com/blockstack/gaia) storage via [Blockstack](https://blockstack.org/).

Live Product: https://tv.hunt.town

## Deploy Setup
```
rm -rf build
ln -s ../api/public/ build

git push && npm run build-staging && cd ../api && git push && bundle exec cap staging deploy
git push && npm run build && cd ../api && git push && bundle exec cap production deploy
```
