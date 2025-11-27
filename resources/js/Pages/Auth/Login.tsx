// resources/js/Pages/Auth/Login.tsx
import React, { FormEventHandler } from "react";
import { Head, useForm } from "@inertiajs/react";

interface LoginFormData {
  email: string;
  password: string;
  remember: boolean;
}

export default function Login() {
  const { data, setData, post, processing, errors } = useForm<LoginFormData>({
    email: "",
    password: "",
    remember: false,
  });

  const submit: FormEventHandler = (e) => {
    e.preventDefault();
    // Por enquanto só aponta para /login.
    // Depois conectamos com a autenticação de fato.
    post("/login");
  };

  return (
    <>
      <Head title="Login" />

      <div className="login-page">
        <div className="login-card">
          <h1 className="login-title">Agendamento Saúde</h1>
          <p className="login-subtitle">Entre para acessar o sistema</p>

          <form onSubmit={submit} className="login-form">
            {/* EMAIL */}
            <div className="form-group">
              <label htmlFor="email">Usuário</label>
              <input
                id="email"
                type="email"
                value={data.email}
                onChange={(e) => setData("email", e.target.value)}
                required
                autoFocus
                autoComplete="email"
              />
              {errors.email && <p className="error-text">{errors.email}</p>}
            </div>

            {/* SENHA */}
            <div className="form-group">
              <label htmlFor="password">Senha</label>
              <input
                id="password"
                type="password"
                value={data.password}
                onChange={(e) => setData("password", e.target.value)}
                required
                autoComplete="current-password"
              />
              {errors.password && (
                <p className="error-text">{errors.password}</p>
              )}
            </div>

            {/* LEMBRAR-ME */}
            <div className="form-group form-remember">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={data.remember}
                  onChange={(e) => setData("remember", e.target.checked)}
                />  
                <span>Lembrar-me neste dispositivo</span>
              </label>
            </div>

            {/* BOTÃO */}
            <button type="submit" className="login-button" disabled={processing}>
              {processing ? "Entrando..." : "Entrar"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
