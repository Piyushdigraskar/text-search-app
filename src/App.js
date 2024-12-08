import { useState, useRef, useEffect } from "react";


function App() {
  const [text, setText] = useState(''); // For text input
  const [submittedTexts, setSubmittedTexts] = useState([]); // For storing submitted texts
  const [searchQuery, setSearchQuery] = useState(''); // For search input
  const firstMatchRef = useRef(null); // Reference for the first match

  // Handle submission of text
  const handleSubmit = () => {
    if (text.trim()) {
      setSubmittedTexts([...submittedTexts, text]); // Add the text to the list
      setText(''); // Clear the text area
    }
  };

  // Highlight matching parts of the text
  const highlightText = (content, query) => {
    if (!query) return content; // If no query, return the original content
    const regex = new RegExp(`(${query})`, 'gi'); // Regex for case-insensitive match
    const parts = content.split(regex); // Split content by the search query

    return parts.map((part, index) =>
      part.toLowerCase() === query.toLowerCase() ? (
        <span key={index} className="bg-yellow-200 font-bold">
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  // Scroll to the first match when the search query changes
  useEffect(() => {
    if (firstMatchRef.current) {
      firstMatchRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [searchQuery]);

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Text Submission and Search</h1>

      {/* Text Area Input */}
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter your text here..."
        className="w-full p-2 border rounded mb-4"
        rows={4}
      ></textarea>

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Submit
      </button>

      {/* Search Box */}
      {submittedTexts.length > 0 && (
        <div className="mt-6">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search text..."
            className="w-full p-2 border rounded mb-4"
          />

          {/* Display Filtered Text with Highlighting */}
          <div className="bg-gray-100 p-4 rounded max-h-64 overflow-y-auto">
            {submittedTexts.map((item, index) => {
              const isFirstMatch =
                searchQuery &&
                item.toLowerCase().includes(searchQuery.toLowerCase()) &&
                !firstMatchRef.current; // Only assign ref to the first match

              return (
                <p
                  key={index}
                  className="p-2 border-b"
                  ref={isFirstMatch ? firstMatchRef : null} // Assign ref conditionally
                >
                  {highlightText(item, searchQuery)}
                </p>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
  
}

export default App;
