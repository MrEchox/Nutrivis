// Function to calculate step goal
export const calculateStepGoal = (age, gender, height, weight, activityLevel) => {
  const basalMetabolicRate = 10 * weight + 6.25 * height - 5 * age + (gender === 'male' ? 5 : -161);
  const totalDailyEnergyExpenditure = basalMetabolicRate * getActivityFactor(activityLevel);
  const caloriesPerStep = 0.04; // Assume an average of 20 steps per calorie
  const stepGoal = Math.round(totalDailyEnergyExpenditure / caloriesPerStep);

  return Math.floor(stepGoal / 6);
};


export const calculateRecommendedCalories = (age, gender, height, weight, activityLevel, weightObjective) => {
  const basalMetabolicRate = 10 * weight + 6.25 * height - 5 * age + (gender === 'male' ? 5 : -161); // If male +5 to BMR, else -161 to BMR 
  const totalDailyEnergyExpenditure = basalMetabolicRate * getActivityFactor(activityLevel); // Energy expenditure = BMR * (nuo 1.2 iki 1.9)
  const calorieGoal = Math.round(totalDailyEnergyExpenditure * getObjectiveFactor(weightObjective)); // Calories needed to reach the objective

  return calorieGoal;
}

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

// Weight loss or gain
const getObjectiveFactor = (weightObjective) => {
  switch (weightObjective) {
    case 'extreme loss':
      return 0.5;
    case 'loss':
      return 0.8;
    case 'maintain':
      return 1;
    case 'gain':
      return 1.2;
    case 'extreme gain':
      return 1.5;
    default:
      return 1; // Default to maintain weight
  }
};