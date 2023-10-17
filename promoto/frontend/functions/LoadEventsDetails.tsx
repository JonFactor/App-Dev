const LoadEventsDetails = async () => {
  return await fetch("http://localhost:8000/api/events", {});
};

export default LoadEventsDetails;
