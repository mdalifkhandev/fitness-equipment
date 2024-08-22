import like from '@/assets/icon/like.svg';
import tik from '@/assets/icon/tik.svg';

const Section = () => {
  return (
    <div>
      <h1 className="text-center font-bold text-4xl my-10 text-green-500">
        My Achievement
      </h1>
      <div className="flex justify-center mx-auto">
        <div className="flex gap-10 justify-center content-center my-10 w-[900px]">
          <div className="content-center">
            <img src={like} className="size-10 mx-auto" alt="" />
            <h1 className="text-xl font-bold text-center">
              100,000+ Facilities
            </h1>
            <p className="text-center">
              From health clubs and gyms to pro sports teams and top colleges,
              fitness facilities in 165+ countries feature the strength and
              cardio equipment of Life Fitness.
            </p>
          </div>
          <div>
            <img src={tik} className="size-10 mx-auto" alt="" />
            <h1 className="font-bold text-xl text-center">
              Fitness Leadership
            </h1>
            <p className="text-center">
              Life Fitness has been a pioneer in fitness equipment, innovating
              across cardio equipment, connected consoles, digital content and
              connected strength equipment.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Section;
