import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const submit = async e => {
    e.preventDefault();
    try {
      await login(form);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="form-page">
      <form className="form-card" onSubmit={submit}>
        <center><h1>Login</h1></center>
        {error && <div className="error">{error}</div>}
        <input type="email" placeholder="Email" required
          value={form.email} onChange={e => setForm({...form, email:e.target.value})}/>
        <input type="password" placeholder="Password" required
          value={form.password} onChange={e => setForm({...form, password:e.target.value})}/>
        <button>Login</button>
       <center><p>New customer? <Link to="/register">Create an account</Link></p></center> 
      </form>
    </div>
  );
}
