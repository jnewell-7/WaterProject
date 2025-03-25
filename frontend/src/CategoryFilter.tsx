import { useEffect, useState } from "react";

function CategoryFilter() {
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          "https://localhost:5000/Water/GetProjectTypes"
        );
        const data = await response.json();
        console.log("Fetched categories:", data);
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div>
      <h5>Project Types</h5>
      <div>
        {categories.map((c) => (
          <div key={c} className="form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id={c}
              value={c}
            />
            <label htmlFor={c} className="form-check-label">
              {c}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CategoryFilter;
