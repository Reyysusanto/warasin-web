type Education = {
  edu_id: string | null;
  edu_degree: string;
  edu_major: string;
  edu_institution: string;
  edu_graduation_year: string;
};

type RoadmapProps = {
  education: Education[] | null;
};

const Roadmap = ({ education }: RoadmapProps) => {
  if (!education || education.length === 0) {
    return (
      <div className="py-10 text-center text-tertiaryTextColor">
        - Tidak ada riwayat pendidikan -
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center py-10">
      <div className="w-full flex flex-col items-start">
        <div className="w-full flex flex-col md:flex-row items-start gap-4 flex-wrap">
          {education.map((item) => (
            <div
              className="mt-4 p-4 border rounded-md w-full md:w-[30%]"
              key={item.edu_id}
            >
              <h3 className="text-lg text-primaryColor">
                {item.edu_graduation_year}
              </h3>
              <p className="text-lg font-medium">
                {item.edu_degree} - {item.edu_major}
              </p>
              <p className="text-tertiaryTextColor">{item.edu_institution}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Roadmap;
