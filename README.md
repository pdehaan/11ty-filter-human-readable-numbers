# 11ty-filter-human-readable-numbers

Using [**human-readable-numbers**](http://npm.im/human-readable-numbers) as an Eleventy filter.

The following example shows how you can display numbers in human readable format.

- Meh: 1431378
- Better: 1,431,378
- Betterer: 1.43M

Our data source, is the ten most recent breaches on [Have I Been Pwned](https://haveibeenpwned.com/api/v3/breaches). But instead of displaying hard to read numbers like 1431378, you want them a bit more user friendly.

One solution might be to make a custom filter in your .eleventy.js config file which uses `.toLocaleString()` to display a number with commas (or whatever your system's locale uses):

```js
eleventyConfig.addFilter("localeNumber", number => 
  parseFloat(number).toLocaleString()
);

// Input: 1431378
// Output: 1,431,378
```

Definitely easier to read, but if you want something a bit more user friendly (where exact accuracy isn't a concern), you can use a library like [**human-readable-numbers**](http://npm.im/human-readable-numbers) to convert that number into "1.43M", which is arguably easier to read than either of the previous two versions.

First we'll need to install the **human-readable-numbers** module using <kbd>npm install human-readable-numbers -D</kbd> (to save it as a dev dependency in your package.json file).

Next, we'll make a custom filter which uses this library by adding the following code within our .eleventy.js config file:

```js
const HRNumbers = require("human-readable-numbers");

module.exports = function(eleventyConfig) {
  eleventyConfig.addFilter("human_readable_numbers", number =>
    HRNumbers.toHumanString(number)
  );

  return {
    // ...
  };
};
```

This will add a global filter (available to Nunjucks, Liquid, and your other template languages) named "human_readable_numbers", which we can use like so:

```njk
{# where `hibp` is a src/_data/hibp.js data file which fetches the
   latest breach data automatically for each build. #}
<ol>
  {% for breach in hibp %}
  <li>{{ breach.Title }}
    &mdash; <em>{{ breach.PwnCount | human_readable_numbers }}</em>
    &mdash; {{ breach.PwnCount | locale_number }}</li>
  {%- endfor %}
</ol>
```

Now, building our site gives us the following output (where the first value is the title of the breach, the second value is the human readable number of breached accounts, and the third value is the locale string format version, using an "en-US" locale):

```
1. AnimeGame — 1.43M — 1,431,378
2. Straffic — 48.6M — 48,580,249
3. Slickwraps — 858k — 857,611
4. MGM Resorts — 3.08M — 3,081,321
5. Adult FriendFinder (2016) — 170M — 169,746,810
6. DailyObjects — 464k — 464,260
7. Tout — 653k — 652,683
8. europa.jobs — 226k — 226,095
9. Planet Calypso — 62.3k — 62,261
10. BtoBet — 444k — 444,241
```

**NOTE:** Worth noting is that even though the third value is beautifically localized as "1,431,378" (using the "en-US" locale), the the static pages are generated at build time, so they won't be localized for users according to their browser's locale settings.
