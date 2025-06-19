
  function openInGoogleMaps(locationName) {
    const query = encodeURIComponent(locationName + ", India");
    const url = `https://www.google.com/maps/search/?api=1&query=${query}`;
    window.open(url, '_blank');
  }

