// Function to calculate step goal
export const calculateStepGoal = (age, gender, height, weight, activityLevel) => {
  const basalMetabolicRate = 10 * weight + 6.25 * height - 5 * age + (gender === 'male' ? 5 : -161);
  const totalDailyEnergyExpenditure = basalMetabolicRate * getActivityFactor(activityLevel);
  const caloriesPerStep = 0.04; // Assume an average of 20 steps per calorie
  const stepGoal = Math.round(totalDailyEnergyExpenditure / caloriesPerStep);

  return Math.floor(stepGoal / 6);
};

// Function to get activity factor based on activity level
const getActivityFactor = (activityLevel) => {
  switch (activityLevel) {
    case 'sedentary':
      return 1.2;
    case 'lightly active':
      return 1.375;
    case 'moderately active':
      return 1.55;
    case 'very active':
      return 1.725;
    case 'extra active':
      return 1.9;
    default:
      return 1.2; // Default to sedentary
  }
};