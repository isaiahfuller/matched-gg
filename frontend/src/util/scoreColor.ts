export default function scoreColor(reviewScore: number): string {
  switch (true) {
    case reviewScore === 0:
      return "gray"
    case reviewScore <= 35:
      return "red.9";
    case reviewScore <= 50:
      return "orange.5";
    case reviewScore <= 70:
      return "yellow";
    case reviewScore <= 80:
      return "green";
    case reviewScore <= 100:
      return "green.9";
    default:
      return "gray";
  }
}