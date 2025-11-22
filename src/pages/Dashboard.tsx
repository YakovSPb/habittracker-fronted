import { useEffect } from "react";
import { useAuthStore } from "../store/auth.store";

export default function Dashboard() {
  const user = useAuthStore((s) => s.user);
  const loading = useAuthStore((s) => s.loading);
  const init = useAuthStore((s) => s.init);

  useEffect(() => {
    init(); // ← загружаем пользователя
  }, []);

  if (loading) return <div>Загрузка...</div>;
  if (!user) return <div>Не авторизован</div>;

  return (
    <div>
      <h1>Добро пожаловать, {user.email}</h1>
    </div>
  );
}
