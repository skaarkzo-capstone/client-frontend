export function getScoreDescription(score: number) {
  if (score <= 4) {
    return {
      title: `Poor Sustainability Practices`,
      description: `A score of ${score} reflects minimal sustainability efforts, significant negative impacts, and little adherence to sustainable practices.`,
    };
  } else if (score <= 7) {
    return {
      title: `Moderate Sustainability Efforts`,
      description: `A score of ${score} shows some progress in sustainability, but efforts are inconsistent and need improvement.`,
    };
  } else {
    return {
      title: `Exemplary Sustainability Leadership`,
      description: `A score of ${score} highlights strong sustainability practices, leadership, and alignment with global standards.`,
    };
  }
}
