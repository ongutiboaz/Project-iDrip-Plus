import { useState, useEffect } from "react";
import { X, Plus, Trash2 } from "lucide-react";
import Select from "react-select";

import "./ServiceFormModalShot.scss";

export default function ServiceFormModalShot({
  isOpen,
  onClose,
  onSave,
  initialData = {},
  nutrientsList = [], // list of available nutrients for dropdown
}) {
  const initialFormState = {
    _id: "",
    id: "",
    name: "",
    category: "shot",
    componentType: "vitamin",
    description: "",
    howItWorks: "",
    benefits: [],
    indications: [],
    contraindications: [],
    nutrients: [],
    durationValue: "5",
    durationUnit: "mins",
    price: 0,
    images: { cover: "", nutrients: [] },
    faqs: [],
    status: "active",
    disclaimer:
      "This injection is administered after clinical assessment by a licensed healthcare professional.",
  };

  const [formData, setFormData] = useState(initialFormState);
  const [file, setFile] = useState(null); // for image upload

  /* =========================
     LOAD INITIAL DATA
  ========================= */
  useEffect(() => {
    if (initialData && initialData.id) {
      setFormData({
        ...initialFormState,
        ...initialData,
        durationValue: initialData.duration?.split(" ")[0] || "5",
        durationUnit: initialData.duration?.split(" ")[1] || "mins",
        benefits: initialData.benefits || [],
        indications: initialData.indications || [],
        contraindications: initialData.contraindications || [],
        faqs: initialData.faqs || [],
        images: initialData.images || { cover: "", nutrients: [] },
        // MAP IDs TO OBJECTS FOR REACT SELECT
        nutrients: (initialData.nutrients || []).map(
          (id) =>
            nutrientsList.find((n) => n._id === id) || {
              _id: id,
              name: "Unknown",
            }
        ),
      });
    }
  }, [initialData, nutrientsList]);

  /* =========================
     IMAGE HANDLER
  ========================= */
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
     HANDLERS
  ========================= */
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

  /* =========================
     FAQ HANDLERS
  ========================= */
  const addFaq = () =>
    setFormData((prev) => ({
      ...prev,
      faqs: [...prev.faqs, { question: "", answer: "" }],
    }));

  const updateFaq = (index, field, value) => {
    const updated = [...formData.faqs];
    updated[index][field] = value;
    setFormData((prev) => ({ ...prev, faqs: updated }));
  };

  const removeFaq = (index) =>
    setFormData((prev) => ({
      ...prev,
      faqs: prev.faqs.filter((_, i) => i !== index),
    }));
  /* =========================
    SELECT HANDLERS
 ========================== */
  const handleSelectChange = (key, selected) => {
    setFormData((prev) => ({ ...prev, [key]: selected || [] }));
  };

  /* =========================
     SAVE
  ========================= */
  const handleSave = async () => {
    // REQUIRED VALIDATION
    if (!formData.id || !formData.name) {
      return alert("ID and Name are required");
    }
    if (!formData.description || !formData.howItWorks) {
      return alert("Description and How It Works are required");
    }

    try {
      const url = formData._id
        ? `http://localhost:5000/api/shots/${formData._id}`
        : "http://localhost:5000/api/shots";

      const method = formData._id ? "PUT" : "POST";

      // FormData for file upload
      const data = new FormData();
      data.append("id", formData.id);
      data.append("name", formData.name);
      data.append("category", formData.category);
      data.append("componentType", formData.componentType);
      data.append("description", formData.description);
      data.append("howItWorks", formData.howItWorks);
      data.append(
        "duration",
        `${formData.durationValue} ${formData.durationUnit}`
      );
      data.append("price", formData.price);
      data.append("status", formData.status);
      data.append("disclaimer", formData.disclaimer);
      data.append("benefits", JSON.stringify(formData.benefits));
      data.append("indications", JSON.stringify(formData.indications));
      data.append(
        "contraindications",
        JSON.stringify(formData.contraindications)
      );
      data.append("faqs", JSON.stringify(formData.faqs));
      // Nutrients
      data.append(
        "nutrients",
        JSON.stringify(formData.nutrients.map((n) => n._id))
      );

      if (file) {
        data.append("cover", file);
      } else if (formData.images?.cover) {
        data.append("images", JSON.stringify(formData.images));
      }

      const res = await fetch(url, {
        method,
        body: data,
      });

      const resData = await res.json();

      if (!res.ok) throw new Error(resData.error || "Failed to save shot");

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

  /* =========================
     RENDER
  ========================= */
  return (
    <div className="modal-backdrop">
      <div className="modal large">
        <div className="modal-header">
          <h3>{formData._id ? "Edit Shot" : "Add Shot"}</h3>
          <button onClick={handleClose}>
            <X size={16} />
          </button>
        </div>

        <div className="modal-body">
          {/* BASIC INFO */}
          <label>
            ID{" "}
            <input
              type="text"
              value={formData.id}
              onChange={(e) => handleChange("id", e.target.value)}
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
            Category <input value={formData.category} disabled />
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
            Description{" "}
            <textarea
              value={formData.description}
              onChange={(e) => handleChange("description", e.target.value)}
            />
          </label>

          <label>
            How It Works{" "}
            <textarea
              value={formData.howItWorks}
              onChange={(e) => handleChange("howItWorks", e.target.value)}
            />
          </label>

          {/* ARRAYS: BENEFITS, INDICATIONS, CONTRAINDICATIONS */}
          {["benefits", "indications", "contraindications"].map((field) => (
            <label key={field}>
              {field.charAt(0).toUpperCase() + field.slice(1)}
              {formData[field].map((v, i) => (
                <div key={i} className="inline">
                  <input
                    value={v}
                    onChange={(e) =>
                      handleArrayChange(field, e.target.value, i)
                    }
                  />
                  <Trash2 size={16} onClick={() => removeFromList(field, i)} />
                </div>
              ))}
              <button
                type="button"
                className="ghost"
                onClick={() => addToList(field)}
              >
                <Plus size={14} /> Add
              </button>
            </label>
          ))}

          {/* NUTRIENTS */}

          {/* Nutrients / Addons / Shots */}
          <label>
            Nutrients{" "}
            <Select
              isMulti
              options={nutrientsList}
              getOptionLabel={(n) => n.name}
              getOptionValue={(n) => n._id}
              value={formData.nutrients}
              onChange={(selected) => handleSelectChange("nutrients", selected)}
            />
          </label>

          {/* DURATION & PRICE */}
          <label>
            Duration{" "}
            <div className="duration-field">
              <input
                type="number"
                value={formData.durationValue}
                onChange={(e) => handleChange("durationValue", e.target.value)}
              />
              <select
                value={formData.durationUnit}
                onChange={(e) => handleChange("durationUnit", e.target.value)}
              >
                <option value="mins">Minutes</option>
                <option value="hrs">Hours</option>
              </select>
            </div>
          </label>

          <label>
            Price{" "}
            <input
              type="number"
              min="0"
              value={formData.price}
              onChange={(e) => handleChange("price", Number(e.target.value))}
            />
          </label>

          {/* FAQS */}
          <label>
            FAQs{" "}
            {formData.faqs.map((faq, i) => (
              <div key={i} className="faq-item">
                <input
                  placeholder="Question"
                  value={faq.question}
                  onChange={(e) => updateFaq(i, "question", e.target.value)}
                />
                <textarea
                  placeholder="Answer"
                  value={faq.answer}
                  onChange={(e) => updateFaq(i, "answer", e.target.value)}
                />
                <button type="button" onClick={() => removeFaq(i)}>
                  ✕
                </button>
              </div>
            ))}
            <button type="button" onClick={addFaq}>
              <Plus size={14} /> Add FAQ
            </button>
          </label>

          {/* IMAGE */}

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

          {/* STATUS */}
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
