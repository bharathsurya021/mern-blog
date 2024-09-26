
const calculateReadTime = (text) => {
  const words = text.split(/\s+/).filter(Boolean).length;
  const wordsPerMinute = 200;
  const readTimeInMinutes = Math.ceil(words / wordsPerMinute);
  return `${readTimeInMinutes} min read`;
};

export default calculateReadTime;
