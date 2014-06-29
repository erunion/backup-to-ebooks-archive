#!/usr/bin/env node

var fs = require('fs');
var path = require('path');
var parse = require('csv-parse');

var argv = require('minimist')(process.argv.slice(2));
var EOL = require('os').EOL;
var help = 'Usage: backup-to-ebooks <backup.csv> <export.json>';

if (typeof argv._[0] === 'undefined' || typeof argv._[01] === 'undefined') {
  return process.stderr.write(help + EOL);
}

var importFile = argv._[0];
var outputFile = argv._[1];

fs.readFile(importFile, 'utf8', function (err, data) {
  if (err) {
    return process.stderr.write(err + EOL);
  }

  var options = {
    delimiter: ',',
    quote: '"',
    escape: '"',
    columns: function (output) {
      return output;
    }
  }

  parse(data, options, function(err, output) {
    var tweets = [];
    var tweet = {};
    output.forEach(function (record) {
      tweet = {
        created_at: record.timestamp,
        id: parseInt(record.tweet_id),
        id_str: record.tweet_id,
        text: record.text,
        source: record.source,

        // There are truncated tweets in the archive, but Twitter doesn't tell
        // you if they're truncated. ಠ_ಠ
        truncated: false,

        in_reply_to_status_id: null,
        in_reply_to_status_id_str: null,
        in_reply_to_user_id: null,
        in_reply_to_user_id_str: null,
        in_reply_to_screen_name: null,
        user: {
          id: null,
          id_str: null
        },

        // No datapoint for these in the archive.
        geo: null,
        coordinates: null,
        place: null,
        contributors: null,
        retweet_count: 0,
        favorite_count: 0,
        favorited: false,
        retweeted: false,
        lang: 'en'
      };

      if (record.in_reply_to_status_id !== '') {
        tweet.in_reply_to_status_id = parseInt(record.in_reply_to_status_id);
        tweet.in_reply_to_status_id_str = record.in_reply_to_status_id;
      }

      if (record.in_reply_to_user_id !== '') {
        tweet.in_reply_to_user_id = parseInt(record.in_reply_to_user_id);
        tweet.in_reply_to_user_id_str = record.in_reply_to_user_id;

        tweet.user.id = parseInt(record.in_reply_to_user_id);
        tweet.user.id_str = record.in_reply_to_user_id;
      }

      tweets.push(tweet);
    });

    fs.writeFile(outputFile, JSON.stringify(tweets), {flag: 'w+'}, function (err) {
      if (err) {
        return process.stderr.write(err + EOL);
      }

      return process.stderr.write('Success!' + EOL);
    });
  });
});
