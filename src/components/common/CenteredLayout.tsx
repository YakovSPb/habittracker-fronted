import { FC } from "react";

interface ICenteredLayoutProps {
  children: React.ReactNode;
}

const CenteredLayout: FC<ICenteredLayoutProps> = ({ children }) => {
  return (
    <div
      className="min-h-screen flex items-center justify-center flex-col"
      style={{
        background: "linear-gradient(135deg, #4f46e5, #06b6d4)",
      }}
    >
     <h1 className="uppercase text-white mb-3 font-bold">Habit Tracker</h1>
      <div className="w-full max-w-md p-6 bg-white rounded-2xl shadow-xl">
        {children}
      </div>
    </div>
  );
};

export default CenteredLayout