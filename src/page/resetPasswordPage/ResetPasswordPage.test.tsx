import { Provider } from "react-redux";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import configureStore from "redux-mock-store";
import "@testing-library/jest-dom";
import ResetPasswordPage from "@/page/resetPasswordPage/ResetPasswordPage.tsx";
import { FETCH_RESET_PASSWORD } from "@/page/resetPasswordPage/Contants.ts";
import { thunk } from "redux-thunk";

// Création d'un store Redux mocké
const middlewares = [thunk];
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const mockStore = configureStore(middlewares);
const store = mockStore({
  resetPasswordState: {
    error: null,
    resetPasswordSuccess: false,
    isLoading: false,
  },
});

describe("<ResetPasswordPage />", () => {
  beforeEach(() => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <ResetPasswordPage />
        </MemoryRouter>
      </Provider>,
    );
  });

  it("renders without crashing", () => {
    expect(screen.getByText(/Définition du mot de passe/i)).toBeInTheDocument();
  });

  it("allows entering passwords", () => {
    fireEvent.change(screen.getByTestId("password"), {
      target: { value: "Password123!" },
    });
    fireEvent.change(
      screen.getByLabelText("Confirmation du nouveau mot de passe"),
      { target: { value: "Password123!" } },
    );
    expect(screen.getByTestId("password")).toHaveValue("Password123!");
    expect(
      screen.getByLabelText("Confirmation du nouveau mot de passe"),
    ).toHaveValue("Password123!");
  });

  it("dispatches submitConfirmPassword action on form submission when passwords match", async () => {
    // Simuler la saisie des mots de passe
    fireEvent.change(screen.getByTestId("password"), {
      target: { value: "Password123!" },
    });
    fireEvent.change(
      screen.getByLabelText(/Confirmation du nouveau mot de passe/i),
      { target: { value: "Password123!" } },
    );

    const submit = screen.getByText("Enregistrer ce mot de passe");
    // Simuler la soumission du formulaire
    fireEvent.click(submit);
    await waitFor(() =>
      expect(store.getActions()[0].type).toBe(FETCH_RESET_PASSWORD),
    );
  });
});
