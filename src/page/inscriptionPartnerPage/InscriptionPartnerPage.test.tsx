
import {render, fireEvent, screen, waitFor} from '@testing-library/react';
import '@testing-library/jest-dom';
import InscriptionPartnerPage from './InscriptionPartnerPage.tsx';
import configureStore from 'redux-mock-store';
import { MemoryRouter } from 'react-router-dom';
import {Provider} from "react-redux";
import {thunk} from "redux-thunk";
import {FETCH_SUBMIT_REQUEST} from './Contants.ts'

const middlewares = [thunk];
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const mockStore = configureStore(middlewares);
describe('Inscription Page', () => {
    it('Component renders and dispatches submitFormData action on form submit',
    async () => {
        const store = mockStore({
            inscription: {
                formData: {
                nom: '',
                prenom: '',
                email: '',
                telephone: '',
                societe: '',
                groupe: 'OC',
                siren: '',
                fonction: '',
                companyName: '',
                },
                companyInfo: '',
                isLoading: false,
                isClicked: false,
                isLoadingSubmit: false,
                error: null,
            }
        });
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <InscriptionPartnerPage/>
                </MemoryRouter>
            </Provider>
        );
        fireEvent.change(screen.getByLabelText('E-mail'), {target: {value: 'test@example.com'}});

        fireEvent.change(screen.getByLabelText('Nom'), {target: {value: 'tescom'}});
        const submitButton = screen.getByText('S\'inscrire');

        await fireEvent.click(submitButton);

        // Assertions to check if your actions were dispatched

        await waitFor(() => expect(store.getActions()[0].type).toBe(FETCH_SUBMIT_REQUEST));
    });
    it('When "Caisse d\'assurance maladie" checked Input siren doesn\'t show up ',
        async () => {
            const store = mockStore({
                inscription: {
                    formData: {
                        nom: '',
                        prenom: '',
                        email: '',
                        telephone: '',
                        societe: '',
                        groupe: 'Caisse',
                        siren: '',
                        fonction: '',
                        companyName: '',
                    },
                    companyInfo: '',
                    isLoading: false,
                    isClicked: false,
                    isLoadingSubmit: false,
                    error: null,
                }
            });
            render(
                <Provider store={store}>
                    <MemoryRouter>
                        <InscriptionPartnerPage/>
                    </MemoryRouter>
                </Provider>
            );
            expect(screen.queryByLabelText('Siren')).not.toBeInTheDocument();
      });
    it('When component Loading submit button doesn\'t show up',
    async () => {
        const store = mockStore({
            inscription: {
                formData: {
                    nom: '',
                    prenom: '',
                    email: '',
                    telephone: '',
                    societe: '',
                    groupe: 'OC',
                    siren: '',
                    fonction: '',
                    companyName: '',
                },
                companyInfo: '',
                isLoading: false,
                isClicked: false,
                isLoadingSubmit: true,
                error: null,
            }
        });
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <InscriptionPartnerPage/>
                </MemoryRouter>
            </Provider>
        );

        // Assertions to check if your actions were dispatched
        expect(screen.queryByText('S\'inscrire')).not.toBeInTheDocument();
        expect(screen.queryByText('Chargement...')).toBeInTheDocument();
    });
    it('When Siren entered, search company Name',
        async () => {
            const store = mockStore({
                inscription: {
                    formData: {
                        nom: 'test',
                        prenom: '',
                        email: '',
                        telephone: '',
                        societe: '',
                        groupe: 'OC',
                        siren: '',
                        fonction: '',
                        companyName: '',
                    },
                    companyInfo: '',
                    isLoading: true,
                    isClicked: false,
                    isLoadingSubmit: false,
                    error: null,
                }
            });
            render(
                <Provider store={store}>
                    <MemoryRouter>
                        <InscriptionPartnerPage/>
                    </MemoryRouter>
                </Provider>
            );


            // Assertions to check if your actions were dispatched
            expect(screen.queryByText('S\'inscrire')).not.toBeInTheDocument();
            expect(screen.queryByText('Chargement...')).toBeInTheDocument();
        });
    /*  it('When Siren entered',
         async () => {
             const store = mockStore({
                 inscription: {
                     formData: {
                         nom: 'test',
                         prenom: '',
                         email: '',
                         telephone: '',
                         societe: '',
                         groupe: 'OC',
                         siren: '123456978',
                         fonction: '',
                         companyName: '',
                     },
                     companyInfo: 'CompanyTest',
                     isLoading: false,
                     isClicked: false,
                     isLoadingSubmit: false,
                     error: null,
                 }
             });
             render(
                 <Provider store={store}>
                     <MemoryRouter>
                         <InscriptionPartnerPage/>
                     </MemoryRouter>
                 </Provider>
             );
            store.dispatch({
                 type: FETCH_COMPANY_INFO_SUCCESS,
                 payload: {
                     companyInfo: 'CompanyTest',
                     isLoadingSubmit: false,
                     isLoading: false,
                 }
             })
             const actions = store.getActions();
             const expectedPayload = {
                 type: FETCH_COMPANY_INFO_SUCCESS,
                 payload: {
                     companyInfo: 'CompanyTest',
                     isLoadingSubmit: false,
                     isLoading: false,
                 }
             };
             expect(actions).toEqual([expectedPayload]);
            const submitButton = screen.getByText('CompanyTest');

            await fireEvent.click(submitButton);
        });*/
});