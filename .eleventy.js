const HRNumbers = require("human-readable-numbers");

module.exports = function(eleventyConfig) {
  eleventyConfig.addFilter("human_readable_numbers", number =>
    HRNumbers.toHumanString(number)
  );
  eleventyConfig.addFilter("locale_date", date =>
    new Date(date).toLocaleDateString()
  );
  eleventyConfig.addFilter("locale_number", number =>
    parseFloat(number).toLocaleString()
  );

  return {
    dir: {
      input: "src",
      output: "www"
    }
  };
};
