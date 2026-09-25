# Componentenarchitectuur en -lagen

Dit document beschrijft de gelaagde architectuur van React-componenten zoals toegepast binnen dit project. Zie [`README.md`](../README.md) voor het documentatie-overzicht en [`docs/CONVENTIONS.md`](./CONVENTIONS.md) voor de algemene codeerconventies.

---

## 1. Overzicht van de Lagen

De applicatie is opgebouwd in vier opeenvolgende componentlagen. Elke laag heeft een strikt afgebakende verantwoordelijkheid. Data en acties bewegen via een eenrichtingsstroom door de boom.

```text
┌────────────────────────────────────────────────────────┐
│  Laag 1: Applicatieshell & Context Providers           │
│  (App.jsx, UserProvider, MessageProvider)              │
└───────────────────────────┬────────────────────────────┘
                            │ data & navigatiestatus
┌───────────────────────────▼────────────────────────────┐
│  Laag 2: Pagina-componenten (Orchestrators)            │
│  (src/pages/customer/*, staff/*, exercises/*)          │
└───────────────────────────┬────────────────────────────┘
                            │ props & callbacks
┌───────────────────────────▼────────────────────────────┐
│  Laag 3: Domein- & Feature-componenten                 │
│  (ReservationForm, OrdersList, OrderCard)              │
└───────────────────────────┬────────────────────────────┘
                            │ props & events
┌───────────────────────────▼────────────────────────────┐
│  Laag 4: Generieke & Herbruikbare UI-deelcomponenten   │
│  (ProductSelector, CollapsibleBlock, Buttons)          │
└────────────────────────────────────────────────────────┘
```

---

## 2. Laag 1: Applicatieshell & Context Providers

Deze laag vormt de kern en de start van de single-page applicatie.

* **Locatie:** [`main.jsx`](../src/main.jsx) en [`App.jsx`](../src/App.jsx).
* **Verantwoordelijkheden:**
  * **Globale providers:** Laadt contexten zoals [`UserProvider`](../src/contexts/UserContext.jsx) (rollen en authenticatie) en [`MessageProvider`](../src/contexts/MessageContext.jsx) (gebruikersnotificaties).
  * **Sessie- en routeringsstatus:** Beheert de actieve pagina via `useSessionStorage` (`activeNavBarItem`).
  * **Navigatiebalken:** Rendert navigatiebalken ([`BistroNavBar`](../src/components/navigation/BistroNavBar.jsx) en [`SandboxNavBar`](../src/components/navigation/SandboxNavBar.jsx)) met respectievelijk [`CustomerNavLinks`](../src/components/customer/CustomerNavLinks.jsx) voor klanten of [`StaffNavLinks`](../src/components/staff/StaffNavLinks.jsx) voor personeel.
  * **Paginaselectie & Routering:** Wisselt de actieve pagina via een centrale `switch`-structuur in [`PageRouter`](../src/components/navigation/PageRouter.jsx).
* **Belangrijke regels:**
  * Bevat zelf geen domein- of businesslogica.
  * Bevat geen formuliervalidaties.

---

## 3. Laag 2: Pagina-componenten (Orchestrators)

Pagina's coördineren een compleet scherm. Ze functioneren als zuivere orchestrators.

* **Locatie:** [`src/pages/`](../src/pages/):
  * **Klant:** [`CustomerReservationsPage.jsx`](../src/pages/customer/CustomerReservationsPage.jsx), [`CustomerReviewsPage.jsx`](../src/pages/customer/CustomerReviewsPage.jsx), [`MenuCardPage.jsx`](../src/pages/customer/MenuCardPage.jsx), [`WikiPageAboutUsPage.jsx`](../src/pages/customer/WikiPageAboutUsPage.jsx).
  * **Medewerker:** [`StaffReservationsPage.jsx`](../src/pages/staff/StaffReservationsPage.jsx), [`StaffReviewsPage.jsx`](../src/pages/staff/StaffReviewsPage.jsx), [`OrdersPage.jsx`](../src/pages/staff/OrdersPage.jsx).
  * **Oefeningen:** [`ExercisesPage.jsx`](../src/pages/exercises/ExercisesPage.jsx) en de didactische componentpagina's in [`src/pages/exercises/`](../src/pages/exercises/).
  * **Algemeen:** [`LoginPage.jsx`](../src/pages/LoginPage.jsx).
* **Verantwoordelijkheden:**
  * **Data-fetching:** Haalt data op via API-query functies ([`src/api/`](../src/api/)) of testdata ([`src/data/data.js`](../src/data/data.js)).
  * **Event-handlers:** Bevat acties voor het toevoegen, bewerken of soft deleten van entiteiten.
  * **Gebruikersfeedback:** Roept `setMessage()` aan via `useMessage()` voor notificaties.
  * **Compositie:** Plaatst feature- en deelcomponenten in de juiste lay-out en voorziet ze van benodigde props.
* **Belangrijke regels:**
  * Definieert geen invoervelden rechtstreeks op de pagina.
  * Beheert geen lokale interactiestatus (zoals open/dicht toggles van blokken).

---

## 4. Laag 3: Domein- & Feature-componenten

Deze laag bevat domeinspecifieke componenten zoals lijsten, kaarten en invoerformulieren.

* **Locatie:** [`src/components/`](../src/components/):
  * **Reserveringen:** [`ReservationForm.jsx`](../src/components/reservations/ReservationForm.jsx), [`ReservationsList.jsx`](../src/components/reservations/ReservationsList.jsx).
  * **Bestellingen:** [`OrderForm.jsx`](../src/components/orders/OrderForm.jsx), [`OrdersList.jsx`](../src/components/orders/OrdersList.jsx), [`OrderCard.jsx`](../src/components/orders/OrderCard.jsx), [`OrderFilterBar.jsx`](../src/components/orders/OrderFilterBar.jsx).
  * **Reviews:** [`ReviewForm.jsx`](../src/components/reviews/ReviewForm.jsx), [`ReviewsList.jsx`](../src/components/reviews/ReviewsList.jsx).
  * **Menukaart:** [`MenuCard.jsx`](../src/components/menu/MenuCard.jsx), [`MenuProduct.jsx`](../src/components/menu/MenuProduct.jsx).
  * **Navigatie & Routering:** [`BistroNavBar.jsx`](../src/components/navigation/BistroNavBar.jsx), [`SandboxNavBar.jsx`](../src/components/navigation/SandboxNavBar.jsx), [`PageRouter.jsx`](../src/components/navigation/PageRouter.jsx).
* **Verantwoordelijkheden:**
  * **Formulierstatus:** Beheert de formulierinvoer via lokale `useState`.
  * **Validatie:** Controleert verplichte velden en schakelt actieknoppen uit zolang invoer ontbreekt.
  * **Acties doorgeven:** Geeft ingevulde gegevens door aan de pagina via callback-functies (`onSubmit`, `onUpdate`).
  * **Presentatie:** Rendert domeinlijsten en kaarten met duidelijke statuskleuren (`warning`/`danger` voor acties, `secondary` voor afgeronde statussen).
* **Belangrijke regels:**
  * Importeert **nooit** rechtstreeks uit `src/api/` of `src/data/data.js`.
  * Ontvangt brondata en acties uitsluitend via props.

---

## 5. Laag 4: Generieke & Herbruikbare UI-deelcomponenten

Dit zijn kleine, herbruikbare bouwstenen zonder binding met een specifieke pagina of rol.

* **Locatie:** [`src/components/common/`](../src/components/common/):
  * **Inputs & Selectors:** [`ProductSelector.jsx`](../src/components/common/ProductSelector.jsx), [`PersonSelector.jsx`](../src/components/common/PersonSelector.jsx), [`GuestInput.jsx`](../src/components/common/GuestInput.jsx), [`RatingFilterSelect.jsx`](../src/components/common/RatingFilterSelect.jsx).
  * **Containers & Navigatie:** [`CollapsibleBlock.jsx`](../src/components/common/CollapsibleBlock.jsx), [`LoadingWrapper.jsx`](../src/components/common/LoadingWrapper.jsx), [`Section.jsx`](../src/components/common/Section.jsx), [`SectionCard.jsx`](../src/components/common/SectionCard.jsx).
  * **Knoppen & Badges:** [`Buttons.jsx`](../src/components/common/Buttons.jsx), [`PersonAvatar.jsx`](../src/components/common/PersonAvatar.jsx).
  * **Authenticatie & Notificaties:** [`AuthComponents.jsx`](../src/components/common/AuthComponents.jsx), [`Message.jsx`](../src/components/common/Message.jsx).
* **Verantwoordelijkheden:**
  * Toont consistente opmaak via React-Bootstrap elementen.
  * Encapsuleert neutrale interacties (bijvoorbeeld openklappen van secties).
  * Handelt de weergave van individuele datavelden of optielijsten af.
* **Belangrijke regels:**
  * **Open-Closed Principle (OCP):** Geen koppeling met specifieke rollen of gebruikerscontexten.
  * **Minimalistische props:** Geen redundante configuratieprops (zoals duplicatie van labels of titels).
  * **Geen inline emoji's:** Gebruikt uitsluitend monochrome SVG-iconen via `react-icons`.

---

## 6. Kernrichtlijnen voor Componentinteractie

### A. Strikte Dataflow
* Data stroomt uitsluitend van boven naar beneden via props.
* Mutaties en gebruikersacties bewegen omhoog via callbacks.

### B. Geen Redundante Berekende Props
* Berekende waarden (zoals `totalPrice` of het aantal items) worden nooit als extra prop doorgegeven.
* Leid deze waarden altijd intern af uit de reeds aanwezige brondata (`items`, `products`).

### C. Scheiding per Rol
* Componenten in laag 3 en laag 4 bevatten geen conditionele controles op rollen (`isStaff`, `isCustomer`).
* Splits weergaves per rol altijd op paginaniveau (laag 2) in aparte bestanden (`customer/` en `staff/`).

### D. Schone Render-loops
* Definieer geen `const`-variabelen of berekeningen binnen een `.map()` in de JSX.
* Extract afgeleide controles naar pure helperfuncties zodat de loop declaratief blijft:
  ```jsx
  {items.map(item => (
      <OrderItemRow key={item.id} item={item} />
  ))}
  ```
