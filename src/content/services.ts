type Service = {
  id: string;
  title: string;
  description: string;
  image?: string;
};

const services: Service[] = [
  {
    id: "recycling",
    title: "Plastic Recycling & Processing",
    description:
      "Collecting and processing post-industrial and post-consumer plastics into high-quality recycled feedstock.",
    image: "/images/p/IMG_7382.jpeg",
  },
  {
    id: "closed-loop",
    title: "Closed-Loop & Toll Recycling Programs",
    description:
      "Helping manufacturers close the loop with circular supply chains and toll processing services.",
    image: "/images/p/IMG_4880.jpeg",
  },
  {
    id: "waste-recovery",
    title: "Waste Management & Resource Recovery",
    description:
      "Partnering on waste-to-energy and industrial waste recovery to reduce environmental impact.",
    image: "/images/p/IMG_7317.jpeg",
  },
];