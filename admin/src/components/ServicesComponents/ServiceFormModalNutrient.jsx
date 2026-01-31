import { useState, useEffect } from "react";
import { X, Plus, Trash2 } from "lucide-react";
import "./ServiceFormModalNutrient.scss";

export default function ServiceFormModalNutrient({
  isOpen,
  onClose,
  onSave,
  initialData = {},
}) {
  const initialFormState = {
    _id: "",
    id: "",
    name: "",
    componentType: "vitamin",
    category: "nutrient",
    price: 0,
    durationValue: "5",
    durationUnit: "mins",
    benefits: [],
    status: "active",
    images: { cover: "" },
  };

  const [formData, setFormData] = useState(initialFormState);
  const [file, setFile] = useState(null);

  /* =========================
   INITIALIZE FORM
========================== */
  useEffect(() => {
    if (initialData && initialData._id) {
      setFormData({
        ...initialFormState,
        ...initialData,
        durationValue: initialData.duration?.split(" ")[0] || "5",
        durationUnit: initialData.duration?.split(" ")[1] || "mins",
        benefits: initialData.benefits || [],
        images: initialData.images || { cover: "" },
      });
    }
  }, [initialData]);

  /* =========================
    IMAGE HANDLER
 ========================== */
  const handleImageChange = (file) => {
    setFile(file);
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () =>
      setFormData((prev) => ({
        ...prev,
        images: { ...prev.images, cover: reader.result },
      }));
    reader.readAsDataURL(file);
  };

  /* =========================
    ARRAY HANDLERS
 ========================== */
  const handleChange = (key, value) =>
    setFormData((prev) => ({ ...prev, [key]: value }));
  const handleArrayChange = (key, value, index) => {
    const list = [...formData[key]];
    list[index] = value;
    setFormData((prev) => ({ ...prev, [key]: list }));
  };
  const addToList = (key) =>
    setFormData((prev) => ({ ...prev, [key]: [...prev[key], ""] }));
  const removeFromList = (key, index) => {
    const list = [...formData[key]];
    list.splice(index, 1);
    setFormData((prev) => ({ ...prev, [key]: list }));
  };

  const handleSave = async () => {
    if (!formData.id || !formData.name)
      return alert("ID and Name are required");
    try {
      const url = formData._id
        ? `http://localhost:5000/api/nutrients/${formData._id}`
        : "http://localhost:5000/api/nutrients";
      const method = formData._id ? "PUT" : "POST";

      const data = new FormData();
      // Primitive fields
      data.append("id", formData.id);
      data.append("name", formData.name);
      data.append("category", formData.category);
      data.append("componentType", formData.componentType);
      data.append(
        "duration",
        `${formData.durationValue} ${formData.durationUnit}`
      );
      data.append("price", formData.price);
      data.append("status", formData.status);
      data.append("benefits", JSON.stringify(formData.benefits));
      // Images
      if (file) {
        data.append("cover", file);
      } else if (formData.images?.cover) {
        data.append("images", JSON.stringify(formData.images));
      }

      const res = await fetch(url, { method, body: data });
      const resData = await res.json();
      if (!res.ok) throw new Error(resData.error || "Failed to save Nutrient");
      onSave(resData);
      handleClose();
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  const handleClose = () => {
    setFormData(initialFormState);
    setFile(null);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <div className="modal-header">
          <h3>{formData._id ? "Edit Nutrient" : "Add Nutrient"}</h3>
          <button onClick={handleClose}>
            <X size={16} />
          </button>
        </div>

        <div className="modal-body">
          <label>
            ID{" "}
            <input
              type="text"
              value={formData.id}
              onChange={(e) => handleChange("id", e.target.value)}
              placeholder="e.g., nut-vitc"
            />
          </label>

          <label>
            Name{" "}
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
            />
          </label>

          <label>
            Component Type{" "}
            <select
              value={formData.componentType}
              onChange={(e) => handleChange("componentType", e.target.value)}
            >
              <option value="vitamin">Vitamin</option>
              <option value="mineral">Mineral</option>
              <option value="antioxidant">Antioxidant</option>
              <option value="amino-acid">Amino Acid</option>
              <option value="other">Other</option>
            </select>
          </label>

          <label>
            Category <input type="text" value={formData.category} disabled />
          </label>

          <label>
            Price (KES)
            <input
              type="number"
              min="0"
              value={formData.price}
              onChange={(e) =>
                handleChange("price", Math.max(0, Number(e.target.value)))
              }
            />
          </label>

          {/* Duration */}
          <label>
            Duration{" "}
            <div>
              <input
                type="number"
                value={formData.durationValue}
                onChange={(e) => handleChange("durationValue", e.target.value)}
              />
              <select
                value={formData.durationUnit}
                onChange={(e) => handleChange("durationUnit", e.target.value)}
              >
                <option value="mins">mins</option>
                <option value="hours">hours</option>
              </select>
            </div>
          </label>

          <label>
            Benefits
            {formData.benefits.map((b, i) => (
              <div key={i} className="inline">
                <input
                  value={b}
                  onChange={(e) =>
                    handleArrayChange("benefits", e.target.value, i)
                  }
                />
                <Trash2
                  size={16}
                  onClick={() => removeFromList("benefits", i)}
                />
              </div>
            ))}
            <button
              type="button"
              className="ghost"
              onClick={() => addToList("benefits")}
            >
              <Plus size={14} /> Add Benefit
            </button>
          </label>

          <label>
            Cover Image{" "}
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleImageChange(e.target.files[0])}
            />
            {formData.images.cover && (
              <img
                src={
                  file
                    ? formData.images.cover
                    : formData.images.cover.startsWith("/uploads")
                    ? `http://localhost:5000${formData.images.cover}`
                    : formData.images.cover
                }
                alt="Preview"
                className="preview"
              />
            )}
          </label>

          <label>
            Status{" "}
            <select
              value={formData.status}
              onChange={(e) => handleChange("status", e.target.value)}
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </label>
        </div>

        <div className="modal-footer">
          <button onClick={handleSave}>Save</button>
          <button onClick={handleClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
}
