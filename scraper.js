const axios = require('axios');
const cheerio = require('cheerio');

// URL of the page we want to scrape
const url = 'https://www.giuzio.me/books';

// Function to fetch the HTML of the page
async function fetchHTML(url) {
  try {
    const { data } = await axios.get(url);
    return data;
  } catch (error) {
    console.error(`Error fetching the URL: ${error}`);
    return null;
  }
}

// Function to scrape the data
async function scrapeData() {
  const html = await fetchHTML(url);

  if (html) {
    const $ = cheerio.load(html);

    // Example: Extracting the title of the page
    const title = $('title').text();
    console.log(`Title: ${title}`);

    // Example: Extracting all links
    const links = [];
    $('a').each((index, element) => {
      links.push($(element).attr('href'));
    });
    console.log(`Links: ${links.join(', ')}`);
  }
}

// Run the scraper
scrapeData();
