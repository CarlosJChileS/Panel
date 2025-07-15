import React, { useState } from "react";
import { useAuth } from "../AuthContext";
import "./EditProfileModal.css";

export default function EditProfileModal({ user, onClose }) {
  const { supabase } = useAuth();
  const [name, setName] = useState(user?.user_metadata?.full_name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const { error } = await supabase.auth.updateUser({
      email,
      data: { full_name: name },
    });
    if (error) {
      setError("Error al actualizar perfil");
    } else {
      onClose();
    }
    setLoading(false);
  };

  return (
    <>
      <div className="modal-overlay" onClick={onClose} />
      <div className="modal-box" role="dialog" aria-labelledby="edit-title">
        <form onSubmit={handleSubmit}>
          <h3 id="edit-title">Editar Perfil</h3>
          <label htmlFor="edit-name">Nombre completo</label>
          <input
            id="edit-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <label htmlFor="edit-email">Correo electrónico</label>
          <input
            id="edit-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {error && (
            <div style={{ color: "red", marginTop: 8 }} aria-live="polite">
              {error}
            </div>
          )}
          <div className="modal-actions">
            <button type="submit" disabled={loading}>
              Guardar
            </button>
            <button type="button" onClick={onClose}>
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
