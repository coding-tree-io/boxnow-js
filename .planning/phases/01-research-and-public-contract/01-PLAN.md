# 01 Plan - Research And Public Contract

## Objective

Lock the terminology, source material, and first public API sketch before code.

## Tasks

- [ ] 01-01 Capture official BOX NOW API research.
- [ ] 01-02 Capture BOX NOW widget research.
- [ ] 01-03 Capture WordPress plugin behavior and failure-mode research.
- [ ] 01-04 Decide package topology ADR.
- [ ] 01-05 Decide secret-boundary ADR.
- [ ] 01-06 Decide widget-contract ADR.
- [ ] 01-07 Decide Astro integration scope ADR.
- [ ] 01-08 Draft initial public API sketch.
- [ ] 01-09 Review public names against the glossary.
- [ ] 01-10 Add package README stubs with non-goals.

## Initial Public API Sketch

```ts
import { createBoxNowClient, CompartmentSize } from "@coding-tree-io/boxnow";

const boxnow = createBoxNowClient({
  baseUrl: process.env.BOXNOW_API_BASE_URL,
  clientId: process.env.BOXNOW_CLIENT_ID,
  clientSecret: process.env.BOXNOW_CLIENT_SECRET,
});

const deliveryRequest = await boxnow.deliveryRequests.create({
  orderNumber: "ORDER-1001",
  paymentMode: "prepaid",
  origin: { locationId: "8", contactEmail: "...", contactNumber: "..." },
  destination: { locationId: "9", contactEmail: "...", contactNumber: "..." },
  parcels: [
    {
      value: "10.00",
      weightKg: 0,
      compartmentSize: CompartmentSize.Medium,
    },
  ],
});
```

```ts
import { createBoxNowWidget } from "@coding-tree-io/boxnow-widget";

const widget = createBoxNowWidget({
  partnerId: "123",
  parentElement: "#boxnowmap",
  mode: "popup",
  country: "GR",
});

widget.on("locker:selected", (locker) => {
  // Host application owns checkout state and validation.
});
```

```ts
import boxnow from "@coding-tree-io/astro-boxnow";

export default defineConfig({
  integrations: [
    boxnow({
      partnerId: "123",
      country: "GR",
      mode: "popup",
    }),
  ],
});
```

## Acceptance Criteria

- Research files cover official API, widget, and WordPress reference behavior.
- ADRs exist for package topology, secrets, widget contract, and Astro scope.
- Public API sketch uses glossary terms.
- No public API sketch puts server credentials in browser-facing config.

## Validation

Run after implementation:

```powershell
pnpm check
pnpm test
```
