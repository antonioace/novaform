import React, { useState } from "react";
import {
  Container,
  Box,
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
  TextField,
  Grid,
  Card,
  CardContent,
} from "@mui/material";
import { useCart } from "../hooks/useCart";
import { FiCheck } from "react-icons/fi";

const steps = ["Información de envío", "Método de pago", "Confirmación"];

export const CheckoutPage: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => setActiveStep(activeStep + 1);
  const handleBack = () => setActiveStep(activeStep - 1);

  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return <ShippingForm />;
      case 1:
        return <PaymentForm />;
      case 2:
        return <ConfirmationStep />;
      default:
        return null;
    }
  };

  return (
    <Container maxWidth="lg" className="py-8">
      <Typography variant="h4" component="h1" className="mb-8 font-bold">
        Finalizar compra
      </Typography>

      <Stepper activeStep={activeStep} className="mb-8">
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          {renderStepContent(activeStep)}

          <Box className="mt-4 flex justify-between">
            {activeStep > 0 && <Button onClick={handleBack}>Atrás</Button>}
            <Button
              variant="contained"
              onClick={activeStep < steps.length - 1 ? handleNext : undefined}
            >
              {activeStep === steps.length - 1
                ? "Finalizar compra"
                : "Continuar"}
            </Button>
          </Box>
        </Grid>

        <Grid item xs={12} md={4}>
          <OrderSummary />
        </Grid>
      </Grid>
    </Container>
  );
};

// Componentes auxiliares (implementaciones básicas)
const ShippingForm = () => (
  <Box>
    <Typography variant="h6" className="mb-4">
      Dirección de envío
    </Typography>
    <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        <TextField label="Nombre" fullWidth />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField label="Apellidos" fullWidth />
      </Grid>
      <Grid item xs={12}>
        <TextField label="Dirección" fullWidth />
      </Grid>
    </Grid>
  </Box>
);

const PaymentForm = () => (
  <Box>
    <Typography variant="h6" className="mb-4">
      Información de pago
    </Typography>
    <TextField label="Número de tarjeta" fullWidth className="mb-4" />
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <TextField label="Fecha exp." fullWidth />
      </Grid>
      <Grid item xs={6}>
        <TextField label="CVV" fullWidth />
      </Grid>
    </Grid>
  </Box>
);

const ConfirmationStep = () => (
  <Box className="text-center py-4">
    <FiCheck size={48} className="text-green-500 mx-auto mb-4" />
    <Typography variant="h6">¡Todo listo para finalizar tu compra!</Typography>
    <Typography>Revisa los detalles y haz clic en Finalizar compra</Typography>
  </Box>
);

const OrderSummary = () => {
  const { cartItems, totalPrice } = useCart();

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" className="mb-4">
          Resumen del pedido
        </Typography>

        {cartItems.map((item) => (
          <Box key={item.product.id} className="flex justify-between mb-2">
            <Typography>
              {item.product.name} x {item.quantity}
            </Typography>
            <Typography>
              ${(item.product.price * item.quantity).toFixed(2)}
            </Typography>
          </Box>
        ))}

        <Box className="border-t pt-4 mt-4">
          <Box className="flex justify-between font-bold">
            <Typography variant="subtitle1">Total:</Typography>
            <Typography variant="subtitle1">
              ${totalPrice.toFixed(2)}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default CheckoutPage;
