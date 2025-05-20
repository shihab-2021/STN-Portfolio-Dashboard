type TagsProps = {
  allTags: (tags: string[]) => void;
  tags: string[];
  setTags: (tags: string[]) => void;
};

const Tags: React.FC<TagsProps> = ({ allTags, tags, setTags }) => {
  const addTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const inputValue = e.currentTarget.value.trim();
    if ((e.key === "Enter" || e.key === ",") && inputValue.length > 0) {
      const newTag = e.key === "," ? inputValue.slice(0, -1) : inputValue;

      if (!tags.includes(newTag) && newTag !== "") {
        const updatedTags = [...tags, newTag];
        setTags(updatedTags);
        allTags(updatedTags);
      }
      e.currentTarget.value = "";
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    // Allow "Enter" only for a specific input with ID "allowedInput"
    if (event.key === "Enter" && event.currentTarget.id !== "allowedInput") {
      event.preventDefault();
    }
  };

  const removeTag = (removedTag: string) => {
    const newTags = tags.filter((tag) => tag !== removedTag);
    setTags(newTags);
    allTags(newTags);
  };

  return (
    <div>
      <div className="py-8">
        <h1 className="pb-3 text-2xl">Please enter some Tags...</h1>
        <small>Press comma or enter to create a tag.</small>
        <div>
          <input
            className="h-14 rounded-md border-2 p-3 text-lg"
            placeholder="Enter tags . . ."
            style={{ minWidth: 280 }}
            onKeyUp={addTag}
            onKeyDown={handleKeyDown}
          />
        </div>
        {/* Show tags */}
        <div
          style={{ minHeight: "150px", maxWidth: "500px" }}
          className="tag-container my-2 flex flex-wrap align-start rounded-lg bg-gray-400"
        >
          {tags.map((tag, index) => (
            <div
              key={index}
              className="m-1 h-fit rounded-lg bg-green-500 px-2 py-1"
            >
              {tag}{" "}
              <span
                className="cursor-pointer pl-1 text-xl font-bold"
                onClick={() => removeTag(tag)}
              >
                ×
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Tags;
