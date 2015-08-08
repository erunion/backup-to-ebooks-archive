# backup-to-ebooks-archive
[![NPM](http://img.shields.io/npm/v/backup-to-ebooks-archive.svg?style=flat)](https://www.npmjs.org/package/backup-to-ebooks-archive)

**NO LONGER MAINTAINED**

The twitter_ebooks binary now supports functionality similar to this. Use that instead.

---

Convert your [Twitter backup](https://blog.twitter.com/2012/your-twitter-archive) into a [twitter_ebooks](https://github.com/mispy/twitter_ebooks) archive.

## Installation
```
npm install -g backup-to-ebooks-archive
```

## Usage
```
backup-to-ebooks-archive <backup.csv> <export.json>
```

Example:

```
backup-to-ebooks-archive tweets.csv username.json
```

Then from there you can import your full Twitter archive into your ebooks bot.

```
$ ebooks consume username.json
Faraday::Builder is now Faraday::RackBuilder.
Reading json corpus from username.json
Removing commented lines and sorting mentions
Segmenting text into sentences
Tokenizing 14600 statements and 12992 mentions
Ranking keywords
Corpus consumed to model/username.model
```

## Why?

When running the `archive` ability of [twitter_ebooks](https://github.com/mispy/twitter_ebooks), it only imported a paltry 3,000 of my 18,000 tweets, and I didn't want to mess with API limits to grab what I can already get via Twitter's export feature.
