# LOL Hunt
LOL Hunt is a daily top chart of funny Youtube clips.
Anyone can simply share and upvote videos, and user data is stored privately via Blockstack blockchain system
- No sign-ups are required for guest users
- Your data is stored privately on your own [Gaia storage](https://github.com/blockstack/gaia) via [Blockstack](https://blockstack.org/).

Live Product: https://lol.hunt.town

## Deploy Setup
```
rm -rf build
ln -s ../api/public/ build

# Staging
git push && npm run build-staging && cd ../api && git push && bundle exec cap staging deploy

# Production
git push && npm run build && cd ../api && git push && bundle exec cap production deploy
```
