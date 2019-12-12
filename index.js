const fs = require('fs');

const asArray = (value = []) => Array.isArray(value) ? value : [value];

module.exports = function(robots, {express = require('express')} = {}) {
  const app = express.Router();

  if(robots) {
    robots = 'string' === typeof robots
      ? fs.readFileSync(robots, 'utf8')
      : render(robots);
  } else
    robots = '';

  app.get('/robots.txt', function(req, res) {
    res.header('Content-Type', 'text/plain');
    res.send(robots);
  });

  return app;
};

function render(robots) {
  return asArray(robots).map(function(robot) {
    const userAgentArray = [];
    if (Array.isArray(robot.UserAgent)) {
      userAgentArray = robot.UserAgent.map(function(userAgent) {
        return 'User-agent: ' + userAgent
      });
    } else {
      userAgentArray.push('User-agent: ' + robot.UserAgent);
    }
    if (robot.CrawlDelay) {
      userAgentArray.push('Crawl-delay: ' + robot.CrawlDelay);
    }
    return userAgentArray.concat(asArray(robot.Disallow).map(function(disallow) {
      if (Array.isArray(disallow)) {
        return disallow.map(function(line) {
          return 'Disallow: ' + line;
        }).join('\n');
      }
      return 'Disallow: ' + disallow;
    })).join('\n');
  }).join('\n');
}
