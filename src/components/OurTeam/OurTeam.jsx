import vector from '../../assets/images/vectorMan.jpg';
import girlVector from '../../assets/images/girl2.png';
import girl2 from '../../assets/images/girl2.png.png';
import girl3 from '../../assets/images/girl3.png';
import chefHat from '../../assets/images/chefHat.png';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

export default function OurTeam() {
  const chefs = [
    {
      name: 'Hazem Abdulrahman',
      role: 'Front-end expert',
      image: vector,
      linkedIn: 'https://www.linkedin.com/in/hazem-abdulrahman',
      gitHub: 'https://github.com/hazemabdo15',
    },
    {
      name: 'Jihan Fakhr',
      role: 'Front-end expert',
      image: girl2,
      linkedIn: 'https://www.linkedin.com/in/jihanfakhr?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',
      gitHub: 'https://github.com/Jihan95',
    },
    {
      name: 'Esraa Ahmed',
      role: 'Front-end expert',
      image: girl3,
      linkedIn: 'https://www.linkedin.com/in/esraa-ahmed-246a66281/',
      gitHub: 'https://github.com/EsraaAhmedAli',
    },
    {
      name: 'Sarah Hesham',
      role: 'Front-end expert',
      image: girlVector,
      linkedIn: 'https://www.linkedin.com/in/sarah-hesham-8594bb190?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',
      gitHub: 'https://github.com/SarahHeshamAli2',
    },
  ];

  return (
    <div className="bg-white py-20 px-6 md:px-20">
      <section className="mb-20">
        <div className="relative text-center mb-12">
          <h3 className="text-4xl font-bold text-[var(--primary-color)] z-10 relative">
            Meet Our Chefs
          </h3>
          <img
            src={chefHat}
            alt="Chef Hat"
            className="w-14 absolute -top-8 left-1/2 -translate-x-1/2"
          />
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {chefs.map((chef, index) => (
            <div
              key={index}
              className="bg-[#fff8f4] rounded-[2rem] shadow-md hover:shadow-xl transition-transform transform hover:-translate-y-2 duration-300 p-6 text-center"
            >
              <img
                src={chef.image}
                alt={chef.name}
                className="w-28 h-28 mx-auto rounded-full object-cover border-4 border-white shadow-md mb-4"
              />
          
              <h4 className="text-lg font-semibold text-gray-800">{chef.name}</h4>
              <p className="text-sm text-gray-600">{chef.role}</p>
              <div className="flex justify-center gap-4 mt-4 text-gray-500">
                {chef.gitHub && (
                  <a href={chef.gitHub} target="_blank" rel="noopener noreferrer">
                    <FaGithub className="hover:text-[var(--primary-color)] transition fs-4" />
                  </a>
                )}
                {chef.linkedIn && (
                  <a href={chef.linkedIn} target="_blank" rel="noopener noreferrer">
                    <FaLinkedin className="hover:text-blue-600 transition fs-4" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
