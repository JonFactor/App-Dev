const LoadEventsDetails = async () => {
  return await fetch(`${process.env.EXPO_PUBLIC_BACKEND_URL}/api/events`, {});
};

export default LoadEventsDetails;
