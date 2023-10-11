function shortenString(str) {
    if (str.length <= 40) {
      return str; // Return the original string if it's already shorter than or equal to the desired length
    } else {
      return str.slice(0,  37) + "..."; // Extract the desired portion and add ellipsis
    }
  }

export default shortenString