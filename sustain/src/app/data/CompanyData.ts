export type Company = {
  name: string;
  date: string;
  score: number;
};

const companies: Company[] = [
  { name: "Google Inc.", date: "March 13, 2024", score: 97 },
  { name: "Meta", date: "March 13, 2024", score: 63 },
  { name: "Microsoft", date: "March 13, 2024", score: 26 },
];

export default companies;
