import { MessageSquare } from "lucide-react";

interface DiscoverProps {
  results: Array<{
    id: string;
    // Add other result properties as needed
  }>;
}

function Discover({ results = [] }: DiscoverProps) {
  return (
    <div>
      {results.length > 0 ? (
        results.map((result) => (
          <button key={result.id} className="flex items-center">
            <MessageSquare className="h-4 w-4 mr-2" />
            Connect
          </button>
        ))
      ) : (
        <div className="col-span-full text-center py-12">
          <h3 className="text-xl text-gray-400">
            No results found. Try adjusting your search or filters.
          </h3>
        </div>
      )}
    </div>
  );
}

export default Discover;