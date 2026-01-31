import { useCallback, useEffect, useState } from "react";

import ServicesStats from "../../components/ServicesComponents/ServicesStats";
import ServicesTable from "../../components/ServicesComponents/ServicesTable";
import ServicesHeader from "../../components/ServicesComponents/ServicesHeader";

import ServiceFormModalDrip from "../../components/ServicesComponents/ServiceFormModalDrip";
import ServiceFormModalShot from "../../components/ServicesComponents/ServiceFormModalShot";
import ServiceFormModalNutrient from "../../components/ServicesComponents/ServiceFormModalNutrient";

import ServiceDisplayModalDrip from "../../components/ServicesComponents/ServiceDisplayModalDrip";
import ServiceDisplayModalShot from "../../components/ServicesComponents/ServiceDisplayModalShot";
import ServiceDisplayModalNutrient from "../../components/ServicesComponents/ServiceDisplayModalNutrient";

import { fetchServices, deleteService } from "../../api/service.api";
import {
  mapDripToServiceRow,
  mapShotToServiceRow,
  mapNutrientToServiceRow,
} from "../../mappers/services.mapper";

import "./Services.scss";

export default function Services() {
  /* =========================
     STATE
  ========================= */
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeType, setActiveType] = useState("nutrients");

  const [filters, setFilters] = useState({
    search: "",
    status: "",
    category: "",
  });

  const [selectedService, setSelectedService] = useState(null);
  const [viewService, setViewService] = useState(null);

  const [showForm, setShowForm] = useState(null); // nutrient | shot | drip
  const [showView, setShowView] = useState(null); // nutrient | shot | drip

  const [nutrientsList, setNutrientsList] = useState([]);
  const [shotsList, setShotsList] = useState([]);

  /* =========================
     MODAL RESET
  ========================= */
  const resetModals = () => {
    setShowForm(null);
    setShowView(null);
    setSelectedService(null);
    setViewService(null);
  };

  /* =========================
     LOAD SERVICES
  ========================= */
  const loadServices = useCallback(async () => {
    setLoading(true);
    try {
      let rows = [];

      if (activeType === "all") {
        const [nutrients, shots, drips] = await Promise.all([
          fetchServices("nutrients", filters),
          fetchServices("shots", filters),
          fetchServices("drips", filters),
        ]);

        rows = [
          ...nutrients.map(mapNutrientToServiceRow),
          ...shots.map(mapShotToServiceRow),
          ...drips.map(mapDripToServiceRow),
        ];
      } else {
        const mapper = {
          nutrients: mapNutrientToServiceRow,
          shots: mapShotToServiceRow,
          drips: mapDripToServiceRow,
        };

        const data = await fetchServices(activeType, filters);
        rows = data.map(mapper[activeType]);
      }

      setServices(rows);
    } catch (err) {
      console.error("Failed to load services", err);
    } finally {
      setLoading(false);
    }
  }, [activeType, filters]);

  useEffect(() => {
    loadServices();
  }, [loadServices]);

  /* =========================
     MASTER DATA
  ========================= */
  useEffect(() => {
    const loadMasterData = async () => {
      try {
        const nutrients = await fetchServices("nutrients");
        const shots = await fetchServices("shots");
        setNutrientsList(nutrients);
        setShotsList(shots);
      } catch (err) {
        console.error("Failed to load master data", err);
      }
    };

    loadMasterData();
  }, []);

  /* =========================
     HANDLERS
  ========================= */
  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleAddService = (type) => {
    resetModals();

    const map = {
      nutrients: "nutrient",
      shots: "shot",
      drips: "drip",
    };

    setShowForm(map[type]);
  };

  const handleEdit = (service) => {
    console.log("EDIT SERVICE:", service);
    resetModals();
    setSelectedService(service);
    setShowForm(service.category);
  };

  const handleView = (service) => {
    resetModals();
    setViewService(service);
    setShowView(service.category);
  };

  const handleDelete = async (service) => {
    if (!window.confirm(`Delete ${service.name}?`)) return;

    try {
      await deleteService(activeType, service._id);
      setServices((prev) => prev.filter((s) => s._id !== service._id));
    } catch (err) {
      console.error("Delete failed", err);
      alert("Failed to delete service");
    }
  };

  /* =========================
     FILTERED DATA
  ========================= */
  const filteredServices = services.filter((s) => {
    const matchesSearch = s.name
      ?.toLowerCase()
      .includes(filters.search.toLowerCase());

    const matchesStatus = !filters.status || s.status === filters.status;
    const matchesCategory =
      !filters.category || s.category === filters.category;

    return matchesSearch && matchesStatus && matchesCategory;
  });

  /* =========================
     RENDER
  ========================= */
  return (
    <div className="services-page">
      <ServicesStats services={services} />

      <ServicesHeader
        filters={filters}
        onChange={handleFilterChange}
        activeType={activeType}
        onTypeChange={setActiveType}
        onAddService={() => handleAddService(activeType)}
      />

      {loading ? (
        <p className="loading">Loading services...</p>
      ) : (
        <ServicesTable
          services={filteredServices}
          onView={handleView}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}

      {/* ===== FORM MODALS ===== */}
      <ServiceFormModalNutrient
        isOpen={showForm === "nutrient"}
        onClose={resetModals}
        onSave={loadServices}
        initialData={selectedService}
      />

      <ServiceFormModalShot
        isOpen={showForm === "shot"}
        onClose={resetModals}
        onSave={loadServices}
        nutrientsList={nutrientsList}
        initialData={selectedService}
      />

      <ServiceFormModalDrip
        isOpen={showForm === "drip"}
        onClose={resetModals}
        onSave={loadServices}
        nutrientsList={nutrientsList}
        shotsList={shotsList}
        initialData={selectedService}
      />

      {/* ===== VIEW MODALS ===== */}
      <ServiceDisplayModalNutrient
        isOpen={showView === "nutrient"}
        onClose={resetModals}
        nutrient={viewService}
      />

      <ServiceDisplayModalShot
        isOpen={showView === "shot"}
        onClose={resetModals}
        shot={viewService}
        nutrientsList={nutrientsList}
      />

      <ServiceDisplayModalDrip
        isOpen={showView === "drip"}
        onClose={resetModals}
        drip={viewService}
        nutrientsList={nutrientsList}
        shotsList={shotsList}
      />
    </div>
  );
}
