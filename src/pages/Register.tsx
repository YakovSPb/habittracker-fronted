import { Box, Button, TextField, Typography } from "@mui/material";
import { Form, Formik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import CenteredLayout from "../components/common/CenteredLayout";
import { useAuthStore } from "../store/auth.store";

// Валидация Yup
const RegisterSchema = Yup.object().shape({
  full_name: Yup.string()
    .min(2, "Минимум 2 буквы")
    .required("Введите имя"),
  email: Yup.string()
    .email("Некорректный email")
    .required("Обязательно"),
  password: Yup.string()
    .min(6, "Минимум 6 символов")
    .required("Обязательно"),
  confirm: Yup.string()
    .oneOf([Yup.ref("password")], "Пароли не совпадают")
    .required("Обязательно"),
});

export default function Register() {
  const register = useAuthStore((s) => s.register);
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  return (
    <CenteredLayout>
      <Box>
        <Typography variant="h4" mb={3} textAlign="center">
          Регистрация
        </Typography>

        <Formik
          initialValues={{
            full_name: "",
            email: "",
            password: "",
            confirm: "",
          }}
          validationSchema={RegisterSchema}
          onSubmit={async (values, { setSubmitting }) => {
            setError(null);

            const res = await register(
              values.email,
              values.password,
              values.full_name
            );

            console.log('res',res)

            if (res.success) {
              navigate("/");
            } else {
              setError(res.message ?? "Ошибка регистрации");
            }

            setSubmitting(false);
          }}
        >
          {({
            errors,
            touched,
            handleChange,
            isSubmitting,
          }) => (
            <Form className="flex flex-col gap-4">
              <TextField
                name="full_name"
                label="Имя"
                fullWidth
                onChange={handleChange}
                error={
                  touched.full_name && Boolean(errors.full_name)
                }
                helperText={
                  touched.full_name && errors.full_name
                }
              />

              <TextField
                name="email"
                label="Email"
                fullWidth
                onChange={handleChange}
                error={
                  touched.email && Boolean(errors.email)
                }
                helperText={touched.email && errors.email}
              />

              <TextField
                name="password"
                label="Пароль"
                type="password"
                fullWidth
                onChange={handleChange}
                error={
                  touched.password && Boolean(errors.password)
                }
                helperText={
                  touched.password && errors.password
                }
              />

              <TextField
                name="confirm"
                label="Подтвердите пароль"
                type="password"
                fullWidth
                onChange={handleChange}
                error={
                  touched.confirm && Boolean(errors.confirm)
                }
                helperText={touched.confirm && errors.confirm}
              />

              {error && (
                <Typography
                  color="error"
                  textAlign="center"
                >
                  {error}
                </Typography>
              )}

              <Button
                variant="contained"
                type="submit"
                fullWidth
                disabled={isSubmitting}
              >
                Зарегистрироваться
              </Button>

              <Button
                variant="text"
                fullWidth
                onClick={() => navigate("/login")}
              >
                Уже есть аккаунт? Войти
              </Button>
            </Form>
          )}
        </Formik>
      </Box>
    </CenteredLayout>
  );
}
