import { useEffect, useState } from "react";
import { X, Plus, Trash2 } from "lucide-react";
import Select from "react-select";
import "./ServiceFormModalDrip.scss";

export default function ServiceFormModalDrip({
  isOpen,
  onClose,
  onSave,
  initialData = {},
  nutrientsList = [],
  shotsList = [],
}) {
  /* =========================
     INITIAL FORM STATE
  ========================== */
  const initialFormState = {
    _id: "",
    id: "",
    name: "",
    category: "drip",
    componentType: "vitamin",
    description: "",
    howItWorks: "",
    benefits: [],
    indications: [],
    contraindications: [],
    nutrients: [],
    addonNutrients: [],
    addonShots: [],
    durationValue: "45",
    durationUnit: "mins",
    price: 0,
    faqs: [],
    status: "active",
    images: { cover: "", nutrients: [] },
    disclaimer:
      "This injection is administered after clinical assessment by a licensed healthcare professional.",
    seo: { title: "", description: "" },
  };

  const [formData, setFormData] = useState(initialFormState);
  const [file, setFile] = useState(null);

  /* =========================
     INITIALIZE FORM
  ========================== */

  useEffect(() => {
    if (initialData && initialData.id) {
      setFormData({
        ...initialFormState,
        ...initialData,
        durationValue: initialData.duration?.split(" ")[0] || "30",
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
        addonNutrients: (initialData.addonNutrients || []).map(
          (id) =>
            nutrientsList.find((n) => n._id === id) || {
              _id: id,
              name: "Unknown",
            }
        ),
        addonShots: (initialData.addonShots || []).map(
          (id) =>
            shotsList.find((s) => s._id === id) || { _id: id, name: "Unknown" }
        ),
      });
    }
  }, [initialData, nutrientsList, shotsList]);

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

  /* =========================
     FAQ HANDLERS
  ========================== */
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
     SAVE HANDLER
  ========================== */

  const handleSave = async () => {
    if (!formData.id || !formData.name)
      return alert("ID and Name are required");
    if (!formData.description || !formData.howItWorks)
      return alert("Description and How It Works are required");

    try {
      const url = formData._id
        ? `http://localhost:5000/api/drips/${formData._id}`
        : "http://localhost:5000/api/drips";

      const method = formData._id ? "PUT" : "POST";

      const data = new FormData();

      // Primitive fields
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

      // Arrays
      data.append("benefits", JSON.stringify(formData.benefits));
      data.append("indications", JSON.stringify(formData.indications));
      data.append(
        "contraindications",
        JSON.stringify(formData.contraindications)
      );
      data.append("faqs", JSON.stringify(formData.faqs));

      // Nutrients / Addons
      data.append(
        "nutrients",
        JSON.stringify(formData.nutrients.map((n) => n._id))
      );
      data.append(
        "addonNutrients",
        JSON.stringify(formData.addonNutrients.map((n) => n._id))
      );
      data.append(
        "addonShots",
        JSON.stringify(formData.addonShots.map((s) => s._id))
      );

      // SEO
      data.append("seo", JSON.stringify(formData.seo || {}));

      // Images
      if (file) {
        data.append("cover", file);
      } else if (formData.images?.cover) {
        data.append("images", JSON.stringify(formData.images));
      }

      const res = await fetch(url, { method, body: data });
      const resData = await res.json();

      if (!res.ok) throw new Error(resData.error || "Failed to save drip");

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
      <div className="modal large">
        <div className="modal-header">
          <h3>{formData._id ? "Edit Drip" : "Add Drip"}</h3>
          <button onClick={handleClose}>
            <X size={16} />
          </button>
        </div>

        <div className="modal-body">
          <label>
            ID
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
            Category <input value={formData.category} disabled />
          </label>

          <label>
            Description{" "}
            <textarea
              value={formData.description}
              onChange={(e) => handleChange("description", e.target.value)}
            />
          </label>

          <label>
            How it Works{" "}
            <textarea
              value={formData.howItWorks}
              onChange={(e) => handleChange("howItWorks", e.target.value)}
            />
          </label>

          {/* Benefits / Indications / Contraindications */}
          {["benefits", "indications", "contraindications"].map((field) => (
            <label key={field}>
              {field.charAt(0).toUpperCase() + field.slice(1)}
              {formData[field].map((v, i) => (
                <div key={i}>
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

          {/* Price */}
          <label>
            Price{" "}
            <input
              type="number"
              value={formData.price}
              onChange={(e) => handleChange("price", Number(e.target.value))}
            />
          </label>

          {/* Cover Image */}
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
          {/* Nutrients / Addons / Shots */}
          <label>
            Base Nutrients{" "}
            <Select
              isMulti
              options={nutrientsList}
              getOptionLabel={(n) => n.name}
              getOptionValue={(n) => n._id}
              value={formData.nutrients}
              onChange={(selected) => handleSelectChange("nutrients", selected)}
            />
          </label>

          <label>
            Addon Nutrients{" "}
            <Select
              isMulti
              options={nutrientsList}
              getOptionLabel={(n) => n.name}
              getOptionValue={(n) => n._id}
              value={formData.addonNutrients}
              onChange={(selected) =>
                handleSelectChange("addonNutrients", selected)
              }
            />
          </label>

          <label>
            Addon Shots{" "}
            <Select
              isMulti
              options={shotsList}
              getOptionLabel={(s) => s.name}
              getOptionValue={(s) => s._id}
              value={formData.addonShots}
              onChange={(selected) =>
                handleSelectChange("addonShots", selected)
              }
            />
          </label>

          {/* FAQs */}
          <label>
            FAQs{" "}
            {formData.faqs.map((f, i) => (
              <div key={i}>
                <input
                  placeholder="Question"
                  value={f.question}
                  onChange={(e) => updateFaq(i, "question", e.target.value)}
                />
                <input
                  placeholder="Answer"
                  value={f.answer}
                  onChange={(e) => updateFaq(i, "answer", e.target.value)}
                />
                <button type="button" onClick={() => removeFaq(i)}>
                  Remove
                </button>
              </div>
            ))}
            <button type="button" onClick={addFaq}>
              Add FAQ
            </button>
          </label>

          <label>
            Status{" "}
            <select
              value={formData.status}
              onChange={(e) => handleChange("status", e.target.value)}
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="draft">Draft</option>
            </select>
          </label>

          <label>
            Disclaimer{" "}
            <textarea
              value={formData.disclaimer}
              onChange={(e) => handleChange("disclaimer", e.target.value)}
              placeholder="Medical disclaimer text"
            />
          </label>

          <h4>SEO</h4>
          <label>
            SEO Title
            <input
              type="text"
              value={formData.seo.title || ""}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  seo: { ...prev.seo, title: e.target.value },
                }))
              }
            />
          </label>

          <label>
            SEO Description{" "}
            <textarea
              value={formData.seo.description || ""}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  seo: { ...prev.seo, description: e.target.value },
                }))
              }
            />
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
