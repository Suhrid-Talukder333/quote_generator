const quoteContainer = document.getElementById("quote-generator");
const twitterButton = document.getElementById("twitter");
const newQuoteButton = document.getElementById("new-quote");
const quote = document.getElementById("quote");
const author = document.getElementById("author");
const loader = document.getElementById("loader");

const getQuote = async () => {
  showLoading();
  try {
    const data = await fetch("https://type.fit/api/quotes");
    const jsonData = await data.json();
    let a = Math.floor(Math.random() * 1000);
    if (jsonData[a].text.length > 50) {
      quote.classList.add("long-quote");
    } else {
      quote.classList.remove("long-quote");
    }
    hideLoading();
    quote.textContent = jsonData[a].text;
    if (jsonData[a].author == "") {
      author.textContent = "Unknown";
    } else {
      author.textContent = jsonData[a].author;
    }
  } catch {
    alert("Error occured");
  }
};

//tweet
const tweet = () => {
  const tweetUrl = `https://twitter.com/intent/tweet?text=${quote.textContent} - ${author.textContent}`;
  window.open(tweetUrl, "_blank");
};

//show loading
const showLoading = () => {
  loader.hidden = false;
  quoteContainer.hidden = true;
};

//hide loading
const hideLoading = () => {
  loader.hidden = true;
  quoteContainer.hidden = false;
};

//event listeners
newQuoteButton.addEventListener("click", getQuote);
twitterButton.addEventListener("click", tweet);

//on load
getQuote();
