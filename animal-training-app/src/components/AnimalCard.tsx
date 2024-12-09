interface Animal {
  _id: string;
  name: string;
  breed: string;
  hoursTrained: number;
  profilePicture: string;
  owner: {
    fullName: string;
  };
}

interface AnimalCardProps {
  animal: Animal;
}

export default function AnimalCard({ animal }: AnimalCardProps) {
  return (
    <div 
      className="w-80 h-72 bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
    >
      <div className="h-48 overflow-hidden">
        <img
          src={animal.profilePicture}
          alt={`${animal.name} the ${animal.breed}`}
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="p-4 flex items-center">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center text-white font-bold">
            {animal.name[0].toUpperCase()}
          </div>
          <div>
            <h3 className="text-xl font-semibold">{animal.name} - {animal.breed}</h3>
            <p className="text-gray-500 text-sm">
              {animal.owner.fullName} - Trained: {animal.hoursTrained} hours
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}