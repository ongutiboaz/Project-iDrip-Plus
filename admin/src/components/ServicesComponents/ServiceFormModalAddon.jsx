import { useEffect, useState } from "react";
import { X, Plus, Trash2 } from "lucide-react";
import "./ServiceFormModalAddon.scss";

const emptyAddon = {
  id: "",
  type: "addon",
  name: "",
  category: "IV Addon",
  price: "",
  duration: "10 mins",
  status: "active",
  benefits: [],
};

export default function ServiceFormModalAddon({
  isOpen,
  onClose,
  onSave,
  initialData = null,
}) {
  const [form, setForm] = useState(emptyAddon);

  useEffect(() => {
    if (initialData) setForm(initialData);
    else setForm(emptyAddon);
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const addBenefit = () =>
    setForm((p) => ({ ...p, benefits: [...p.benefits, ""] }));

  const updateBenefit = (i, value) => {
    const list = [...form.benefits];
    list[i] = value;
    setForm({ ...form, benefits: list });
  };

  const removeBenefit = (i) => {
    const list = form.benefits.filter((_, idx) => idx !== i);
    setForm({ ...form, benefits: list });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      ...form,
      id: initialData?.id || `addon-${Date.now()}`,
      price: Number(form.price),
      createdAt: initialData?.createdAt || new Date().toISOString(),
    };

    onSave(payload);
    onClose();
  };

  return (
    <div className="modal-backdrop">
      <div className="modal md">
        <header className="modal-header">
          <h3>{initialData ? "Edit Addon" : "Add Addon"}</h3>
          <button onClick={onClose}>
            <X />
          </button>
        </header>

        <form className="modal-body" onSubmit={handleSubmit}>
          {/* BASIC INFO */}
          <h4>Addon Information</h4>

          <input
            name="name"
            placeholder="Addon Name"
            value={form.name}
            onChange={handleChange}
            required
          />

          <div className="grid">
            <input
              type="number"
              name="price"
              placeholder="Price (KES)"
              value={form.price}
              onChange={handleChange}
              required
            />
            <input
              name="duration"
              placeholder="Duration"
              value={form.duration}
              onChange={handleChange}
            />
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          <div className="grid">
  {/* TYPE */}
  <select
    name="type"
    value={form.type}
    onChange={handleChange}
    required
  >
    <option value="addon">Addon</option>
    <option value="iv-drip">IV Drip</option>
    <option value="injection">Injection</option>
  </select>

  {/* CATEGORY */}
  <select
    name="category"
    value={form.category}
    onChange={handleChange}
    required
  >
    <option value="IV Addon">IV Addon</option>
    <option value="Vitamin">Vitamin</option>
    <option value="Antioxidant">Antioxidant</option>
    <option value="Mineral">Mineral</option>
    <option value="Amino Acid">Amino Acid</option>
  </select>
</div>


          {/* BENEFITS */}
          <h4>Benefits</h4>

          {form.benefits.map((b, i) => (
            <div key={i} className="inline-row">
              <input
                value={b}
                placeholder="e.g. Boosts energy"
                onChange={(e) => updateBenefit(i, e.target.value)}
              />
              <button
                type="button"
                className="icon danger"
                onClick={() => removeBenefit(i)}
              >
                <Trash2 size={14} />
              </button>
            </div>
          ))}

          <button type="button" onClick={addBenefit} className="ghost">
            <Plus size={14} /> Add Benefit
          </button>

          {/* FOOTER */}
          <footer className="modal-footer">
            <button
              type="button"
              className="btn secondary"
              onClick={onClose}
            >
              Cancel
            </button>
            <button type="submit" className="btn primary">
              Save Addon
            </button>
          </footer>
        </form>
      </div>
    </div>
  );
}
