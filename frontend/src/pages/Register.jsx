import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name:"", email:"", password:"", phone:"" });
  const [error, setError] = useState("");

  const submit = async e => {
    e.preventDefault();
    try {
      await register(form);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="form-page">
      <form className="form-card" onSubmit={submit}>
        <center><h1>Create Account</h1></center>
        {error && <div className="error">{error}</div>}
        {["name","email","phone","password"].map(field => (
          <input key={field}
            type={field === "password" ? "password" : field === "email" ? "email" : "text"}
            placeholder={field[0].toUpperCase()+field.slice(1)}
            required={field !== "phone"}
            value={form[field]}
            onChange={e => setForm({...form, [field]:e.target.value})}/>
        ))}
        <button>Register</button>
        <center><p>Already registered? <Link to="/login">Login</Link></p></center>
      </form>
    </div>
  );
}
