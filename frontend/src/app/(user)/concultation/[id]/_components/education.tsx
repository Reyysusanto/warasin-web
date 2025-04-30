const timeline = [
  { year: "2010", title: "S1 Psikologi", desc: "Universitas Indonesia" },
  { year: "2015", title: "S2 Psikologi Klinis", desc: "Universitas Indonesia" },
  { year: "2020", title: "Psikolog Klinis", desc: "RSUD Dr. Soetomo" },
];

const Roadmap = () => {
  return (
    <div className="flex flex-col items-center py-">
      <div className="w-full flex flex-col items-start">
        <div className="w-full flex items-start gap-4">
          {timeline.map((item, index) => (
            <div className="mt-4 p-4 border w-full" key={index}>
              <h3 className="text-lg text-primaryColor">{item.year}</h3>
              <p className="text-lg font-medium">{item.title}</p>
              <p className="text-tertiaryTextColor">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Roadmap;
