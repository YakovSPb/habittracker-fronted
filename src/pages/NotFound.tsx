import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import CenteredLayout from "../components/common/CenteredLayout";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <CenteredLayout>
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="400px"
      textAlign="center"
      gap={2}
    >
      <Typography variant="h2" component="h1">
        404
      </Typography>

      <Typography variant="h6" color="text.secondary">
        Страница не найдена
      </Typography>

      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate("/")}
        size="large"
      >
        На главную
      </Button>
    </Box>
    </CenteredLayout>
  );
}
