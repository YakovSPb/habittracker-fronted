import { Box, Button, TextField, Typography } from "@mui/material";
import { Form, Formik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import CenteredLayout from "../components/common/CenteredLayout";
import { useAuthStore } from "../store/auth.store";

// Валидация через Yup
const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Некорректный email").required("Обязательно"),
  password: Yup.string().min(6, "Минимум 6 символов").required("Обязательно"),
});

export default function Login() {
  const login = useAuthStore((s) => s.login);
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  return (
    <CenteredLayout>
      <Box>
        <Typography variant="h4" mb={3} textAlign="center">
          Вход
        </Typography>

        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={LoginSchema}
          onSubmit={async (values, { setSubmitting }) => {
            setError(null);

            const res = await login(values.email, values.password);

            if (res.success) {
              navigate("/");
            } else {
              setError(res.message ?? "Ошибка авторизации");
            }

            setSubmitting(false);
          }}
        >
          {({ errors, touched, handleChange, isSubmitting }) => (
            <Form className="flex flex-col gap-4">
              <TextField
                name="email"
                label="Email"
                fullWidth
                onChange={handleChange}
                error={touched.email && Boolean(errors.email)}
                helperText={touched.email && errors.email}
              />

              <TextField
                name="password"
                label="Пароль"
                type="password"
                fullWidth
                onChange={handleChange}
                error={touched.password && Boolean(errors.password)}
                helperText={touched.password && errors.password}
              />

              {error && (
                <Typography color="error" textAlign="center">
                  {error}
                </Typography>
              )}

              <Button
                variant="contained"
                type="submit"
                fullWidth
                disabled={isSubmitting}
              >
                Войти
              </Button>

              {/* 👍 Кнопка перехода на регистрацию */}
              <Button
                variant="text"
                fullWidth
                onClick={() => navigate("/register")}
              >
                Нет аккаунта? Зарегистрироваться
              </Button>
            </Form>
          )}
        </Formik>
      </Box>
    </CenteredLayout>
  );
}
