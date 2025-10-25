export const getNearbyBins = async (req, res) => {
  // Fake bins for now
  const bins = [
    { id: 1, location: "Street 1", status: "Available" },
    { id: 2, location: "Street 5", status: "Full" },
    { id: 3, location: "Street 10", status: "Available" },
  ];
  res.json(bins);
};
