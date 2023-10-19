const eligibilityCalc = (lastDonation, sex) => {
  const today = new Date();
  const lastDonationDate = new Date(lastDonation);
  const daysBetweenDonations = sex === "m" ? 56 : 84;
  const eligibleDate = new Date(
    lastDonationDate.getTime() + daysBetweenDonations * 24 * 60 * 60 * 1000
  );
  if (today < eligibleDate) {
    const daysLeft = Math.ceil((eligibleDate - today) / (24 * 60 * 60 * 1000));
    return `In ${daysLeft} days`;
  } else {
    return "Eligible to donate";
  }
};

export { eligibilityCalc };
