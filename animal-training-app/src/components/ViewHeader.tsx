interface ViewHeaderProps {
  title: string;
  onCreateNew?: () => void;
}

export default function ViewHeader({ title, onCreateNew }: ViewHeaderProps) {
  return (
    <div className="flex w-full justify-between items-center mb-0 border-b-2 border-gray-200 pb-3">
      <h1 className="text-gray-600 ml-8 text-xl ">{title}</h1>
      {onCreateNew !== undefined && onCreateNew !== null && (
        <button 
          onClick={onCreateNew}
          className="flex items-center gap-1 text-gray-600 hover:text-gray-800 mr-16"
        >
          <img
            src="/create.svg"
            alt="Create New"
          />
          <span className="text-sm">Create new</span>
        </button>
      )}
    </div>
  );
}