/**
 * Living Lens - Hazard Probability Calculator
 * Computes an estimated hazard risk percentage based on observation parameters.
 */

export function calculateHazardProbability({
  abnormalityPercentage = 70,
  intensity = 10,
  animalsAffected = 1,
  totalAnimals = 1,
  durationMinutes = 30
}) {
  const normAbnormality = Math.min(Math.max(Number(abnormalityPercentage) || 0, 0), 100);
  
  // Extract number if intensity is string like "10 - Very high"
  let numIntensity = typeof intensity === 'number' ? intensity : parseInt(intensity, 10) || 5;
  numIntensity = Math.min(Math.max(numIntensity, 1), 10);

  const ratioAffected = totalAnimals > 0 ? Math.min(animalsAffected / totalAnimals, 1) : 0.5;

  const durationFactor = Math.min(Math.max(durationMinutes / 60, 0.2), 1.5);

  // Weighted calculation
  let score = (normAbnormality * 0.45) + (numIntensity * 3.5) + (ratioAffected * 15) + (durationFactor * 5);

  // Keep within realistic early warning bounds (between 15% and 98%)
  score = Math.min(Math.max(score, 15.0), 97.85);

  return parseFloat(score.toFixed(2));
}
