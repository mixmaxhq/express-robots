# express-robots

Express middleware for generating a robots.txt or responding with an existing file.

## Using a file

```javascript
app.use(robots(__dirname + '/robots.txt'));
```

## Using an object

### Basic object

```javascript
app.use(robots({ UserAgent: '*', Disallow: '/' }))
```

#### Will produce:
```
User-agent: *
Disallow: /
```

### Crawl Delay
You can optionally pass a CrawlDelay in just like passing in Disallow

```javascript
app.use(robots({ UserAgent: '*', Disallow: '/', CrawlDelay: '5' }))
```

#### Will produce:
```
User-agent: *
Disallow: /
Crawl-delay: 5
```

### Or an array of objects

```javascript
app.use(robots([
  {
    UserAgent: 'Googlebot',
    Disallow: '/no-google'
  },
  {
    UserAgent: 'Bingbot',
    Disallow: '/no-bing'
  }
]));
```

#### Will produce:
```
User-agent: Googlebot
Disallow: /no-google
User-agent: Bingbot
Disallow: /no-bing
```

### Or either property (UserAgent | Disallow) as an array

```javascript
app.use(robots([
  {
    UserAgent: [ 'Googlebot', 'Slurp' ],
    Disallow: [ '/no-google', '/no-yahoo' ]
  },
  {
    UserAgent: '*',
    Disallow: [ '/no-bots', '/still-no-bots' ]
  }
]));
```

#### Will produce:
```
User-agent: Googlebot
User-agent: Slurp
Disallow: /no-google
Disallow: /no-yahoo
User-agent: *
Disallow: /no-bots
Disallow: /still-no-bots
```
